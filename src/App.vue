<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Layout from './layout/Layout.vue'

export default {
  name: 'app',
  components: {
    Layout
  },
  data() {
    return {
      filesUploadUrl: '124.222.44.115:9092'
    }
  }
}
</script>

<style>
</style>
