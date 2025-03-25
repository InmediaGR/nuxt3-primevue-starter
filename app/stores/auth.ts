import { defineStore } from 'pinia'


export const useAuthStore = defineStore('auth', () => {
    const user = ref<any>(null)
    const isAuthResolved = ref(false)
    const lastAuthCheck = ref(0)

    const isLoggedIn = computed(() => !!user.value)

    async function checkUser(from) {
        const token = useCookie('auth_token')
        const refreshToken = useCookie('refresh_token')
        const now = Date.now()
        if (!token.value || !refreshToken.value) {
            token.value = null
            refreshToken.value = null
            user.value = null
            isAuthResolved.value = true
            lastAuthCheck.value = now
            console.error("*************** No Tokens, No Refresh ***************:", token.value, refreshToken.value)
            return; // navigateTo('/login')
        }

        const freshnessThreshold = 1000 * 60 * 5 // 5 minutes

        const isServer = typeof window === 'undefined'
        const isFresh = now - lastAuthCheck.value < freshnessThreshold

        if (!isServer && isAuthResolved.value && isFresh) return

        console.log("*************** fetchUser Store ***************:", token.value, refreshToken.value, lastAuthCheck.value)

        try {
            const { post } = useApi()
            user.value = await post('/auth/refresh', {
                accessToken: token.value,
                refreshToken: refreshToken.value,
            })
        } catch(e) {
            console.error("*************** fetchUser Store Error ***************:", from, e)
            user.value = null
            token.value = null
            refreshToken.value = null
        } finally {
            isAuthResolved.value = true
            lastAuthCheck.value = now
        }
    }

    function logout() {
        const router = useRouter()

        useCookie('auth_token').value = null
        useCookie('refresh_token').value = null

        user.value = null
        isAuthResolved.value = false
        lastAuthCheck.value = 0

        router.push('/login')
    }

    function hasRole(role: string) {
        return user.value?.roles?.includes(role)
    }

    return {
        user,
        isAuthResolved,
        lastAuthCheck,
        isLoggedIn,
        checkUser,
        logout,
        hasRole
    }
})
