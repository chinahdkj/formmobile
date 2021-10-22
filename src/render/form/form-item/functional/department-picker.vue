<template>
    <mue-tree-picker ref="tree" v-model="value" :clearable="!required" :data="nodes" :disabled="!!disabled"
                     :multiple="!!multiple" :selectable="checkFilter" @change="onChange"
                     :whole-path="!!wholePath" searchable>
    </mue-tree-picker>
</template>

<script>
import {deepClone, strToArr, TreeDataTrans} from "../../../../utils/lib";

export default {
    inheritAttrs: false,
    components: {},
    props: [
        "field", "model", "disabled", "required", "defaultValue", "multiple", "dataMode", "linkage",
        "wholePath"
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
                if(Array.isArray(v)) return v;
                return strToArr(v)
            },
            set(nv){
                //传递时转字符串（数据库限制）
                this.commitValue(nv);
            }
        },
        bindings() {
            if (this.dataMode === "tree") {
                //树形结构数据，进行数据转换后传递
                return TreeDataTrans(this.__BindRecords("__GroupTree"))
            } else {
                //简单结构数据，进行数据转换后，手动组装成树
                let datas = (this.__BindRecords("__GroupTree") || []).map(m => {
                    return {...m, code: m.id, name: m.name}
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
        }
    },
    methods: {
        checkFilter(data, n){
            if(!this.multiple) return true
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
                if(this.model && (this.linkage in this.model)){
                    return this.model[this.linkage];
                }
                return null;
            }, (v, ov) => {
                if(JSON.stringify(v) === JSON.stringify((ov))) {
                    return
                }
                this.value = null;
                this.$set(this.model, `${this.field}$$text`, "");
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
        onChange(v, vv, node) {
            //存入名称，不再次调用接口
            if(!v) {
                this.$set(this.model, `${this.field}$$text`, "");
                return
            }

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
            }

        }
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
