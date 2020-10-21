<template>
  <div>
    <ul></ul>
    <v-container grid-list-md>
      <v-layout wrap>
        <v-flex
          color="primary"
          v-for="(item, index) in post"
          :key="index"
          xs12
          sm12
          md4
        >
          <v-card class="mx-auto mt-3 cardPost" grid-list-md >
            <v-img
              :src="item.imagen"
              height="200px"
              v-if="item.imagen != ''"
            ></v-img>
            <v-img
              v-else-if="item.imagen == ''"
              src="../assets/img/postvacio.jpg"
              height="200"
              class="imgint"
            ></v-img>

            <v-card-text class="titulo">
              <div>
                <span>By: {{ item.username }}</span>
              </div>
              <p class="title text--primary">{{ item.titulo }}</p>
            </v-card-text>

            <v-card-actions class="Actions">
              <v-spacer></v-spacer>
              <router-link
                :to="{ name: 'news', params: { id: item._id } }"
                class="text-decoration-none "
              >
                <v-btn color="teal darken-2" fab dark class="ic" >
                  <v-icon >mdi-chevron-double-right</v-icon>
                </v-btn>
              </router-link>
            </v-card-actions>

      
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
 
</template>

<script>
import axios from "axios";
import services from "../Services/ServiciosApi";

export default {
  data: () => ({
    post: [],
  }),
  created() {
    this.Getpost();
  },
  methods: {
    async Getpost() {
      services.GetPosts().then((response) => {
        this.post = response.data;
      });

    },
  },
};
</script>

<style scope>
.image {
  width: 10px;
  height: 50px;
}
.spacing {
  margin-left: 4px;
}
.title {
  font-size: 16px;
}
.cardPost{
  height: 400px;
}

.imgint {
  height: 200px;
  width: 100%;
}
@media screen and (max-width: 600px) {
  .cardPost{
    height: 350px;
  }
  .Actions{
    padding-bottom: 10px;
  }
  .titulo {
   
    height: 60px; 
  
  }
 
}
 
</style>
