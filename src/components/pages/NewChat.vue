<template>
    <main class="login-form">
    <div class="cotainer">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Add new contact...</div>
                      <div class="card-body">
                        <div class="row">
                          <div class="col-md-12">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address of the contact!</label>
                                    <input type="email" class="form-control" v-model="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                                    <div v-if="displayAPIValidationErrors(validationErrors, 'email')" class="alert alert-danger field-alert" role="alert">
                                        {{displayAPIValidationErrors(validationErrors, 'email')}}
                                    </div>
                                    <br>
                                    <button type="submit" @click="createSession()" class="btn btn-primary">Submit</button>
                                    <br><br>
                                     <router-link :to="'/'" class="btn btn-default" role="button">Cancel</router-link>
                                </div>
                          </div>
                        </div>
                      </div>
                </div>
            </div>
        </div>
    </div>
</main>
</template>

<script>
import {globalHelpers} from '../../mixins/helpers';

export default {
    name: "NewChat",
    mixins: [globalHelpers],
    data: () => ({
        email:[],
        validationErrors: []
    }),
    methods:{
        createSession(){
            this.$store.dispatch("CREATE_SESSION", {
                email: this.email
            }).then(result => {
                this.$alert(result.data.message, 'Success', 'success');
                this.$router.push("/");
            }).catch(error => {
                console.log(error.response);
                if(error.response.data.message){
                   //To catch global errors
                    this.$alert(error.response.data.message, 'User not found!', 'error');
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