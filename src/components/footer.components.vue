<template>
  <div class="fot">
    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="teal darken-4">
          <v-flex xs12 sm6 class="developed text-center text-sm-left">
              <strong class="subheading "
            >Dasarrollada por Freddy Muñoz Dominguez</strong
          >
          </v-flex>

          <v-spacer></v-spacer>

          <v-layout column justify-center align-center>
            <div row class="fl ">
              <p class="font">
                <v-icon size="16px" class="mb-1 mr-2 ">mdi-whatsapp</v-icon
                >57161067
              </p>
            </div>
            <v-flex row class="fl">
              <p class="font">
                <v-icon size="16px" class="pb-1 mr-2 "
                  >mdi-cellphone-android</v-icon
                >87099537
              </p>
            </v-flex>
            <v-flex row class="fl " align-center justify-center>
              <p class="font">
                <v-icon size="16px" class=" pb-1 mr-2 ">mdi-gmail</v-icon
                >freddymdominguez2020@gmail.com
              </p>
            </v-flex>
          </v-layout>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>Stack MEVN</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>

<style scope>
.font {
  font-size: 16px;
}

.fl {
  line-height: 0px;
}

@media screen and (max-width: 600px){
  .subheading{
    font-size: 13px;
  }
  .font{
    font-size: 13px;
  }
  
}
 @media  screen and (min-width: 601px ) and (max-width: 960px){
    .subheading{
    font-size: 15px;
  }
  
} 

</style>
