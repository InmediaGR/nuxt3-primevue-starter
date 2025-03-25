import { createI18nPlugin, de, en } from '@formkit/i18n'
import { useI18n } from '#imports'
import {defineNuxtPlugin} from "nuxt/app";

const customEn = {
    validation: {
        required: 'This field is really important!',
        email: 'Hmm, that doesn’t look like an email address...',
        min: 'Too short! Minimum: {{ args.0 }} characters.',
    }
}

const customDe = {
    validation: {
        required: 'Dieses Feld muss unbedingt ausgefüllt werden!',
        email: 'Diese E-Mail-Adresse sieht ungültig aus...',
        min: 'Zu kurz! Mindestens {{ args.0 }} Zeichen.',
    }
}

export default defineNuxtPlugin((nuxtApp) => {
    const { locale } = useI18n()
    console.log('[formkit-i18n] Plugin loaded')
    nuxtApp.hook('formkit:config', (formkitConfig) => {
        formkitConfig.plugins = [
            createI18nPlugin({
                en: {
                    ...en,
                    messages: {
                        ...en.messages,
                        ...customEn,
                    }
                },
                de: {
                    ...de,
                    messages: {
                        ...de.messages,
                        ...customDe,
                    }
                }
            })
        ]

        formkitConfig.locale = locale.value

        watch(locale, (newLocale) => {
            formkitConfig.locale = newLocale
        })
    })
})
