import {navigateTo} from "nuxt/app";
// import {useAuth} from "#build/app/composables/useAuth";

export default defineNuxtRouteMiddleware((to) => {
    // const { user, isAuthResolved, fetchUser } = useAuth()
    //
    // if (!isAuthResolved.value) {
    //     return fetchUser('auth-global')
    // }
    //
    // // If page requires auth and user is missing
    // if (to.meta.requiresAuth && !user.value) {
    //     return navigateTo('/login')
    // }
})

// export default defineNuxtRouteMiddleware(async (to) => {
//     const auth = useAuthStore()
//
//     if (!auth.isAuthResolved) {
//         await auth.fetchUser('auth-global-mid')
//     }
//
//     if (to.meta.requiresAuth && !auth.isLoggedIn) {
//         return navigateTo('/login')
//     }
// })
