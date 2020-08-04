<template>
<main class="login-form">
    <div class="cotainer">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Register</div>
                    <div class="card-body">
                        <form>

                            <div class="form-group row">
                                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                                <div class="col-md-6">
                                    <input type="text" v-model="name" id="name" class="form-control" name="name" required autofocus>
                                    <div v-if="displayAPIValidationErrors(validationErrors, 'name')" class="alert alert-danger field-alert" role="alert">
                                        {{displayAPIValidationErrors(validationErrors, 'name')}}
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="email_address" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                <div class="col-md-6">
                                    <input type="text" v-model="email" id="email_address" class="form-control" name="email-address" required autofocus>
                                    <div v-if="displayAPIValidationErrors(validationErrors, 'email')" class="alert alert-danger field-alert" role="alert">
                                        {{displayAPIValidationErrors(validationErrors, 'email')}}
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                <div class="col-md-6">
                                    <input type="password" v-model="password" id="password" class="form-control" name="password" required>
                                    <div v-if="displayAPIValidationErrors(validationErrors, 'password')" class="alert alert-danger field-alert" role="alert">
                                        {{displayAPIValidationErrors(validationErrors, 'password')}}
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary" @click.prevent="register()">
                                    Register
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

<style scoped>

</style>

<script>
import {globalHelpers} from '../../../mixins/helpers';

export default {
    name: "Register",
    mixins: [globalHelpers],
    data: () => ({
        name: '',
        email: '',
        password: '',
        validationErrors:[],
    }),

    methods: {
        register(){
           this.$store.dispatch("REGISTER", {
               name: this.name,
               email: this.email,
               password: this.password
           }).then(result => {
               this.$alert(result.message, 'Success', 'success');
               this.$router.push("/login");
           }).catch(error => {
               console.log("Error registering: "+error);
               if(error.response.data.message){
                   //To catch global errors
                    this.$alert(error.response.data.message, 'Something went wrong!', 'error');
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