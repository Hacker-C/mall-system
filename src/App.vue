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
      filesUploadUrl: 'localhost'
    }
  }
}
</script>

<style>
</style>
