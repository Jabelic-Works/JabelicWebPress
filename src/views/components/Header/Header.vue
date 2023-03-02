<script setup lang="ts">
import { titles } from '~~/src/shared/i18n/constant';
import { locales, Locales } from '~~/src/shared/i18n/locale';
import { useLocaleStore } from '~~/store/locale';
import SelectLang from '~/src/views/components/Header/SelectLang.vue'
const router = useRouter()

/** 右上メニュー */
type Contents = Array<{title: string, link: string, target: '_blank' | null}>
const contents = ref<Contents>([
    { title: 'Home', link: '/', target: null },
    { title: 'Profile', link: '/profile', target: null },
    { title: 'GitHub', link: 'https://github.com/jabelic', target: '_blank' }
])

/** カラー */
const appConfig = useAppConfig()
const mainDarkColor = ref(appConfig.theme.colors.mainDark)

/** 戻るボタン */
const backTo = ()=>router.back()


/** i18n */
const route = useRoute()
const isShowLangSwitcher = computed(()=>!route.path.includes('article'))


const headerHeight = ref("5vh")
const mobileheaderHeight = ref("7vh")
</script>

<template>
    <div class="header-root">
        <span class="left">
            <NuxtLink class="header-title" @click="$event=>backTo()">
                {{ titles.ja.title }}
            </NuxtLink>
            <div v-if="isShowLangSwitcher" class="lang-switch">
                <SelectLang/>
            </div>
        </span>
        <NuxtLink v-for="content in contents" class="content set-item-center" :to="content.link" :target="content.target" rel="noopener">
            <span class="title">{{ content.title }}</span>
        </NuxtLink>
    </div>
</template>

<style scoped>
.header-root{
    display: grid;
    grid-template-rows: 40px;
    grid-template-columns: 70% 1fr 1fr 1fr;
    height: v-bind(headerHeight);
    background-color: v-bind(mainDarkColor);
}
.left{
    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr 1fr;
    grid-template-columns: 1fr auto 10fr;
}
.home-icon{
    width: auto;
    height: 100%;
}
.lang-switch{
    display: flex;
    justify-content: center;
}
.switch-form{
    margin: auto;
    text-align:center;
}

.content{
    font-size: 14px;
    height: v-bind(headerHeight);
    text-decoration: none;
    color: aliceblue;
    transition: 0.5s;
}
.content:hover{
    text-decoration:underline;
}
.content:active{
    text-decoration:underline;
    color: rgba(30, 255, 0, 0.9);
}
.set-item-center{
/** アイテムを中央にそろえる */
    display: grid;
    place-items: center;
}

.header-title{
    font-size: 18px;
    width: 12vw;
    max-width: 25vw;
    min-width: 20vw;
    height: v-bind(headerHeight);
    text-decoration: none;
    display: grid;
    place-items: center;
    color: aliceblue;
    transition: 0.5s;
}
.header-title:hover{
    text-decoration:underline;
}
.header-title:active{
    color: rgba(30, 255, 0, 0.9);
}
@media screen and (max-width:768px){
    .header-root{
        display: grid;
        grid-template-rows: 40px;
        grid-template-columns: 50% 1fr 1fr 1fr;
        height: v-bind(mobileheaderHeight);
        background-color: v-bind(mainDarkColor);
    }
    .header-title{
        font-size: 12px;
        width: 15vw;
        max-width: 20vw;
        height: 6vh;
    }
    .content{
        font-size: 14px;
        height: v-bind(mobileheaderHeight);
        text-decoration: none;
        color: aliceblue;
        transition: 0.5s;
    }
    .content:hover{
        background-color: rgba(193, 193, 193, 0.2);
    }
    .content:active{
        background-color: rgba(193, 193, 193, 0.5);
    }
}

</style>