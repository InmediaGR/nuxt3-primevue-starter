import axios from 'axios'
import type { AxiosInstance } from 'axios'
// import {defineNuxtPlugin, useRuntimeConfig} from "nuxt/app";
// import {defineNuxtPlugin, useCookie, useRuntimeConfig} from "nuxt/app";

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    const instance: AxiosInstance = axios.create({
        baseURL: config.public.apiBase || 'https://api.example.com',
        timeout: 10000,
        headers: {
            Accept: 'application/json',
        },
    })

    // ✅ Request interceptor
    instance.interceptors.request.use(
        (config) => {
            const token = useCookie('auth_token')?.value
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            // Modify request if needed
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    // ✅ Response interceptor
    instance.interceptors.response.use(
        (response) => {
            // Optionally transform or log response
            return response
        },
        (error) => {
            const status = error.response?.status
            if (status === 401) {
                console.warn('Unauthorized - maybe redirect to login')
                // You could use navigateTo('/login') here
            }
            return Promise.reject(error)
        }
    )

    return {
        provide: {
            axios: instance
        }
    }
})
