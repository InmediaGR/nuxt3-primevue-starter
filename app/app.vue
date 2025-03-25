<script setup>


useHead({
  title: 'Nuxt 3 PrimeVue Starter 4',
})



onBeforeMount(async () => {
  console.log("app onBeforeMount")

  const auth = useAuthStore()
  await auth.checkUser('app')
})

</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang='scss'>
@use 'App.scss';
</style>
