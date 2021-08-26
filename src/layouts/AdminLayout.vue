<template>
  <div>
        <Navigation/>
        <TopBar/>
        <transition name="slide" mode="out-in">
            <router-view></router-view>
        </transition>
  </div>
</template>

<script>
import Navigation from '../components/Navigation'
import TopBar from '../components/TopBar'

export default {
  name: 'App',
  components:{
    Navigation,
    TopBar
  },
  data: () => ({
    //
  }),
};
</script>

<style>
.slide-enter-active {
  transition: all .3s ease;
}
.slide-leave-active {
  transition: all .3s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

</style>