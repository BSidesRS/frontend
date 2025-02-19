import { methods } from '@freenit-framework/core'
import store from '.'

export default class RoomStore {
  list = $state({ page: 0, perpage: 0, pages: 0, data: [], total: 0 })
  detail = $state({ id: 0, name: '' })

  constructor(prefix) {
    this.prefix = prefix
  }

  fetchAll = async (conference: string, page: Number = 1, perpage: Number = 10) => {
    await store.auth.refresh_token()
    const response = await methods.get(`${this.prefix}/${conference}/rooms`, { page, perpage })
    if (response.ok) {
      const data = await response.json()
      this.list = data
      return { ...data, ok: true }
    }
    return response
  }

  create = async (conference: string, fields: Record<string, any>) => {
    await store.auth.refresh_token()
    const response = await methods.post(`${this.prefix}/${conference}/rooms`, fields)
    if (response.ok) {
      const data = await response.json()
      this.list.data.push(data)
      return { ...data, ok: true }
    }
    return response
  }

  fetch = async (id: Number) => {
    await store.auth.refresh_token()
    const response = await methods.get(`${this.prefix}/rooms/${id}`)
    if (response.ok) {
      const data = await response.json()
      this.detail = data
      return { ...data, ok: true }
    }
    return response
  }

  edit = async (id: Number, fields: Record<string, any>) => {
    await store.auth.refresh_token()
    const response = await methods.patch(`${this.prefix}/rooms/${id}`, fields)
    if (response.ok) {
      const data = await response.json()
      this.detail = data
      return { ...data, ok: true }
    }
    return response
  }

  destroy = async (id: Number) => {
    await store.auth.refresh_token()
    const response = await methods.delete(`${this.prefix}/rooms/${id}`)
    if (response.ok) {
      const data = await response.json()
      return { ...data, ok: true }
    }
    return response
  }
}
