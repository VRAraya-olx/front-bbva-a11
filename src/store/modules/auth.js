import axios from "axios"

export default {
    namespaced: true,
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        async forgot({ commit }, payload) {
            const { email } = payload
            return axios
                .post(process.env.VUE_APP_BACKEND_URL + '/auth/forgot', {
                        email
                    })
                    .then(response => {
                        return response
                    })
        },
        async change({ commit }, payload) {
            const { token, newPassword } = payload
            return axios
                .post(process.env.VUE_APP_BACKEND_URL + '/auth/change-password', {
                    token,
                    newPassword
                })
                .then(response => {
                    return response
                })
        }
    }
}