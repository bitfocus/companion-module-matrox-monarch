var instance_skel = require('../../instance_skel');
var debug;
var log;

const http = require('http');
const request = require('request');

const ACTIONS = {
	'startEncoder1':			{ label: 'Start Encoder 1',			apiCommand: 'StartEncoder1' },
	'startEncoder2':			{ label: 'Start Encoder 2',			apiCommand: 'StartEncoder2' },
	'stopEncoder1':				{ label: 'Stop Encoder 1',			apiCommand: 'StopEncoder1'  },
	'stopEncoder2':				{ label: 'Stop Encoder 2',			apiCommand: 'StopEncoder2'  }
};

function instance(system, id, config) {
	var self = this;

	// super-constructor
	instance_skel.apply(this, arguments);

	self.actions(); // export actions
	self.init_presets();

	return self;
}

instance.prototype.updateConfig = function(config) {
	var self = this;
	self.config = config;
}

instance.prototype.init = function() {
	var self = this;
	self.status(self.STATE_OK);
	debug = self.debug;
	log   = self.log;
};

instance.prototype.config_fields = function () {
	var self = this;
	return [
		{
			type: 'text',
			id: 'info',
			width: 12,
			label: 'Information',
			value: 'This module controls <a href="https://www.matrox.com/video/en/products/monarch_hdx/" target="_new">Matrox Monarch series stream encoding/recording appliances</a>.'
		},
		{
			type: 'textinput',
			id: 'user',
			width: 12,
			label: 'Username'
		},
		{
			type: 'textinput',
			id: 'password',
			width: 12,
			label: 'Password'
		},
		{
			type: 'textinput',
			id: 'host',
			width: 12,
			label: 'IP Address',
			regex: self.REGEX_IP
		}
	]
};

instance.prototype.destroy = function() {
	var self = this;
	debug("destroy");
};

instance.prototype.init_presets = function() {
	var self = this;
	var presets = [];

	const white = self.rgb(255, 255, 255);
	const green = self.rgb(42, 167, 69);
	const red   = self.rgb(220, 53, 69);

	presets.push({
		category: 'Commands',
		label: 'Start Encoder/Recorder 1',
		bank: {
			style: 'text',
			text: 'Start Enc 1',
			size: '18',
			color: white,
			bgcolor: green
		},
		actions: [
			{ action: 'startEncoder1' }
		]
	});

	presets.push({
		category: 'Commands',
		label: 'Start Encoder/Recorder 2',
		bank: {
			style: 'text',
			text: 'Start Enc 2',
			size: '18',
			color: white,
			bgcolor: green
		},
		actions: [
			{ action: 'startEncoder2' }
		]
	});

	presets.push({
		category: 'Commands',
		label: 'Start Both Encoder/Recorders',
		bank: {
			style: 'text',
			text: 'Start Both',
			size: '18',
			color: white,
			bgcolor: green
		},
		actions: [
			{ action: 'startEncoder1' },
			{ action: 'startEncoder2' }
		]
	});

	presets.push({
		category: 'Commands',
		label: 'Stop Encoder/Recorder 1',
		bank: {
			style: 'text',
			text: 'Stop Enc 1',
			size: '18',
			color: white,
			bgcolor: red
		},
		actions: [
			{ action: 'stopEncoder1' }
		]
	});

	presets.push({
		category: 'Commands',
		label: 'Stop Encoder/Recorder 2',
		bank: {
			style: 'text',
			text: 'Stop Enc 2',
			size: '18',
			color: white,
			bgcolor: red
		},
		actions: [
			{ action: 'stopEncoder2' }
		]
	});

	presets.push({
		category: 'Commands',
		label: 'Stop Both Encoder/Recorders',
		bank: {
			style: 'text',
			text: 'Stop Both',
			size: '18',
			color: white,
			bgcolor: red
		},
		actions: [
			{ action: 'stopEncoder1' },
			{ action: 'stopEncoder2' }
		]
	});

	self.setPresetDefinitions(presets);
};

instance.prototype.actions = function(system) {
	var self = this;
	self.setActions(ACTIONS);
};

instance.prototype.action = function(action) {
	var self = this;
	var apiHost = self.config.host;
	var apiCommand = ACTIONS[action.action].apiCommand;
	var requestUrl = `http://${apiHost}/Monarch/syncconnect/sdk.aspx?command=${apiCommand}`

	// Configure HTTP client
	var apiRequest = request.defaults({
		auth: {
			user: self.config.user,
			pass: self.config.password
		},
		timeout: 10000
	});

	// Send request
	self.debug('info', 'Starting request to: ' + requestUrl);
	apiRequest.get(requestUrl, function (error, response, body) {
		self.debug('info', JSON.stringify(error));
		self.debug('info', JSON.stringify(response));
		self.debug('info', JSON.stringify(body));

		if (error && error.code === 'ETIMEDOUT') {
			self.log('error', 'Connection timeout while connecting to ' + apiHost);
			return;
		}
		if (error && error.connect === true) {
			self.log('error', 'Read timeout waiting for response from: ' + requestUrl);
			return;
		}
		if (response && (response.statusCode < 200 || response.statusCode > 299)) {
			self.log('error', 'Non-successful response status code: ' + http.STATUS_CODES[response.statusCode]);
			return;
		}

		self.debug('info', 'Success: ' + action.action);
	});
};

instance_skel.extendedBy(instance);
exports = module.exports = instance;
