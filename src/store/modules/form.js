import axios from "axios"

export default {
    namespaced: true,
    state: {
        reference: null,
    },
    getters: {
        reference: state => {
            return state.reference
        }
    },
    mutations: {
        setReference(state, payload) {
            state.reference = payload
        }
    },
    actions: {
        async getReference({ commit }, payload) {
            const { freePositions, dueDate, amount, freeDigit, userId } = payload
            return axios
                .post(process.env.VUE_APP_BACKEND_URL + '/get/reference', {
                        freePositions,
                        dueDate,
                        amount,
                        freeDigit,
                        userId
                    })
                    .then(response => {
                        return response
                    })
        }
    }
}