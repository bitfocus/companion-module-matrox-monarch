const { combineRgb } = require('@companion-module/base')
module.exports = {
	updateFeedbacks() {
		const white = combineRgb(255, 255, 255)
		const black = combineRgb(0, 0, 0)
		const red = combineRgb(220, 53, 69)
		const green = combineRgb(0, 204, 0)
		const orange = combineRgb(255, 102, 0)
		const blue = combineRgb(0, 0, 255)

		let feedbacks = {}

		let self = this;

		switch (this.config.device_type) {
			case 'monarch-hd':
			case 'nvs-30':
				feedbacks.recordState = {
					type: 'boolean',
					name: 'Record State',
					description: 'Indicate if Monarch is Recording',
					defaultStyle: {
						color: black,
						bgcolor: red,
					},
					options: [
						{
							type: 'dropdown',
							label: 'State',
							id: 'state',
							default: 'ON',
							choices: [
								{ id: 'ON', label: 'ON' },
								{ id: 'READY', label: 'READY' },
								{ id: 'DISABLED', label: 'DISABLED' },
							],
						},
					],
					callback: function (feedback) {
						let opt = feedback.options
						const currentValue = self.getVariableValue(`recorder_status`)
						return currentValue == opt.state
					},
				}

				feedbacks.streamState = {
					type: 'boolean',
					name: 'Stream State',
					description: 'Indicate if Monarch is Streaming',
					defaultStyle: {
						color: black,
						bgcolor: red,
					},
					options: [
						{
							type: 'dropdown',
							label: 'State',
							id: 'state',
							default: 'ON',
							choices: [
								{ id: 'ON', label: 'ON' },
								{ id: 'READY', label: 'READY' },
								{ id: 'DISABLED', label: 'DISABLED' },
							],
						},
					],
					callback: function (feedback) {
						let opt = feedback.options
						const currentValue = self.getVariableValue(`stream_status`)
						return currentValue == opt.state
					},
				}

				feedbacks.streamMode = {
					type: 'boolean',
					name: 'Stream Mode',
					description: 'Streaming Mode',
					defaultStyle: {
						color: black,
						bgcolor: red,
					},
					options: [
						{
							type: 'dropdown',
							label: 'State',
							id: 'state',
							default: 'RTSP',
							choices: [
								{ id: 'RTSP', label: 'RTSP' },
								{ id: 'RTMP', label: 'RTMP' },
								{ id: 'DISABLED', label: 'DISABLED' },
							],
						},
					],
					callback: function (feedback) {
						let opt = feedback.options
						const currentValue = self.getVariableValue(`stream_type`)
						return currentValue == opt.state
					},
				}
				break

			case 'monarch-lcs':
				feedbacks.fileTransferState = {
					type: 'boolean',
					name: 'File Transfer State',
					defaultStyle: {
						color: black,
						bgcolor: red,
					},
					options: [
						{
							type: 'dropdown',
							label: 'State',
							id: 'state',
							default: 'ON',
							choices: [
								{ id: 'ON', label: 'ON' },
								{ id: 'OFF', label: 'OFF' },
								{ id: 'READY', label: 'READY' },
								{ id: 'DISABLED', label: 'DISABLED' },
							],
						},
					],
					callback: function (feedback) {
						let opt = feedback.options
						const currentValue = self.getVariableValue(`filetranfser_state`)
						return currentValue == opt.state
					},
				}
				feedbacks.encoder1State = {
					type: 'boolean',
					name: 'Encoder 1 State',
					description: 'Indicate if Monarch Encoder 1 is Recording',
					defaultStyle: {
						color: black,
						bgcolor: red,
					},
					options: [
						{
							type: 'dropdown',
							label: 'State',
							id: 'state',
							default: 'ON',
							choices: [
								{ id: 'ON', label: 'ON' },
								{ id: 'OFF', label: 'OFF' },
								{ id: 'READY', label: 'READY' },
								{ id: 'DISABLED', label: 'DISABLED' },
							],
						},
					],
					callback: function (feedback) {
						let opt = feedback.options
						const currentValue = self.getVariableValue(`encoder_1_status`)
						return currentValue == opt.state
					},
				}

				feedbacks.encoder2State = {
					type: 'boolean',
					name: 'Encoder 2 State',
					description: 'Indicate if Monarch Encoder 2 is Recording',
					defaultStyle: {
						color: black,
						bgcolor: red,
					},
					options: [
						{
							type: 'dropdown',
							label: 'State',
							id: 'state',
							default: 'ON',
							choices: [
								{ id: 'ON', label: 'ON' },
								{ id: 'OFF', label: 'OFF' },
								{ id: 'READY', label: 'READY' },
								{ id: 'DISABLED', label: 'DISABLED' },
							],
						},
					],
					callback: function (feedback) {
						let opt = feedback.options
						const currentValue = self.getVariableValue(`encoder_2_status`)
						return currentValue == opt.state
					},
				}

				feedbacks.encoder1Mode = {
					type: 'boolean',
					name: 'Encoder 1 Mode',
					defaultStyle: {
						color: black,
						bgcolor: red,
					},
					options: [
						{
							type: 'dropdown',
							label: 'State',
							id: 'state',
							default: 'RTSP',
							choices: [
								{ id: 'RTSP', label: 'RTSP' },
								{ id: 'RTMP', label: 'RTMP' },
								{ id: 'RECORD', label: 'RECORD' },
								{ id: 'NONE', label: 'NONE' },
							],
						},
					],
					callback: function (feedback) {
						let opt = feedback.options
						const currentValue = self.getVariableValue(`encoder_1_type`)
						return currentValue == opt.state
					},
				}

				feedbacks.encoder2Mode = {
					type: 'boolean',
					name: 'Encoder 2 Mode',
					defaultStyle: {
						color: black,
						bgcolor: red,
					},
					options: [
						{
							type: 'dropdown',
							label: 'State',
							id: 'state',
							default: 'RTSP',
							choices: [
								{ id: 'RTSP', label: 'RTSP' },
								{ id: 'RTMP', label: 'RTMP' },
								{ id: 'RECORD', label: 'RECORD' },
								{ id: 'NONE', label: 'NONE' },
							],
						},
					],
					callback: function (feedback) {
						let opt = feedback.options
						const currentValue = self.getVariableValue(`encoder_2_type`)
						return currentValue == opt.state
					},
				}
				break
			case 'monarch-hdx':
				feedbacks.encoder1State = {
					type: 'boolean',
					name: 'Encoder 1 State',
					description: 'Indicate if Monarch Encoder 1 is Recording',
					defaultStyle: {
						color: black,
						bgcolor: red,
					},
					options: [
						{
							type: 'dropdown',
							label: 'State',
							id: 'state',
							default: 'ON',
							choices: [
								{ id: 'ON', label: 'ON' },
								{ id: 'READY', label: 'READY' },
								{ id: 'DISABLED', label: 'DISABLED' },
							],
						},
					],
					callback: function (feedback) {
						let opt = feedback.options
						const currentValue = self.getVariableValue(`encoder_1_status`)
						return currentValue == opt.state
					},
				}

				feedbacks.encoder2State = {
					type: 'boolean',
					name: 'Encoder 2 State',
					description: 'Indicate if Monarch Encoder 2 is Recording',
					defaultStyle: {
						color: black,
						bgcolor: red,
					},
					options: [
						{
							type: 'dropdown',
							label: 'State',
							id: 'state',
							default: 'ON',
							choices: [
								{ id: 'ON', label: 'ON' },
								{ id: 'READY', label: 'READY' },
								{ id: 'DISABLED', label: 'DISABLED' },
							],
						},
					],
					callback: function (feedback) {
						let opt = feedback.options
						const currentValue = self.getVariableValue(`encoder_2_status`)
						return currentValue == opt.state
					},
				}

				feedbacks.encoder1Mode = {
					type: 'boolean',
					name: 'Encoder 1 Mode',
					defaultStyle: {
						color: black,
						bgcolor: red,
					},
					options: [
						{
							type: 'dropdown',
							label: 'State',
							id: 'state',
							default: 'RTSP',
							choices: [
								{ id: 'RTSP', label: 'RTSP' },
								{ id: 'RTMP', label: 'RTMP' },
								{ id: 'RECORD', label: 'RECORD' },
								{ id: 'NONE', label: 'NONE' },
							],
						},
					],
					callback: function (feedback) {
						let opt = feedback.options
						const currentValue = self.getVariableValue(`encoder_1_type`)
						return currentValue == opt.state
					},
				}

				feedbacks.encoder2Mode = {
					type: 'boolean',
					name: 'Encoder 2 Mode',
					defaultStyle: {
						color: black,
						bgcolor: red,
					},
					options: [
						{
							type: 'dropdown',
							label: 'State',
							id: 'state',
							default: 'RTSP',
							choices: [
								{ id: 'RTSP', label: 'RTSP' },
								{ id: 'RTMP', label: 'RTMP' },
								{ id: 'RECORD', label: 'RECORD' },
								{ id: 'NONE', label: 'NONE' },
							],
						},
					],
					callback: function (feedback) {
						let opt = feedback.options
						const currentValue = self.getVariableValue(`encoder_2_type`)
						return currentValue == opt.state
					},
				}
		}

		this.setFeedbackDefinitions(feedbacks)
	},
}
