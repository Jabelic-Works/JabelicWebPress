<script setup lang="ts">
import { locales, Locales } from '~~/model/locale';
import { useLocaleStore } from '~~/store/locale';
const router = useRouter()

/** 右上メニュー */
type Contents = Array<{title: string, link: string, target: '_blank' | null}>
const contents = ref<Contents>([
    {
        title: 'Home',
        link: '/',
        target: null
    },
    {
        title: 'Profile',
        link: '/profile',
        target: null
    },
    {
        title: 'GitHub',
        link: 'https://github.com/jabelic',
        target: '_blank'
    }
])

/** カラー */
const appConfig = useAppConfig()
const mainDarkColor = ref(appConfig.theme.colors.mainDark)

/** 戻るボタン */
const backTo = ()=>router.back()

/** i18n */
const locale = ref<Locales>(locales.default)
const store = useLocaleStore()
watch(locale,(arg)=>{ store.switchLang(arg) })
</script>

<template>
    <div class="header-root">
        <span class="left">
            <NuxtLink v-if="$route.path !== '/'" class="back" @click="backTo()">
                ←戻る
            </NuxtLink>
            <div class="lang-switch">
                <form class="switch-form">
                    <label for="locale-select">language: </label>
                    <select id="locale-select" v-model="locale">
                        <option value="en">English</option>
                        <option value="ja">日本語</option>
                    </select>
                </form>
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
    grid-template-columns: 75% 1fr 1fr 1fr;
    height: 4vh;
    background-color: v-bind(mainDarkColor);
    /* position: fixed; */
}
.left{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
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
    height: 4vh;
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

.back{
    font-size: 14px;
    width: 10vw;
    height: 4vh;
    text-decoration: none;
    display: grid;
    place-items: center;
    color: aliceblue;
    transition: 0.5s;
}
.back:hover{
    text-decoration:underline;
}
.back:active{
    color: rgba(30, 255, 0, 0.9);
}
@media screen and (max-width:768px){
    .header-root{
        display: grid;
        grid-template-rows: 40px;
        grid-template-columns: 50% 1fr 1fr 1fr;
        height: 6vh;
        background-color: v-bind(mainDarkColor);
    }
    .back{
        font-size: 10px;
        width: 15vw;
        height: 6vh;
    }
    .content{
        font-size: 14px;
        height: 6vh;
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