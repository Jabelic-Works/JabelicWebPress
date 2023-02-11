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
const router = useRouter()
const backTo = ()=>router.back()
</script>

<template>
    <div class="header-root">
        <span>
            <NuxtLink v-if="$route.path !== '/'" class="back" @click="backTo()">
                ←戻る
            </NuxtLink>
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
        height: 4vh;
        background-color: v-bind(mainDarkColor);
    }
    .back{
        font-size: 10px;
        width: 15vw;
        height: 4vh;
    }
    .content{
    font-size: 14px;
    height: 4vh;
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