class Monarch {
	constructor(config) {
		const apiHost = config.host
		const apiPort = config.port
		const apiBrand = config.device_type === 'nvs-30' ? 'NVS' : 'Monarch'

		this.device_type = config.device_type
		this.shouldRetry = true
		this.retryAttempts = 0

		this.timer = (ms) => new Promise((res) => setTimeout(res, ms))
		this.baseUrl = `http://${apiHost}:${apiPort}/${apiBrand}/syncconnect/sdk.aspx?command=`

		this.requestOptions = {
			method: 'GET',
			timeout: 10000,
			headers: {
				Authorization: 'Basic ' + Buffer.from(config.user + ':' + config.password).toString('base64'),
			},
		}
	}

	async sendCommand(action) {
		let requestUrl = this.baseUrl + action.actionId

		// Append data when action is SetDynamicOutput
		if (action === 'SetDynamicOutput') {
			requestUrl += ',' + action.options.SetDynamicOutputDropdown
		}

		while (this.shouldRetry) {
			const response = await fetch(requestUrl, this.requestOptions)

			if (!response.ok) {
				return {
					status: 'failed',
					message: 'Streamer returned an unhandled response: ' + response.statusText,
				}
			}

			const responseText = (await response.text()).replace(/\s+/g, '')

			switch (responseText) {
				case responseText.match(/^SUCCESS/)?.input:
					return {
						status: 'success',
						message: 'Getting a SUCCESS response from the streamer!',
					}
				case responseText.match(/^FAILED/)?.input:
					return {
						status: 'failed',
						message: 'Getting a FAILED response from the streamer. Check if the feature is setup.',
					}
				case responseText.match(/^RETRY/)?.input:
					if (this.retryAttempts < 2) {
						this.retryAttempts++
						await this.timer(2000)
						this.shouldRetry = true
					} else {
						this.shouldRetry = false
					}
					break
				default:
					const streamerStatus = this.getStatus(responseText)

					if (streamerStatus) {
						return {
							status: 'success',
							response: streamerStatus,
						}
					}

					return {
						status: 'error',
						message: 'Could not process response from streamer.',
					}
			}
		}

		this.shouldRetry = true

		return {
			status: 'error',
			message: 'Retry failed multiple times.',
		}
	}

	getStatus(responseText) {
		let deviceStatus, streamStatus, enc1Status, enc2Status

		switch (this.device_type) {
			case 'monarch-hd':
			case 'nvs-30':
				deviceStatus = responseText.match(/RECORD:(.*),STREAM:(.*),NAME:(.*)/)
				if (deviceStatus) {
					streamStatus = deviceStatus[2].split(',')

					return {
						record: deviceStatus[1],
						streamType: streamStatus[0],
						streamStatus: streamStatus[1],
						name: deviceStatus[3],
					}
				}

			case 'monarch-hdx':
				deviceStatus = responseText.match(/ENC1:(.*),ENC2:(.*),NAME:(.*)/)
				if (deviceStatus) {
					enc1Status = deviceStatus[1].split(',')
					enc2Status = deviceStatus[2].split(',')

					return {
						enc1Type: enc1Status[0],
						enc1Status: enc1Status[1],
						enc2Type: enc2Status[0],
						enc2Status: enc2Status[1],
						name: deviceStatus[3],
					}
				}

			case 'monarch-lcs':
				deviceStatus = responseText.match(/ENC1:(.*),ENC2:(.*),FILETRANSFER:(.*),NAME:(.*)/)
				if (deviceStatus) {
					enc1Status = deviceStatus[1].split(',')
					enc2Status = deviceStatus[2].split(',')

					return {
						enc1Type: enc1Status[0],
						enc1Status: enc1Status[1],
						enc2Type: enc2Status[0],
						enc2Status: enc2Status[1],
						filetransfer: deviceStatus[3],
						name: deviceStatus[4],
					}
				}
			default:
				return null
		}
	}
}

module.exports = Monarch
