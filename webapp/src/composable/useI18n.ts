import { reactive } from "vue"
import en from "../locales/en"

let messages = reactive(en)

export function useI18n () {
    return {
        messages,
        changeLocale (key: string) {
            import(`../locales/${key}.ts`)
                .then((data) => Object.assign(messages, data.default))
                .catch(console.error)
        }
    }
}