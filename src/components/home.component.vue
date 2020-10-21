<template>
  <div>
    <v-carousel :show-arrows="false" class=" carousel"   cycle  > 
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        class="carouselItem"
      >
      <v-img :src="item.src" class="img"  >
        <v-row
          class="fill-height pb-12 text-capitalize font-weight-black"
          align="end"
          justify="center"
        >
          <div class="mensaje">{{ item.mensaje }}</div>
        </v-row>  
      </v-img>
       
      </v-carousel-item>
    </v-carousel>

    <v-container grid-list-md>
      <v-layout row justify-center justify-md-center>
           <v-flex  xs12 sm12  md8 lg8 class="p" >
           <div >
              <span class="text-center encabezado"
            ><h3>Como está desarrollada esta aplicación</h3></span
          >
          <v-flex row justify-center class="pl-5">
            <v-card>
              <v-card-text>
                La aplicación se desarrollo con el stack MEVN(Mongo DB ,Express
                Js ,Vue js ,Node js). Además se le complemento a Vue js el
                framework de VueTify para una mayor estética de Material Desing.
                <br />
                <br />
                Esta aplicacion se comunica con el servidor por medio de una Res
                API formato Json creada desde cero con Node Js atraves del
                protocolo HTTP
              </v-card-text>
            </v-card>
          </v-flex>
           </div>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
      
        <v-flex column justify-center align-center md6>
         <span> <h3 class="text-center encabezado">Acerca de este Backend</h3></span>
          <v-card>
            <v-card-text>
              Este backend esta desarrollado completamente con las tecnologias
              de Node Js y la ayuda de su framework web Express, ademas de
              incorporar el lenguaje de TypeScript para un mejor manejo y
              estructuracíon del código
              <br />
              <br />
              <span class="font-weight-black">
                ¿Qué módulos estan implementados en este backend?</span
              >
              <br />
              Gracias a la ayuda de los siguentes módulos se ha desarrollado
              esta aplicación que simula una pequeña red social
              <br />
              <ul>
                <li>Morgan</li>
                <li>Nodemon</li>
                <li>BcryptJs</li>
                <li>Cors</li>
                <li>Helmet</li>
                <li>JsonWebToken</li>
                <li>Mongoose</li>
                <li>Passport</li>
                <li>Passport-JWT</li>
                <li>Compression</li>
                <li>Express</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex column justify-center md6>
          <span class="text-center encabezado"> <h3>Acerca de este Frontend</h3></span>
          <v-card>
            <v-card-text>
              Se utilizo solo el Framework de Vue js conjunto con VueTify para
              la creación de este FrontEnd .Es una aplicación completamente
              responsiva se ajusta a los tamaños de dispositivos moviles,
              tablets, laptops y computadoras de escritorio.
              <br />
              <br />
              <span class="font-weight-black"
                >¿Qué librerias implemento en Vue Js</span
              >
              <br />
              Con la implementacion de estas librerias y funcionalidades de
              JavaScript tenemos una aplicación SPA completamente asíncrona
              <br />
              <ul>
                <li>VueTify</li>
                <li>Vuex</li>
                <li>Vue Router</li>
                <li>Axios</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src:
            "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/118913530/original/051672fddc3634fc420f2721ad510675d3a3c099/develop-a-mevn-stack-app.png",
          mensaje: "full stack developer mevn",
        },
        {
          src: "https://quinngil.com/content/images/2017/03/jwt.svg",
          mensaje: "authenticated with jsonwebtoken",
        },
        {
          src:
            "https://mk0aysnetall5hhrnu2.kinstacdn.com/wp-content/uploads/2018/08/MOB_native-vs-web-app-whats-the-diff-which-do-i-need_M-940x400.png",
          mensaje: "fully responsive app",
        },
        {
          src:
            "https://holycoders.com/content/images/size/w600/2020/06/Node.js-bcrypt-authentication.png",
          mensaje: "encrypted sensitive data",
        },
      ],
    };
  },
};
</script>

<style scoped>
.mensaje {
  font-size: 25px;
  color: rgb(213, 43, 13);
  background-color: transparent;


}

.carousel {
   max-height: 500px;
   margin-top: 5px;
   
}
.img{
   height: 500px
}

/*                    XS            */
@media screen and (max-width: 600px) {
  .encabezado {
    font-size: 13px;
  }
  .mensaje{
    font-size: 16px;
  }
  .carousel{
    max-height: 210px ;
    margin-top: 0px;
  }
   .carouselItem .img{
    width: 100vh; 
    height: 210px;
  }
 
 
}

</style>
