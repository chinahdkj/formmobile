<script>
    export default {
        props: ["valChange", "watchValChange", "vars"],
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
            },
          watchChange(v) {
              if(this.watchValChange) {
                  try {
                      let val = v;
                      let model = this.model;
                      let vars = this.vars;
                      let _this = this;
                      eval(this.watchValChange);
                  } catch (e) {
                      console.info(e)
                  }
              }
          }
        },
        watch: {
            value: {
                immediate: true, handler(v) {
                    if(v == null) {
                        return
                    }
                    this.$nextTick(() => {
                        this.watchChange(v)
                    })
                }
            }
        }
    }
</script>
