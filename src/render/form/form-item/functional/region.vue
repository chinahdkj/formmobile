<template>
  <mue-region ref="region" style="width: 100%"  v-model="value" @change="regionChange"
              :clearable="!!clearable" :placeholder="placeholder" :array="!!array" :disabled="!!disabled || !!readonly" :size="size"/>
</template>

<script>
export default {
  name: "FtmRegion",
  inheritAttrs: false,
  components: {},
  props: [
    "field", "model", "disabled", "size", "readonly", "defaultValue",
    "array", "clearable", "placeholder", "valChange"
  ],
  data() {
    return {};
  },
  computed: {
    value: {
      get(){
        if (this.array) {
          return this.model[this.field];
        } else {
          if (Array.isArray(this.model[this.field])) {
            return [...this.model[this.field]];
          } else {
            return String(this.model[this.field] || '').split(",");
          }
        }
      },
      set(nv){
        this.$set(this.model, this.field, nv);
      }
    },
  },
  watch: {
    value: {
      immediate: true, handler(v) {
        //存入名称，不再次调用接口
        this.$nextTick(() => {
          let name = this.$refs.region.getName();
          if(name) {
            this.$set(this.model, `${this.field}$$text`, name);
          }
        })
      }
    }
  },
  methods: {
    regionChange(v, vv) {
      if(!v) {
        this.$set(this.model, `${this.field}$$text`, null);
        return
      }
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
