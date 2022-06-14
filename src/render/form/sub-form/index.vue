<template>
    <div class="sub-form-view">
        <van-icon class="do-expand" :name="expendStatus ? 'arrow-up' : 'arrow-down'" @click="onExpand" />
        <mue-form-item :label="name" :field="field" :inline="false" :rules="subFormRules"
                       :data-field="field" :class="['fpt__subform', customClass ? customClass : '']">
            <div class="form-part" v-for="(row, i) in value" :key="i" :class="{'hide': isHide(i)}">
                <mue-panel :title="!!showRowNum ? `#${i+1}` : ''">
                    <van-icon v-if="!isDisabled && !hideDelete && !deleteDisabledCondition(row, i)" slot="tools" name="delete" style="line-height: inherit;"
                              @click="delModel(i)"/>
                    <van-icon v-if="isHide(i)" slot="tools" name="arrow-down" @click="showFields(i)"/>
                    <van-icon v-else slot="tools" name="arrow-up" @click="hideFields(i)"/>
                    <div v-for="(sub, idx) in subs" :key="idx">
                        <form-item v-if="isShow(sub.options, row, model)" :model="row"
                                    :type="sub.type"
                                    :vars="model"
                                    :all-vars="allVars"
                                    v-bind="sub.options"
                                    :parent-field="field"
                                    :is-new="isNew"
                                    :sub-options="subs"
                                    :global-disabled="globalDisabled"
                                    :index="i"
                                    :authority="authority">
                        </form-item>
                    </div>
                </mue-panel>
            </div>
            <div class="sub-form-handle-btn" v-if="addShow">
                <van-button size="large" :disabled="isDisabled || !!addDisabled" type="primary" native-type="button" @click="addModel">添加</van-button>
            </div>
        </mue-form-item>

    </div>
