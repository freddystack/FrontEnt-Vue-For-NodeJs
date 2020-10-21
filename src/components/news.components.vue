<template>
  <div class="ma-6">
    <v-layout row justify-space-between>
      <v-flex class="mt-5 post" md7>
        <v-card >
          <v-img :src="onePost.imagen" class="grey lighten-2" max-height="300">
          </v-img>
          <v-layout justify-start align-center>
            <v-list-item-avatar>

              <v-img v-if="onePost.image != '../assets/img/perfilvacio.jpg'" class="ml-2" :src="onePost.image"></v-img>
              <v-img v-else-if="onePost.image == '../assets/img/perfilvacio.jpg' " class="ml-2" src="../assets/img/perfilvacio.jpg"></v-img> 
            
            </v-list-item-avatar>
            <v-layout column justify-center>
              <h4>{{ onePost.titulo }}</h4>
              <p class="line font-weight-light mt-1">By: {{ onePost.username }}</p>
            </v-layout>
            <hr />
          </v-layout>
          <v-layout row>
            <v-card-title>
              {{ onePost.descripcion }}
            </v-card-title>
            <v-flex row justify-space-between class="ml-5 mr-5" align-center>
              <v-card-actions>
                <v-btn
                  class="ma-2"
                  text
                  icon
                  color="blue lighten-2"
                  :disabled="showbtnup"
                  @click="like('up')"
                >
                  <v-icon class="mr-1">mdi-thumb-up</v-icon>
                  {{ onePost.handup }}
                </v-btn>

                <v-btn
                  class="ma-2"
                  text
                  icon
                  color="red lighten-2"
                  :disabled="showbtndown"
                  @click="like('down')"
                >
                  <v-icon class="mr-1">mdi-thumb-down</v-icon>
                  {{ onePost.handdown }}
                </v-btn>
              </v-card-actions>

              <span class="fecha">
                {{
                  onePost.createAt | moment(" MMMM Do YYYY, h:mm:ss a")
                }}</span
              >
            </v-flex>
          </v-layout>
        </v-card>

        <v-layout class=" mt-3" column>
          <v-flex>
            <v-chip class="mb-3" color="pink" label text-color="white">
              <v-icon left></v-icon>
              add commentary
            </v-chip>
          </v-flex>
          <v-flex>
            <v-form @submit.prevent="sendCommentary">
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                single-line
                outlined
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="username"
                :error-messages="usernameErrors"
                label="User Name"
                required
                single-line
                outlined
                @input="$v.username.$touch()"
                @blur="$v.username.$touch()"
              ></v-text-field>
              <v-textarea
                rows="3"
                row-height="30"
                v-model="commentary"
                name="input-7-1"
                label="Commentary"
                hint="Hint text"
                outlined
                :error-messages="commentaryErrors"
                required
                @input="$v.commentary.$touch()"
                @blur="$v.commentary.$touch()"
              ></v-textarea>
              <v-layout row justify-end class="mr-1">
                <v-btn
                 color="teal darken-4"
                
                  class="text-capitalize"
                  rounded
                
                  dark
                  type="submit"
                  @click="submit"
                  >Send Commentary</v-btn
                >
              </v-layout>
            </v-form>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex md5 class="mt-5 pl-lg-5 comment">
      
          <v-card width="100%">
            <v-layout >
               <v-flex row justify-center>
                  <v-card-title class="text-center font-weight-black "
                ><p class="text-center">All Commentarys</p></v-card-title
              >
               </v-flex>
            </v-layout>

            <v-list two-line>
              <div v-for="(item, index) in requesCommentary" :key="index">
                <v-divider></v-divider>
                <v-list-item>
                  <v-layout column>
                    <v-flex>
                      <v-chip pill class="mt-3">

                        <v-avatar left v-if="item.image == '../assets/img/perfilvacio.jpg'">
                           <v-img src="../assets/img/perfilvacio.jpg"></v-img>
                        </v-avatar>
                          <v-avatar left v-else-if=" item.image != '../assets/img/perfilvacio.jpg'">
                          <v-img :src="item.image"></v-img>
                        </v-avatar>

                        <v-layout column justify-center align-center>
                          <span>{{ item.username }}</span>
                        </v-layout>
                      </v-chip>
                    </v-flex   >
                    
                   <div >
                        <p :max-height="600" >{{ item.commentary }}</p >
                   </div>
                   
                  </v-layout>
                </v-list-item>
              </div>
            </v-list>
          </v-card>
       
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
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import axios from "axios";
import moment from "moment";
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import services from'../Services/ServiciosApi'

