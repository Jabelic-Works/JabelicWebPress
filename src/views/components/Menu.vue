<script lang="ts" setup></script>
<template>
  <button>Click</button>
  <div id="overlay">
    <div id="content">
      <p>これがモーダルウィンドウです。</p>
      <p><button>close</button></p>
    </div>
  </div>
</template>
<style scoped>
  #overlay {
    z-index: 1000000;
    position: sticky;
    top: 0;
    /* 要素を重ねた時の順番 */
    z-index: 11203913;

    /* 画面全体を覆う設定 */
    /* position: sticky; */
    top: 0;
    left: 0;
    width: 100%;
    /* height: 100vh; */
    background-color: rgba(0, 0, 0, 0.5);

    /* 画面の中央に要素を表示させる設定 */
    display: flex;
    align-items: center;
    justify-content: center;
    color: green;
  }
  #content {
    z-index: 2;
    width: 50%;
    padding: 1em;
    background: #fff;
  }
</style>
