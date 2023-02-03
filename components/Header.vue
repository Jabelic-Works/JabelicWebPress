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
const mainColor = ref(appConfig.theme.colors.main)
</script>

<template>
    <div class="header-root">
        <span></span>
        <NuxtLink v-for="content in contents" class="content set-item-center" :to="content.link" :target="content.target" rel="noopener">
            <!-- <span class="title" :to="content.link" :target="content.target" rel="noopener">{{ content.title }}</span> -->
            <span class="title">{{ content.title }}</span>
        </NuxtLink>
    </div>
</template>

<style>
.header-root{
    display: grid;
    grid-template-rows: 40px;
    grid-template-columns: 75% 1fr 1fr 1fr;
    height: 3.5vh;
    background-color: v-bind(mainColor);
}
.content{
    font-size: 14px;
    padding: 1%;
    text-decoration: none;
}
.set-item-center{
/** アイテムを中央にそろえる */
    display: grid;
    place-items: center;
}
</style>