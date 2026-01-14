import express, {
  Application,
  NextFunction,
  Request,
  Response
} from 'express'

import { router } from 'express-file-routing'
import path from 'path'
import cors from 'cors'

import { logger } from '#lib/utils.js'

export async function setupMiddlewares(app: Application) {
  app.use(express.json())
  app.use(cors())

  app.use(
    '/api',
    await router({
      directory: path.join(process.cwd(), 'dist/routes')
    })
  )

  app.use(express.static(path.join(process.cwd(), 'web/build')))

  app.use((req: Request, res: Response) => {
    res.status(404).send()
  })

  app.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: Error, req: Request, res: Response, next: NextFunction) => {
      logger.error(`Error: ${err.message}`, 'Express')
      res.status(500).send()
    }
  )
}
