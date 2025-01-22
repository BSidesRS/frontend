import { methods } from '@freenit-framework/core'
import store from '.'

export default class ConferenceStore {
  list = $state({ page: 0, perpage: 0, data: [], total: 0 })
  detail = $state({})

  constructor(prefix) {
    this.prefix = prefix
  }

  fetchAll = async (page: Number = 1, perpage: Number = 10) => {
    await store.auth.refresh_token()
    const response = await methods.get(`${this.prefix}/conferences`, { page, perpage })
    if (response.ok) {
      const data = await response.json()
      this.list = data
      return { ...data, ok: true }
    }
    return response
  }

  create = async (fields: Record<string, any>) => {
    await store.auth.refresh_token()
    const response = await methods.post(`${this.prefix}/conferences`, fields)
    if (response.ok) {
      const data = await response.json()
      this.list = data
      return { ...data, ok: true }
    }
    return response
  }

  fetch = async (id: Number) => {
    await store.auth.refresh_token()
    const response = await methods.get(`${this.prefix}/conferences/${id}`)
    if (response.ok) {
      const data = await response.json()
      this.detail = data
      return { ...data, ok: true }
    }
    return response
  }

  edit = async (id: Number, fields: Record<string, any>) => {
    await store.auth.refresh_token()
    const response = await methods.patch(`${this.prefix}/conferences/${id}`, fields)
    if (response.ok) {
      const data = await response.json()
      this.detail = data
      return { ...data, ok: true }
    }
    return response
  }

  destroy = async (id: Number) => {
    await store.auth.refresh_token()
    const response = await methods.delete(`${this.prefix}/conferences/${id}`)
    if (response.ok) {
      const data = await response.json()
      return { ...data, ok: true }
    }
    return response
  }
}
