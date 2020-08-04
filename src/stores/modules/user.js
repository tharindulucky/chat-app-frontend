import axios from 'axios';

export default {
    state: {
        token: '',
        user: {}
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_USERDATA: (state, user) => {
            state.user = user;
        }
    },
    getters: {
        TOKEN: state => {
            return state.token;
        },
        USERDATA: state => {
            return state.user;
        }
    },
    actions: {
        REGISTER: (context, payload) => {
            return new Promise((resolve, reject) => {
                axios.post('/users/signup', payload).then((response) => {
                    if(response.status == 201){
                        resolve(response);
                    }
                }).catch(error => {
                    reject(error);
                });
            });
        },


        LOGIN: (context, payload) => {
            return new Promise((resolve, reject) => {
                axios.post('/users/login', payload).then(response => {
                    context.commit("SET_TOKEN", response.token);
                    //context.commit("SET_USERDATA", response.user);
                    resolve(response)
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            })
        }
    }
}