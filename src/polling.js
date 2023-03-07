const Monarch = require('./Monarch')

module.exports = {
	/**
	 * Inits the polling logic
	 */
	initPolling() {
		// Cleanup old interval
		if (this.pollingInterval) {
			clearInterval(this.pollingInterval)
		}

		// Setup polling if enabled and host is set
		if (this.config.enable_polling && this.config.host) {
			this.log('debug', `Polling ${this.config.host} started...`)

			const connection = new Monarch(this.config)
			this.pollingInterval = setInterval(async () => {
				const result = await connection.sendCommand('GetStatus')
				this.log('debug', JSON.stringify(result))

				if (result.status === 'error') {
					this.updateStatus('connection_failure', 'Failed to connect to device')
					return
				}

				this.updateStatus('ok')

				switch (this.config.device_type) {
					case 'monarch-hd':
					case 'nvs-30':
						this.setVariableValues({
							recorder_status: result.response.record,
							stream_type: result.response.streamType,
							stream_status: result.response.streamStatus,
							name: result.response.name,
						})
						break

					case 'monarch-hdx':
						this.setVariableValues({
							encoder_1_type: result.response.enc1Type,
							encoder_1_status: result.response.enc1Status,
							encoder_2_type: result.response.enc2Type,
							encoder_2_status: result.response.enc2Status,
							name: result.response.name,
						})
						break

					case 'monarch-lcs':
						this.setVariableValues({
							encoder_1_type: result.response.enc1Type,
							encoder_1_status: result.response.enc1Status,
							encoder_2_type: result.response.enc2Type,
							encoder_2_status: result.response.enc2Status,
							filetranfser_state: result.response.filetransfer,
							name: result.response.name,
						})
						break
				}
			}, this.config.polling_rate)
		}
	},
}
