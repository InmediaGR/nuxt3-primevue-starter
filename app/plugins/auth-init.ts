import {callWithNuxt} from "nuxt/app";

export default defineNuxtPlugin(async (nuxtApp) => {
    // const refreshToken = useCookie('refresh_token')
    // refreshToken.value = 'my-token' // ✅ Works in SSR + client

    // const { fetchUser } = useAuth()
    // await fetchUser('auth-init')

    // const auth = useAuthStore()
    // await auth.fetchUser('auth-init')

    // await callWithNuxt(nuxtApp, () => auth.fetchUser('auth-init'))

    // await callWithNuxt(nuxtApp, async () => {
    //     await auth.fetchUser('auth-init')
    // })
})
