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

instance.prototype.config_fields = function () {
  var self = this;
  return [
    {
      type: 'text',
      id: 'info',
      width: 12,
      label: 'Information',
      value: 'This module controls <a href="https://www.matrox.com/video/en/products/monarch_hdx/" target="_new">Matrox Monarch series stream encoding/recording appliances</a>.'
    }
  ]
};
