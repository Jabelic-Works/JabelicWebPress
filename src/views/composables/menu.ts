import { Article } from '~~/src/useCases/article'
import { ComputedRef, Ref } from 'nuxt/dist/app/compat/vue-demi'

export const useMenu = (contents: Ref<Article | null>, innerWidth: ComputedRef<number>) => {
  const menu = useState<{ isOpen: boolean }>('menu', () => ({
    isOpen: false
  }))
  const transition = ref(false)
  const transitionTimeoutMs = 500
  const openMenu = () => (menu.value.isOpen = true)
  const closeMenu = () => {
    transition.value = true
    setTimeout(() => {
      transition.value = false
      menu.value.isOpen = false
    }, transitionTimeoutMs)
  }
  const menuState = computed(() => {
    if (typeof window !== 'undefined' && innerWidth.value < 600) return 'small'
    else if (typeof window !== 'undefined' && innerWidth.value < 1200) return 'medium'
    else if (typeof window !== 'undefined' && innerWidth.value > 1200) return 'large'
  })
  return { menu, openMenu, closeMenu, transition, transitionTimeoutMs, menuState }
}
