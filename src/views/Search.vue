<template>
  <div class="cont-form flex flex-col min-h-screen"
  :class="{ 'h-screen' : optionSelected == 'byUbication' }">
    <div
      class="form relative z-20 bg-cover bg-center"
      :style="{
        'background-image':
          'url(' + require('@/assets/img/banner-peru.svg') + ')',
      }"
    >
      <alert v-if="optionSelected == 'byUbication'" @action="getGPSUser" />
      <div class="cont-btn-back text-left p-2">
        <router-link
          :to="{ path: '/' }"
          class="
            search
            inline-flex
            items-center
            transition
            duration-300
            rounded-md
            text-sm
            px-3
            py-2
            text-gray-100
            font-semibold
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>
          Regresar
        </router-link>
      </div>
      <!-- BTN BACK !-->
      <div class="cont-title h-auto pb-5 sm:pb-0 sm:h-32">
        <h2
          v-if="optionSelected == 'byUbication'"
          class="text-gray-100 font-semibold text-2xl text-center"
        >
          Cerca de tu ubicación
        </h2>
        <h2
          v-if="optionSelected == 'byDistrict'"
          class="text-gray-100 font-semibold text-2xl text-center"
        >
          Filtra por distrito
        </h2>
      </div>
      <div
        class="w-full p-4 relative sm:absolute sm:bottom-0 mb-10 sm:-mb-16 z-30 left-0 flex justify-center"
      >
        <div
          v-if="optionSelected == 'byDistrict'"
          class="
            gps
            p-5
            rounded-lg
            bg-white
            shadow-lg
            flex flex-wrap
            sm:space-x-4
            justify-center
          "
        >
          <div class="w-full sm:w-40">
            <label for="" class="text-xs text-gray-700 py-2 block"
              >Departamento:</label
            >
            <div class="cont-cmb relative flex items-center">
              <select
                name=""
                id=""
                class="
                  block
                  transition
                  duration-300
                  rounded-md
                  w-full
                  text-sm
                  px-4
                  py-3
                  bg-blue-400
                  hover:bg-blue-500
                  border-b-4 border-blue-500
                  text-blue-800
                  font-semibold
                  appearance-none
                  focus:outline-none
                  cursor-pointer
                "
                v-model="valueDepa"
                @change="getProvinces"
              >
                <option
                  v-for="depa of dataDepartments"
                  :key="depa.departamento_inei"
                  :value="depa.departamento_inei"
                >
                  {{ depa.departamento }}
                </option>
              </select>
              <span class="absolute right-0 w-4 h-4 text-blue-700 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-full w-full"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div class="w-full sm:w-40">
            <label for="" class="text-xs text-gray-700 py-2 block"
              >Provincia:</label
            >
            <div class="cont-cmb relative flex items-center">
              <select
                name=""
                id=""
                class="
                  block
                  transition
                  duration-300
                  rounded-md
                  w-full
                  text-sm
                  px-4
                  py-3
                  bg-blue-400
                  hover:bg-blue-500
                  border-b-4 border-blue-500
                  text-blue-800
                  font-semibold
                  appearance-none
                  focus:outline-none
                  cursor-pointer
                "
                v-model="valueProv"
                @change="getDistrict"
              >
                <option
                  v-for="prov of dataProvinces"
                  :key="prov.id"
                  :value="prov.provincia"
                >
                  {{ prov.provincia }}
                </option>
              </select>
              <span class="absolute right-0 w-4 h-4 text-blue-700 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-full w-full"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div class="w-full sm:w-40">
            <label for="" class="text-xs text-gray-700 py-2 block"
              >Distrito:</label
            >
            <div class="cont-cmb relative flex items-center">
              <select
                name=""
                id=""
                class="
                  block
                  transition
                  duration-300
                  rounded-md
                  w-full
                  text-sm
                  px-4
                  py-3
                  bg-blue-400
                  hover:bg-blue-500
                  border-b-4 border-blue-500
                  text-blue-800
                  font-semibold
                  appearance-none
                  focus:outline-none
                  cursor-pointer
                "
                v-model="valueDistrict"
                @change="getResultsByDistrict"
              >
                <option
                  v-for="district of dataDistricts"
                  :key="district.id"
                  :value="district.distrito"
                >
                  {{ district.distrito }}
                </option>
              </select>
              <span class="absolute right-0 w-4 h-4 text-blue-700 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-full w-full"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <!-- POR DISTRITO !-->
      </div>
    </div>
    <!-- FORM !-->

    <div class="resultMap relative z-10"
    :class="{ 'sm:flex-1 h-96' : optionSelected == 'byDistrict' , 'flex-1' : optionSelected == 'byUbication' }">
      <div id="mapid" class="w-full h-full"></div>
    </div>
  </div>
