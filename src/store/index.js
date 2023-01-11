import { createStore } from 'vuex'
import notes from '@/datas/notes.json'

export default createStore({
  state: {
    notation: false,
    notes: notes.notes_diese
  },
  getters: {
  },
  actions: {
  },
  modules: {
  }
})
