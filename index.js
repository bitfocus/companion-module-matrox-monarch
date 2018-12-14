var instance_skel = require('../../instance_skel');
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
      id: 'pass',
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
    label: 'Test Command 1',
    bank: {
      style: 'text',
      test: 'TEST',
      size: 'auto',
      color: self.rgb(255, 255, 255),
      bgcolor: 0
    },
    actions: [
      {
        action: 'TestAction',
        options: {
          command: 'testCommand'
        }
      }
    ]
  });
};

instance.prototype.actions = function(system) {
  var self = this;
  self.system.emit('instance_actions', self.id, {
    'test1': {
      label: 'Test 1',
      options: [
        {
          type: 'textinput',
          label: 'test input label 1',
          id: 'testId1',
          default: '',
        },
        {
          type: 'dropdown',
          label: 'test dropdown',
          id: 'testId2',
          default: 'testChoiceId2',
          choices: [
            {
              id: 'testChoiceId1',
              label: 'testChoiceLabel1'
            },
            {
              id: 'testChoiceId2',
              label: 'testChoiceLabel2'
            }
          ]
        }
      ]
    },
    'test2': {
      label: 'Test 2',
      options: [
        {
          type: 'textinput',
          label: 'test input label 2',
          id: 'test2',
          default: '',
        }
      ]
    }
  });
};

instance.prototype.action = function(action) {
  var self = this;
  var cmd  = action.options.command;
  debug('action: ', action);

  switch (action.action) {
    default:
      cmd = action.options.command;
  }
  if (cmd !== undefined) {
    self.system.emit('rest_get', 'http://' + self.config.user + ':' + self.config.pass + '@' + self.config.ip + '/Monarch/syncconnect/sdk.aspx?command=' + cmd, function(err, data, response) {
      if (err) {
        self.log('error', 'Error from Matrox Monarch: ' + response);
        return;
      }
    });
  }
};

instance_skel.extendedBy(instance);
exports = module.exports = instance;