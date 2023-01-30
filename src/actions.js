const Monarch = require('./Monarch')

const sendCommand = async (action) => {
	try {
		const connection = new Monarch(this.config)
		const result = await connection.sendCommand(action)
		this.log('debug', 'Command result: ' + JSON.stringify(result))

		if (result.status === 'success') {
			this.updateStatus('ok')
		} else {
			this.updateStatus('connection_failure', 'Failed to connect to device')
		}
	} catch (error) {
		let errorText = String(error)
		if (errorText.match('ECONNREFUSED')) {
			this.log('error', 'Unable to connect to the streamer...')
			this.updateStatus('connection_failure', 'Failed to connect to device')
		} else if (errorText.match('ETIMEDOUT') || errorText.match('ENOTFOUND')) {
			this.log('error', 'Connection to streamer has timed out...')
		} else {
			this.log('error', 'An error has occurred when connecting to streamer...')
		}
	}
}

module.exports = {
	actions() {
		switch (this.config.device_type) {
			case 'monarch-hd':
			case 'nvs-30':
				this.setActionDefinitions({
					StartStreaming: {
						name: 'Start Streaming',
						options: [],
						callback: async (event) => {
							sendCommand(event)
						},
					},
					StartRecording: {
						name: 'Start Recording',
						options: [],
						callback: async (event) => {
							sendCommand(event)
						},
					},
					StartStreamingAndRecording: {
						name: 'Start Recording & Streaming',
						options: [],
						callback: async (event) => {
							sendCommand(event)
						},
					},
					StopStreaming: {
						name: 'Stop Streaming',
						options: [],
						callback: async (event) => {
							sendCommand(event)
						},
					},
					StopRecording: {
						name: 'Stop Recording',
						options: [],
						callback: async (event) => {
							sendCommand(event)
						},
					},
					StopStreamingAndRecording: {
						name: 'Stop Recording & Streaming',
						options: [],
						callback: async (event) => {
							sendCommand(event)
						},
					},
				})
				break

			case 'monarch-hdx':
				this.setActionDefinitions({
					StartEncoder1: {
						name: 'Start Encoder 1',
						options: [],
						callback: async (event) => {
							sendCommand(event)
						},
					},
					StartEncoder2: {
						name: 'Start Encoder 2',
						options: [],
						callback: async (event) => {
							sendCommand(event)
						},
					},
					StopEncoder1: {
						name: 'Stop Encoder 1',
						options: [],
						callback: async (event) => {
							sendCommand(event)
						},
					},
					StopEncoder2: {
						name: 'Stop Encoder 2',
						options: [],
						callback: async (event) => {
							sendCommand(event)
						},
					},
					StartBothEncoders: {
						name: 'Start Both Encoders',
						options: [],
						callback: async (event) => {
							sendCommand(event)
						},
					},
					StopBothEncoders: {
						name: 'Stop Both Encoders',
						options: [],
						callback: async (event) => {
							sendCommand(event)
						},
					},
				})
				break

			case 'monarch-lcs':
				this.setActionDefinitions({
					StartBothEncoders: {
						name: 'Start Encoders',
						options: [],
						callback: async (event) => {
							sendCommand(event)
						},
					},
					StopBothEncoders: {
						name: 'Stop Encoders',
						options: [],
						callback: async (event) => {
							sendCommand(event)
						},
					},
					SetDynamicOutput: {
						name: 'Set Dymamic Output',
						options: [
							{
								type: 'dropdown',
								label: 'Set Type',
								id: 'SetDynamicOutputDropdown',
								tooltip: 'Changes the live output mode',
								choices: [
									{ id: 'HIDE_A', label: 'Hide A (PIP)' },
									{ id: 'SHOW_A', label: 'Show A (PIP, Switcher, Dual-Iso)' },
									{ id: 'SHOW_B', label: 'Show B (Switcher, Dual-Iso)' },
								],
								default: 'SHOW_A',
							},
						],
						callback: async (event) => {
							sendCommand(event)
						},
					},
				})
		}
	},
}
