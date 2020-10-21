<template>
  <v-container class="mt-5">
    <v-layout row>
      <v-flex column md7>
        <v-flex row justify-space-around class="pl-3 pb-5 pl-sm-8 pl-md-3 perfil">
          <img
            v-if="datauser.image != '../assets/img/perfilvacio.jpg'"
            class="ima"
            :src="datauser.image"
            alt=""
          />
          <img
            v-else-if="datauser.image == '../assets/img/perfilvacio.jpg'"
            class="ima"
            src="../assets/img/perfilvacio.jpg"
            alt=""
          />

          <v-layout column class="ml-7 data">
            <v-flex row>
              <span class="inf"> <p class="mr-1">User Name:</p></span>
              {{ datauser.username }}
            </v-flex>
            <v-flex row>
              <span class="inf"> <p class="mr-1 ">Email:</p></span>
              {{ datauser.email }}
            </v-flex>
            <v-flex row>
              <span class="inf"> <p class="mr-1">Firs Name:</p></span>
              {{ datauser.firsname }}
            </v-flex>
            <v-flex row>
              <span class="inf"> <p class="mr-1">Last Name:</p></span>
              {{ datauser.lastname }}
            </v-flex>
            <v-flex row>
              <span class="inf"> <p class="mr-1">Created User:</p></span>
              {{ datauser.createatt | moment(" MMMM Do YYYY") }}
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex md11 class="Settin d-flex justify-sm-center justify-center">
          <v-card class="card">
            <v-card-title>
              <v-layout row justify-center>
                <span>
                  <v-icon color="teal darken-4">mdi-cog-outline</v-icon>
                </span>
                Settings And Info
              </v-layout>
            </v-card-title>
            <v-card-text>
              <v-layout row justify-center>
                <v-flex row justify-space-around>
                  <router-link
                    class="text-decoration-none"
                    :to="{
                      name: 'signup',
                      params: {
                        id: this.$route.params.id,
                        body: this.$route.params.body,
                      },
                    }"
                  >
                    <v-btn text small class="text-capitalize bt">
                      Update My Acount
                      <v-icon color="light-blue darken-4"
                        >mdi-account-edit</v-icon
                      >
                    </v-btn></router-link
                  >
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-text>
              <v-layout row justify-center>
                <v-flex row justify-space-around>
                  <v-btn
                    text
                    small
                    @click="ModalDelete"
                    class="text-capitalize"
                  >
                    Delete My Acount
                    <v-icon color="red accent-4">mdi-account-remove</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-text>
              <v-layout row>
                <v-flex>
                  <p class="text-end font-weight-bold">
                    My Post
                  </p>
                </v-flex>

                <v-flex>
                  <v-btn icon @click="show = !show" class="pb-4">
                    <v-icon>{{
                      show ? "mdi-chevron-up" : "mdi-chevron-down"
                    }}</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-layout row justify-center>
                <v-expand-transition>
                  <div v-show="show">
                    <v-divider></v-divider>
                    <span class="hr"><hr /></span>
                    <v-card-text
                       class="Post"
                      v-for="(item, index) in datauser.post"
                      :key="index"
                    >
                      <v-btn
                        x-small
                        text
                     
                        color="red"
                        @click="DeletePost(item._id)"
                        ><v-icon>mdi-delete</v-icon>
                      </v-btn>
                      {{ item.titulo }}
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-flex>
      <v-flex xs12 md5 class="pa-3 pa-sm-9 pa-md-0">
         <span class="text-center"><h4>Create A new Post</h4></span>
        <form @submit.prevent="sendPost">
          <v-text-field
            v-model="titulo"
            :error-messages="tituloErrors"
            label="Title"
            required
             outlined
            @input="$v.titulo.$touch()"
            @blur="$v.titulo.$touch()"
          ></v-text-field>

          <v-text-field
            v-model="newpost.imagen"
            label="URL Image"
             outlined
          ></v-text-field>

          <v-textarea
            v-model="descripcion"
            name="input-7-1"
            label="Description"
            hint="Hint text"
             outlined
            :error-messages="descripcionErrors"
            required
            @input="$v.descripcion.$touch()"
            @blur="$v.descripcion.$touch()"
          ></v-textarea>

          <v-btn color="teal darken-4" dark class="mr-4 text-capitalize" @click="submit" type="submit"
            >Send Post</v-btn
          >
        </form>
      </v-flex>
      <v-flex justify-center>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline">
              <v-icon color="lime darken-3">mdi-alert</v-icon>
              {{ textdialog }}</v-card-title
            >

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" text @click="dialog = false">
                Cancel
              </v-btn>

              <v-btn color="green darken-1" text @click="DeleteUser">
                Accept
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
      <v-layout>
        <div class="text-center ma-2">
          <v-snackbar v-model="snackbar">
            {{ text }}

            <template v-slot:action="{ attrs }">
              <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </div>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import moment from "moment";
