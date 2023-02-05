<script setup lang="ts">
import { RuntimeConfig } from '@nuxt/schema';
import { Article } from '@/adapter/article';

const config:RuntimeConfig = useRuntimeConfig()
const route = useRoute()
const { data: contents, pending, error, refresh } = await useFetch<Article>("https://jabelicwebpress.microcms.io/api/v1/blogs"+`/${route.params.id}`, {
    headers:{
        "X-MICROCMS-API-KEY": config.apikey
    },
})
const { menu ,openMenu, closeMenu, menuContent, structuredMenu } = useMenu(contents)

</script>

<template>
    <div class="root">
        <div class="title">
            {{contents?.title}}
        </div>
        <div class="content">
            <!-- 折りたたみ状態のmenu -->
            <div class="menu">
                <template v-if="!menu.isOpen">
                    <div @click.stop="openMenu" class="menu-btn">
                        <img src="@/assets/img/menu_open.svg" alt="menu" class="menu-btn-img">
                    </div>
                </template>
            </div>
            <!-- 本文 -->
            <div v-html="contents?.content" class="article"></div>

            <!-- overlay -->
            <div v-if="menu.isOpen"  @click="closeMenu" class="blur"></div>

            <!-- menu bar -->
            <div v-if="menu.isOpen" class="menu-bar">
                <div @click.stop="closeMenu" class="close-menu-btn-row">
                    <div class="close-menu-btn">
                        x
                    </div>
                </div>
                <li v-for="h1 in structuredMenu" class="menu-bar-item">
                    <a :href="$route.path+`#${h1.id}`" @click.stop="closeMenu">
                    {{ h1.text }}
                    </a>
                    <li v-for="h2 in h1.child" class="menu-bar-item">
                        <a :href="$route.path+`#${h2.id}`" @click.stop="closeMenu">
                            {{ h2.text }}
                        </a>
                        <li v-for="h3 in h2.child" class="menu-bar-item">
                            {{ h3.text }}
                        </li>
                    </li>
                </li>
            </div>
        </div>
        <div class="dummy-margin"></div>
    </div>
    
</template>

<style scoped>
.root{
    border-top: dashed red;
    border-top: thick double white;
}
.title{
    background-color: #245941;
    width: 100vw;
    height: 5vh;
    font-size: 1.8rem;
    padding-left: 1rem;
    display: grid;
    /* place-items: 縦 横;  */
    place-items: center start;
}
.content {
  display: grid;
  grid-template-columns: 5vw 95vw;
  padding: 0%;
  position: relative
}
.menu{
    background-color: #245941;
}
.menu-btn{
    height: 7vh;
    display: grid;
    place-content: center;
}
.menu-btn-img{
    height: 5vh;
    display: grid;
    place-content: center;
}
.menu-btn:hover{
    background-color: rgba(175, 175, 175, 0.2);
}
.menu-btn:active{
    background-color: rgba(175, 175, 175, 0.5);
}
.menu-bar{
    width: 40vw;
    /* height: 100vh; */
    height: 100%;
    background-color: #245941;
    /*
        親要素が position: relative; (or fixed) であれば
        子要素がposition: absolute;のときに 親要素の左上が起点となる
    */
    position: absolute;
    top: 0vh;
    left: 0px;
    z-index: 100;
}
.blur{
    position: absolute;
    left: 0; top: 0;
    width: 100%; height: 100%;
    background: rgba(100, 100, 100, .8);
}
.close-menu-btn-row{
    display: grid;
    place-content: center end;
}
.close-menu-btn{
    padding: 1rem;
    padding-left: 2rem;
    padding-right: 2rem;
}
.close-menu-btn:hover{
    background-color: rgba(217, 217, 217, 0.2);
}
.close-menu-btn:active{
    background-color: rgba(217, 217, 217, 0.4);
}
.menu-bar-item{
    padding: 1vh;
}
.article{
    padding: 2vw;
    margin: 2vw;
}
/** ダミー要素 */
.dummy-margin{
    height: 1px;
}
/* NOTE: v-htmlにstyleを当てるには:deep(セレクタで指定しなければならない */
.root :deep(h1){
    font-size: 32px;
    margin-top: 2vh;
    margin-bottom: 2vh;
}
.root :deep(h2){
    font-size: 26px;
    margin-top: 1vh;
    margin-bottom: 1vh;
}
.root :deep(h3){
    font-size: 22px;
    margin-top: 1vh;
    margin-bottom: 1vh;
}
/** コードブロック */
.root :deep(pre){
    margin-top: 1em;
    background-color: rgba(20, 20, 20, 0.9);
    overflow-x: scroll;
    padding: 1vh;
}
/** コード */
.root :deep(code){
    background-color: rgba(20, 20, 20, 0.9);
    /* overflow-x: scroll;
    padding: 1rem; */
}
.root :deep(pre) :deep(code){
    font-size: 16px;
    padding: 0rem;
    background-color: rgba(20, 20, 20, 0);
}
.root :deep(p){
    font-size: 14px;
    margin-top: 1em;
}
.root :deep(ul){
    font-size: 14px;
    margin-top: 1em;
}
.root :deep(li){
    font-size: 14px;
    margin-top: 1em;
}
.root :deep(a){
    font-size: 14px;
    margin-top: 1em;
    color: yellow;
}
.root :deep(a:hover){
    color: rgba(30, 255, 0, 0.9);
}
.root :deep(img){
    width: 50%;
    display: block;
    margin: auto;
    margin-top: 1em;
}

