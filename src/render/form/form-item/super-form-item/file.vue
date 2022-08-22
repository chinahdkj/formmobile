<template>
    <mue-upload v-model="value"
                :quality="0.8"
                :limit="9"
                :multiple="!!multiple"
                :readonly="!!disabled"
                :accept="accept"
                :is-download="true"
                :uploadPrefix="uploadPrefix"
                :is-preview="!!isPreview"
                :preview-url="prevUrl"
                :preview-source="sourceUrl"
                @input="onChange"
                @on-success="onSuccess"
                isFrame>
    </mue-upload>
</template>

<script>
import {strToArr} from "../../../../utils/lib";
import BASE from "../base";
export default {
    mixins: [BASE],
    name: "FtmFile",
    inheritAttrs: false,
    components: {},
    props: ["field", "model", "dataType", "readonly", "disabled", "required", "vars",
      "defaultValue", "multiple", "placeholder","accept", "isDownload", "urlPrefix",
      "valChange", "toKnowledge", "isPreview", "previewUrl", "keyWord", "summary",
      "customKeyWord", "customSummary", "tag", "customTag", "sliceUpload", "chunkSize"],
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
        prevUrl() {
            let prefix = window.FORM_Bindings.onlineViewerPrefix && (window.FORM_Bindings.onlineViewerPrefix || []).length ?
              window.FORM_Bindings.onlineViewerPrefix[0].Value : ""
            return this.previewUrl || prefix || ""
        },
        sourceUrl() {
            let prefix = window.FORM_Bindings.onlineViewerSource && (window.FORM_Bindings.onlineViewerSource || []).length ?
              window.FORM_Bindings.onlineViewerSource[0].Value : ""
            return prefix || ""
        },
        extralParams() {
            let params = {};
            if(this.keyWord || this.customKeyWord) {
                let vals = [];
                let keys = String(this.keyWord).split(",");
                for(let k of keys) {
                    if(k in this.model) {
                        vals.push(this.model[k])
                    }
                }
                let vals2 =  (this.customKeyWord || "").split(",");
                let ValsResult = [...vals, ...vals2] ;
                params.keyWord = ValsResult.join(",");
            }
            if(this.summary || this.customSummary) {
                let vals = [];
                let keys = String(this.summary).split(",");
                for(let k of keys) {
                    if(k in this.model) {
                        vals.push(this.model[k])
                    }
                }
                let vals2 =  (this.customSummary || "").split(",");
                let ValsResult = [...vals, ...vals2] ;
                params.summary = ValsResult.join(",");
            }
            if(this.tag || this.customTag) {
                let vals = [];
                let keys = String(this.tag).split(",");
                for(let k of keys) {
                    if(k in this.model) {
                        vals.push(this.model[k])
                    }
                }
                let vals2 =  (this.customTag || "").split(",");
                let ValsResult = [...vals, ...vals2] ;
                params.tag = ValsResult.join(",");
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
            this.evalValChange(v);
        },
        onSuccess(r, file) {
            if(this.toKnowledge) {
                //同步上传知识库
                let form = new FormData();
                form.append("file", file.raw || file)
                form.append("keyWord", this.extralParams.keyWord || "")
                form.append("summary", this.extralParams.summary || "")
                form.append("tag", this.extralParams.tag || "")
                this.$http.post(`${this.uploadPrefix}/api/external/hdfs/upload`, form, {
                    processData: false,
                    contentType: false
                }).then(res => {
                    console.log("upload-to-knowledge", res);
                }).catch(err => {
                    console.error(err);
                })
            }
        }
    }
}
</script>
