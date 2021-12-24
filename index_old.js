var instance_skel = require('../../instance_skel')
var debug
var log

const http = require('http')
const request = require('request')

const ACTIONS = {
	startEncoder1: { label: 'HDX: Start Encoder 1', apiCommand: 'StartEncoder1' },
	startEncoder2: { label: 'HDX: Start Encoder 2', apiCommand: 'StartEncoder2' },
	stopEncoder1: { label: 'HDX: Stop Encoder 1', apiCommand: 'StopEncoder1' },
	stopEncoder2: { label: 'HDX: Stop Encoder 2', apiCommand: 'StopEncoder2' },
	startBothEncoders: { label: 'HDX: Start Both Encoders', apiCommand: 'StartBothEncoders' },
	stopBothEncoders: { label: 'HDX: Stop Both Encoders', apiCommand: 'StopBothEncoders' },
	startStreaming: { label: 'Start Streaming', apiCommand: 'StartStreaming' },
	startRecording: { label: 'Start Recording', apiCommand: 'StartRecording' },
	startRecordingStreaming: { label: 'Start Recording & Streaming', apiCommand: 'StartStreamingAndRecording' },
	stopStreaming: { label: 'Stop Streaming', apiCommand: 'StopStreaming' },
	stopRecording: { label: 'Stop Recording', apiCommand: 'StopRecording' },
	stopRecordingStreaming: { label: 'Stop Recording & Streaming', apiCommand: 'StopStreamingAndRecording' },
}

function instance(system, id, config) {
	var self = this

	// super-constructor
	instance_skel.apply(this, arguments)

	self.actions() // export actions
	self.init_presets()

	return self
}

instance.prototype.updateConfig = function (config) {
	var self = this
	self.config = config
}

instance.prototype.init = function () {
	var self = this
	self.status(self.STATE_OK)
	debug = self.debug
	log = self.log
}

instance.prototype.config_fields = function () {
	var self = this
	return [
		{
			type: 'text',
			id: 'info',
			width: 12,
			label: 'Information',
			value:
				'This module controls <a href="https://www.matrox.com/en/video/products/encoders-decoders/monarch-series" target="_new">Matrox Monarch series</a> stream encoding/recording appliances.',
		},
		{
			type: 'dropdown',
			label: 'Device Type',
			id: 'device_type',
			width: 12,
			default: 'monarch-hdx',
			choices: [
				{ id: 'monarch-hd', label: 'Monarch HD / Datavideo NVS-30' },
				{ id: 'monarch-hdx', label: 'Monarch HDX' },
				{ id: 'monarch-lcs', label: 'Monarch LCS' },
			],
		},
		{
			type: 'textinput',
			id: 'user',
			width: 12,
			label: 'Username (if applicable)',
		},
		{
			type: 'textinput',
			id: 'password',
			width: 12,
			label: 'Password (if applicable)',
		},
		{
			type: 'textinput',
			id: 'host',
			width: 6,
			label: 'IP Address',
			regex: self.REGEX_IP,
		},
		{
			type: 'number',
			id: 'port',
			width: 6,
			label: 'Target Port',
			default: '80',
			regex: this.REGEX_PORT,
		},
	]
}

instance.prototype.destroy = function () {
	var self = this
	debug('destroy')
}

instance.prototype.init_presets = function () {
	var self = this
	var presets = []

	const white = self.rgb(255, 255, 255)
	const green = self.rgb(42, 167, 69)
	const red = self.rgb(220, 53, 69)

	presets.push({
		category: 'Commands',
		label: 'Start Encoder/Recorder 1',
		bank: {
			style: 'text',
			text: 'Start Enc 1',
			size: '18',
			color: white,
			bgcolor: green,
		},
		actions: [{ action: 'startEncoder1' }],
	})

	presets.push({
		category: 'Commands',
		label: 'Start Encoder/Recorder 2',
		bank: {
			style: 'text',
			text: 'Start Enc 2',
			size: '18',
			color: white,
			bgcolor: green,
		},
		actions: [{ action: 'startEncoder2' }],
	})

	presets.push({
		category: 'Commands',
		label: 'Start Both Encoder/Recorders',
		bank: {
			style: 'text',
			text: 'Start Both',
			size: '18',
			color: white,
			bgcolor: green,
		},
		actions: [{ action: 'startEncoder1' }, { action: 'startEncoder2' }],
	})

	presets.push({
		category: 'Commands',
		label: 'Stop Encoder/Recorder 1',
		bank: {
			style: 'text',
			text: 'Stop Enc 1',
			size: '18',
			color: white,
			bgcolor: red,
		},
		actions: [{ action: 'stopEncoder1' }],
	})

	presets.push({
		category: 'Commands',
		label: 'Stop Encoder/Recorder 2',
		bank: {
			style: 'text',
			text: 'Stop Enc 2',
			size: '18',
			color: white,
			bgcolor: red,
		},
		actions: [{ action: 'stopEncoder2' }],
	})

	presets.push({
		category: 'Commands',
		label: 'Stop Both Encoder/Recorders',
		bank: {
			style: 'text',
			text: 'Stop Both',
			size: '18',
			color: white,
			bgcolor: red,
		},
		actions: [{ action: 'stopEncoder1' }, { action: 'stopEncoder2' }],
	})

	self.setPresetDefinitions(presets)
}

instance.prototype.actions = function (system) {
	var self = this
	self.system.emit('instance_actions', self.id, ACTIONS)
}

instance.prototype.action = function (action) {
	var self = this
	var apiHost = self.config.host
	var apiPort = self.config.port
	var apiCommand = ACTIONS[action.action].apiCommand
	var requestUrl = `http://${apiHost}:${apiPort}/Monarch/syncconnect/sdk.aspx?command=${apiCommand}`

	// Configure HTTP client
	var apiRequest = request.defaults({
		auth: {
			user: self.config.user,
			pass: self.config.password,
		},
		timeout: 10000,
	})

	// Send request
	self.debug('info', 'Starting request to: ' + requestUrl)
	apiRequest.get(requestUrl, function (error, response, body) {
		self.debug('info', JSON.stringify(error))
		self.debug('info', JSON.stringify(response))
		self.debug('info', JSON.stringify(body))

		if (error && (error.code === 'ETIMEDOUT' || error.code === 'ENETUNREACH')) {
			self.log('error', 'Connection timeout while connecting to ' + apiHost)
			return
		}
		if (error && error.connect === true) {
			self.log('error', 'Read timeout waiting for response from: ' + requestUrl)
			return
		}
		if (response && (response.statusCode < 200 || response.statusCode > 299)) {
			self.log('error', 'Non-successful response status code: ' + http.STATUS_CODES[response.statusCode])
			return
		}

		var retryRegex = /RETRY/

		if (retryRegex.test(JSON.stringify(body))) {
			self.log('info', 'Attempting retry')
			if (retryAttempts < 5) {
				setTimeout(function () {
					self.action(action)
				}, 2000)
				retryAttempts++
			}
			return
		}

		self.log('info', 'Success: ' + action.action + JSON.stringify(body))
		retryAttempts = 0
	})
}

instance_skel.extendedBy(instance)
exports = module.exports = instance
