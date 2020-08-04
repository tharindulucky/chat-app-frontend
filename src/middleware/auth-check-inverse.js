import store from "../stores/store";

function isNotLoggedIn(to, from, next) {

    const token = localStorage.getItem('token');

    if(store.getters.IS_AUTHENTICATED || token != null){
        next("/");
    }else{
        next();
    }
}

export default {
    isNotLoggedIn:isNotLoggedIn
}