import services from "../Services/ServiciosApi";

export default {
  mixins: [validationMixin],

  validations: {
    titulo: { required, maxLength: maxLength(50) },
    descripcion: { required, maxLength: maxLength(500) },
  },

  data: () => ({
    show: false,
    textdialog: "",
    dialog: false,
    snackbar: false,
    text: "",
    newpost: {
      url: "",
      username: "",
      email: "",
      image: "",
      titulo: "",
      imagen: "",
      handup: 0,
      handdown: 0,
      descripcion: "",
    },
    titulo: "",
    descripcion: "",
    datauser: {},
    iduser: "",
    user: "",
    objectPost: {
      post: [],
    },
  }),

  computed: {
    ...mapState(["HTTP_URL"]),

    tituloErrors() {
      const errors = [];
      if (!this.$v.titulo.$dirty) return errors;
      !this.$v.titulo.maxLength &&
        errors.push("Name must be at most 50 characters long");
      !this.$v.titulo.required && errors.push("Title is required.");
      return errors;
    },
    descripcionErrors() {
      const errors = [];
      if (!this.$v.descripcion.$dirty) return errors;
      !this.$v.descripcion.maxLength &&
        errors.push("Description must be at most 200 characters long");
      !this.$v.descripcion.required && errors.push("Description is required.");
      return errors;
    },
  },

  created() {
    this.iduser = this.$route.params.id;

    this.getDataUser();
  },
  methods: {
    ...mapMutations(["IsLoged"]),

    async getDataUser() {
      try {
        const IDUSER = this.$route.params.id;
        await services.GetOneUser(IDUSER).then((response) => {
          this.datauser = response.data;
        });
      } catch (error) {
        console.log(error);
      }
    },

    async sendPost() {
      try {
        let n2 = Math.random();
        let n1 = Math.random();
        this.newpost.url = `A${n1}B${n2}`;
        this.newpost.username = this.datauser.username;
        this.newpost.email = this.datauser.email;
        this.newpost.image = this.datauser.image;
        this.newpost.titulo = this.titulo;
        this.newpost.descripcion = this.descripcion;

        const RESPONSE = await services.CreatePost(this.newpost);
        this.objectPost.post = RESPONSE.data._id;
        await services
          .InsertPostOnUser(this.objectPost, this.iduser)
          .then((response) => {
            this.text = response.data.mensaje;
            this.snackbar = true;
            this.getDataUser();
          });
      } catch (error) {
        console.log(error)
        
      }
    },

    ModalDelete() {
      this.textdialog = "Do you want to delete this user?";
      this.dialog = true;
    },

    async DeleteUser() {
      try {
        const RESPONSE = await services.DeleteUser(this.iduser);
        for (let item of this.datauser.post) {
          this.DeletePost(item._id);
        }
        this.$router.push("/listauser");
      } catch (error) {
        console.log(error);
      }
    },
    async DeletePost(id) {
      const RESPONSE = await services.DeletePosts(id);
      this.text = RESPONSE.data.mensaje;
      this.snackbar = true;
      this.getDataUser();
    },
    submit() {
      this.$v.$touch();
    },
  },
};
</script>

<style scope>
.bt {
  color: rgb(0, 0, 0);
  border: none;
}
.ima {
  width: 200px;
  height: 200px;
}
.card{
 width: 100%;
}


.inf {
  font-weight: bolder;
}
@media screen and (max-width: 600px) {
  .ima {
     width: 90%;
      height: 200px;
   }
   .card{
     width: 92%;
   }
   .data{
     font-size: 13px;
   }
   .Post{
     font-size: 13px;
   }
  
}
 @media  screen and (min-width: 601px ) and (max-width: 960px){
 .perfil{
   margin-left: 6px;
 }
  .card{
     width: 90%;
  }
} 
</style>