export default {
  mixins: [validationMixin],

  validations: {
    username: { required, maxLength: maxLength(20) },
    commentary: { required, maxLength: maxLength(500) },
    email: { required, email },
  },

  data() {
    return {
      snackbar: false,
      text: "",
      username: "",
      commentary: "",
      email: "",
      showbtnup: false,
      showbtndown: false,
      show: false,
      onePost: {},
      usernamePost: {},
      idPost: "",
      test: { name: "fer", last: "tor" },
      idCommentary: "",
      addCommentary: {
        email: "",
        username: "",
        commentary: "",
        image: "",
      },
      requesCommentary: {},
      state: Boolean,
      likesToSend: {
        handup: 0,
        handdown: 0,
      },
      likesThePost: {
        handup: 0,
        handdown: 0,
      },
      likeState: Boolean,
      suma1: 0,
      suma2: 0,
      objectCommentary: {
        commentarys: [],
      },
    };
  },
  created() {
    this.getOne();
   
  },
  computed: {
    ...mapState(["HTTP_URL"]),

    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.maxLength &&
        errors.push("User Name must be at most 20 characters long");
      !this.$v.username.required && errors.push("User Name is required.");
      return errors;
    },
    commentaryErrors() {
      const errors = [];
      if (!this.$v.commentary.$dirty) return errors;
      !this.$v.commentary.maxLength &&
        errors.push("Commentary must be at most 200 characters long");
      !this.$v.commentary.required && errors.push("Commentary is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
  },
  methods: {


    async getOne() {

       try {
          this.idPost = this.$route.params.id;
          const RESPONSE = await services.GetOnePost(this.idPost)
          this.onePost = RESPONSE.data
          this.requesCommentary = this.onePost.commentarys.reverse()
       } catch (error) {
          console.log(error)
       }
    },

    async sendCommentary() {

      try {
         this.addCommentary.email = this.email;
         this.addCommentary.username = this.username;
         this.addCommentary.commentary = this.commentary;

        this.idPost = this.$route.params.id;
        const RESPONSE = await services.CreateCommentary(this.addCommentary)
      
        this.objectCommentary.commentarys = RESPONSE.data._id
        await services.UpdatePost(this.objectCommentary,this.idPost)
        .then((response) =>{
            this.text = response.data.mensaje
            this.snackbar = true
            this.getOne();
        })

      } catch (error) {
          switch (error.response.status) {
            case 401:
                this.text = "El correo o el usuario no existen"
                this.snackbar = true
              break;
          
            default:
              break;
          }
      }

    },
    async UpdatePostt(idpost, idcommentary) {
      this.objectCommentary.commentarys = idcommentary;
      await fetch(`${this.HTTP_URL}post/${idpost}`, {
        method: "PUT",
        body: JSON.stringify(this.objectCommentary),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.getOne();
        });
    },

    async like(parametro) {
      if (parametro == "up") {
        this.likeState = true;
        this.showbtnup = true;
        this.showbtndown = true;
        if (this.likeState == true) {
          this.likesToSend.handup = 1;
          this.likesToSend.handdown = 0;
          this.likesThePost.handup =
            this.onePost.handup + this.likesToSend.handup;
          this.likesThePost.handdown =
            this.onePost.handdown + this.likesToSend.handdown;
        }
      } else if (parametro == "down") {
        this.likeState = false;
        this.showbtndown = true;
        this.showbtnup = true;
        if (this.likeState == false) {
          this.likesToSend.handdown = 1;
          this.likesToSend.handup = 0;
          this.likesThePost.handdown =
            this.onePost.handdown + this.likesToSend.handdown;
          this.likesThePost.handup =
            this.onePost.handup + this.likesToSend.handup;
        }
      }
      const RESPONSE = await services.UpdatePost(this.likesThePost, this.$route.params.id)
       this.onePost.handup = RESPONSE.data.handup;
       this.onePost.handdown = RESPONSE.data.handdown;
  
    },
    submit() {
      this.$v.$touch();
    },
  },
};
</script>

<style>
.line {
  line-height: 0%;
  font-size: 13px;
}

.comment{
  width: 100%;
 
}

@media screen and (max-width: 600px) {
  .fecha{
    font-size: 10px;
  }
}

</style>
