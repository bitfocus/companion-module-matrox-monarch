module.exports = {
	updateVariableDefinitions() {
		switch (this.config.device_type) {
			case 'monarch-hd':
			case 'nvs-30':
				this.setVariableDefinitions([
					{
						label: `Recorder Status`,
						name: `recorder_status`,
					},
					{
						label: `Stream Type`,
						name: `stream_type`,
					},
					{
						label: `Stream Status`,
						name: `stream_status`,
					},
					{
						label: `Device Name`,
						name: `name`,
					},
				])
				break

			case 'monarch-hdx':
				this.setVariableDefinitions([
					{
						label: `Encoder 1 Type`,
						name: `encoder_1_type`,
					},
					{
						label: `Encoder 1 Status`,
						name: `encoder_1_status`,
					},
					{
						label: `Encoder 2 Type`,
						name: `encoder_2_type`,
					},
					{
						label: `Encoder 2 Status`,
						name: `encoder_2_status`,
					},
					{
						label: `Device Name`,
						name: `name`,
					},
				])
				break

			case 'monarch-lcs':
				this.setVariableDefinitions([
					{
						label: `Encoder 1 Type`,
						name: `encoder_1_type`,
					},
					{
						label: `Encoder 1 Status`,
						name: `encoder_1_status`,
					},
					{
						label: `Encoder 2 Type`,
						name: `encoder_2_type`,
					},
					{
						label: `Encoder 2 Status`,
						name: `encoder_2_status`,
					},
					{
						label: `Filetransfer State`,
						name: `filetranfser_state`,
					},
					{
						label: `Device Name`,
						name: `name`,
					},
				])
		}
	},
}
