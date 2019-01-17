var instance_skel = require('../../instance_skel');
var Client  = require('node-rest-client').Client;
var debug;
var log;

const ACTIONS = {
  'startEncoder1':      { label: 'Start Encoder 1',     apiCommand: 'StartEncoder1' },
  'startEncoder2':      { label: 'Start Encoder 2',     apiCommand: 'StartEncoder2' },
  'stopEncoder1':       { label: 'Stop Encoder 1',      apiCommand: 'StopEncoder1'  },
  'stopEncoder2':       { label: 'Stop Encoder 2',      apiCommand: 'StopEncoder2'  }
};

function instance(system, id, config) {
  var self = this;

  // super-constructor
  instance_skel.apply(this, arguments);

  self.actions(); // export actions

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

  // TODO: presets?

  self.setPresetDefinitions(presets);
};

instance.prototype.actions = function(system) {
  var self = this;
  self.system.emit('instance_actions', self.id, ACTIONS);
};

function get(url, options, callback) {
  var client = new Client(options.client);

  client.get(url, options.args, function (data, response) {
    callback(null, { data: data, response: response });
  }).on('error', function(error) {
    debug('error response:', error);
    callback(true, { error: error });
  });
}

instance.prototype.action = function(action) {
  var self = this;
  var apiHost = self.config.host;
  var apiCommand = ACTIONS[action.action].apiCommand;
  var requestUrl = `http://${apiHost}/Monarch/syncconnect/sdk.aspx?command=${apiCommand}`

  var options = {
    "client" : { user: self.config.user, password: self.config.password }
  };

  // Send request
  get(requestUrl, options, function(err, data, response) {
    if (err) {
      self.log('error', 'Error from Matrox Monarch: ' + response);
      return;
    }
  }, options.args);
};

instance_skel.extendedBy(instance);
exports = module.exports = instance;
