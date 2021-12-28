<template>
<!--    <el-autocomplete v-model="q" :clearable="!required" type="text" :disabled="!!disabled"
                     :fetch-suggestions="fetchSuggestions" :value-key="valueField || field"
                     @select="onSelectItem" @blur="onBlur">
        <template slot-scope="{item}">
            {{ item[showField || 'label'] }}
        </template>
    </el-autocomplete>-->

    <div class="ftm-autocomplete-container">
        <mue-input readonly :value="value" @click.native="showPop" :disabled="!!disabled">
            <i slot="suffix" class="iconfont icon-chaxuntiaojian"/>
        </mue-input>
        <van-popup ref="pop" class="ftm--autocomplete__pop" v-model="pop" position="top"
                   get-container="body" :close-on-click-overlay="false"
                   @click-overlay="pop = false" @opened="onPoped">
            <mue-container v-loading="false">
                <mue-header height="50px" class="van-hairline--bottom">
                    <mue-search ref="search" v-model="q" show-action
                                @cancel="pop = false" @search="query"></mue-search>
                </mue-header>
                <mue-main>
                    <mue-empty v-if="items.length === 0"></mue-empty>
                    <ul v-else class="ftm--autocomplete-list">
                        <li v-for="(item, i) in items" :key="i" @click="onSelectItem(item)"
                            class="ftm--autocomplete-item van-hairline--bottom">{{item[showField || 'label']}}
                        </li>
                    </ul>
                </mue-main>
            </mue-container>
        </van-popup>
    </div>
</template>

<script>
import {TransferUrl, objectGet} from "../../../../utils/lib";

export default {
    name: "FtmAutocomplete",
    inheritAttrs: false,
    components: {},
    /*
    showField => 查询展示字段，默认取接口字段label;
    valueField => 最终存入字段对应接口中的映射字段,为空时候直接取字段标识field
    */
    props: [
        "field", "model", "required", "disabled", "autoType", "showField", "valueField", "format", "saveFields", "itfParams"
    ],
    data() {
        return {
            pop: false,
            loading: false,
            q: "",
            items: []
        }
    },
    computed: {
        value(){
            return this.model[this.field];
        }
    },
    methods: {
        showPop(){
            this.q = this.value || "";
            this.pop = true;
        },
        onPoped(){
            this.$refs.search.Focus();
            this.query();
        },
        query(){
            this.loading = true;
            let url = TransferUrl(this.format, this.model);  //转换表单中的值 ${}

            //get请求
            if(this.autoType === 2) {
                let targetUrl = url.replace("$self", this.q); //转换自身查询的值 $self
                this.$server._Get({url: targetUrl}, this.$OPTS.urlPrefix || "").then((res) => {
                    this.loading = false;
                    if(res.Response) {
                        this.items = res.Response || [];
                    } else {
                        this.$toast("接口数据读取失败");
                        this.items = [];
                    }
                }).catch((e) => {
                    this.loading = false;
                    this.items = [];
                    this.$toast(e || "自动补全获取数据失败");
                });
                return
            }

            //post请求
            let customParams = JSON.parse(TransferUrl(JSON.stringify(this.itfParams), this.model)); //自定义参数
            let params = {...customParams, ...{q: this.q || "", url, autoType: this.autoType}}
            this.$server._Post(params, this.$OPTS.urlPrefix || "").then((res) => {
                this.loading = false;
                if(res.Response) {
                    this.items = res.Response || [];
                } else {
                    this.$toast("接口数据读取失败");
                    this.items = [];
                }
            }).catch((e) => {
                this.loading = false;
                this.items = [];
                this.$toast(e || "自动补全获取数据失败");
            });
        },
        onSelectItem(r) {
            let key = this.valueField || this.field;
            let val = objectGet(r, key);
            if(val != undefined) this.$set(this.model, this.field, val);
            (this.saveFields || []).forEach((f) => {
                if (!f.field || !f.mobileField) {
                    return;
                }
                if (!r || !(f.field in r)) {
                    this.$set(this.model, f.mobileField, "");
                    return
                }
                let v = objectGet(r, f.field);
                this.$set(this.model, f.mobileField, v);
            });
            this.pop = false;
        },
        onBlur() {
            if (this.q === this.model[this.field]) {
                return;
            }
            this.q = "";
        }
    }
}
</script>

<style lang="less">
.ftm-autocomplete-container {
    i.icon-chaxuntiaojian {
        font-size: 18px;
    }
}

.ftm--autocomplete__pop {
    height: 100%;

    .mue-header {
        padding: 5px;
    }

    .ftm--autocomplete-list {
        height: 100%;
        padding-right: 20px;
        margin-right: -20px;
        overflow: auto;
        overflow-x: hidden;
    }

    .ftm--autocomplete-item {
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        width: 100%;
        box-sizing: border-box;
        padding: 0 15px;
    }
}
</style>
