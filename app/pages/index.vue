<script setup lang='ts'>
import AdvertiseBox from '@/components/AdvertiseBox.vue'
import { useI18n } from 'vue-i18n'

// import {definePageMeta} from "nuxt/dist/pages/runtime";

const { locale, setLocale } = useI18n()
// const config = useRuntimeConfig()

// setLocale('de') // forces lazy load

// import messages from '~~/i18n/locales/de.json' // ✅ Use `~` for root-relative
// console.log("messages", messages.welcome) // Should print "Willkommen!"

const { get, post, del } = useApi()

onMounted(async () => {


  // const response = await post<any>('/tipster/hot', {})

  // console.log("index", response)
})


// definePageMeta({
//   requiresAuth: true
// })
</script>

<template>
  <div class="card surface-0 text-center">
    <div class="mb-3 font-bold text-4xl">
      <span class="text-green-600">PrimeVue {{ $t('welcome') }}</span>
      <span class="text-blue-400"> & TypeScript</span>
      <span class="text-green-400"> & Nuxt 3</span>
    </div>
    <div class="language-switcher">
      <select v-model="locale" @change="setLocale($event.target.value)">
        <option value="en">🇬🇧 English</option>
        <option value="de">🇩🇪 Deutsch</option>
      </select>
    </div>
    <h2 class="text-2xl pb-6">
      Starter for Vue.js Development with Nuxt 3.
    </h2>
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-2">
      <AdvertiseBox header="Vue Sidebar" icon="prime-check-circle" color="green-600">
        <ExternalLink href="https://github.com/yaminncco/vue-sidebar-menu" text="Sidebar" /> component
      </AdvertiseBox>
      <AdvertiseBox header="Nitro" icon="prime-check-circle" color="green-400">
        <ExternalLink href="https://nitro.unjs.io/" text="Nitro" />: Next Generation Server Toolkit
      </AdvertiseBox>
      <AdvertiseBox header="Vitest" icon="prime-check-circle" color="blue-600">
        Testing with Vitest
      </AdvertiseBox>
    </div>
  </div>
</template>

<style scoped></style>
