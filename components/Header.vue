<script setup lang="ts">
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

const appConfig = useAppConfig()
const mainDarkColor = ref(appConfig.theme.colors.mainDark)
</script>

<template>
    <div class="header-root">
        <span>
            <NuxtLink v-if="$route.path !== '/'" class="back" to="/">
                ←ホームに戻る
            </NuxtLink>
        </span>
        <NuxtLink v-for="content in contents" class="content set-item-center" :to="content.link" :target="content.target" rel="noopener">
            <!-- <span class="title" :to="content.link" :target="content.target" rel="noopener">{{ content.title }}</span> -->
            <span class="title">{{ content.title }}</span>
        </NuxtLink>
    </div>
</template>

<style scoped>
.header-root{
    display: grid;
    grid-template-rows: 40px;
    grid-template-columns: 75% 1fr 1fr 1fr;
    height: 3.5vh;
    background-color: v-bind(mainDarkColor);
}
.content{
    font-size: 14px;
    height: 3.5vh;
    text-decoration: none;
    color: aliceblue;
}
.content:hover{
    background-color: rgba(193, 193, 193, 0.2);
}
.content:active{
    background-color: rgba(193, 193, 193, 0.5);
}
.set-item-center{
/** アイテムを中央にそろえる */
    display: grid;
    place-items: center;
}

.back{
    font-size: 14px;
    width: 12vw;
    height: 3.5vh;
    text-decoration: none;
    display: grid;
    place-items: center;
    color: aliceblue;
}
.back:hover{
    background-color: rgba(193, 193, 193, 0.3);
}
</style>