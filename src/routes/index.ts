import { Request, Response } from 'express'

import { getCommitHash, getPackage } from '#lib/utils.js'

export async function get(req: Request, res: Response) {
  const pkg = await getPackage()
  const hash = await getCommitHash()

  res.json({
    version: pkg.version,
    commit: hash
  })
}
