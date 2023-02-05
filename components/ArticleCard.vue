<script setup lang="ts">

// adapter
interface Article {
  enTitle: string;
  jpTitle: string;
  description: string;
  tags: Array<string> | null;
  to: string;
  id: string
}
const Props = withDefaults(defineProps<Article>(), {
  enTitle: "default",
  jpTitle: "デフォルト",
  description: "説明説明説明説明説明説明",
  tags: null,
  to: "/",
  id: ""
});
const appConfig = useAppConfig()
const mainDarkColor = ref(appConfig.theme.colors.mainDark)
const mainColor = ref(appConfig.theme.colors.main)
</script>

<template>
    <NuxtLink :to="Props.to">
        <section class="card">
            <div class="card-content">
                <h1 class="card-title">{{ Props.jpTitle }}</h1>
                <p class="card-text">{{ Props.description }}</p>
            </div>
            <div v-if="Props.tags" class="card-tags">
              <span v-for="tag in Props.tags" class="card-tag">
                <Tag :title="tag"/>
              </span>
            </div>
        </section>
    </NuxtLink>
</template>

<style scoped>
.card {
  background: black;
  border: 0.1rem solid;
  border-color: v-bind(mainDarkColor);
  border-radius: 5px;
  box-shadow: 0 1px 2px #ccc;
  border-radius: 0.5rem;
}
.card:hover, .card:active{
  box-shadow: 2px 2px 2px 1px rgba(255, 255, 255, .5);
  border: solid 0.1rem v-bind(mainColor);
}
.card-content {
  padding: 2%;
}
.card-title {
  font-size: 20px;
  margin-bottom: 20px;
  text-align: start;
  color: white;
}
.card-text {
  color: #777;
  font-size: 14px;
  line-height: 1.5;
}
.cart-tags{
    display: grid;
    grid-template-columns: 75% 1fr 1fr 1fr;
    height: 3.5vh;
}
.card-tag{
    margin-left: 0.3rem;
    margin-right: 0.3rem;
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
@media screen and (max-width:768px){
  .card-title {
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 20px;
    text-align: start;
    color: white;
}
}
</style>