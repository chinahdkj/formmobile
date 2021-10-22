<template>
    <div id="app">
        <div class="main-title">FormMobile</div>
        <div class="main-container">
            <router-view/>
        </div>
    </div>
</template>

<style lang="less">
#app {
    width: 100%;
    height: 100%;

    .main-title {
        height: 46px;
        background-color: #1278f6;
        color: #ffffff;
        line-height: 46px;
        padding: 0 15px;
        font-size: 16px;
        text-align: center;
    }

    .main-container {
        height: calc(100% - 46px);
    }
}
</style>
