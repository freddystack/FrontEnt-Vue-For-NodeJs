<template>
  <div>
    <v-container class="mt-5">
      <v-layout justify-center>
        <v-flex xs12 sm12 md7 lg7 class="s">
          <v-form @submit.prevent="CreateUser" lazy-validation class="form"> 
            <v-text-field
              class="field"
              v-model="name"
              :error-messages="nameErrors"
              :counter="10"
              label="User Name"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>

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

            <v-text-field
              v-model="fname"
              :error-messages="firsnameErrors"
              :counter="10"
              label="Firs Name"
              required
              @input="$v.fname.$touch()"
              @blur="$v.fname.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="lname"
              :error-messages="lastnameErrors"
              :counter="10"
              label="Last Name"
              required
              @input="$v.lname.$touch()"
              @blur="$v.lname.$touch()"
            ></v-text-field>

            <v-text-field
              label="URL-Image"
              v-model="image"
              prepend-icon="mdi-camera"
            ></v-text-field>

            <v-btn  type="submit" @click="submit" color="teal darken-4" dark class="text-capitalize">
              {{textButton}}
            </v-btn>
            <v-layout>
              <div class="text-center ma-2">
              
                <v-snackbar v-model="snackbar">
                  {{ text }}

                  <template v-slot:action="{ attrs }">
                    <v-btn
                    class="btnSave"
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
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import { mapState,mapMutations, mapGetters, mapActions } from 'vuex'
import services from '../Services/ServiciosApi'

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(20) },
    fname: { required, maxLength: maxLength(10) },
    lname: { required, maxLength: maxLength(10) },
    password: { required, maxLength: maxLength(10) },
    email: { required, email },
  },

  name: "SignUp",
  data() {
    return {
    
      reqMensaje: "",
      isUpdated: false,
      textButton: '',
      snackbar: false,
      text: "",
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      name: "",
      fname: "",
      image: "",
      lname: "",
      email: "", /// METER EBN EL DATOS
      password: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match",
      },
      ObjecToUpdate : {},
      datos: {
       
        username: "",
        email: "",
        password: "",
        firsname: "",
        lastname: "",
        image: "",
      },
      datosUsuario: {},
    };
  },
  computed: {
    ...mapState(["HTTP_URL"]),

    //#region  Validacion
       firsnameErrors() {
      const errors = [];
      if (!this.$v.fname.$dirty) return errors;
      !this.$v.fname.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.fname.required && errors.push("Firs name is required.");
      return errors;
    },
    lastnameErrors() {
      const errors = [];
      if (!this.$v.lname.$dirty) return errors;
      !this.$v.lname.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.lname.required && errors.push("Firs name is required.");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("User name is required.");
      return errors;
    },
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
    //#endregion

    
  },
  created() {
    
   if(this.$route.params.id == 'onlysave' && this.$route.params.body == 'bodyvacio'){
       this.isUpdated = false
      
       this.textButton = 'Save'
   }else if(this.$route.params.id != 'onlysave' && this.$route.params.body != 'bodyvacio'){
       this.isUpdated = true;
       this.textButton = 'Update'
       this.ObjecToUpdate = this.$route.params.body
       this.name = this.ObjecToUpdate.username
       this.email = this.ObjecToUpdate.email
       this.fname = this.ObjecToUpdate.firsname
       this.lname = this.ObjecToUpdate.lastname
   } 
    
  },
  methods: {
      ...mapMutations(["IsLoged"]),


    submit() {
      this.$v.$touch();
    },

   async CreateUser() {
        if(this.isUpdated == false){
             
                this.datos.username = this.name;
                this.datos.email = this.email;
                this.datos.password = this.password;
                this.datos.firsname = this.fname;
                this.datos.lastname = this.lname;
                this.datos.image = this.image
                if(this.datos.image === ''){
                    var img = new Image()
                    this.datos.image = img.src = "../assets/img/perfilvacio.jpg"
                }
             try {
                  const RESPONSE =  await services.Createuser(this.datos)
                   localStorage.setItem('token', RESPONSE.data.token)
                   this.IsLoged()
               if(this.password  != "" && this.name != ""  && this.email){
                  this.$router.push('/listauser')
               } 
             
             } catch (error) {
               console.log(error)
             }
       
        }else{
           this.datos.username = this.name;
            this.datos.email = this.email;
            this.datos.password = this.password;
            this.datos.firsname = this.fname;
            this.datos.lastname = this.lname;
            this.datos.image = this.image
        
            if(this.image == "" || this.datos.image === ''){
                delete this.datos.image
            }
            if(this.datos.password == ""){
               delete this.datos.password
            }
           const IDTOUPDATE = this.$route.params.id
            try {
               const RESPONSE = await services.UpdateUser(this.datos, IDTOUPDATE)
                this.$router.push('/listauser')
            } catch (error) {
               console.log(error)
            }
        } 

         
    },

  },

};
</script>

