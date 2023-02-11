<script setup lang="ts">
// adapter
interface Tag {
    title: string
}
const Props = withDefaults(defineProps<Tag>(), {
    title: ""
});
</script>

<template>
    <div class="root">
        {{ Props.title }}
    </div>
</template>

<style scoped>
.root{
    display: inline-block;
    padding: 4px 8px;
    margin: 0 8px 10px 0;
    background: rgba(0, 0, 0, 0);
    font-size: 0.8em;
    /* FIXME: color変更 */
    border: 1px solid #0085de;
    border-radius: 3px;
    visibility: visible;
    position: relative;
    color: white;
    font-family: 'SawarabiMincho';
}
</style>