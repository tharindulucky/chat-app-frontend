import store from "../stores/store";

function isNotLoggedIn(to, from, next) {

    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    if(store.getters.IS_AUTHENTICATED || token != null){
        if(tokenExpiration > new Date()){
            next("/");
        }else{
            next();
        }
    }else{
        next();
    }
}

export default {
    isNotLoggedIn:isNotLoggedIn
}