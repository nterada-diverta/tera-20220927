export const state = () => ({
    profile: null
})

export const getters = {
    authenticated (state) {
        return state.profile !== null
        },
        updateLocalStorage (state, payload) {
            Object.entries(payload).forEach(([key, val]) => {
                localStorage.setItem(key, val)
            })
        }
}

export const mutations = {
    setProfile (state, { profile }) {
        state.profile = profile
    }
}
export const actions = {
    async login ({ commit }, payload) {
        await this.$axios.$post('/rcms-api/6/login', payload)

        const profileRes = await this.$axios.$get('/rcms-api/6/profile')
        commit('setProfile', { profile: profileRes.data })
        commit('updateLocalStorage', { authenticated: true })
    },
        async logout ({ commit }) {
            try {
                await this.$axios.$post('/rcms-api/9/logout')
            } catch {
                /** No Process */
                /** エラーが返却されてきた場合は、結果的にログアウトできているものとみなし、これを無視します。 */
            }
            commit('setProfile', { profile: null })
            commit('updateLocalStorage', { authenticated: false })
            
            this.$router.push('/login')
        },
        async restoreLoginState ({ commit, dispatch }) {
        const authenticated = JSON.parse(localStorage.getItem('authenticated'))

        if (!authenticated) {
            await dispatch('logout')
            throw new Error('need to login')
        }
        try {
            const profileRes = await this.$axios.$get('/rcms-api/9/profile')
            commit('setProfile', { profile: profileRes.data })
        } catch {
            await dispatch('logout')
            throw new Error('need to login')
        }
    }
}
    