<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.container {
  padding: 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  border-radius: 5px;
  /* background-color: #fff; */
}
</style>