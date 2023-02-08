
import { Article } from '@/adapter/article';
import { Ref } from 'nuxt/dist/app/compat/vue-demi';


export const useMenu = (contents: Ref<Article|null>) => {
    const menu = useState<{ isOpen: boolean }>('menu', () => ({
        isOpen: false
    }))
    const transition = ref(false)
    const transitionTimeoutMs = 500
    const openMenu = ()=> menu.value.isOpen = true
    const closeMenu = ()=> {
        transition.value = true
        setTimeout(()=>{
            transition.value = false
            menu.value.isOpen = false
        },transitionTimeoutMs)
    }


    return { menu, openMenu, closeMenu, transition, transitionTimeoutMs }
}