<template>
    <div :class="{'opacity-100' : show , 'opacity-0 pointer-events-none' : !show }" class="transition duration-300 cont-alert p-2 w-full h-screen flex items-start justify-center bg-black bg-opacity-75 fixed left-0 top-0 z-40">
        <div class="alert mt-5 max-width-alert px-5 py-6 bg-white rounded-lg relative text-center">
            <router-link  class="absolute top-0 right-0 w-7 h-7 p-1 mt-1 mr-2" :to="{ path : '/' }">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </router-link>
            <p class="text-gray-700 text-sm">
            Necesito permiso para acceder a tu ubicación.
            <span class="font-semibold">¿Estás de acuerdo?</span>
            </p>
            <button class="mt-5 transition duration-300 rounded-md text-sm px-4 py-2 bg-blue-400 hover:bg-blue-500 border-b-4 border-blue-500 text-blue-800 font-semibold" @click="action">Sí, permitir</button>
        </div>
    </div> <!-- Alert de permiso !-->
</template>
<script>
export default {
    name: 'cAlert',
    data() {
        return {
            show: true
        }
    },
    methods: {
        action() {
            this.show = false;
            this.$emit('action');
        }
    },
}
</script>