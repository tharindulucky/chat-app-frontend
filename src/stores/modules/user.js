import axios from 'axios';

export default {
    state: {
        token: null,
        user: {},
        sessions:[]
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_USERDATA: (state, user) => {
            state.user = user;
        },
        SET_SESSIONS: (state, sessions) => {
            state.sessions = sessions;
        },
    },
    getters: {
        GET_TOKEN: state => {
            return state.token;
        },
        GET_USERDATA: state => {
            return state.user;
        },
        GET_SESSIONS: state => {
            return state.sessions;
        },
        IS_AUTHENTICATED: state => {
            return state.token != null;
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
                    if(response.status == 200){
                        context.commit("SET_TOKEN", response.data.token);
                        context.commit("SET_USERDATA", response.data.user);

                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("tokenExpiration", new Date().getTime() + 3600 * 1000);
                        localStorage.setItem("user",JSON.stringify(response.data.user) );
                        resolve(response);
                    }
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            })
        },

        GET_SESSIONS: (context) => {

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': "Bearer "+context.getters.GET_TOKEN
              };

            return new Promise((resolve, reject) => {
                axios.get('/sessions', {headers: headers}).then(response => {
                    if(response.status == 200){
                        context.commit("SET_SESSIONS", response.data.sessions);
                        resolve(response);
                    }
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
        },

        CREATE_SESSION: (context, payload) => {

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': "Bearer "+context.getters.GET_TOKEN
              };

            return new Promise((resolve, reject) => {
                axios.post("/sessions/create", payload, {headers: headers}).then((response) => {
                    if(response.status == 200 || response.status == 201){
                        resolve(response);
                    }else{
                        reject(response);
                    }
                }).catch(error => {
                    reject(error);
                });
            });
        },

        SEND_MESSAGE: (context, payload) => {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': "Bearer "+context.getters.GET_TOKEN
              };

            return new Promise((resolve, reject) => {
                axios.post('/messages/send', payload, {headers: headers}).then(response => {
                    if(response.status == 201){
                        resolve(response);
                    }else{
                        reject(response);
                    }
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
        },

        GET_MESSAGES: (context, sessionId) => {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': "Bearer "+context.getters.GET_TOKEN
              };

            return new Promise((resolve, reject) => {
                axios.get('/sessions/'+sessionId, {headers: headers}).then(response => {
                    if(response.status == 200){
                        resolve(response);
                    }else{
                        reject(response);
                    }
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
        },

        LOGOUT: (context) => {
            return new Promise((resolve) => {
                context.commit("SET_TOKEN", null);
                context.commit("SET_USERDATA", null);
                localStorage.removeItem("token");
                localStorage.removeItem("tokenExpiration");
                localStorage.removeItem("user");
                resolve("State and Local storage cleared");
            });
        }
    }
}