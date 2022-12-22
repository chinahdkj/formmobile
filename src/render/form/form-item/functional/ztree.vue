<template>
    <!--    <cue-ztree-picker ref="picker" style="width:100%" v-model="value" :clearable="!required" :array="false"
                          :nodes="nodes" :disabled="!!disabled" :simple-data="dataMode === 'simple'"
                          :multiple="!!multiple" :multiple-filter="multipleFilter"
                          :whole-path="!!wholePath" search show-icon @change="onChange">
        </cue-ztree-picker>-->

    <mue-tree-picker ref="tree" v-model="value" :clearable="!required" :data="nodes" :disabled="!!disabled"
                     :multiple="!!multiple" :selectable="checkFilter" @change="onChange"
                     :whole-path="!!wholePath" searchable>
    </mue-tree-picker>
</template>

<script>
import {deepClone, strToArr, TreeDataTrans, BindRecords, GetInterfaceData, TransferUrl} from "../../../../utils/lib";
import BASE from "../base";
export default {
    mixins: [BASE],
    name: "FtmZtree",
    inheritAttrs: false,
    components: {},
    props: [
        "field", "model", "vars", "disabled", "required", "defaultValue", "multiple", "dataMode", "linkage",
        "wholePath", "dict", "sourceType", "interface", "saveFields", "autoType", "itfParams", "afterQuery",
        "valChange"
    ],
    data() {
        return {
            nodes: [],
            unwatch: null
        };
    },
    computed: {
        value: {
            get(){
              //转数组（组件需要）
              let v = this.model[this.field];
              if(!!this.multiple){
                if(Array.isArray(v)){
                  return v
                }else{
                  return strToArr(v)
                }
              }else{
                  return v
              }
            },
            set(nv){
                //传递时转字符串（数据库限制）
                this.commitValue(nv);
            }
        },
        bindings() {
            if (this.dataMode === "tree") {
                //树形结构数据，进行数据转换后传递
                return TreeDataTrans(BindRecords(this.dict))
            } else {
                //简单结构数据，进行数据转换后，手动组装成树
                let datas = (BindRecords(this.dict) || []).map(m => {
                    return {...m, code: m.Value, name: m.Name}
                });
                let ids = datas.map((d) => {
                    return d.code;
                });
                let result = [];
                for(let i = 0; i < datas.length; i++){
                    let node = datas[i];
                    if(node.pid && ids.indexOf(node.pid) > -1){
                        continue;
                    }
                    this.getChildren(result, node, datas);
                }
                return result;
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
                //请求接口数据
                this.initInterfaceData(v)
            }
        },
        value: {
            immediate: true, handler(v) {
                //存入名称，不再次调用接口
                this.$nextTick(()=>{
                    setTimeout(() => {
                        let name = this.$refs.tree.text;
                        if(name) {
                            this.$set(this.model, `${this.field}$$text`, name);
                        }
                    },0)
                })
            }
        }
    },
    methods: {
        checkFilter(data, n){
            return !data.children.length;
        },
        commitValue(v) {
            if (!v) {
                this.$set(this.model, this.field, null);
            } else if (Array.isArray(v)) {
                this.$set(this.model, this.field, v.join(","));
            } else {
                this.$set(this.model, this.field, String(v));
            }
        },
        getChildren(result, node, datas) {
            let r = {code: node.code, name: node.name, pid: node.pid, children: []};
            result.push(r);
            datas.forEach((s)=>{
                if(s.pid === r.code){
                    this.getChildren(r.children, s, datas);
                }
            });
        },
        initNodes(){
            let nodes = deepClone(this.bindings);

            //无论是否存在二级联动，先进行节点及name赋值
            this.nodes = nodes;
            if(this.defaultValue) {
                this.onChange(this.defaultValue);
            }

            if(!this.linkage){
                return
            }

            //存在二级联动，nodes重新赋值（不存在默认值时，立即执行）
            this.unwatch = this.$watch(() => {
                let model = {...(this.model || {}), ...(this.vars || {})}
                if (this.linkage in model) {
                    return model[this.linkage];
                }
                return null;
            }, (v, ov) => {
                if(JSON.stringify(v) === JSON.stringify((ov))) {
                    return
                }
                this.value = null;
                this.$set(this.model, `${this.field}$$text`, "");
                if(this.sourceType === "interface") {
                    this.initInterfaceData(this.apiUrl, v)
                } else {
                    if (v == null || v == "") {
                        this.nodes = nodes;
                    } else {
                        if(this.dataMode === 'tree') {
                            //树形字典获取数据
                            this.nodes = this.fetch(nodes, v) || [];
                        } else {
                            //普通字典取数据
                            this.nodes = this.getFormdict(nodes, v) || []
                        }
                    }
                }
            }, {deep: true, immediate: !this.defaultValue});
        },
        fetch(ns, v) {
            for (let i = 0; i < ns.length; i++) {
                let n = ns[i];
                // 此节点为二级联动节点，返回子节点
                if (v === n.code) {
                    return n.children || [];
                }
                // 查找子集是否含有联动节点
                let temp = this.fetch(n.children || [], v);
                if (temp) {
                    return temp;
                }
            }
            return null;
        },
        getFormdict(ns, v) {
            let res = []
            for (let i = 0; i < ns.length; i++) {
                let n = ns[i];
                if (v.split(",").includes(n.extend)) {
                    res.push(n);
                }
            }
            return res;
        },
        async initInterfaceData(url, val) {
            if(!url || this.sourceType !== "interface") {
                return;
            }

            // if(this.linkage && !val) {
            //     return
            // }

            // clearTimeout(this.timer);
            // this.timer = setTimeout(async () => {
                let nodesTrans = (nodes = null) => {
                    if(!nodes) {
                        return
                    }

                    if (this.dataMode === "tree") {
                        //树形结构数据，进行数据转换后传递
                        this.nodes = TreeDataTrans(nodes || [])
                    } else {
                        //简单结构数据，进行数据转换后，手动组装成树(接口返回一般是id,pid,name形式或Name,Value,pid形式)
                        let datas = (nodes || []).map(m => {
                            return m.Value ? {...m, code: m.Value, name: m.Name} : {...m, code: m.id}
                        });
                        let ids = datas.map((d) => {
                            return d.code;
                        });
                        let result = [];
                        for(let i = 0; i < datas.length; i++){
                            let node = datas[i];
                            if(node.pid && ids.indexOf(node.pid) > -1){
                                continue;
                            }
                            this.getChildren(result, node, datas);
                        }
                        this.nodes = result;
                    }
                }

                let nodes = await GetInterfaceData(url, this.$OPTS.urlPrefix,
                    this.model, this.afterQuery, this.autoType, this.itfParams, this.vars);
                nodesTrans(nodes);

                /*let res_Url = TransferUrl(url, this.model);
                if(!this.autoType || this.autoType === 1) { //post类型接口
                    let customParams = JSON.parse(TransferUrl(JSON.stringify(this.itfParams), this.model)); //自定义参数
                    let params = {...customParams, ...{url: res_Url}}
                    this.$server._Post(params, this.$OPTS.urlPrefix || "").then((Response) => {
                        if(Response) {
                            nodesTrans(Response);
                        } else {
                            this.$toast("接口数据读取失败");
                            this.nodes = [];
                        }
                    }).catch((e) => {
                        this.$toast(e || "接口数据读取失败");
                        this.nodes = [];
                    });
                } else { //get类型接口
                    this.$server._Get({url: res_Url}, this.$OPTS.urlPrefix || "").then((Response) => {
                        if(Response) {
                            nodesTrans(Response);
                        } else {
                            this.$toast("接口数据读取失败");
                            this.nodes = [];
                        }
                    }).catch((e) => {
                        this.$toast(e || "接口数据读取失败");
                        this.nodes = [];
                    });
                }*/
            // }, 500)
        },



        onChange(v, vv, node) {
            //存入名称，不再次调用接口
            if(!v) {
                this.$set(this.model, `${this.field}$$text`, "");
                this.autoComplateFields(null);
            } else {
                if(!!this.multiple && Array.isArray(v)) {
                    let nameArr = [];
                    v.forEach(id => {
                        if(!id) {
                            return
                        }
                        let node = this.$refs.tree.GetOptionInfo(id);
                        if(this.wholePath) {
                            nameArr.push(node.$nameRoad.join("-"))
                        } else {
                            nameArr.push(node.name)
                        }
                    })
                    this.$set(this.model, `${this.field}$$text`, nameArr.join(","))
                } else {
                    let node = this.$refs.tree.GetOptionInfo(v);
                    let name = "";
                    if(this.wholePath) {
                        name = node.$nameRoad.join("-");
                    } else {
                        name = node.name;
                    }
                    this.$set(this.model, `${this.field}$$text`, name)
                    this.autoComplateFields(node.data);
                }
            }

            if(this.valChange) {
                try {
                    let val = v;
                    let model = this.model;
                    let vars = this.vars;
                    let _this = this;
                    let nodes = node;
                    eval(this.valChange);
                } catch (e) {
                    console.info(e)
                }
            }
        },
        autoComplateFields(node) {
            //自动补全，目前只支持单选时补全
            (this.saveFields || []).forEach((f)=>{
                if(!f.field || !f.mobileField){
                    return;
                }
                if(!node || !(f.field in node)) {
                    this.$set(this.model, f.mobileField, "");
                    return
                }
                let v = node[f.field];
                this.$set(this.model, f.mobileField, v);
            });
        },
    },
    mounted(){
        this.$set(this.model, `${this.field}$$text`, this.model[`${this.field}$$text`] || "");
        this.initNodes();
    },
    beforeMount(){
        if(this.unwatch){
            this.unwatch();
        }
    }
}
</script>
