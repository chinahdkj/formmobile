<template>
    <divider :content-position="position">{{name}}</divider>
</template>
<script>
    import BASE from "./base";
    import Divider from "../../components/divider";

    export default {
        name: "SplitLine",
        inheritAttrs: false,
        components: {Divider},
        mixins: [BASE],
        props: ["name", "position", "showCondition", "isDesign"],
        data() {
            return {};
        },
        computed: {},
        watch: {},
        methods: {}
    };
</script>

<style lang="less">
</style>
