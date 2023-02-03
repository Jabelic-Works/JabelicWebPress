<script setup lang="ts">
interface Article {
  enTitle: string;
  jpTitle: string;
  description: string;
  tags: Array<string> | null;
  to: string
}

const Props = withDefaults(defineProps<Article>(), {
  enTitle: "default",
  jpTitle: "デフォルト",
  description: "説明説明説明説明説明説明",
  tags: null,
  to: "/"
});
const appConfig = useAppConfig()
const mainDarkColor = ref(appConfig.theme.colors.mainDark)
</script>
<template>
    <NuxtLink :to="Props.to">
        <section class="card">
            <div class="card-content">
                <h1 class="card-title">{{ Props.jpTitle }}</h1>
                <p class="card-text">{{ Props.description }}</p>
            </div>
            <div class="tags">
            </div>
            <!-- <div class="card-link">
                <a href="http://webcreatorbox.com/about">About</a>
                <a href="http://webcreatorbox.com/">Website</a>
            </div> -->
        </section>
    </NuxtLink>
</template>
<style>
.card {
  background: black;
  border: 0.3rem solid;
  border-color: v-bind(mainDarkColor);
  border-radius: 5px;
  box-shadow: 0 1px 2px #ccc;
}
.card-content {
  padding: 2%;
}
.card-title {
  font-size: 20px;
  margin-bottom: 20px;
  text-align: start;
  color: #333;
}
.card-text {
  color: #777;
  font-size: 14px;
  line-height: 1.5;
}
.cart-tags{
    display: grid;
}
.card-tag{
    display: grid;
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