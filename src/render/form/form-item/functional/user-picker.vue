<template>
    <mue-tree-picker ref="tree" v-model="value" :clearable="!required" :data="nodes" :disabled="!!disabled"
                     :multiple="!!multiple" :selectable="checkFilter" @change="onChange" searchable>
    </mue-tree-picker>
</template>

<script>
import {strToArr, TreeDataTrans} from "../../../../utils/lib";
import BASE from "../base";
export default {
    mixins: [BASE],
    name: "FtmUserPicker",
    inheritAttrs: false,
    components: {},
    props: [
        "field", "model", "disabled", "required", "defaultValue", "multiple", "linkage", "valChange", "vars",
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
                //多选时转数组（组件需要）
                let v = this.model[this.field];
                if (Array.isArray(v)) return v;
                return !!this.multiple ? strToArr(v) : v;
            },
            set(nv) {
                //传递时转字符串（数据库限制）
                this.commitValue(nv);
            }
        }
    },
    methods: {
        checkFilter(data, n) {
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
            } else {
                this.$nextTick(() => {
                    if (!!this.multiple && Array.isArray(v)) {
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
                    } else {
                        let node = this.$refs.tree.GetOptionInfo(v);
                        let name = "";
                        if (this.wholePath) {
                            name = node.$nameRoad.join("-");
                        } else {
                            name = node.name;
                        }
                        this.$set(this.model, `${this.field}$$text`, name)
                        // this.autoComplateFields(node.data);
                    }
                })
            }

            if(this.valChange) {
                try {
                    let val = v;
                    let model = this.model;
                    let _this = this;
                    let vars = this.vars;
                    let nodes = node;
                    eval(this.valChange);
                } catch (e) {
                    console.info(e)
                }
            }
        },
        autoComplateFields(node) {
            //自动补全，目前只支持单选时补全
            (this.saveFields || []).forEach((f) => {
                if (!f.field || !f.mobileField) {
                    return;
                }
                if (!node || !(f.field in node)) {
                    this.$set(this.model, f.mobileField, "");
                    return
                }
                let v = node[f.field];
                this.$set(this.model, f.mobileField, v);
            });
        },
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