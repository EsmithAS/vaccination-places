<template>
  <div class="px-4">
    <div class="step-1" :class="{ 'hidden' : !showStep1 , 'block' : showStep1  }">

      <div :class="{ 'opacity-100' : showPermiso , 'pointer-events-none' : !showPermiso }" class="transition duration-300 opacity-0 cont-alert p-2 w-full h-screen flex items-start justify-center bg-black bg-opacity-75 fixed left-0 top-0 z-20">
        <div class="alert mt-5 max-width-alert px-5 py-6 bg-white rounded-lg relative text-center">
          <button class="absolute top-0 right-0 w-7 h-7 p-1 mt-1 mr-2" @click="showPermiso = false">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <p class="text-gray-700 text-sm">
            Necesito permiso para acceder a tu ubicación.
            <span class="font-semibold">¿Estás de acuerdo?</span>
          </p>
          <button class="mt-5 transition duration-300 rounded-md text-sm px-4 py-2 bg-blue-400 hover:bg-blue-500 border-b-4 border-blue-500 text-blue-800 font-semibold" @click="getGPSUser">Sí, permitir</button>
        </div>
      </div> <!-- Alert de permiso !-->
      
      <div class="nav">
        <img src="@/assets/img/no_bajemos_la_guardia.svg" alt="no_bajemos_la_guardia" class="w-32 sm:w-40 mx-auto py-5">
      </div> <!-- Logo !-->

      <div class="avatar my-10 relative">
        <h1 class="text-center text-sm text-gray-500 font-semibold">Hola, soy la ranita Capulí ^^</h1>
        <img src="@/assets/img/avata-ranita.jpg" alt="no_bajemos_la_guardia" class="w-32 sm:w-40 mx-auto py-5">
        <div class="max-width-dialog mx-auto bg-white text-sm text-gray-700 relative sm:top-0 sm:right-0 text-center px-5 py-3 shadow-xl rounded-2xl">
          Indicame como consultaré los centros de vacunación 😊.
        </div>
      </div> <!-- Avatar !-->

      <div class="cont-options flex flex-col sm:flex-row items-center sm:justify-center">
        <button class="transition duration-300 rounded-md my-1 sm:mx-5 w-40 text-sm px-4 py-3 bg-green-400 hover:bg-green-500 border-b-4 border-green-500 text-green-800 font-semibold" @click="selectLocalByDistrict">Por Distrito</button>
        <button class="transition duration-300 rounded-md my-1 sm:mx-5 w-40 text-sm px-4 py-3 bg-blue-400 hover:bg-blue-500 border-b-4 border-blue-500 text-blue-800 font-semibold" @click="showPermiso = true">Mi ubicación</button>
      </div> <!-- Buttons !-->

    </div>
    <div class="step-2 w-full bg-white" :class="{ 'hidden' : !showStep2 , 'block' : showStep2  }">

      <h2 v-if="selectGPS" class="text-gray-700 font-semibold text-2xl text-center py-4 mt-4">Cerca de tu ubicación</h2>
      <h2 v-if="selectDistrito" class="text-gray-700 font-semibold text-2xl text-center py-4 mt-4">Filtra por distrito</h2>

      <div :class="{ 'block' : selectDistrito , 'hidden' : !selectDistrito }" class="gps flex flex-wrap sm:space-x-4 justify-center px-2 py-4">
        <div class="w-full sm:w-40">
          <label for="" class="text-xs text-gray-700 py-2 block">Departamento:</label>
          <div class="cont-cmb relative flex items-center">
            <select name="" id="" class="block transition duration-300 rounded-md w-full text-sm px-4 py-3 bg-blue-400 hover:bg-blue-500 border-b-4 border-blue-500 text-blue-800 font-semibold appearance-none focus:outline-none cursor-pointer" v-model="valueDepa" @change="getProvinces">              
              <option v-for="depa of dataDepartments" :key="depa.departamento_inei" :value="depa.departamento_inei">{{ depa.departamento }}</option>
            </select>
            <span class="absolute right-0 w-4 h-4 text-blue-700 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>
        <div class="w-full sm:w-40">
          <label for="" class="text-xs text-gray-700 py-2 block">Provincia:</label>
          <div class="cont-cmb relative flex items-center">
            <select name="" id="" class="block transition duration-300 rounded-md w-full text-sm px-4 py-3 bg-blue-400 hover:bg-blue-500 border-b-4 border-blue-500 text-blue-800 font-semibold appearance-none focus:outline-none cursor-pointer" v-model="valueProv" @change="getDistrict">
              <option v-for="prov of dataProvinces" :key="prov.id" :value="prov.provincia">{{ prov.provincia }}</option>
            </select>
            <span class="absolute right-0 w-4 h-4 text-blue-700 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>
        <div class="w-full sm:w-40">
          <label for="" class="text-xs text-gray-700 py-2 block">Distrito:</label>
          <div class="cont-cmb relative flex items-center">
            <select name="" id="" class="block transition duration-300 rounded-md w-full text-sm px-4 py-3 bg-blue-400 hover:bg-blue-500 border-b-4 border-blue-500 text-blue-800 font-semibold appearance-none focus:outline-none cursor-pointer" v-model="valueDistrict" @change="getResultsByDistrict">         
              <option v-for="district of dataDistricts" :key="district.id" :value="district.distrito">{{ district.distrito }}</option>
            </select>
            <span class="absolute right-0 w-4 h-4 text-blue-700 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>
      </div> <!-- POR DISTRITO !-->

      <div class="cont-btn-search text-center">
        <button class="search inline-flex items-center transition duration-300 rounded-md text-sm px-10 py-3 bg-green-400 hover:bg-green-500 border-b-4 border-green-500 text-green-800 font-semibold" @click="newConsulta">
          <span>Nueva consulta</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div> <!-- BTN BUSCAR !-->

      <div v-if="results.length > 0" :class="{ 'hidden' : isLoading , 'block' : !isLoading , 'h-32' : results.length == 0 ? true : false}" class="max-w-4xl mx-auto mt-7 sm:mt-10 md:mt-20">
        <h3 class="text-sm text-sm text-gray-700 font-semibold mb-2">Estos son los centros de vacunación:</h3>

        <div class="results grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

            <div class="w-full p-5 shadow-lg rounded-lg" v-for="result of results" :key="result.id">
              <img src="@/assets/img/mapa.jpeg" class="object-cover object-center w-full h-48" loading="lazy">
              <div class="mt-4">
                <div class="direccion inline-flex text-sm text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{{ result.name }}</span>
                </div>
              </div>
              <div class="text-right mt-4">
                <a class="inline-flex items-center transition duration-300 rounded-md text-sm px-2 py-3 text-blue-500 font-semibold" :href="`https://www.google.com/maps/search/?api=1&query=${result.location.coordinates[1]},${result.location.coordinates[0]}`" target="_blank">
                <span>Visualizar mapa</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                </a>
              </div>
            </div>

        </div>
      </div> <!-- RESULTADOS !-->

      <div class="loading w-full h-48 p-10 flex items-center justify-center" :class="{ 'hidden' : !isLoading , 'block' : isLoading }">
        <div class="w-20 h-20 border-l-4 border-blue-500 rounded-full loading"></div>
      </div>

    </div>
    <div class="fotter">
      <a href="https://t.me/capuli_bot" target="_blank" class="text-center text-sm text-blue-500 py-2 mt-5 flex justify-center items-center">
        <span class="mr-2">Chatea conmigo por telegram</span>
        <svg version="1.1" class="w-4 h-4 fill-current" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 300 300" style="enable-background:new 0 0 300 300;" xml:space="preserve">
        <g id="XMLID_496_">
          <path id="XMLID_497_" d="M5.299,144.645l69.126,25.8l26.756,86.047c1.712,5.511,8.451,7.548,12.924,3.891l38.532-31.412
            c4.039-3.291,9.792-3.455,14.013-0.391l69.498,50.457c4.785,3.478,11.564,0.856,12.764-4.926L299.823,29.22
            c1.31-6.316-4.896-11.585-10.91-9.259L5.218,129.402C-1.783,132.102-1.722,142.014,5.299,144.645z M96.869,156.711l135.098-83.207
            c2.428-1.491,4.926,1.792,2.841,3.726L123.313,180.87c-3.919,3.648-6.447,8.53-7.163,13.829l-3.798,28.146
            c-0.503,3.758-5.782,4.131-6.819,0.494l-14.607-51.325C89.253,166.16,91.691,159.907,96.869,156.711z"/>
        </g>
        </svg>
      </a>
    </div>
  </div>
