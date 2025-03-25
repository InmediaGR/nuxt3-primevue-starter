import type { FetchOptions } from 'ofetch'
import { $fetch } from 'ofetch'
// import {useCookie} from "nuxt/app";

export const useApi = () => {
    const config = useRuntimeConfig()
    const baseURL = import.meta.dev
        ? '/dev'
        : config.public.apiBase

    // const token = useCookie('auth_token')
    const store = useAuthStore()

    const api = $fetch.create({
        baseURL: baseURL,
        onRequest: async ({ options, request }) => {
            // const token = useCookie('auth_token')
            const token = 'dd'
            const { isAuthResolved, lastAuthCheck } = storeToRefs(store)
            // Wait until auth is resolved
            // const { isAuthResolved } = useAuth()

            const isAuthCheck = request.toString().includes('/auth/refresh')

            if (!isAuthResolved.value ) {
                if (!isAuthCheck) {
                    await until(isAuthResolved).toBe(true)
                }
                console.log("!isAuthResolved", isAuthResolved.value, lastAuthCheck.value, request.toString())
            } else {
                console.log("useApi", isAuthResolved.value, lastAuthCheck.value, request.toString())
            }

            if (token.value) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${token.value}`
                }
            }
        },
        onResponse({ response }) {
            const accessToken = response._data?.access_token
            const refreshToken = response._data?.refresh_token

            // todo check if here or in store
            // if (accessToken) {
            //     useCookie('auth_token').value = accessToken
            // }
            //
            // if (refreshToken) {
            //     useCookie('refresh_token').value = refreshToken
            // }
        },
        onResponseError({ response }) {
            if (response.status === 401) {
                const route = useRoute()
                console.warn('Unauthorized', route)
                if (route.meta.requiresAuth) {
                    useCookie('auth_token').value = null
                    useCookie('refresh_token').value = null
                    return navigateTo('/login')
                }

                // Otherwise, fail silently (guest API call)
                throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
            }
        }
    }) as <T>(url: string, options?: FetchOptions) => Promise<T>

    const request = async <T>(url: string, options?: FetchOptions): Promise<T> => {
        return await api<T>(url, options)
    }

    const get = async <T>(url: string, query?: Record<string, any>): Promise<T> => {
        return await request<T>(url, { method: 'GET', query })
    }

    const post = async <T>(url: string, body: any): Promise<T> => {
        const headers: Record<string, string> = {}

        if (typeof FormData !== 'undefined' && body instanceof FormData) {
            // Let the browser set content-type + boundaries
        } else {
            headers['Content-Type'] = 'application/json'
        }

        return await request<T>(url, { method: 'POST', body, headers })
    }

    const patch = async <T>(url: string, body: any): Promise<T> => {
        const headers: Record<string, string> = {}

        if (typeof FormData !== 'undefined' && body instanceof FormData) {
            // Let it handle it
        } else {
            headers['Content-Type'] = 'application/json'
        }

        return await request<T>(url, { method: 'PATCH', body, headers })
    }

    const del = async <T>(url: string): Promise<T> => {
        return await request<T>(url, { method: 'DELETE' })
    }

    return { get, post, patch, del, request }
}
