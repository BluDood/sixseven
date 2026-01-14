import axios from 'axios'
import { API_URL } from './constants.ts'

export interface APIInfo {
  version: string
  commit: string
}

export async function getInfo() {
  const res = await axios
    .get(`${API_URL}`, {
      validateStatus: () => true
    })
    .catch(() => null)

  if (!res || res.status !== 200) return null

  return res.data as APIInfo
}

export async function getHowLong() {
  const res = await axios
    .get(`${API_URL}/sixseven`, {
      validateStatus: () => true
    })
    .catch(() => null)

  if (!res || res.status !== 200) return null

  return res.data.forHowLong
}
