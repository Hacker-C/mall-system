<template>
  <h3 class="header">
    <slot></slot>
  </h3>
</template>

<script>
export default {}
</script>

<style scoped>
.header {
  color: #333;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  margin-bottom: 10px;
  font-weight: 400;
  font-size: 20px;
}
</style>