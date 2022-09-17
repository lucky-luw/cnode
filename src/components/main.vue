<template>
    <div>
        <Header/>
        <keep-alive>
            <router-view ></router-view>
        </keep-alive>
    </div>
</template>

<script>
import Header from './header.vue';
export default {
    components:{
        Header
    },
    methods: {
       
    },
}
</script>
