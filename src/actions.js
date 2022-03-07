const Monarch = require('./Monarch')

module.exports = {
	actions() {
		switch (this.config.device_type) {
			case 'monarch-hd':
			case 'nvs-30':
				this.setActions({
					StartStreaming: { label: 'Start Streaming' },
					StartRecording: { label: 'Start Recording' },
					StartStreamingAndRecording: { label: 'Start Recording & Streaming' },
					StopStreaming: { label: 'Stop Streaming' },
					StopRecording: { label: 'Stop Recording' },
					StopStreamingAndRecording: { label: 'Stop Recording & Streaming' },
				})
				break

			case 'monarch-hdx':
				this.setActions({
					StartEncoder1: { label: 'Start Encoder 1' },
					StartEncoder2: { label: 'Start Encoder 2' },
					StopEncoder1: { label: 'Stop Encoder 1' },
					StopEncoder2: { label: 'Stop Encoder 2' },
					StartBothEncoders: { label: 'Start Both Encoders' },
					StopBothEncoders: { label: 'Stop Both Encoders' },
				})
				break

			case 'monarch-lcs':
				this.setActions({
					StartBothEncoders: { label: 'Start Encoders' },
					StopBothEncoders: { label: 'Stop Encoders' },
					SetDynamicOutput: {
						label: 'Set Dymamic Output',
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
					},
				})
		}
	},

	async action({ action, options }) {
		try {
			const connection = new Monarch(this.config)
			const result = await connection.sendCommand(action)
			this.debug('info', result)

			if (result.status === 'success') {
				this.status(this.STATUS_OK)
			} else {
				this.status(this.STATUS_ERROR)
			}
		} catch (error) {
			let errorText = String(error)
			if (errorText.match('ECONNREFUSED')) {
				this.log('error', 'Unable to connect to the streamer...')
				this.status(this.STATUS_ERROR)
			} else if (errorText.match('ETIMEDOUT') || errorText.match('ENOTFOUND')) {
				this.log('error', 'Connection to streamer has timed out...')
			} else {
				this.log('error', 'An error has occurred when connecting to streamer...')
			}
		}
	},
}
