import {useCookie} from "nuxt/app";
// import {consola} from "consola";

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    // console.log("config", config)
    // consola.debug('configa ...')

    const apiFetch = $fetch.create({
        baseURL: config.public.apiBase,
        onRequest({ options }) {
            const token = useCookie('auth_token')?.value
            if (token) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${token}`
                }
            }
        },
        onResponse({ response }) {
            // Optional: transform response or log
        },
        onResponseError({ response }) {
            if (response?.status === 401) {
                console.warn('Unauthorized — maybe redirect to login')
            }
        }
    })

    return {
        provide: {
            api: apiFetch
        }
    }
})
