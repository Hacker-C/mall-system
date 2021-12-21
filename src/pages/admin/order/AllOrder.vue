<template>
  <Container>
    <template slot>
      <SubHeader>
        <template v-slot>管理所有订单</template>
      </SubHeader>
    </template>
  </Container>
</template>

<script>
const SubHeader = () => import('../../components/SubHeader.vue')
const Container = () => import('../../components/Container.vue')

export default {
  components: {
    SubHeader,
    Container
  }
}
</script>

<style>
</style>