</template>
<script>
    import {TransferUrl, needShow, deepClone, ReplaceFields} from "../../../utils/lib";
    import FormItem from "../../../render/form";
    import Authority from "../../../components/authority"
    export default {
        mixins: [Authority],
        name: "SubForm",
        inheritAttrs: false,
        components: {FormItem},
        props: ["id", "subs", "model", "name", "field", "type", "labelLine", "width", "disabled", "align", "addHidden", "deleteHidden", "allVars", "initOneRow",
            "customClass", "labelWidth", "labelHidden", "showRowNum", "dataType", "itfData", "afterQuery", "isNew", "addDisabled", "globalDisabled",
            "initNums", "maxNums", "minNums", "authority"],
        data() {
            return {
                expendStatus: true,
                flags: [] //{index:0, hideFields: false}
            };
        },
        computed: {
            addShow() {
                return !this.addHidden && this.currentFieldAuth.add
            },
            hideDelete() {
                return !!this.deleteHidden || !this.currentFieldAuth.remove
            },
            isDisabled() {
                return !!this.globalDisabled || !!this.disabled || !this.currentFieldAuth.edit
            },
            value: {
                get(){
                    let v = this.model[this.field] || []
                    return Array.isArray(v) ? v : JSON.parse(v);
                },
                set(nv){
                    this.$set(this.model, this.field, nv);
                }
            },
            subFormRules() {
                let rules = [];
                if(this.minNums) {
                    rules.push({
                        validator: (rule, value, callback) => {
                            if(this.value.length < this.minNums) {
                                callback(new Error(`数据量不得少于${this.minNums}条`))
                            } else {
                                callback();
                            }
                        }
                    })
                }
                if(this.maxNums) {
                    rules.push({
                        validator: (rule, value, callback) => {
                            if(this.value.length > this.maxNums) {
                                callback(new Error(`数据量不得多于${this.maxNums}条`))
                            } else {
                                callback();
                            }
                        }
                    })
                }
                return rules;
            }
        },
        watch: {
            subs: {
                immediate: true, deep: true, handler(v, ov) {
                    this.value.forEach(row => {
                        for(let sub of v) {
                            if(!(sub.options.field in row)) {
                                row[sub.options.field] = sub.options.defaultValue
                            }
                        }
                    })
                    this.$set(this.model, this.field, this.value);
                }
            }
        },
        methods: {
            deleteDisabledCondition(row, index) {
                return this.needDisabled(this.delDisabledCondition, row, this.model, this.isNew, index)
            },
            //index 子表行数据索引
            needDisabled(condition, model, vars, isNew, index) {
                if(!condition){
                    return false;
                }

                let cdn = ReplaceFields(condition)
                let r = false;
                try{
                    r = eval(cdn);
                } catch(e){
                    console.error(e);
                    r = false;
                }
                return !!r;
            },
            addModel() {
                let fields = {}
                for(let sub of this.subs) {
                    fields[sub.options.field] = sub.options.defaultValue
                }
                this.value.push(fields);
            },
            delModel(i){
                this.value.splice(i, 1);
            },
            isShow(opts, model, vars) { //子表项配置 行数据 整个表单数据
                return !opts.hide && needShow(opts.showCondition, {...vars, ...model}) && this.authIsShow(opts.field, this.field);
            },
            isHide(i) {
                return this.value[i].__hideFields;
            },
            showFields(i) {
                if(this.value[i]) {
                    this.$set(this.value[i], "__hideFields", false)
                }
            },
            hideFields(i) {
                if(this.value[i]) {
                    this.$set(this.value[i], "__hideFields", true)
                }
            },
            onExpand() {
                this.expendStatus = !this.expendStatus;
                this.value.forEach((row, i) => {
                    this.$set(this.value[i], "__hideFields", !this.expendStatus)
                })
            },
            //表单权限-子表字段显示隐藏条件
            authIsShow(subfield, parentField) {
                if(!(this.authority || []).length) {
                    return true
                }
                let hide = false
                let subForm = this.authority.find(f => f.name === parentField)
                if(subForm) {
                    let targetField = subForm.fields.find(f => f.name === subfield)
                    if(targetField) {
                        //是否隐藏
                        if((targetField.hide || []).length)
                            hide = this.getAuth(targetField.hide, false);
                    }
                }
                return !hide
            },
            //从接口初始化数据
            itfDataInit() {
                this.value = [];
                let res_Url = TransferUrl(this.itfData.url || "", this.model);
                this.$server._Get({url: res_Url}, this.$OPTS.urlPrefix || "").then((res) => {
                    //返回的res最终需要是一个对象数组
                    if (this.itfData.afterQuery) {
                        let _this = this
                        try {
                            res = eval(`(function(res) {
                                ${this.itfData.afterQuery || 'return res;'}
                            })(res)`)
                        } catch (e) {
                            console.error(e)
                        }
                    }

                    if(!Array.isArray(res)) {
                        this.$message.error("接口返回数据格式有误（需对象数组类型）")
                        return
                    }

                    let rows = res || [];
                    let keys = this.subs.map(m => m.options.field)
                    rows.forEach((row, i) => {
                        for(let key in row) {
                            if(!keys.includes(key)) {
                                delete row[key]
                            }
                        }
                        this.$set(this.value, i, row);
                    })
                }).catch((e) => {
                    console.log(e);
                });
            },
            //重置数据
            reset() {
                if((this.itfData || {}).enable) {
                    this.itfDataInit();
                } else {
                    this.value = deepClone(this.initValue);
                }
            },
        },
        mounted() {
            if(!this.value.length) {
                //从接口初始化数据
                if((this.itfData || {}).enable) {
                    this.itfDataInit()
                    return;
                }

                //添加一条空数据
                if(this.initOneRow)
                    if(this.initNums) {
                        for(let i=1; i<=this.initNums; i++) {
                            this.addModel();
                        }
                    } else {
                        this.addModel();
                    }
            } else {
                this.initValue = $.extend(true, [], this.value);
            }
        }
    };
</script>

<style lang="less">
    .sub-form-view {
        position: relative;
        width: 100%;
        margin: 4px 0;

        .do-expand {
            position: absolute;
            right: 15px;
            z-index: 1;
            line-height: 36px;
            z-index:100;
        }

        > .mue-form-item {

            > .mue-form-item-content {
                background: #f0f0f0;
                padding: 5px;
                margin-bottom: 10px;
            }
        }

        .form-part {
            border: solid 1px #e0e0e0;
            margin-bottom: 5px;

            &.hide {
                .mue-panel-body {
                    display: none;
                }
            }

            .mue-panel-header {
                border-bottom: solid 1px #ebebeb;

                .mue-panel-tools {
                    .van-icon {
                        margin-left:10px;
                    }
                }
            }

            .mue-panel-body {
                > div:last-child {
                    .mue-form-item {
                        border: 0;
                    }
                }
            }

            .mue-form-item > label {
                left: 10px;
                text-align: left;
            }
        }

        .sub-form-handle-btn {
            display: flex;
            align-items: center;
            padding: 0;

            .van-button {
                border-radius: 3px;
                flex: 1;
            }
        }
    }

    // .fpt__subform.mue-form-item.is-error .el-input__inner,
    // .fpt__subform.mue-form-item.is-error .el-input__inner:focus,
    // .fpt__subform.mue-form-item.is-error .el-textarea__inner,
    // .fpt__subform.mue-form-item.is-error .el-textarea__inner:focus,
    // .fpt__subform.mue-form-item.is-error .cue-rich-editor > .tox-tinymce,
    // .fpt__subform.mue-form-item.is-error .cue-rich-editor.is-focus > .tox-tinymce {
    //     border-color: #d0d0d0
    // }


</style>
