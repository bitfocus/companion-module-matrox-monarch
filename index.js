var instance_skel = require('../../instance_skel');
var Client  = require('node-rest-client').Client;
var debug;
var log;

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

  presets.push({
    category: 'Commands',
    label: 'Start Stream',
    bank: {
      style: 'text',
      test: 'START STREAM',
      size: '14',
      color: self.rgb(255, 255, 255),
      bgcolor: 0
    },
    actions: [
      {
        action: 'setCommand',
        options: {
          startStop: 'Start',
          encoderNum: 'BothEncoders'
        }
      }
    ]
  });

  presets.push({
    category: 'Commands',
    label: 'Stop Stream',
    bank: {
      style: 'text',
      test: 'STOP STREAM',
      size: '14',
      color: self.rgb(255, 255, 255),
      bgcolor: 0
    },
    actions: [
      {
        action: 'setCommand',
        options: {
          startStop: 'Stop',
          encoderNum: 'BothEncoders'
        }
      }
    ]
  });

  self.setPresetDefinitions(presets);
};

instance.prototype.actions = function(system) {
  var self = this;
  self.system.emit('instance_actions', self.id, {
    'setCommand': {
      label: 'Set Command',
      options: [
        {
          type: 'dropdown',
          label: 'Start or Stop',
          id: 'startStop',
          default: 'Start',
          choices: [
            {
              id: 'Start',
              label: 'Start'
            },
            {
              id: 'Stop',
              label: 'Stop'
            }
          ]
        },
        {
          type: 'dropdown',
          label: 'Set Encoder',
          id: 'encoderNum',
          default: 'BothEncoders',
          choices: [
            {
              id: 'Encoder1',
              label: '1'
            },
            {
              id: 'Encoder2',
              label: '2'
            },
            {
              id: 'BothEncoders',
              label: 'Both'
            }
          ]
        }
      ]
    }
  });
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
  var cmd  = null;
  var options = {
    "client" : { user: self.config.user, password: self.config.password }
  };
  debug('action: ', action);

  switch (action.action) {
    case 'setCommand':
      cmd = action.options.startStop + action.options.encoderNum;
    default:
      cmd = 'GetStatus';
  }

  if (cmd !== undefined) {
    options.args = {
        path: { "host": self.config.host, "cmd": cmd },
        headers: { "Content-Type": "application/json" }
    };

    // Send request
    get("http://${host}/Monarch/syncconnect/sdk.aspx?command=${cmd}", options, function(err, data, response) {
      if (err) {
        self.log('error', 'Error from Matrox Monarch: ' + response);
        return;
      }
    }, args);
  }
};

instance_skel.extendedBy(instance);
exports = module.exports = instance;