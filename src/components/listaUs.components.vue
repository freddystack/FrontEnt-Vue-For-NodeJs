<template>
  <v-container>
    <v-layout flex-row wrap>
      <v-flex xs12 sm12 md7>
        <v-card>
          <v-list
            three-line
            v-for="(item, index) in listaUsuarios"
            :key="index"
          >
            <template>
              <v-list-item :key="item.title">
                <v-list-item-avatar class="mt-6">
                  <v-img
                    v-if="item.image != '../assets/img/perfilvacio.jpg'"
                    :src="item.image"
                  ></v-img>
                  <v-img
                    v-else-if="item.image == '../assets/img/perfilvacio.jpg'"
                    src="../assets/img/perfilvacio.jpg"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-layout justify-space-around>
                    <v-flex>
                      <v-list-item-title
                        class="font-weight-bold"
                        v-html="item.username"
                      ></v-list-item-title>
                      <v-list-item-subtitle class="ema">{{
                        item.email
                      }}</v-list-item-subtitle>
                    </v-flex>

                    <v-flex justify-end tex class="text-end ">
                      <div>
                        <router-link
                          :to="{
                            name: 'newpost',
                            params: { id: item._id, body: item },
                          }"
                          class="text-decoration-none"
                          ><v-btn text small class="text-capitalize"
                            >Ver más<v-icon class="mb-2"
                              >mdi-share</v-icon
                            ></v-btn
                          ></router-link
                        >
                      </div>
                    </v-flex>
                  </v-layout>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md5 class="d-flex justify-center mt-5 mt-md-0" offset-sm="1">
        <!--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->

        


              <v-card class="card" height="370">
                <v-layout row justify-center>
                  <v-card-title class="text-center font-weight-black ">
                    the most recent</v-card-title
                  >
                </v-layout>

                <v-list two-line>
                  <div v-for="(i, index) in los4" :key="index">
                    <v-divider></v-divider>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img
                          v-if="i.image != '../assets/img/perfilvacio.jpg'"
                          :src="i.image"
                        ></v-img>
                        <v-img
                          v-else-if="i.image == '../assets/img/perfilvacio.jpg'"
                          src="../assets/img/perfilvacio.jpg"
                        ></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="font-weight-bold">{{
                          i.username
                        }}</v-list-item-title>
                        <v-list-item-subtitle>{{
                          i.email
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </div>
                </v-list>
              </v-card>


  


      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapActions, mapMutations, mapState } from "vuex";
import services from "../Services/ServiciosApi";

export default {
  data() {
    return {
      listaUsuarios: [],
      numeroPost: [],
      administrar: [
        ["Update my acount", "mdi-account-edit"],
        ["Delete my acount", "mdi-account-remove"],
      ],
      los4: [],
    };
  },
  created() {
    this.GetUsers();
   
  },
  computed: {
    ...mapState(["HTTP_URL"]),
  },
  methods: {


    async GetUsers() {
      try {
        const response = await services.GetUsers();
        this.listaUsuarios = response.data;
        let numeroUsuarios = 0;
        numeroUsuarios = this.listaUsuarios.length;
        this.los4.push(response.data[numeroUsuarios - 1]);
        this.los4.push(response.data[numeroUsuarios - 2]);
        this.los4.push(response.data[numeroUsuarios - 3]);
        this.los4.push(response.data[numeroUsuarios - 4]);
      } catch (error) {
        console.log(error);
      }
    },
    
  },
};
</script>

<style scope>

.bt {
  text-align: center;
  color: rgb(0, 0, 0);
}
.ema {
  font-size: 13px;
}
.card{
  width: 90%;
}
@media screen and (max-width: 600px){
  .card{
    width: 100%;
  }
  
}
 @media  screen and (min-width: 601px ) and (max-width: 960px){
  .card{
    width: 100%;
  }
  .recent{
    background-color: chartreuse;
    width: 100%;
  }
} 

</style>
