import store from "../stores/store";


function isLoggedIn(to, from, next) {

    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const userData = localStorage.getItem('user');

    if(store.getters.IS_AUTHENTICATED || token != null){
        if(tokenExpiration != null && tokenExpiration > new Date()){
            next();
            console.log("Auth check Passed");
            store.commit("SET_TOKEN",token);
            store.commit("SET_USERDATA", JSON.parse(userData));
        }
    }else{
        next('/login');
    }
}

export default {
    isLoggedIn:isLoggedIn
}