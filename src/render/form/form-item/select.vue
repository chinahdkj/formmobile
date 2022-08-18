<template>
    <mue-select v-if="!isMultiple" ref="select" :placeholder="placeholder"
                :data="items" v-model="value" :clearable="!required" :disabled="!!disabled"
                :searchable="!!searchable" @change="onChange"></mue-select>
    <mue-tree-picker v-else ref="select" :placeholder="placeholder" :data="items" v-model="value" :disabled="!!disabled"
                     :clearable="!required" multiple :searchable="!!searchable" :limit="limit" @change="onChange"></mue-tree-picker>
</template>

<script>
    import { TransBindings, BindRecords, GetInterfaceData, TransferUrl } from "../../../utils/lib";
    import BASE from "./base";
    export default {
        mixins: [BASE],
        name: "FtmSelect",
        components: {},
        props: [
            "field", "model", "vars", "disabled", "required", "defaultValue", "placeholder",
            "multiple", "expandTags", "bindings", "dataType", "optionsType", "optionsDict", "linkage", "searchable",
            "limit", "autoType", "interface", "itfParams", "afterQuery", "valChange", "linkageNoClear", "afterInitData",
            "parentField"
        ],
        data() {
            return {
                items: [],
                unwatch: null,
                timer: null
            };
        },
        computed: {
            isMultiple(){
                return !!this.multiple;
            },
            value: {
                get(){
                    let v = this.model[this.field];
                    return this.transValue(v);
                },
                set(nv){
                    this.commitValue(nv);
                }
            },
            apiUrl() {
                if (!this.interface) {
                    return ""
                }
                return TransferUrl(this.interface, this.model, this.vars)
            },
        },
        watch: {
            apiUrl: {
                immediate: true, handler(v) {
                    //设置临时数据列表，优化接口数据加载时候，name无法第一时间显示问题
                    this.setTempList();

                    //请求接口数据
                    this.initInterfaceData(v)
                }
            },
        },
        methods: {
            setTempList() {
                let names = this.model[`${this.field}$$text`] || ""
                if(!(this.value || []).length || !names) {
                    return
                }
                let items = []
                let valuesArr = Array.isArray(this.value) ? this.value : this.value.split(",");
                let namesArr = names.split(",");
                for(let [k,v] of valuesArr.entries()) {
                    items.push({Value: v, Name: namesArr[k] || ""})
                }
                this.items = TransBindings(items);
            },
            transValue(v){
                if(this.isMultiple){
                    if(!v) return [];
                    return Array.isArray(v) ? v : v.split(",");
                }
                return v;
            },
            commitValue(v){
                if(!v){
                    this.$set(this.model, this.field, null);
                    return;
                }
                if(this.isMultiple){
                    if(this.dataType === "Array") {
                        this.$set(this.model, this.field, v);
                    } else {
                        this.$set(this.model, this.field, v.join(","));
                    }
                } else{
                    this.$set(this.model, this.field, v);
                }
            },
            initBindings(){
                let items = [];
                if(this.optionsType === "static") {
                    //字典转换 Name,Value => name,code,children
                    items = TransBindings(this.bindings);
                }
                if(this.optionsType === "dynamic") {
                    items = TransBindings(BindRecords(this.optionsDict) || []);
                }

                //无论是否存在二级联动，先进行节点及name赋值
                if(!this.interface) {
                    this.items = items;
                    this.evalAfterInitData()
                }
                if(this.defaultValue) {
                    this.onChange(this.defaultValue);
                }
                //无二级联动
                if(!this.linkage){
                    return;
                }
                //存在二级联动()
                this.unwatch = this.$watch(() => {
                    let model = {...(this.model || {}), ...(this.vars || {})}
                    if (this.linkage in model) {
                        return model[this.linkage];
                    }
                    return null;
                }, (v, ov) => {
                    if (JSON.stringify(v) === JSON.stringify(ov)) return
                    // this.value = null;
                    // this.$set(this.model, `${this.field}$$text`, "");
                    if (this.optionsType === "interface") {
                        this.initInterfaceData(this.apiUrl, v, this.linkage)
                    } else {
                        //存在初始化钩子，二级联动不走pid逻辑
                        if(this.afterInitData) {
                            this.items = items
                            this.evalAfterInitData()
                        } else {
                            this.items = items.filter((b) => {
                                return b.pid === v;
                            })
                        }

                        this.checkValueExist();
                    }
                }, {deep: true, immediate: !this.defaultValue});
            },
            //二级联动触发后，判断是否要清除值
            checkValueExist() {
                //二级联动不清除值
                if(this.linkageNoClear) {
                    return
                }
                if (!this.multiple) {
                    let target = this.items.find(f => f.Value === this.value)
                    if (!target) {
                        this.$set(this.model, this.field, null);
                        this.$set(this.model, `${this.field}$$text`, "");
                    }
                } else {
                    let valArr = this.items.map(m => m.Value);
                    if (this.dataType === "Array") {
                        let flag = this.value.every(e => {
                            return valArr.includes(e)
                        })
                        if (!flag) {
                            this.$set(this.model, this.field, null);
                            this.$set(this.model, `${this.field}$$text`, "");
                        }
                    } else {
                        let vals = (this.value || "").split(",")
                        let flag = vals.every(e => {
                            return valArr.includes(e)
                        })
                        if (!flag) {
                            this.$set(this.model, this.field, null);
                            this.$set(this.model, `${this.field}$$text`, "");
                        }
                    }
                }
            },
            onChange(v) {
                //存入名称，不再次调用接口
                if(!v) {
                    this.$set(this.model, `${this.field}$$text`, "");
                    return
                }
                this.$nextTick(() => {
                    let name = this.$refs.select.text;
                    this.$set(this.model, `${this.field}$$text`, name);
                })
                this.evalValChange(v);
            },
            async initInterfaceData(url, val) {
                if(!url || this.optionsType !== "interface") {
                  return;
                }
                clearTimeout(this.timer);
                this.timer = setTimeout(async () => {
                    //接口数据形式如{Code: 0, Message: "", Response: [{Value: "", Name: ""}]}
                    // let items = await GetInterfaceData(url, this.$OPTS.urlPrefix,
                    //     this.model, this.afterQuery, this.autoType, this.itfParams, this.vars);
                    // this.items = TransBindings(items);
                    let items = await GetInterfaceData(url, this.$OPTS.urlPrefix,
                        this.model, this.afterQuery, this.autoType, this.itfParams, this.vars, this.field, this.parentField);
                    this.items = TransBindings(items);
                    if (!this.items) {
                        this.items = [];
                    }
                    this.evalAfterInitData()
                    if (this.linkage) {
                        this.checkValueExist();
                    }
                }, 100)
            },
            evalAfterInitData() {
                if(this.afterInitData) {
                    try {
                        let items = this.items;
                        let model = this.model;
                        let vars = this.vars;
                        let _this = this;
                        this.items = eval(`(function(items, model, _this, vals) {
                                ${this.afterInitData || 'return items;'}
                            })(items, model, _this, vars)`)
                    } catch (e) {
                        console.info(e)
                    }
                }
            }
        },
        mounted() {
            this.$set(this.model, `${this.field}$$text`, this.model[`${this.field}$$text`] || "");
            this.initBindings();
        },
        beforeMount(){
            if(this.unwatch){
                this.unwatch();
            }
        }
    }
</script>
