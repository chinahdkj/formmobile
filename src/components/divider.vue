<template>
    <div ref="divider"
         class="mue-divider"
         :class="[lineType, postionClass]"
         v-bind="$attrs">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "divider",
        props: {
            //是否使用虚线
            dashed: {
                type: Boolean, default: false
            },
            //是否使用 0.5px 线
            hairline: {
                type: Boolean, default: true
            },
            //内容位置
            contentPosition: {
                type: String, default: "center"
            }
        },
        computed: {
            lineType() {
                if(this.dashed) {
                    return "mue-divider--dashed"
                }
                if(this.hairline) {
                    return "mue-divider--hairline"
                }
                return ""
            },
            postionClass() {
                return `mue-divider--content-${this.contentPosition}`;
            }
        }
    }
</script>

<style lang="less" scoped>
    .mue-divider {
        display: flex;
        align-items: center;
        padding: 16px 0;
        color: #969799;
        font-size: 14px;
        line-height: 24px;
        border-color: #969799;
        border-style: solid;
        border-width: 0;
        background-color: #ffffff;

        &::before {
            content: '';
        }

        &::before, &::after {
            display: block;
            flex: 1;
            box-sizing: border-box;
            height: 1px;
            border-color: inherit;
            border-style: inherit;
            border-width: 1px 0 0;
        }
    }

    .mue-divider--hairline::before, .mue-divider--hairline::after {
        transform: scaleY(0.5);
    }

    .mue-divider--content-center::before, .mue-divider--content-left::before, .mue-divider--content-right::before {
        content: '';
        margin-right: 16px;
    }

    .mue-divider--content-center::after, .mue-divider--content-left::after, .mue-divider--content-right::after {
        margin-left: 16px;
        content: '';
    }

    .mue-divider--content-left::before {
        max-width: 10%;
    }

    .mue-divider--content-right::after {
        max-width: 10%;
    }
</style>