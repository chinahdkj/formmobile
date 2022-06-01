<template>
    <mue-upload v-model="value"
                :quality="0.8"
                :limit="9"
                :multiple="!!multiple"
                :readonly="!!disabled"
                :accept="accept"
                :is-download="true"
                @input="onChange"
                isFrame>
    </mue-upload>
</template>

<script>
import {strToArr} from "../../../../utils/lib";
export default {
    name: "FtmFile",
    inheritAttrs: false,
    components: {},
    props: ["field", "model", "dataType", "disabled", "required", "vars",
        "defaultValue", "multiple", "placeholder", "accept", "isDownload", 
        "urlPrefix", "valChange", "toKnowledge", "isPreview", "previewUrl", "keyWord", "summary"],
    data() {
        return {};
    },
    computed: {
        value: {
            get() {
                let v = this.model[this.field];
                if(Array.isArray(v)) return v;
                return strToArr(v)
            },
            set(nv) {
                this.commitValue(Array.isArray(nv) ? nv : strToArr(nv));
            }
        },
        uploadPrefix() {
            return this.urlPrefix || this.$OPTS.urlPrefix || "";
        },
        extralParams() {
            let params = {};
            if(this.keyWord) {
                let vals = [];
                let keys = String(this.keyWord).split(",");
                for(let k of keys) {
                    if(k in this.model) {
                        vals.push(this.model[k])
                    }
                }
                params.keyWord = vals.join(",");
            }
            if(this.summary) {
                let vals = [];
                let keys = String(this.summary).split(",");
                for(let k of keys) {
                    if(k in this.model) {
                        vals.push(this.model[k])
                    }
                }
                params.summary = vals.join(",");
            }
            return params
        }
    },
    methods: {
        commitValue(v) {
            let temp = v || [];
            if(this.dataType === "Array") {
                this.$set(this.model, this.field, temp.length === 0 ? null : temp);
            } else {
                this.$set(this.model, this.field, temp.length === 0 ? null : temp.join(","));
            }
        },
        onChange(v) {
            if(this.valChange) {
                try {
                    let val = v;
                    let model = this.model;
                    let vars = this.vars;
                    let _this = this;
                    eval(this.valChange);
                } catch (e) {
                    console.info(e)
                }
            }
        },
        onSuccess(r, file, fileList) {
            if(this.toKnowledge) {
                //同步上传知识库
                let form = new FormData();
                form.append("file", file.raw)
                form.append("keyWord", this.extralParams.keyWord || "")
                form.append("summary", this.extralParams.summary || "")
                $.ajax({
                    type: "POST", contentType: false, dataType: "json",
                    processData: false, data: form, url: `${this.uploadPrefix}/api/external/hdfs/upload`,
                    beforeSend: (xhr) => {
                        if(!(Object.keys(this.FORMRENDER_HEADER).length)) {
                            return
                        }
                        for(let [key, value] of Object.entries(this.FORMRENDER_HEADER)) {
                            xhr.setRequestHeader(key, value);
                        }
                    },
                    success: (res) => {
                        console.log("upload-to-knowledge", res);
                    },
                    error: (err) => {
                        console.error(err);
                    }
                });
            }
        }
    }
}
</script>
