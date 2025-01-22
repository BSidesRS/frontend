import { BaseStore } from '@freenit-framework/core'
import ConferenceStore from './conference.svelte'

class Store extends BaseStore {
  conference: ConferenceStore

  constructor(prefix='/api/v1') {
    super(prefix)
    this.conference = new ConferenceStore(prefix)
  }
}

const store = new Store()
export default store
