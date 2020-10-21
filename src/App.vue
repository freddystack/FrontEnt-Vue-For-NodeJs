<template>
  <v-app>
    <toolbar></toolbar>
   

     <div class="cont">
         <router-view>

    </router-view>
     </div>
     <foter></foter>
  </v-app>
</template>


<script>
import toolbar from "./components/toolbar.component";
import foter from "./components/footer.components"

export default {
  name: "App",
  data() {
    return {
      
    }
  },

  components: {
    toolbar,
    foter
  },

};
</script>

<style>
.cont{
  
  min-height: calc( 100vh - 100px - 100px)  ;

}

footer {
   height: 100px;
}
</style>
