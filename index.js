const InstanceSkel = require('../../instance_skel')
const configFields = require('./src/configFields')
const variables = require('./src/variables')
const polling = require('./src/polling')
const actions = require('./src/actions')

class MonarchInstance extends InstanceSkel {
	constructor(system, id, config) {
		super(system, id, config)

		this.config = config
		this.pollingInterval = undefined

		// Assign the methods from the listed files to this class
		Object.assign(this, {
			...configFields,
			...variables,
			...polling,
			...actions,
		})
	}

	init() {
		this.status(this.STATUS_UNKNOWN)

		// Update the config
		this.updateConfig()
	}

	updateConfig(config) {
		if (config) {
			this.config = config
		}

		// Quickly check if certain config values are present and continue setup
		if (this.config.host && this.config.device_type) {
			// Update the actions
			this.actions()

			// Update Variables
			this.updateVariableDefinitions()

			// Start polling for settingvalues
			this.initPolling()

			// Set status to OK
			this.status(this.STATUS_OK)
		}
	}

	destroy() {
		this.debug('destroy', this.id)
	}
}

module.exports = MonarchInstance
