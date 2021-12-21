<template>
  <Container>
    <template slot>
      <SubHeader>
        <template v-slot>欢迎光临！！！</template>
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