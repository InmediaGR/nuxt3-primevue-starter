import { defineStore } from 'pinia'


export const useAuthStore = defineStore('auth', () => {
    const user = ref<any>(null)
    const isAuthResolved = ref(false)
    const lastAuthCheck = ref(0)

    const isLoggedIn = computed(() => !!user.value)

    async function fetchUser(from) {
        const now = Date.now()
        const freshnessThreshold = 1000 * 60 * 5 // 5 minutes

        const isServer = typeof window === 'undefined'
        const isFresh = now - lastAuthCheck.value < freshnessThreshold

        if (!isServer && isAuthResolved.value && isFresh) return


        // const token = useCookie('auth_token')
        // const refreshToken = useCookie('auth_token')

        console.log("*************** fetchUser Store ***************:")

        try {
            const { get } = useApi()
            user.value = await get('/account')
        } catch(e) {
            console.log("*************** fetchUser Store Error ***************:", from, e)
            user.value = null
        } finally {
            isAuthResolved.value = true
            lastAuthCheck.value = now

        }
    }

    function logout() {
        const router = useRouter()

        // useCookie('auth_token').value = null
        // useCookie('refresh_token').value = null

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
        fetchUser,
        logout,
        hasRole
    }
})
