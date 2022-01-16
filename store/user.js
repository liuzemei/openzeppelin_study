export const state = () => ({
  user_id: "user_id_test"
})

export const mutations = {
  updateUserID(state, payload) {
    state.user_id = payload
  }
}

export const actions = {
  async updateUserIDAction({ commit }, payload) {
    commit("updateUserID", payload)
  }
}