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
				this.debug('info', result)

				if (result.status === 'error') {
					this.status(this.STATUS_WARNING)
					return
				}

				this.status(this.STATUS_OK)

				switch (this.config.device_type) {
					case 'monarch-hd':
					case 'nvs-30':
						this.setVariable('recorder_status', result.response.record)
						this.setVariable('stream_type', result.response.streamType)
						this.setVariable('stream_status', result.response.streamStatus)
						this.setVariable('name', result.response.name)
						break

					case 'monarch-hdx':
						this.setVariable('encoder_1_type', result.response.enc1Type)
						this.setVariable('encoder_1_status', result.response.enc1Status)
						this.setVariable('encoder_2_type', result.response.enc2Type)
						this.setVariable('encoder_2_status', result.response.enc2Status)
						this.setVariable('name', result.response.name)
						break

					case 'monarch-lcs':
						this.setVariable('encoder_1_type', result.response.enc1Type)
						this.setVariable('encoder_1_status', result.response.enc1Status)
						this.setVariable('encoder_2_type', result.response.enc2Type)
						this.setVariable('encoder_2_status', result.response.enc2Status)
						this.setVariable('filetranfser_state', result.response.filetransfer)
						this.setVariable('name', result.response.name)
				}
			}, this.config.polling_rate)
		}
	},
}
