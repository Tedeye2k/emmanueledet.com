import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {projectId: 'ojybom2y', dataset: 'production'},
  deployment: {autoUpdates: true},
})
