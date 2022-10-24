<template>
    <div class="dsp__high-scanner" :class="{'single': files.length === 1}">
        <mue-upload
            v-model="files"
            :multiple="!!multiple"
            readonly
            isFrame
            :uploadPrefix="uploadPrefix"
            :is-preview="!!isPreview"
            :preview-url="prevUrl"
            :preview-source="sourceUrl">
        </mue-upload>
    </div>
</template>

<script>
import {strToArr} from '../../../../utils/lib'

export default {
    name: "DspHighScanner",
    components: {},
    props: ["value", "multiple", "urlPrefix", "isPreview", "previewUrl"],
    data() {
        return {};
    },
    computed: {
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
        files: {
            get() {
                if(Array.isArray(this.value)) return this.value;
                return strToArr(this.value)
            },
            set() {

            }
        }
    }
}
</script>


<style lang="less">
.dsp__high-scanner {
    width: 100%;
    box-sizing: border-box;

    &.single {
        .mue-upload ul.mue-upload-list > li.__upload-file {
            margin-bottom: 0;
        }
    }
}
</style>
