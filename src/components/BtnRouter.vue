<template>
    <router-link :to="path" :class="addClass" class="transition duration-300 rounded-md my-1 sm:mx-5 text-sm px-4 py-3 border-b-4 font-semibold text-center">
        <span>{{ title }}</span>
    </router-link>
</template>
<script>
export default {
    name: 'cBtnRouter',
    props: {
        title : '',
        addClass : {
            type: Array
        },
        path : {}
    }
}
</script>