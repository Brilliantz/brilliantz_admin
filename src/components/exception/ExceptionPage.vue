<template>
  <div class="exception-page">
    <div class="img">
      <img :src="config[type].img" />
    </div>
    <div class="content">
      <h1>{{config[type].title}}</h1>
      <div class="desc">{{config[type].desc}}</div>
      <div class="action">
        <v-btn type="primary" @click="backHome">Back to Login Page</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Config from './typeConfig'

export default {
  name: 'ExceptionPage',
  props: ['type', 'homeRoute'],
  data () {
    return {
      config: Config
    }
  },
  methods: {
    backHome() {
      if (this.homeRoute) {
        this.$router.push(this.homeRoute)
      }
      this.$emit('backHome', this.type)
    }
  }
}
</script>

<style >
  .exception-page{
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: whitesmoke;
  }
  .exception-page .img{
    padding-right: 52px;
    zoom: 1;
  }
  .exception-page .img img{
    max-width: 430px;
  }
  .exception-page .content h1{
    color: #434e59;
    font-size: 72px;
    font-weight: 600;
    line-height: 72px;
    margin-bottom: 24px;
  }
  .exception-page .content .desc{
    color: black;
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 16px;
  }

</style>
