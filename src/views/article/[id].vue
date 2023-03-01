<script setup lang="ts">
import { RuntimeConfig } from '@nuxt/schema';
import { Article } from '@/adapter/article';
import { useLocaleStore } from '~~/store/locale';

const config:RuntimeConfig = useRuntimeConfig()
const route = useRoute()
const store = useLocaleStore()

const contents = await useFetchBlogContent()
watch(()=>store.getLocale, async (arg)=>{
    const _contents = await useFetchBlogContent()
    contents.value = _contents.value
})

/** All listed items must be kind of heading tag(h1, h2, h3, ...) */
type ListedMenu  = Array<{
    text: string;
    id: string|undefined;
    child: Array<ListedMenu>
}>
const { structuredMenu } = useHtmlParser(contents)
const { menu, transition, transitionTimeoutMs, openMenu, closeMenu } = useMenu(contents)

/** extract title */
const { extractTitle } = useTitleAndDescription()

/** header */
useHead({
    titleTemplate: `%s - ${contents.value?.title}`,
    bodyAttrs: {
        class: 'rtl'
    }
})

/** animation */
const animationDuration = ref(`${transitionTimeoutMs/1000}s`)
const trans = ref(true)
setTimeout(() => { trans.value = false }, 2500);
</script>

<template>
    <div class="transition" :class="{'anim-trans': trans }"></div>
    <div class="root">
        <div class="title">
            {{ extractTitle(contents?.title ?? "") }}
        </div>
        <div class="main">
            <div class="content">
                    <!-- 折りたたみ状態のmenu -->
                <div @click.stop="openMenu" class="menu">
                    <template v-if="!menu.isOpen">
                        <div @click.stop="openMenu" class="menu-btn">
                            <img src="@/assets/img/menu_open.svg" alt="menu" class="menu-btn-img">
                        </div>
                    </template>
                </div>
                <!-- 本文 -->
                <div v-html="contents?.content" class="article"></div>
                <!-- overlay -->
                <div v-if="menu.isOpen"  @click="closeMenu" class="shadow" :class="{'fadeout':transition}"></div>
                <!-- menu bar -->
                <div v-if="menu.isOpen" class="menu-bar menu-bar-transition" :class="{ 'fadeOutToRight' : transition }">
                    <div @click.stop="closeMenu" class="close-menu-btn-row">
                        <div class="close-menu-btn">
                            <img src="@/assets/img/close-btn.svg" alt="close-btn">
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
    height: 4vh;
    font-size: 1.8rem;
    padding-left: 1rem;
    display: grid;
    /* place-items: 縦 横;  */
    place-items: center start;
    white-space: pre;
    overflow-x: scroll;
    box-shadow: 2px 2px 2px 2px  rgba(83, 235, 60, 0.224);
}
.content {
  display: grid;
  grid-template-columns: 5vw 95vw;
  padding: 0%;
  position: relative
}
.menu{
    background-color: rgba(36, 89, 65, 1);
    width: 5vw;
    box-shadow: 0.2rem 0.3rem 0.3rem  rgba(83, 235, 60, 0.224);
}
.menu-btn{
    /* height: 100vh; */
    display: grid;
    place-content: center;
    transition: 0.5s;
}


/* 左から右にフェードイン */
.menu-bar-transition{
    animation-name:fadeLeftAnime;
    animation-duration:v-bind(animationDuration);
    animation-fill-mode:forwards;
    opacity:0;
}
@keyframes fadeLeftAnime{
  from {
    opacity: 0;
  transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 右から左へフェードアウト */
.fadeOutToRight{
    animation: fadeout v-bind(animationDuration) ease 0s 1 forwards;
  }
  @keyframes fadeout {
  0% {
     opacity: 1;
     transform: translateX(0);
  }
  100% {
     opacity: 0;
     transform: translateX(-30vw);
  }
}

.menu-btn-img{
    height: 5vh;
    place-content: center;
}
.menu:hover{
    background-color: rgba(36, 89, 65, 0.9);
}
.menu:active{
    background-color: rgba(36, 89, 65, 0.8);
}

.menu-bar{
    width: 40vw;
    height: 120%;
    background-color: #245941;
    /*
        親要素が position: relative; (or fixed) であれば
        子要素がposition: absolute;のときに 親要素の左上が起点となる
        fixedではscrollしても同じ位置に固定される

    */
    position: fixed;
    top: 0vh;
    left: 0px;
    z-index: 1;
    transition: all 0.2s 1s ease-in-out;
}
.shadow{
    position: fixed;
    left: 0; top: 0;
    width: 100%;
    height: 100%;
    background: rgba(100, 100, 100, .8);
    animation: fadein v-bind(animationDuration) ease 0s 1 forwards;
}
@keyframes fadein {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
/** 背景要素(白い影)をfadeoutさせる */
.shadow.fadeout{
    animation: fadeout v-bind(animationDuration) ease 0s 1 forwards;
    height: 120%;
}
@keyframes fadeout {
  0% { opacity: 1; }
  100% { opacity: 0; }
}


.close-menu-btn-row{
    display: grid;
    place-content: center end;
}
.close-menu-btn{
    padding: 0.5rem;
    padding-left: 2rem;
    padding-bottom: 2rem;
    padding-right: 2rem;
    transition: 0.5s;
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
    margin-left: 7vw;
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
    transition: 0.5s;
    color: white;
}
.root :deep(a:hover){
    color: yellow;
}
.root :deep(a:active){
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
        height: 5vh;
        font-size: 1rem;
        display: grid;
        /* place-items: 縦 横;  */
        place-items: center start;
        white-space: pre;
        overflow-x: scroll;
    }
    .content {
        display: grid;
        grid-template-columns: 8vw 92vw;
        padding: 0%;
    }
    .menu{
        width: 10vw;
    }
    .menu-btn{
        place-content: center;
    }
    .menu-btn-img{
        /* height: 10vh; */
        display: grid;
        place-content: start center;
    }
    .menu-bar{
        width: 60vw;
        height: 120%;
        background-color: #245941;
        top: 0vh;
        left: 0px;
        z-index: 1;
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
        transition: 0.5s;
    }
    .root :deep(img){
        width: 90%;
        display: block;
        margin: auto;
        margin-top: 1em;
    }
}
img{
    margin: 0px;
}
</style>