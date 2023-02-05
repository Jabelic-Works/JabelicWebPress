<script src=""></script>
<template>
    <div class="root">
        <div class="sub-header">
            <h1>Jabelic Web Press</h1>
            <h3>小さく書いて大きく育てる</h3>
        </div>
        <Contents/>
    </div>
</template>
<style scoped>

.sub-header{
    padding-left: 3%;
    padding-top: 3%;
    padding-bottom: 3%;
}
h1{
    font-size: 40px;
    padding-top: 1%;
}
h3{
    font-size: 20px;
    padding-top: 1%;
}
@media screen and (max-width:768px){
    h1{
        font-size: 30px;
        padding-top: 3%;
    }
    h3{
        font-size: 16px;
        padding-top: 3%;
    }
}
</style>