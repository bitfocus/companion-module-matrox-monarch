const { combineRgb } = require('@companion-module/base')

module.exports = {
	presets() {
		const presets = []

		const white = combineRgb(255, 255, 255)
		const green = combineRgb(42, 167, 69)
		const red = combineRgb(220, 53, 69)

		switch (this.config.device_type) {
			case 'monarch-hd':
			case 'nvs-30':
				presets.startStream = {
					type: 'button',
					feedbacks: [],
					category: 'Commands',
					name: 'Start Streaming',
					style: {
						text: 'Start Stream',
						size: '18',
						color: white,
						bgcolor: green,
					},
					steps: [
						{
							down: [{ actionId: 'StartStreaming' }],
							up: [],
						},
					],
				}

				presets.stopStream = {
					type: 'button',
					feedbacks: [],
					category: 'Commands',
					name: 'Stop Streaming',
					style: {
						text: 'Stop Stream',
						size: '18',
						color: white,
						bgcolor: red,
					},
					steps: [
						{
							down: [{ actionId: 'StopStreaming' }],
							up: [],
						},
					],
				}

				presets.startRecord = {
					type: 'button',
					feedbacks: [],
					category: 'Commands',
					name: 'Start Recording',
					style: {
						text: 'Start Recording',
						size: '18',
						color: white,
						bgcolor: green,
					},
					steps: [
						{
							down: [{ actionId: 'StartRecording' }],
							up: [],
						},
					],
				}

				presets.stopRecord = {
					type: 'button',
					feedbacks: [],
					category: 'Commands',
					name: 'Stop Recording',
					style: {
						text: 'Stop Recording',
						size: '18',
						color: white,
						bgcolor: red,
					},
					steps: [
						{
							down: [{ actionId: 'StopRecording' }],
							up: [],
						},
					],
				}
				break

			case 'monarch-hdx':
				presets.startEncoder1 = {
					type: 'button',
					feedbacks: [],
					category: 'Commands',
					name: 'Start Encoder/Recorder 1',
					style: {
						text: 'Start Enc 1',
						size: '18',
						color: white,
						bgcolor: green,
					},
					steps: [
						{
							down: [{ actionId: 'StartEncoder1' }],
							up: [],
						},
					],
				}

				presets.startEncoder2 = {
					type: 'button',
					feedbacks: [],
					category: 'Commands',
					name: 'Start Encoder/Recorder 2',
					style: {
						text: 'Start Enc 2',
						size: '18',
						color: white,
						bgcolor: green,
					},
					steps: [
						{
							down: [{ actionId: 'StartEncoder2' }],
							up: [],
						},
					],
				}

				presets.startBothEncoders = {
					type: 'button',
					feedbacks: [],
					category: 'Commands',
					name: 'Start Both Encoder/Recorders',
					style: {
						text: 'Start Both',
						size: '18',
						color: white,
						bgcolor: green,
					},
					steps: [
						{
							down: [{ actionId: 'StartBothEncoders' }],
							up: [],
						},
					],
				}

				presets.stopEncoder1 = {
					type: 'button',
					feedbacks: [],
					category: 'Commands',
					name: 'Stop Encoder/Recorder 1',
					style: {
						text: 'Stop Enc 1',
						size: '18',
						color: white,
						bgcolor: red,
					},
					steps: [
						{
							down: [{ actionId: 'StopEncoder1' }],
							up: [],
						},
					],
				}

				presets.stopEncoder2 = {
					type: 'button',
					feedbacks: [],
					category: 'Commands',
					name: 'Stop Encoder/Recorder 2',
					style: {
						text: 'Stop Enc 2',
						size: '18',
						color: white,
						bgcolor: red,
					},
					steps: [
						{
							down: [{ actionId: 'StopEncoder2' }],
							up: [],
						},
					],
				}

				presets.stopBothEncoder = {
					type: 'button',
					feedbacks: [],
					category: 'Commands',
					name: 'Stop Both Encoder/Recorders',
					style: {
						text: 'Stop Both',
						size: '18',
						color: white,
						bgcolor: red,
					},
					steps: [
						{
							down: [{ actionId: 'StopBothEncoders' }],
							up: [],
						},
					],
				}
				break

			case 'monarch-lcs':
				presets.startBothEncoders = {
					type: 'button',
					feedbacks: [],
					category: 'Commands',
					name: 'Start Both Encoder/Recorders',
					style: {
						text: 'Start Both',
						size: '18',
						color: white,
						bgcolor: green,
					},
					steps: [
						{
							down: [{ actionId: 'StartBothEncoders' }],
							up: [],
						},
					],
				}

				presets.stopBothEncoder = {
					type: 'button',
					feedbacks: [],
					category: 'Commands',
					name: 'Stop Both Encoder/Recorders',
					style: {
						text: 'Stop Both',
						size: '18',
						color: white,
						bgcolor: red,
					},
					steps: [
						{
							down: [{ actionId: 'StopBothEncoders' }],
							up: [],
						},
					],
				}

				presets.setDynamicOutput = {
					type: 'button',
					feedbacks: [],
					category: 'Commands',
					name: 'Set Dymamic Output',
					style: {
						text: 'Hide A',
						size: '18',
						color: white,
					},
					steps: [
						{
							down: [
								{
									actionId: 'SetDynamicOutput',
									options: {
										SetDynamicOutputDropdown: 'HIDE_A',
									},
								},
							],
							up: [],
						},
					],
				}
				break
		}

		this.setPresetDefinitions(presets)
	},
}
