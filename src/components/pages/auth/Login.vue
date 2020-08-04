<template>
    <main class="login-form">
    <div class="cotainer">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <form method="POST">

                            <div class="form-group row">
                                <label for="email_address" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                <div class="col-md-6">
                                    <input type="text" id="email_address" v-model="email" class="form-control" name="email" required autofocus>
                                    <div v-if="displayAPIValidationErrors(validationErrors, 'email')" class="alert alert-danger field-alert" role="alert">
                                        {{displayAPIValidationErrors(validationErrors, 'email')}}
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                <div class="col-md-6">
                                    <input type="password" id="password" v-model="password" class="form-control" name="password" required>
                                    <div v-if="displayAPIValidationErrors(validationErrors, 'password')" class="alert alert-danger field-alert" role="alert">
                                        {{displayAPIValidationErrors(validationErrors, 'password')}}
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary" @click.prevent="login()">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
</template>

<script>
import {globalHelpers} from '../../../mixins/helpers';

export default {
    name: "Login",
    mixins: [globalHelpers],
    data: () => ({
        email: '',
        password: '',
        validationErrors:[],
    }),

    methods: {
        login(){
           this.$store.dispatch("LOGIN", {
               email: this.email,
               password: this.password
           }).then(result => {
               this.$alert(result.message, 'Success', 'success');
               this.$router.push("/");
           }).catch(error => {
               console.log("Error registering: "+error);
               if(error.response.data.message){
                   //To catch global errors
                    this.$alert(error.response.data.message, 'Invalid credentials!', 'error');
                    this.validationErrors = [];
               }else{
                   //To display form field errors
                   this.validationErrors = error.response.data.errors;
               }
           }); 
        }
    }
}
</script>