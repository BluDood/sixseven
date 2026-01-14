import { browser } from '$app/environment'

export const BASE = browser
  ? location.port !== ''
    ? `${location.hostname}:1337`
    : location.host
  : null

export const API_URL = browser ? `${location.protocol}//${BASE}/api` : null
