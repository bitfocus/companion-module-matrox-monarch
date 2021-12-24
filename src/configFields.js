module.exports = {
	config_fields() {
		// eslint-disable-line camelcase
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
					{ id: 'monarch-hd', label: 'Monarch HD' },
					{ id: 'monarch-hdx', label: 'Monarch HDX' },
					{ id: 'monarch-lcs', label: 'Monarch LCS' },
					{ id: 'nvs-30', label: 'Datavideo NVS-30' },
				],
			},
			{
				type: 'textinput',
				id: 'user',
				default: 'admin',
				width: 12,
				label: 'Username (if applicable)',
			},
			{
				type: 'textinput',
				id: 'password',
				default: 'admin',
				width: 12,
				label: 'Password (if applicable)',
			},
			{
				type: 'textinput',
				id: 'host',
				width: 6,
				label: 'IP Address',
				regex: this.REGEX_IP,
			},
			{
				type: 'number',
				id: 'port',
				width: 6,
				label: 'Target Port',
				default: '80',
				regex: this.REGEX_PORT,
			},
			{
				type: 'text',
				id: 'info',
				width: 12,
				label: 'Polling',
				value:
					'When you need your variables to be up to date all the time, you have to enable polling. The module will query the streamer periodically for the latest values.',
			},
			{
				type: 'checkbox',
				id: 'enable_polling',
				label: 'Enable Polling?',
				width: 6,
				default: true,
			},
			{
				type: 'dropdown',
				label: 'Polling Rate',
				id: 'polling_rate',
				width: 6,
				default: 10000,
				choices: [
					{ id: 5000, label: '5000ms' },
					{ id: 10000, label: '10000ms' },
					{ id: 30000, label: '30000ms' },
				],
			},
		]
	},
}
