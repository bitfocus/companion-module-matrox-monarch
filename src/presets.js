module.exports = {
	presets() {
		const presets = []

		const white = this.rgb(255, 255, 255)
		const green = this.rgb(42, 167, 69)
		const red = this.rgb(220, 53, 69)

		switch (this.config.device_type) {
			case 'monarch-hd':
			case 'nvs-30':
				presets.push({
					category: 'Commands',
					label: 'Start Streaming',
					bank: {
						style: 'text',
						text: 'Start Stream',
						size: '18',
						color: white,
						bgcolor: green,
					},
					actions: [{ action: 'StartStreaming' }],
				})

				presets.push({
					category: 'Commands',
					label: 'Stop Streaming',
					bank: {
						style: 'text',
						text: 'Stop Stream',
						size: '18',
						color: white,
						bgcolor: red,
					},
					actions: [{ action: 'StopStreaming' }],
				})

				presets.push({
					category: 'Commands',
					label: 'Start Recording',
					bank: {
						style: 'text',
						text: 'Start Recording',
						size: '18',
						color: white,
						bgcolor: green,
					},
					actions: [{ action: 'StartRecording' }],
				})

				presets.push({
					category: 'Commands',
					label: 'Stop Recording',
					bank: {
						style: 'text',
						text: 'Stop Recording',
						size: '18',
						color: white,
						bgcolor: red,
					},
					actions: [{ action: 'StopRecording' }],
				})
				break

			case 'monarch-hdx':
				presets.push({
					category: 'Commands',
					label: 'Start Encoder/Recorder 1',
					bank: {
						style: 'text',
						text: 'Start Enc 1',
						size: '18',
						color: white,
						bgcolor: green,
					},
					actions: [{ action: 'StartEncoder1' }],
				})

				presets.push({
					category: 'Commands',
					label: 'Start Encoder/Recorder 2',
					bank: {
						style: 'text',
						text: 'Start Enc 2',
						size: '18',
						color: white,
						bgcolor: green,
					},
					actions: [{ action: 'StartEncoder2' }],
				})

				presets.push({
					category: 'Commands',
					label: 'Start Both Encoder/Recorders',
					bank: {
						style: 'text',
						text: 'Start Both',
						size: '18',
						color: white,
						bgcolor: green,
					},
					actions: [{ action: 'StartBothEncoders' }],
				})

				presets.push({
					category: 'Commands',
					label: 'Stop Encoder/Recorder 1',
					bank: {
						style: 'text',
						text: 'Stop Enc 1',
						size: '18',
						color: white,
						bgcolor: red,
					},
					actions: [{ action: 'StopEncoder1' }],
				})

				presets.push({
					category: 'Commands',
					label: 'Stop Encoder/Recorder 2',
					bank: {
						style: 'text',
						text: 'Stop Enc 2',
						size: '18',
						color: white,
						bgcolor: red,
					},
					actions: [{ action: 'StopEncoder2' }],
				})

				presets.push({
					category: 'Commands',
					label: 'Stop Both Encoder/Recorders',
					bank: {
						style: 'text',
						text: 'Stop Both',
						size: '18',
						color: white,
						bgcolor: red,
					},
					actions: [{ action: 'StopBothEncoders' }],
				})
				break

			case 'monarch-lcs':
				presets.push({
					category: 'Commands',
					label: 'Start Both Encoder/Recorders',
					bank: {
						style: 'text',
						text: 'Start Both',
						size: '18',
						color: white,
						bgcolor: green,
					},
					actions: [{ action: 'StartBothEncoders' }],
				})

				presets.push({
					category: 'Commands',
					label: 'Stop Both Encoder/Recorders',
					bank: {
						style: 'text',
						text: 'Stop Both',
						size: '18',
						color: white,
						bgcolor: red,
					},
					actions: [{ action: 'StopBothEncoders' }],
				})

				presets.push({
					category: 'Commands',
					label: 'Set Dymamic Output',
					bank: {
						style: 'text',
						text: 'Hide A',
						size: '18',
						color: white,
					},
					actions: [
						{
							action: 'SetDynamicOutput',
							options: {
								SetDynamicOutputDropdown: 'HIDE_A',
							},
						},
					],
				})
				break
		}

		this.setPresetDefinitions(presets)
	},
}
