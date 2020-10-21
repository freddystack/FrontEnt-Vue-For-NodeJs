<template>
  <div>
    <v-container>
      <v-layout justify-center align-center class="mt-15">
        <v-flex xs12 md5 class="borde">
         <v-form @submit.prevent="SendData">
             <v-text-field
             v-model="email"
              :error-messages="emailErrors"
              label="E-mail"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            :error-messages="passwordErrors"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
           <v-layout  justify-space-between align-center class="ta">
              <v-btn @click="submit" type="submit" color="teal darken-4" dark class="text-capitalize">Enter</v-btn>
              <router-link :to="{
                    name: 'signup',
                    params: { id: 'onlysave', body: 'bodyvacio' },
                  }" class="text-decoration-none"><v-btn text small color="primary" class="text-capitalize">SignUp</v-btn></router-link>
           </v-layout>
         </v-form>
        </v-flex>
      </v-layout>
         <v-layout>
              <div class="text-center ma-2">
              
                <v-snackbar v-model="snackbar">
                  {{ text }}

                  <template v-slot:action="{ attrs }">
                    <v-btn
                      color="pink"
                      text
                      v-bind="attrs"
                      @click="snackbar = false"
                    >
                      Close
                    </v-btn>
                  </template>
                </v-snackbar>
              </div>
            </v-layout>
    </v-container>
  </div>
</template>

<script>


import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import { mapState,mapMutations, mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import services from '../Services/ServiciosApi'

export default {
   mixins: [validationMixin],

     validations: {
        password: { required, maxLength: maxLength(10) },
        email: { required, email },
     },
  name: "SignIn",
  data() {
      return {
         snackbar: false,
      text: "",
         show1: false,
      show2: true,
      show3: false,
      show4: false,
      password: "",
      email:"",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match",
      }, 
      config:{
         headers:{
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
         }
      },
      Datos:{
        email: "",
        password: ""
      }
      }
  },
  computed:{
     ...mapState(["HTTP_URL","IsLogg"]),
       emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
   passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength && errors.push("the password must have a capital letter, numbers and symbols");
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    }, 
  },
  methods:{

    ...mapMutations(["IsLoged"]),

      submit() {
      this.$v.$touch();
    },

   async SendData(){
        this.Datos.email = this.email
        this.Datos.password = this.password
           try {
              await services.SignIn(this.Datos)
              .then((response) =>{
                 localStorage.setItem('token', response.data.token)
                  this.$router.push('/listauser');
                  this.IsLoged() 
              })
           } catch (error) {
               switch (error.response.status) {
                 case 400:
                      this.text = 'La contraseña no coincide'
                      this.snackbar = true
                   break;
                 case 401:  
                        this.text = 'Este correo no existe'
                        this.snackbar = true
                      break;
                 default:
                   break;
               } 
           }
    }
  }
};
</script>



<style>
.borde{
   border: 1px solid black; 
   padding: 10px;
   border-radius: 6px;
} 
.ta{
    width: 100%;
}
</style>
