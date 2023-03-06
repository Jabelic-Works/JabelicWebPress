<script lang="ts" setup>
import { Ref } from 'nuxt/dist/app/compat/vue-demi';
import { StructuredMenuItem } from '~~/src/shared/utils/htmlParser';

type Props = {
    menus: {
        menu: {
            isOpen: boolean;
        };
        openMenu: () => boolean;
        closeMenu: () => void;
        transition: boolean;
        transitionTimeoutMs: number;
    },
    structuredMenus:{
        structuredMenu: StructuredMenuItem[] | undefined;
    },
    height: number
}
const props = defineProps<Props>()
const animationDuration = ref(`${props.menus.transitionTimeoutMs / 1000}s` ?? '0.5s')
</script>

<template>
    <!-- menu bar -->
    <div v-if="props.menus.menu.isOpen" class="menu-bar menu-bar-transition" :class="{ 'fadeOutToRight' : props.menus.transition }">
        <div @click.stop="props.menus.closeMenu" class="close-menu-btn-row">
            <div class="close-menu-btn">
                <img src="@/assets/img/close-btn.svg" alt="close-btn">
            </div>
        </div>
        <span v-if="props.structuredMenus.structuredMenu">
            <li v-for="h1 in props.structuredMenus.structuredMenu" class="menu-bar-item">
                <a :href="$route.path+`#${h1.id}`" @click.stop="props.menus.closeMenu">
                    {{ h1.text }}
                </a>
                <li v-for="h2 in h1.child" class="menu-bar-item">
                    <a :href="$route.path+`#${h2.id}`" @click.stop="props.menus.closeMenu">
                        {{ h2.text }}
                    </a>
                    <li v-for="h3 in h2.child" class="menu-bar-item">
                        {{ h3.text }}
                    </li>
                </li>
            </li>
        </span>
    </div>
</template>
<style scoped>
.close-menu-btn-row {
    display: grid;
    place-content: center end;
  }
  .close-menu-btn {
    padding: 0.5rem;
    padding-left: 2rem;
    padding-bottom: 2rem;
    padding-right: 2rem;
    transition: 0.5s;
  }
  .close-menu-btn:hover {
    background-color: rgba(217, 217, 217, 0.2);
  }
  .close-menu-btn:active {
    background-color: rgba(217, 217, 217, 0.4);
  }
  .menu-bar-item {
    padding: 1vh;
  }

  /* 左から右にフェードイン */
  .menu-bar-transition {
    animation-name: fadeLeftAnime;
    animation-duration: v-bind(animationDuration);
    animation-fill-mode: forwards;
    opacity: 0;
  }
  @keyframes fadeLeftAnime {
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
  .fadeOutToRight {
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
  .menu-btn-img {
    height: 5vh;
    place-content: center;
  }
  .menu:hover {
    background-color: rgba(36, 89, 65, 0.9);
  }
  .menu:active {
    background-color: rgba(36, 89, 65, 0.8);
  }

  .menu-bar {
    width: 40vw;
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
  .shadow {
    position: fixed;
    left: 0;
    top: 0;
    /* width: 100%;
    height: 100%; */
    /* min-height:100vh; */
    background: rgba(100, 100, 100, 0.8);
    animation: fadein v-bind(animationDuration) ease 0s 1 forwards;
  }
  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  /** 背景要素(白い影)をfadeoutさせる */
  .shadow.fadeout {
    animation: fadeout v-bind(animationDuration) ease 0s 1 forwards;
    /* height: 120%; */
  }
  @keyframes fadeout {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