</template>
<style>
::-webkit-scrollbar {
  appearance: none;
  width: 5px;
}
::-webkit-scrollbar-thumb {
  background: #ccc;
}
.max-width-dialog {
  max-width: 250px;
}
.max-width-alert {
  max-width: 350px;
}
</style>

<script>
import L from "leaflet";
import api from "@/api/api";
import alert from "@/components/Alert";

export default {
  name: "vSearch",
  components: {
    alert,
  },
  created() {
    this.optionSelected = this.$route.params.option;
    if (this.optionSelected == "byDistrict") {
      this.getDepartments();
    }
  },
  mounted() {
    this.mymap = L.map("mapid", {
      zoomControl: true,
      zoom: 1,
      zoomAnimation: false,
      fadeAnimation: true,
      markerZoomAnimation: true,
      attributionControl: false
    }).setView([-9.189967, -75.015152], 6);

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic21pdGgtZmsiLCJhIjoiY2tzcnp0bTdhMHF4MzJ3bGVyb3k4YWhhciJ9.cQ5qpiX2a2qMBg2Ju8Gv2Q",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1Ijoic21pdGgtZmsiLCJhIjoiY2tzcnp0bTdhMHF4MzJ3bGVyb3k4YWhhciJ9.cQ5qpiX2a2qMBg2Ju8Gv2Q",
      }
    ).addTo(this.mymap);
  },
  data() {
    return {
      mymap: null,
      optionSelected: "",
      dataDepartments: [],
      dataProvinces: [],
      dataDistricts: [],
      valueDepa: "",
      valueProv: "",
      valueDistrict: "",
    };
  },
  methods: {
    getDepartments() {
      api.getDepartments().then((res) => {
        this.dataDepartments = res.data;
      });
    },
    getProvinces() {
      api.getProvinces(this.valueDepa).then((res) => {
        this.dataProvinces = res.data;
      });
    },
    getDistrict() {
      api.getDistricts(this.valueProv).then((res) => {
        this.dataDistricts = res.data;
      });
    },
    getResultsByDistrict() {
      api.getResultsByDistrict(this.valueDistrict).then((res) => {
        this.setDataMap(res.data);
      });
    },
    getResultsByUserGPS(latitud, longitud) {
      api.getResultsByGPS(latitud, longitud).then((res) => {
        this.setDataMap(res.data, { latitud, longitud });
      });
    },
    setDataMap(dataResult, gps = {}) {

      if (this.optionSelected === "byUbication") {
        const customIcon = new L.Icon({
          iconUrl: "https://image.flaticon.com/icons/png/512/1141/1141121.png",
          iconSize: [50, 50],
          iconAnchor: [25, 50],
        });
        const myMarker = L.marker([gps.latitud, gps.longitud], {
          icon: customIcon,
        }).addTo(this.mymap);
        myMarker.bindPopup("<strong>Estás aquí!!</strong>").openPopup();
        this.mymap.setView([gps.latitud, gps.longitud], 12);
      } else {
        this.mymap.setView(
          [
            dataResult[0].location.coordinates[1],
            dataResult[0].location.coordinates[0],
          ],
          12
        );
      }

      dataResult.forEach((element) => {
        const coordinates = element.location.coordinates;
        const name = element.name;

        const newMarker = L.marker([coordinates[1], coordinates[0]]).addTo(
          this.mymap
        );
        newMarker.bindPopup(name).openPopup();
      });
    },
    getGPSUser() {
      const setGPSUser = (lat, long) => {
        this.getResultsByUserGPS(lat, long);
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          setGPSUser(position.coords.latitude, position.coords.longitude);
        });
      }
    },
  },
};
</script>