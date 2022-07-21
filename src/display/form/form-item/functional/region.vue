<template>
  <div class="dsp__region">{{text}}</div>
</template>

<script>
export default {
  name: "DspRegion",
  inheritAttrs: false,
  components: {},
  props: ["value", "field", "model", "array"],
  data() {
    return {};
  },
  computed: {
    text() {
      if(!!this.array){
        return (this.model[`${this.field}$$text`] || []).join(',');
      }
      return this.model[`${this.field}$$text`] || "";
    }
  },
}
</script>
