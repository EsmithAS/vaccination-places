<template>
  <div>
    <div class="step-1 px-4 flex-1">
      <div class="nav">
        <img src="@/assets/img/no_bajemos_la_guardia.svg" alt="no_bajemos_la_guardia" class="w-32 sm:w-40 mx-auto py-5">
      </div> <!-- Logo !-->

      <div class="avatar my-10 relative">
        <img src="@/assets/img/avata-ranita.jpg" alt="no_bajemos_la_guardia" class="w-32 sm:w-40 mx-auto py-5">
        <div class="max-width-dialog mx-auto bg-white text-sm text-gray-700 relative sm:top-0 sm:right-0 text-center px-5 py-3 shadow-xl rounded-2xl">
          Indicame como consultaré los centros de vacunación 😊.
        </div>
      </div> <!-- Avatar !-->

      <div class="cont-options flex flex-col sm:flex-row items-center sm:justify-center">
        <btnRouter :title="'Por Distrito'" :path="{ path : '/search/byDistrict' }" :addClass="[ 'w-40 bg-green-400 hover:bg-green-500 border-green-500 text-green-800' ]"/>
        <btnRouter :title="'Mi ubicación'" :path="{ path : '/search/byUbication' }" :addClass="[ 'w-40 bg-blue-400 hover:bg-blue-500 border-blue-500 text-blue-800' ]"/>
      </div> <!-- Buttons !-->
      <cFooter />
    </div>
  </div>
</template>
<style>
.max-width-dialog {
  max-width: 250px;
}
</style>
<script>
import btnRouter from '@/components/BtnRouter'
import cFooter from '@/components/Footer';

export default {
  name: "vHome",
  components: {
    btnRouter,
    cFooter
  },
};
</script>
