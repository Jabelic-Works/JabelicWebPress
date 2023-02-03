<script setup lang="ts">
console.debug("sdfsdf")
</script>
<template>
    <section class="card">
        <div class="card-content">
            <h1 class="card-title">Webクリエイターボックス</h1>
            <p class="card-text">WebデザインやWebサイト制作、最新のWeb業界情報などを紹介していくサイト。</p>
        </div>
        <div class="card-link">
            <a href="http://webcreatorbox.com/about">About</a>
            <a href="http://webcreatorbox.com/">Website</a>
        </div>
    </section>
</template>
<style>
.card {
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
}
.card-content {
  /* padding: 20px; */
  padding: 2%;
}
.card-title {
  font-size: 20px;
  margin-bottom: 20px;
  /* text-align: center; */
  text-align: start;
  color: #333;
}
.card-text {
  color: #777;
  font-size: 14px;
  line-height: 1.5;
}
.card-link {
  text-align: center;
  border-top: 1px solid #eee;
  padding: 20px;
}
.card-link a {
  text-decoration: none;
  color: #0bd;
  margin: 0 10px;
}
.card-link a:hover {
  color: #0090aa;
}
</style>