@media screen and (max-width:768px){
    .title{
        background-color: #245941;
        width: 100vw;
        height: 4vh;
        font-size: 1.1rem;
        display: grid;
        /* place-items: 縦 横;  */
        place-items: center start;
    }
    .content {
        display: grid;
        grid-template-columns: 8vw 92vw;
        padding: 0%;
        position: relative
    }
    .menu-btn{
        height: 7vh;
        display: grid;
        place-content: center;
    }
    .menu-bar{
        width: 60vw;
        height: 100%;
        background-color: #245941;
        /*
            親要素が position: relative; (or fixed) であれば
            子要素がposition: absolute;のときに 親要素の左上が起点となる
        */
        position: absolute;
        top: 0vh;
        left: 0px;
        z-index: 100;
    }
    .article{
        padding: 3vw;
        margin: 3vw;
    }
    .root :deep(h1){
        font-size: 26px;
        margin-top: 2vh;
        margin-bottom: 2vh;
    }
    .root :deep(h2){
        font-size: 22px;
        margin-top: 2vh;
        margin-bottom: 2vh;
    }
    .root :deep(h3){
        font-size: 18px;
        margin-top: 1vh;
        margin-bottom: 1vh;
    }
    /** コードブロック */
    .root :deep(pre){
        margin-top: 1em;
        background-color: rgba(20, 20, 20, 0.9);
        overflow-x: scroll;
        padding: 1vh;
    }
    /** コード */
    .root :deep(code){
        background-color: rgba(20, 20, 20, 0.9);
        /* overflow-x: scroll;
        padding: 1rem; */
    }
    .root :deep(pre) :deep(code){
        font-size: 12px;
        padding: 0rem;
        background-color: rgba(20, 20, 20, 0);
    }
    .root :deep(p){
        font-size: 10px;
        margin-top: 1em;
    }
    .root :deep(ul){
        font-size: 10px;
        margin-top: 1em;
    }
    .root :deep(li){
        font-size: 10px;
        margin-top: 1em;
    }
    .root :deep(a){
        font-size: 10px;
        margin-top: 1em;
        color: yellow;
    }
    .root :deep(a:hover){
        color: rgba(30, 255, 0, 0.9);
    }
    .root :deep(img){
        width: 90%;
        display: block;
        margin: auto;
        margin-top: 1em;
    }
}
</style>