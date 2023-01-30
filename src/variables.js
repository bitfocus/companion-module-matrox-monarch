module.exports = {
	updateVariableDefinitions() {
		switch (this.config.device_type) {
			case 'monarch-hd':
			case 'nvs-30':
				this.setVariableDefinitions([
					{
						name: `Recorder Status`,
						variableId: `recorder_status`,
					},
					{
						name: `Stream Type`,
						variableId: `stream_type`,
					},
					{
						name: `Stream Status`,
						variableId: `stream_status`,
					},
					{
						name: `Device Name`,
						variableId: `name`,
					},
				])
				break

			case 'monarch-hdx':
				this.setVariableDefinitions([
					{
						name: `Encoder 1 Type`,
						variableId: `encoder_1_type`,
					},
					{
						name: `Encoder 1 Status`,
						variableId: `encoder_1_status`,
					},
					{
						name: `Encoder 2 Type`,
						variableId: `encoder_2_type`,
					},
					{
						name: `Encoder 2 Status`,
						variableId: `encoder_2_status`,
					},
					{
						name: `Device Name`,
						variableId: `name`,
					},
				])
				break

			case 'monarch-lcs':
				this.setVariableDefinitions([
					{
						name: `Encoder 1 Type`,
						variableId: `encoder_1_type`,
					},
					{
						name: `Encoder 1 Status`,
						variableId: `encoder_1_status`,
					},
					{
						name: `Encoder 2 Type`,
						variableId: `encoder_2_type`,
					},
					{
						name: `Encoder 2 Status`,
						variableId: `encoder_2_status`,
					},
					{
						name: `Filetransfer State`,
						variableId: `filetranfser_state`,
					},
					{
						name: `Device Name`,
						variableId: `name`,
					},
				])
		}
	},
}
