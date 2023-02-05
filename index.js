const { InstanceBase, runEntrypoint } = require('@companion-module/base')

const configFields = require('./src/configFields')
const variables = require('./src/variables')
const polling = require('./src/polling')
const actions = require('./src/actions')
const presets = require('./src/presets')
const feedbacks = require('./src/feedbacks')

class MonarchInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
		// Assign the methods from the listed files to this class
		Object.assign(this, {
			...configFields,
			...variables,
			...polling,
			...actions,
			...presets,
			...feedbacks,
		})
	}
	async init(config) {
		this.updateStatus('connecting', 'Waiting for Config Confirmation')

		this.config = config

		// Update the config
		await this.configUpdated(config)
	}

	async configUpdated(config) {
		if (config) {
			this.config = config
		}

		// Quickly check if certain config values are present and continue setup
		if (this.config.host && this.config.device_type) {
			// Update the actions
			this.actions()

			// Update Variables
			this.updateVariableDefinitions()

			// Update Feedbacks
			this.updateFeedbacks()

			// Init the presets
			this.presets()

			// Start polling for settingvalues
			this.initPolling()

			// Set status to OK
			this.updateStatus('ok')
		}
	}

	async destroy() {
		// Cleanup polling
		if (this.pollingInterval) {
			clearInterval(this.pollingInterval)
		}

		this.log('debig', 'destroy', this.id)
	}
}

runEntrypoint(MonarchInstance, [])
