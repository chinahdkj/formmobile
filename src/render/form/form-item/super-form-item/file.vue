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
                @input="onChange"
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
            let prefix = window.FORM_Bindings.onlineViewerPrefix && (window.HDDEV_Bindings.onlineViewerPrefix || []).length ?
              window.FORM_Bindings.onlineViewerPrefix[0].Value : ""
            return this.previewUrl || prefix || ""
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
            this.evalValChange(v);
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
