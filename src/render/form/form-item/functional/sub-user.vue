<template>
    <mue-tree-picker ref="tree" v-model="value" :clearable="!required" :data="nodes" :disabled="!!disabled"
                     multiple :selectable="checkFilter" @change="onChange" searchable>
    </mue-tree-picker>
</template>

<script>
import {strToArr, TreeDataTrans} from "../../../../utils/lib";

export default {
    name: "FtmSubUser",
    inheritAttrs: false,
    components: {},
    props: [
        "field", "model", "disabled", "required", "defaultValue", "linkage", "userKey", "dataType"
    ],
    data() {
        return {
            nodes: [],
            unwatch: null
        };
    },
    computed: {
        value: {
            get() {
                //移动端树组件数据接收为数组
                let v = this.model[this.field] || []
                let vv = Array.isArray(v) ? v : JSON.parse(v);
                if(!vv.length) return "";
                return vv.map(m => m[this.userKey]);
                // let v = this.model[this.field];
                // let vv = Array.isArray(v) ? v : strToArr(v)
                // return vv.map(m => m[this.userKey])
            },
            set(nv) {
                if(!nv) {
                    this.$set(this.model, this.field, []);
                    return
                }
                let result = nv.map(m => {
                    let obj = {}
                    obj[this.userKey] = m
                    return obj
                })
                this.$set(this.model, this.field, result);
            }
        }
    },
    methods: {
        checkFilter(data, n) {
            return !data.children.length;
        },
        getChildren(result, node, datas) {
            let r = {code: node.code, name: node.name, pid: node.pid, children: []};
            result.push(r);
            datas.forEach((s) => {
                if (s.pid === r.code) {
                    this.getChildren(r.children, s, datas);
                }
            });
        },
        async initNodes() {
            let nodes = []
            //无论是否存在二级联动，先进行节点及name赋值
            nodes = await this.initInterfaceData();
            this.nodes = TreeDataTrans(Array.isArray(nodes) ? nodes : [nodes]);
            let v = this.value || this.defaultValue
            if (v) {
                this.onChange(v);
            }

            if (!this.linkage) {
                return
            }

            //存在二级联动，nodes重新赋值（不存在默认值时，立即执行）
            this.unwatch = this.$watch(() => {
                if (this.model && (this.linkage in this.model)) {
                    return this.model[this.linkage];
                }
                return null;
            }, (v, ov) => {
                if (JSON.stringify(v) === JSON.stringify((ov))) {
                    return
                }
                this.value = null;
                this.$set(this.model, `${this.field}$$text`, "");
                this.initInterfaceData(v).then(nodes => {
                    this.nodes = TreeDataTrans(Array.isArray(nodes) ? nodes : [nodes]);
                })
            }, {deep: true, immediate: !this.defaultValue});
        },
        initInterfaceData(pid = "") {
            return this.$http.post(`/app/bpm/app/getUserTree`, {type: "user", root: pid})
        },


        onChange(v, vv, node) {
            //存入名称，不再次调用接口
            if (!v) {
                this.$set(this.model, `${this.field}$$text`, "");
                // this.autoComplateFields(null);
                return
            }

            this.$nextTick(() => {
                if (Array.isArray(v)) {
                    let nameArr = [];
                    v.forEach(id => {
                        if (!id) {
                            return
                        }
                        let node = this.$refs.tree.GetOptionInfo(id);
                        if (this.wholePath) {
                            nameArr.push(node.$nameRoad.join("-"))
                        } else {
                            nameArr.push(node.name)
                        }
                    })
                    this.$set(this.model, `${this.field}$$text`, nameArr.join(","))
                }
            })
        }
    },
    mounted() {
        this.$set(this.model, `${this.field}$$text`, this.model[`${this.field}$$text`] || "");
        this.initNodes();
    },
    beforeMount() {
        if (this.unwatch) {
            this.unwatch();
        }
    }
}
</script>