<script>
    export default {
        props: ["valChange"],
        methods: {
            evalValChange(v) {
                if(this.valChange) {
                    try {
                        let val = v;
                        let model = this.model;
                        let vars = this.vars;
                        let _this = this;
                        eval(this.valChange);
                    } catch (e) {
                        console.info(e)
                    }
                }
            }
        }
    }
</script>
