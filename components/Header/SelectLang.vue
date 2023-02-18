<script setup lang="ts">
import { Locales } from '~~/i18n/locale';
import { switchLangLabels } from '~~/i18n/constant';
import { useLocaleStore } from '~~/store/locale';

/** i18n */
const store = useLocaleStore()
const locale = ref<Locales>(store.getLocale)
const route = useRoute()
watch(locale,(arg)=>{ store.switchLang(arg) })
const isShowLangSwitcher = computed(()=>!route.path.includes('article'))

</script>
<template>
    <form class="switch-form">
        <label for="locale-select">language: </label>
        <select id="locale-select" v-model="locale">
            <option value="en">{{ switchLangLabels.en }}</option>
            <option value="ja">{{ switchLangLabels.ja }}</option>
        </select>
    </form>
</template>