</template>
<style>
.max-width-dialog {
  max-width: 250px;
}
.max-width-alert {
  max-width: 350px;
}
.loading {
  animation: loading 2s infinite;
}
@keyframes loading {
  0% {
    transform: rotateZ(0deg);
  }
  50% {
    transform: rotateZ(180deg);
  }
  100% {
    transform: rotateZ(-0deg);
  }
}
</style>
<script>
import api from "@/api/api";

export default {
  name: "Home",
  components: {

  },
  created() {
    this.getDepartments();
  },
  data() {
    return {
      showStep1: true,
      showStep2: false,
      showPermiso: false,
      selectGPS: false,
      selectDistrito: false,
      dataDepartments: [],
      dataProvinces: [],
      dataDistricts: [],
      valueDepa: '',
      valueProv: '',
      valueDistrict: '',
      results : [],
      isLoading: false
    };
  },
  methods: {
    selectLocalByGPS () {
      this.showStep1 = false;
      this.showStep2 = true;
      this.selectGPS = true;
      this.selectDistrito = false;
      this.isLoading = false;
    },
    selectLocalByDistrict () {
      this.showStep1 = false;
      this.showStep2 = true;
      this.selectGPS = false;
      this.selectDistrito = true;
      this.isLoading = false;
    },
    newConsulta() {
      this.results = []
      this.showStep1 = true;
      this.showStep2 = false;
      this.isLoading = false;
    },
    getDepartments() {
      api.getDepartments().then( (res)=> {
        this.dataDepartments = res.data;
      } );
    },
    getProvinces( ) {
      api.getProvinces(this.valueDepa).then( (res)=> {
        this.dataProvinces = res.data;
      } );
    },
    getDistrict( ) {
      api.getDistricts(this.valueProv).then( (res)=> {
        this.dataDistricts = res.data;
      } );
    },
    getResultsByDistrict( ) {
      this.isLoading = true;
      //Longitude primero, latitude segundo
      api.getResultsByDistrict(this.valueDistrict).then( (res)=> {
        this.results = res.data;
        this.isLoading = false;
      } );
    },
    getResultsByUserGPS( latitud , longitud ) {
        this.isLoading = true;
        api.getResultsByGPS(latitud,longitud).then( (res)=> {
            this.results = res.data;
            this.isLoading = false;
          } );
    },
    getGPSUser() {          
      this.showPermiso = false;

      this.selectLocalByGPS();
      const setGPSUser = (lat , long) => {
        this.getResultsByUserGPS( lat,long);
      }
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          setGPSUser(position.coords.latitude, position.coords.longitude)
        });
      } else {
        /* la geolocalización NO está disponible */
      }
    }
  },
};
</script>
