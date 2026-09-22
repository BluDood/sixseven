import { loadEnvFile } from 'node:process'
try {
  loadEnvFile('.env')
} catch {}

import express from 'express'

import { getPackage, logger } from '#lib/utils.js'
import { setupMiddlewares } from '#lib/middlewares.js'

const app = express()
setupMiddlewares(app)

process.on('SIGTERM', () => process.exit(0))

const PORT = process.env.PORT || 1337
app.listen(PORT, async () => {
  const pkg = getPackage()

  logger.info(`SixSeven ${pkg.version} running on port ${PORT}`)
})
