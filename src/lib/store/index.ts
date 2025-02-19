import { BaseStore } from '@freenit-framework/core'
import ConferenceStore from './conference.svelte'
import RoomStore from './room.svelte'

class Store extends BaseStore {
  conference: ConferenceStore
  room: RoomStore

  constructor(prefix='/api/v1') {
    super(prefix)
    this.conference = new ConferenceStore(prefix)
    this.room = new RoomStore(prefix)
  }
}

const store = new Store()
export default store
