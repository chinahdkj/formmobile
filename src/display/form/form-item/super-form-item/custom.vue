<template>
    <div class="dsp__custom">
        <div v-show="ready"></div>
    </div>
</template>

<script>
import { deepClone } from '../../../../utils/lib'
import UUID from "uuid/v4";
import { EventBus } from "../../../../utils/eventBus"
import Less from "less";
import Vue from "vue";
export default {
    name: "DspCustom",
    inheritAttrs: false,
    components: {},
    props: {
        value: null,
        field: String,
        model: Object,
        disabled: [Number,String,Boolean],
        isNew: [Boolean, Number],
        dspPlatType: String,
        dspCustomHandleMobile: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            ready: false,
            timer: null,
            view: null,
            styleId: UUID(),
            $token: window.localStorage.getItem('uniwater_utoken'),
        };
    },
    computed: {
        $post() {
            return this.$server._Post
        },
        $get() {
            return this.$server._Get
        },
        deepClone() {
            return deepClone
        },
        codesStr(){
            return JSON.stringify(this.dspCustomHandleMobile)
        }
    },
    watch: {
        codesStr: {
            handler() {
                if(this.isDesign) return
                this.updateView();
            }
        }
    },
    methods: {
        updateView() {
            this.ready = false;
            // 减少重复渲染
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                //渲染视图
                this.renderView();
            }, 500)
        },
        renderView() {
            this.clear(this.styleId); // 销毁原内容
            let codes = {...this.dspCustomHandleMobile} || {};
            if(!codes.script) {
                return
            }
            codes.script = codes.script.replace(
                /export default/,
                'return '
            )

            Less.render(codes.less).then(({css}) => {
                $(`<style id="style_${this.styleId}"></style>`).appendTo("head").html(css);
                let common = new Function(codes.script)()
                common.template = this.getSource(codes.template, 'template')
                //使用vue构造器创建子类，传入准备好的实例数据common
                let Template = Vue.extend(common)
                this.view = new Template() //创建子实例

                // 传递变量
                this.view.$parent = this;
                this.view.$value = this.value
                this.view.$field = this.field;
                this.view.$model = this.model;
                this.view.$isNew = !!this.isNew;
                this.view.$disabled = !!this.disabled;
                this.view.$post = this.$post;
                this.view.$get = this.$get;
                this.view.$deepClone = this.$deepClone;
                this.view.$token = this.$token;
                window.$ = $;
                window.moment = moment;
                this.view.$EventBus = EventBus; //事件总线

                //挂载到当前父实例元素下（div.crud-custom-handle）
                this.$el.appendChild(this.view.$mount().$el)
                this.ready = true
            }, (error) => {
                console.error("less parser error", error);
            });
        },
        //取template内部代码字符串
        getSource (source, type) {
            const regex = new RegExp(`<${type}[^>]*>`)
            let openingTag = source.match(regex)
            if (!openingTag) return ''
            else openingTag = openingTag[0]

            return source.slice(
                source.indexOf(openingTag) + openingTag.length,
                source.lastIndexOf(`</${type}>`)
            )
        },
        clear(id) {
            // 销毁动态创建元素
            this.$el.innerHTML = "";
            if (this.view) {
                this.view.$destroy();
            }
            this.view = null;
            // 清空样式注入
            $("#style_" + id).remove();
        }
    },
    mounted() {
        if(!this.isDesign) this.renderView();
    },
    beforeDestroy() {
        if(this.styleId) this.clear(this.styleId);
    },
}
</script>

<style lang="less" scoped>
.dsp__custom {
    width: 100%;
}
</style>
