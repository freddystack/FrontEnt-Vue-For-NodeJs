<template>
  <div>
    <div class=" pb-16 pb-sm-10 ">
      <v-card flat class="card" tile color="teal darken-4">
        <v-toolbar dense color="teal darken-4 " elevation class="toolbar">
          <v-layout wrap>
            <v-flex xs12 sm5 class=" d-flex flex-row  justify-start   ">
              <div class="LogoTitulo">
                <img src="../assets/img/MEVN.png" alt="" />
              </div>
            </v-flex>

            <v-spacer></v-spacer>

            <v-flex
              sm7
              class="layoutMenus d-flex flex-sm-row justify-center justify-sm-end   align-center d-none "
            >
             <div v-if="!IsLogg">
                 <router-link to="/" class="text-decoration-none  "
                ><v-btn class=" colorText text-capitalize " text color="white"
                  >Home</v-btn
                ></router-link
              >
             </div>
              <div v-if="IsLogg">
                <router-link to="/listauser" class="text-decoration-none  "
                  ><v-btn class="colorText text-capitalize" text color="white"
                    >Users
                  </v-btn></router-link
                >
                <router-link to="/post" class="text-decoration-none "
                  ><v-btn class=" text-capitalize" text color="white"
                    >Posts</v-btn
                  ></router-link
                >
              </div>

              <div v-if="!IsLogg">
                <router-link
                  :to="{
                    name: 'signup',
                    params: { id: 'onlysave', body: 'bodyvacio' },
                  }"
                  class="text-decoration-none text-capitalize "
                  ><v-btn text small color="white" class="text-capitalize"
                    >SignUp</v-btn
                  ></router-link
                >
                <router-link to="/signin" class="text-decoration-none "
                  ><v-btn text small color="white" class="text-capitalize"
                    >LogIn</v-btn
                  ></router-link
                >
              </div>
              <div v-else>
                <v-btn
                  text
                  small
                  color="white"
                  class="text-capitalize OpMenu"
                  @click="Logout"
                >
                  LogOut</v-btn
                >
              </div>
            </v-flex>
          </v-layout>
        </v-toolbar>
      </v-card>
    </div>
    <v-navigation-drawer v-model="drawer" absolute temporary width="30%">
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Services from "../Services/ServiciosApi";
import { mapMutations, mapState } from "vuex";

export default {
  name: "Toolbar",
  data() {
    return {
      fotos: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
      IsLog: Boolean,
    };
  },
  created() {
    this.IsLoged();
  },
  updated() {},
  mounted() {},

  computed: {
    ...mapState(["IsLogg"]),
  },
  methods: {
    ...mapMutations(["IsLoged", "LogOut"]),

    Logout() {
      this.LogOut();
      this.IsLoged();
      this.$router.push("/signin");
    },
  },
};
</script>

<style scoped>
.colorText {
  color: white;
}
.toolbar {
  position: fixed;
  width: 100%;
  z-index: 1000;
}
.LogoTitulo img {
  width: 120px;
  height: 40px;
}

/*                    XS            */
@media screen and (max-width: 600px) {
  .LogoTitulo img {
    width: 100px;
    height: 30px;
  }

  .card {
    height: 80px;
    margin-bottom: 0px;
    padding-bottom: 0px;

    position: fixed;
    width: 100%;
    z-index: 1000;
  }

  .LogoTitulo {
    margin-top: 40px;
  }
}
</style>
