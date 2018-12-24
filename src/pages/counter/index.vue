<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>

    <a href="/pages/index/index" class="home">去往首页</a>
  </div>
</template>

<script>
// Use Vuex
// import store from '../../store/store.js'

export default {
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    increment () {
      this.$store.commit('increment')
      this.$fly.get("user/weChatApplet/getWXEncKey",{
        code: "12345677",
        typeFlag: "exception"
      }).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    },
    decrement () {
      this.$store.commit('decrement')
    }
  }
}
</script>

<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
