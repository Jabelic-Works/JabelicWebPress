<script setup lang="ts">import { titles } from '~~/i18n/constant';
import { useLocaleStore } from '~~/store/locale';
import { useBlogList } from '../interactors/blogList';
import Contents from '~/src/components/Contents.vue'
useHead(
    {
      titleTemplate: '%s',
      bodyAttrs: {
        class: 'rtl'
      }
    }
)
const trans = ref(true)
setTimeout(() => {trans.value = false}, 2500);
const store = useLocaleStore()
const _titles = computed(()=>titles[store.getLocale])


// FIXME: propsでコンテンツを入れる
const contents = (await useLazyAsyncData(async ()=>await useBlogList())).data
watch(()=>store.getLocale, async (arg)=>{
    contents.value = (await useLazyAsyncData(async ()=>await useBlogList())).data.value
})

</script>

<template>
    <div class="transition" :class="{'anim-trans': trans }"></div>
    <div class="root">
        <div class="sub-header">
            <h1>{{ _titles.subTitle }}</h1>
        </div>
        <Contents v-if="contents" :contents="contents"/>
    </div>
</template>

<style scoped>
.sub-header{
    padding-left: 3%;
    padding-top: 3%;
    padding-bottom: 3%;
}
h1{
    font-size: 28px;
    padding-top: 1%;
}
h3{
    font-size: 20px;
    padding-top: 1%;
}
@media screen and (max-width:768px){
    h1{
        font-size: 30px;
        padding-top: 3%;
    }
    h3{
        font-size: 16px;
        padding-top: 3%;
    }
}

</style>