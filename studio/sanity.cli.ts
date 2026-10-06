import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // The admin panel address: https://mytripworld.sanity.studio
  studioHost: 'mytripworld',
  deployment: {autoUpdates: true, appId: 's9j5rhshroaodinddut080yi'},
})
