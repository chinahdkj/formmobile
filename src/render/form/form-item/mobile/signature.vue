<template>
  <div class="frd-signature">
    <template v-if="signImgs.length">
      <div class="sign-image-box" v-for="(img, i) in signImgs" :key="i">
        <img class="img-url" :src="img" style="object-fit: cover;" @click="previewImg(i)"/>
        <van-button class="frd-signature-del" native-type="button" v-if="!disabled" size="mini" type="danger" round @click="deleteSign(i)">删除</van-button>
      </div>
    </template>
    <div class="sign-image-box btn">
      <van-button native-type="button" class="add-sign" size="mini" round :disabled="!!disabled" @click="addSign">添加签名</van-button>
    </div>
    <mue-img-preview :visible.sync="preview.visible" :images="preview.images" :start-position="preview.start" />
    <van-popup v-model="dialog.visible" position="bottom" get-container="body"
               :close-on-click-overlay="true" :safe-area-inset-bottom="true">
      <div class="frd-signature-dialog">
        <div class="frd-signature-dialog__label">签名密钥</div>
        <div class="frd-signature-dialog__content">
          <van-field v-model="pwd" ref="dialogInput" type="password" placeholder="请输入与当前账号相匹配的签名密钥"></van-field>
        </div>
        <div class="frd-signature-dialog__footer">
          <van-button native-type="button" type="primary" @click="getAutograph">确定</van-button>
          <van-button native-type="button" @click="dialog.visible = false">取消</van-button>
        </div>
      </div>

    </van-popup>
  </div>
</template>

<script>
export default {
  name: "FtmSignature",
  inheritAttrs: false,
  components: {},
  props: ["field", "model", "disabled", "disabledPwd"],
  data() {
    return {
      pwd: "",
      dialog: {
        visible: false
      },
      preview:{
        visible:false,
        images:[],
        start:0,
      }
    };
  },
  computed: {
    signImgs: {
      get() {
        let v = this.model[this.field] || "";
        return v ? v.split(",") : [];
      },
      set(nv) {

      }
    },
    prefix() {
      return this.$OPTS.urlPrefix || ""
    }
  },
  watch:{
    'dialog.visible'(v){
      if(v){
        setTimeout(()=>{
          this.$refs.dialogInput.focus()
        },300)
      }
    }
  },
  methods: {
    addSign() {
      //不需要密钥，直接获取签名
      if(this.disabledPwd) {
        this.getAutograph();
      } else {
        this.dialog.visible = true;
      }
    },
    getAutograph() {
      if(!this.pwd) {
        this.$toast.fail("请先输入密钥");
        return
      }
      let params = {
        id: window.FORM_CurrentUser.user_id,
        autographPwd: window.HD.base64.encode(this.pwd)
      }

      if(this.disabledPwd) {
        params.disabledPwd = 1
      }
      this.$http.post(`${this.prefix}/user/getAutograph.json`, params, ).then(res => {
        if(res.autograph){
          this.signImgs.push(res.autograph)
          this.$set(this.model, this.field, this.signImgs.join(","));
          this.dialog.visible = false;
        }else{
          this.$toast.fail("密码错误/未匹配到签名文件");
        }
      }).catch(err => {
        this.$toast.fail(`${err.Message || err.message || err}`);
      })
    },
    deleteSign(i) {
      this.signImgs.splice(i, 1);
      this.$set(this.model, this.field, this.signImgs.join(","))
    },
    previewImg(i){
      this.preview.visible = true;
      this.preview.images = [...this.signImgs]
      this.preview.start = i;
    }
  }
}
</script>

<style lang="less" scoped>
.frd-signature {
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: flex-end;
  flex-flow: column wrap;

  .frd-signature-del{
    color: #ffffff;
    background: #ff6363;
  }

  .van-button.add-sign {
    width: 100px;
  }
  .sign-image-box ~ .sign-image-box .van-button.add-sign{
    margin-top: 5px;
  }

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

/deep/.frd-signature-dialog{
  &__label{
    text-align: center;
    margin: 0 auto;
    height: 40px;
    line-height: 40px;
    position: relative;
    &:after{
      content: '';
      position: absolute;
      bottom: 0;
      height: 1px;
      background: #d9d9d9;
      transform: scaleY(0.5);
      left: 16px;
      right: 16px;
    }
  }
  &__content{
    margin: 12px 0;
  }
  &__footer{
    display: flex;
    > * {
      flex: 1;
    }
  }
}
</style>
