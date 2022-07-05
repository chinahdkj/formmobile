<template>
  <div class="dsp-signature">
    <template v-if="signImgs.length">
      <div class="sign-image-box" v-for="(img, i) in signImgs" :key="i">
        <img class="img-url" :src="img"  style="object-fit: cover;" @click="previewImg(i)"/>
      </div>
    </template>
  </div>
</template>

<script>
import Vue from "vue"
import { ImagePreview } from 'vant';
Vue.use(ImagePreview);
export default {
  name: "DspSignature",
  components: {},
  props: ["value", "model", "field"],
  data(){
    return {};
  },
  computed: {
    signImgs() {
      let v = this.model[this.field] || "";
      return v ? v.split(",") : [];
    }
  },
  methods: {
    previewImg(i){
      ImagePreview({
        images: this.signImgs,
        startPosition: i,
      });
    }
  }
}
</script>

<style lang="less" scoped>
.dsp-signature {
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: flex-end;
  flex-flow: column wrap;

  /deep/ .sign-image-box {
    display: inline-flex;
    align-items: center;
    position: relative;
    padding: 2px 0;
    z-index: 123;

    .img-url{
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: auto;
      display: inline-flex;
      margin-right: 6px;
      cursor: pointer;
      width: 100px;
      height: 28px;
      border: 1px solid #d0d0d0;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}
</style>
