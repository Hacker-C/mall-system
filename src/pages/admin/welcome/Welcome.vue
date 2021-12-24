<template>
  <Container>
    <template slot>
      <SubHeader>
        <template v-slot>欢迎光临！！！</template>
      </SubHeader>
      <i>这里是在线商城的管理员后台。</i>
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

<style scoped>
i {
  color: #666;
}
</style>