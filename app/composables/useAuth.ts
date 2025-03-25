// import {useState} from "nuxt/app";
// import {useApi} from "#build/app/composables/useApi";

export const useAuth = () => {
    // const user = useState('auth_user', () => null)
    // const isAuthResolved = useState('auth_resolved', () => false)
    // const lastAuthCheck = useState('last_auth_check', () => 0)



    // Optionally rebind or wrap fetchUser() here if needed
    // const fetchUser = store.fetchUser

    const store = useAuthStore()


    const fetchUser = async (from) => {
        const { user, isLoggedIn, isAuthResolved, lastAuthCheck } = storeToRefs(store)
        const now = Date.now()
        const freshnessThreshold = 1000 * 60 * 5 // 5 minutes

        const isServer = typeof window === 'undefined'
        const isFresh = now - lastAuthCheck.value < freshnessThreshold

        // Server check runs always (but only once per request)
        if (!isServer && isAuthResolved.value && isFresh) return


        try {
            const { get } = useApi()
            user.value = await get('/account')
            console.log("*************** fetchUser ***************:", from)
        } catch (err) {
            console.log("*************** fetchUser Error ***************:", from, err)
            user.value = null
        } finally {
            // isAuthResolved.value = true
            // lastAuthCheck.value = now
            store.isAuthResolved = true
            store.lastAuthCheck = now
        }


    }

    return {
        ...store,
        // user,
        // isLoggedIn,
        // isAuthResolved,
        // lastAuthCheck,
        fetchUser // ✅ re-expose fetchUser from store
    }
}
