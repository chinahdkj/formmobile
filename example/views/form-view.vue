<template>
    <div class="form-view-demo">
        <div class="form-view-container">
            <form-view ref="formView" v-model="model" :form-object="formObject"></form-view>
        </div>
        <div class="form-view-buttons">
            <van-button size="large" type="default" @click="resetForm">重置</van-button>
            <van-button size="large" type="primary" @click="getFormData">提交</van-button>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {
            formObject: {
                "list": [
                    {
                        "id": "d7ce4592-eb4b-4eea-8881-87f2a28c5201",
                        "type": "autocomplete",
                        "icon": "fa-check-square-o",
                        "description": "自动补全",
                        "classify": "form",
                        "options": {
                            "hide": 0,
                            "disabled": 0,
                            "defaultValue": null,
                            "placeholder": null,
                            "showCondition": null,
                            "customClass": null,
                            "width": "100%",
                            "labelHidden": 0,
                            "labelWidth": 0,
                            "labelLine": null,
                            "required": 0,
                            "format": "http://192.168.100.179:8089/hddev/form/formobjectdata/shen-form1:4/query.json",
                            "showField": "",
                            "valueField": "",
                            "saveFields": [],
                            "autoType": 1,
                            "itfParams": "return {\n    \"conditions\": [\n        {\n            \"Field\": \"sname\",\n            \"Value\": $self,\n            \"Operate\": \"like\",\n            \"Relation\": \"and\"\n        }\n    ],\n    \"order\": [\n        {\n            \"Field\": \"sage\",\n            \"Type\": 1\n        }\n    ],\n    \"index\": 1,\n    \"size\": 50\n}",
                            "name": "名字",
                            "rules": [],
                            "field": "name"
                        }
                    }
                ],
                "globalConfig": {
                    "base": {
                        "formHtmlName": "表单aaaa",
                        "formHtmlCode": "my-form",
                        "formHtmlType": "type0",
                        "formHtmlDescrip": "描述1111",
                        "formHtmlId": "",
                        "formHtmlEdition": "",
                        "objectId": "",
                        "objectEdition": "",
                        "formId": "",
                        "formEdition": ""
                    },
                    "customClass": null,
                    "print": 0
                }
            },
            model: {
                text0: "bbbccccc",
                field_1634287958035: "/upload/65de37a5168c9c3a5d95360c67d56051.jpg,/upload/6f7bcf4e14f2d39a0fb550e39c15cc8d.png",
                field_1634700160854: "/upload/5/56/5659d10fc7e544f6b6dad5e4d2ec7c72.wav",
                field_1636072780562: "5e623edcfdb792000acb505e"
                // field_zbd: [{"field_zbd-text": "11111", "field_zbd-date": "2021-06-24", "field_zbd-number": 1}],
                // field_switch: 1,
            }
        };
    },
    computed: {},
    methods: {
        formSet(model) {
            // this.$set(model, "text0", "bbb");
            // this.$set(model, "field_text11", "sdddsdds");
            // this.$set(model, "field_zbd", [{
            //     "field_zbd-text": "11111",
            //     "field_zbd-date": "2021-06-24",
            //     "field_zbd-number": 1
            // }]);
            // this.$set(model, "field_switch", 1);
            // // this.$set(model, "field_zbd", [
            // //     {
            // //         "field_zbd-text": "11111",
            // //         "field_zbd-date": "2021-06-22",
            // //         "field_zbd-number": 2
            // //     }
            // // ]);
            // return model;
        },
        resetForm() {
            this.$refs.formView._resetForm();
        },
        getFormData() {
            this.$refs.formView._getFormData().then(({model}) => {
                this.$toast("提交成功，请在控制台查看数据")
                console.log("表单数据", model);
            })
        }
    }
};
</script>

<style lang="less">
.form-view-demo {
    width: 100%;
    height: 100%;

    .form-view-container {
        height: calc(100% - 60px);
        overflow-y: auto;
        overflow-x: hidden;
    }

    .form-view-buttons {
        height: 60px;
        display: flex;
        align-items: center;
        padding: 0 12px;
        background-color: #ffffff;
        border-top: solid 1px #f0f0f0;

        .van-button {
            border-radius: 3px;
            flex: 1;
            margin: 0 6px;
        }
    }
}
</style>
