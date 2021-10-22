<template>
    <div class="form-display-demo">
        <form-display :model="model" :form-object="formObject"></form-display>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {
            loading: false,
            model: {
                "text0": "123123",
                "field_1634117033617": "123123",
                "field_1634120953850": "1",
                "field_1634180237996": "val1",
                "field_1634182902475": ["val2", "val3"],
                "field_1634183950171": "1",
                "field_1634184076151": 2,
                "field_1634191853549": "14:32:53",
                "field_1634264298442": "2021-10-21",
                "field_1634264357536": ["2021-10-05", "2021-11-23"],
                "field_1634266365312": 3,
                "field_1634267540547": 50,
                "field_1634268098595": "This is a text",
                "field_1634281000159": null,
                "field_1634287958035": "/upload/65de37a5168c9c3a5d95360c67d56051.jpg,/upload/6f7bcf4e14f2d39a0fb550e39c15cc8d.png",
                "field_1634548031267": "111,112",
                "field_1634554628599": "5dd38a8266d735290078250c",
                "field_1634608805377": "5dd38a8266d735290078250c",
                "field_1634615117342": "120.7616436481476,30.74703864628557",
                "field_1634633021641": "一级",
                "field_1634697515211": null,
                "field_1634700153987": null,
                "field_1634700160854": "/upload/5/56/5659d10fc7e544f6b6dad5e4d2ec7c72.wav",
                "field_1634700164206": "/upload/8e3b4717346c560ccb06b27a2092d4af.png",
                "field_1634548031267$$text": "随意勾选 1-1-1,随意勾选 1-1-2",
                "field_1634554628599$$text": "软件部"
            },
            formObject: {
                "list": [
                    {
                        "id": "5232101e-7ca9-4deb-8e2c-5035776197fd",
                        "type": "text",
                        "icon": "fa-square-o",
                        "description": "单行文本",
                        "classify": "form",
                        "options": {
                            "dataType": "Text",
                            "hide": 0,
                            "disabled": 0,
                            "readonly": 0,
                            "defaultValue": "",
                            "showCondition": null,
                            "placeholder": null,
                            "customClass": null,
                            "width": "100%",
                            "labelWidth": 0,
                            "labelLine": null,
                            "labelHidden": 0,
                            "required": 1,
                            "regular": 0,
                            "field": "text0",
                            "name": "单行文本",
                            "rules": [],
                            "checkType": null,
                            "unit": "只"
                        }
                    },
                    {
                        "id": "022b0fcb-1c5b-428e-b85d-d8bf3d779aa5",
                        "type": "textarea",
                        "icon": "fa-sticky-note-o",
                        "description": "多行文本",
                        "classify": "form",
                        "options": {
                            "hide": 0,
                            "disabled": 0,
                            "readonly": 0,
                            "defaultValue": "",
                            "showCondition": null,
                            "placeholder": null,
                            "rows": 3,
                            "customClass": null,
                            "width": "100%",
                            "labelWidth": 0,
                            "labelHidden": 0,
                            "labelLine": null,
                            "required": 0,
                            "regular": 0,
                            "field": "field_1634117033617",
                            "name": "多行文本",
                            "rules": []
                        }
                    },
                    {
                        "id": "93be8399-eef0-4d8a-8dc0-2009f84b0f17",
                        "type": "select",
                        "icon": "fa-plus-square-o",
                        "description": "下拉框",
                        "classify": "form",
                        "options": {
                            "hide": 0,
                            "disabled": 0,
                            "defaultValue": null,
                            "showCondition": null,
                            "placeholder": null,
                            "multiple": 0,
                            "expandTags": "collapse",
                            "optionsType": "dynamic",
                            "bindings": [
                                {
                                    "Value": "val1",
                                    "Name": "选项一"
                                },
                                {
                                    "Value": "val2",
                                    "Name": "选项二"
                                },
                                {
                                    "Value": "val3",
                                    "Name": "选项三"
                                }
                            ],
                            "dataType": "String",
                            "customClass": null,
                            "width": "100%",
                            "labelHidden": 0,
                            "labelWidth": 0,
                            "labelLine": null,
                            "required": 0,
                            "field": "field_1634120953850",
                            "name": "下拉框",
                            "rules": [],
                            "optionsDict": "formHtmlType"
                        }
                    },
                    {
                        "id": "023e9f37-48aa-4fe4-8fa0-e380ab8e835a",
                        "type": "radio",
                        "icon": "fa-dot-circle-o",
                        "description": "单选框组",
                        "classify": "form",
                        "options": {
                            "hide": 0,
                            "disabled": 0,
                            "defaultValue": null,
                            "showCondition": null,
                            "optionsType": "static",
                            "bindings": [
                                {
                                    "Value": "val1",
                                    "Name": "选项一"
                                },
                                {
                                    "Value": "val2",
                                    "Name": "选项二"
                                },
                                {
                                    "Value": "val3",
                                    "Name": "选项三"
                                }
                            ],
                            "customClass": null,
                            "layoutMode": "inline",
                            "width": "100%",
                            "labelHidden": 0,
                            "labelWidth": 0,
                            "labelLine": 0,
                            "required": 0,
                            "field": "field_1634180237996",
                            "name": "单选框组",
                            "rules": []
                        }
                    },
                    {
                        "id": "d9b52428-2935-497a-a04b-b95cea416163",
                        "type": "checkbox",
                        "icon": "fa-check-square-o",
                        "description": "多选框组",
                        "classify": "form",
                        "options": {
                            "hide": 0,
                            "disabled": 0,
                            "defaultValue": null,
                            "showCondition": null,
                            "dataType": "Array",
                            "optionsType": "static",
                            "bindings": [
                                {
                                    "Value": "val1",
                                    "Name": "选项一"
                                },
                                {
                                    "Value": "val2",
                                    "Name": "选项二"
                                },
                                {
                                    "Value": "val3",
                                    "Name": "选项三"
                                }
                            ],
                            "customClass": null,
                            "layoutMode": "inline",
                            "width": "100%",
                            "labelHidden": 0,
                            "labelWidth": 0,
                            "labelLine": null,
                            "required": 0,
                            "field": "field_1634182902475",
                            "name": "多选框组",
                            "rules": []
                        }
                    },
                    {
                        "id": "af6f4e6b-078c-4780-8562-0c6b63728f39",
                        "type": "switch",
                        "icon": "iconfont icon-kaiguanliang",
                        "description": "开关",
                        "classify": "form",
                        "options": {
                            "hide": 0,
                            "disabled": 0,
                            "defaultValue": "0",
                            "showCondition": null,
                            "customClass": null,
                            "labelHidden": 0,
                            "labelWidth": 0,
                            "labelLine": null,
                            "required": 0,
                            "field": "field_1634183950171",
                            "name": "开关",
                            "rules": [],
                            "dataType": null
                        }
                    },
                    {
                        "id": "81bb549d-5b2c-4c0f-be7a-e4812c94f20c",
                        "type": "input-number",
                        "icon": "fa-sticky-note-o",
                        "description": "计数器",
                        "classify": "form",
                        "options": {
                            "hide": 0,
                            "disabled": 0,
                            "defaultValue": 0,
                            "showCondition": null,
                            "customClass": null,
                            "width": "100%",
                            "labelHidden": 0,
                            "labelWidth": 0,
                            "labelLine": null,
                            "required": 0,
                            "controls": true,
                            "controlsPosition": "",
                            "min": 0,
                            "max": 100,
                            "step": 1,
                            "field": "field_1634184076151",
                            "name": "计数器",
                            "rules": []
                        }
                    },
                    {
                        "id": "9629dee5-fd89-40cb-87bd-3f4fa6349e4b",
                        "type": "time-picker",
                        "icon": "fa-sticky-note-o",
                        "description": "时间选择器",
                        "classify": "form",
                        "options": {
                            "hide": 0,
                            "disabled": 0,
                            "editable": 0,
                            "clearable": 1,
                            "readonly": 0,
                            "placeholder": "请选择时间",
                            "arrowControl": 0,
                            "defaultValue": null,
                            "showCondition": null,
                            "customClass": null,
                            "width": "100%",
                            "isRange": false,
                            "labelHidden": 0,
                            "labelWidth": 0,
                            "labelLine": null,
                            "required": 0,
                            "format": "HH:mm:ss",
                            "valueFormat": "HH:mm:ss",
                            "field": "field_1634191853549",
                            "name": "时间选择器",
                            "rules": []
                        }
                    },
                    {
                        "id": "f63f4010-d811-464a-8dee-588fa06d7c24",
                        "type": "date-picker",
                        "icon": "fa-sticky-note-o",
                        "description": "日期选择器",
                        "classify": "form",
                        "options": {
                            "hide": 0,
                            "disabled": 0,
                            "editable": 0,
                            "clearable": 1,
                            "readonly": 0,
                            "placeholder": "请选择日期",
                            "showCondition": null,
                            "defaultValue": null,
                            "customClass": null,
                            "width": "100%",
                            "labelHidden": 0,
                            "labelWidth": 0,
                            "labelLine": null,
                            "required": 0,
                            "mode": "default",
                            "format": "yyyy-MM-dd",
                            "valueFormat": "String",
                            "defaultType": "static",
                            "dftActivity": "",
                            "max": {
                                "value": "now",
                                "offsetType": "static",
                                "offset": 3,
                                "unit": "days"
                            },
                            "min": {
                                "value": "now",
                                "offsetType": "static",
                                "offset": -2,
                                "unit": "days"
                            },
                            "field": "field_1634264298442",
                            "name": "日期选择器",
                            "rules": []
                        }
                    },
                    {
                        "id": "06705f04-e9ea-41fa-beba-2b27fa3f207e",
                        "type": "date-range-picker",
                        "icon": "fa-sticky-note-o",
                        "description": "区间选择器",
                        "classify": "form",
                        "options": {
                            "hide": 0,
                            "disabled": 0,
                            "editable": 0,
                            "clearable": 1,
                            "readonly": 0,
                            "placeholder": null,
                            "showCondition": null,
                            "defaultValue": null,
                            "customClass": null,
                            "width": "100%",
                            "labelHidden": 0,
                            "labelWidth": 0,
                            "labelLine": null,
                            "required": 0,
                            "format": "yyyy-MM-dd",
                            "field": "field_1634264357536",
                            "name": "区间选择器",
                            "rules": []
                        }
                    },
                    {
                        "id": "93234637-2851-4309-b71a-8cde526c3860",
                        "type": "rate",
                        "icon": "fa-sticky-note-o",
                        "description": "评分",
                        "classify": "form",
                        "options": {
                            "hide": 0,
                            "disabled": 0,
                            "defaultValue": 3,
                            "customClass": null,
                            "width": "100%",
                            "showCondition": null,
                            "labelHidden": 0,
                            "labelWidth": 0,
                            "labelLine": null,
                            "required": 0,
                            "max": 5,
                            "allowHalf": true,
                            "showScore": false,
                            "field": "field_1634266365312",
                            "name": "评分",
                            "rules": []
                        }
                    },
                    {
                        "id": "f6a346d6-4e64-4580-8eaa-8c87ed631464",
                        "type": "slider",
                        "icon": "fa-sticky-note-o",
                        "description": "滑块",
                        "classify": "form",
                        "options": {
                            "hide": 0,
                            "disabled": 0,
                            "defaultValue": 50,
                            "customClass": null,
                            "width": "100%",
                            "showCondition": null,
                            "labelHidden": 0,
                            "labelWidth": 0,
                            "labelLine": null,
                            "required": 0,
                            "showStops": false,
                            "showTooltip": true,
                            "range": 0,
                            "min": 0,
                            "max": 100,
                            "step": 1,
                            "field": "field_1634267540547",
                            "name": "滑块",
                            "rules": []
                        }
                    },
                    {
                        "id": "28c531ce-70bf-45b4-9675-f94e573dd111",
                        "type": "word",
                        "icon": "fa-sticky-note-o",
                        "description": "文字",
                        "classify": "form",
                        "options": {
                            "hide": 0,
                            "defaultValue": "This is a text",
                            "showCondition": null,
                            "width": "100%",
                            "customClass": null,
                            "labelHidden": 0,
                            "labelWidth": 0,
                            "labelLine": null,
                            "fontSize": "12px",
                            "color": "#333333",
                            "fontWeight": "normal",
                            "field": "field_1634268098595",
                            "name": "文字",
                            "rules": [],
                            "customStyle": []
                        }
                    },
                    {
                        "id": "96828c2d-d9fd-4636-9ea4-28ea08808a29",
                        "type": "file",
                        "icon": "fa-square-o",
                        "description": "文件",
                        "classify": "form",
                        "options": {
                            "hide": 0,
                            "disabled": 0,
                            "defaultValue": null,
                            "customClass": null,
                            "width": "100%",
                            "showCondition": null,
                            "labelWidth": 0,
                            "labelLine": null,
                            "labelHidden": 0,
                            "required": 0,
                            "multiple": 1,
                            "placeholder": "",
                            "accept": "",
                            "dataType": "String",
                            "isDownload": 1,
                            "field": "field_1634281000159",
                            "name": "文件",
                            "rules": []
                        }
                    },
                    {
                        "id": "01506ff6-1127-48d9-9575-d661c05b5a23",
                        "type": "picture",
                        "icon": "fa-dot-circle-o",
                        "description": "图片",
                        "classify": "form",
                        "options": {
                            "hide": 0,
                            "disabled": 0,
                            "readonly": 0,
                            "defaultValue": null,
                            "customClass": null,
                            "width": "100%",
                            "showCondition": null,
                            "labelWidth": 0,
                            "labelLine": null,
                            "labelHidden": 0,
                            "required": 0,
                            "multiple": 1,
                            "limit": 5,
                            "accept": ".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF",
                            "dataType": "String",
                            "thumbZip": 0,
                            "isComment": 0,
                            "field": "field_1634287958035",
                            "name": "图片",
                            "rules": []
                        }
                    },
                    {
                        "id": "15031f4c-01c4-49d0-9c9f-8c03b09514ae",
                        "type": "ztree",
                        "icon": "fa-check-square-o",
                        "description": "树形选择器",
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
                            "multiple": 1,
                            "bindings": [],
                            "dataMode": "simple",
                            "linkage": "",
                            "wholePath": 0,
                            "dict": "test_tree",
                            "sourceType": "dict",
                            "interface": "",
                            "saveFields": [],
                            "autoType": 1,
                            "itfParams": {},
                            "field": "field_1634548031267",
                            "name": "树形选择器",
                            "rules": []
                        }
                    },
                    {
                        "id": "10183eff-10d0-476d-972d-122c6615fd17",
                        "type": "department-picker",
                        "icon": "fa-sticky-note-o",
                        "description": "部门选择",
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
                            "multiple": 0,
                            "bindings": [],
                            "dataMode": "simple",
                            "linkage": "",
                            "wholePath": 0,
                            "field": "field_1634554628599",
                            "name": "部门选择",
                            "rules": []
                        }
                    },
                    {
                        "id": "e8d09fd4-bf8f-480b-a8bc-f7b6ba2f85c6",
                        "type": "expression",
                        "icon": "fa-dot-circle-o",
                        "description": "表达式计算",
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
                            "expression": "return ${field_1634554628599}",
                            "field": "field_1634608805377",
                            "name": "表达式计算",
                            "rules": []
                        }
                    },
                    {
                        "id": "0fad706e-f3d5-4566-9abd-1fdec663a203",
                        "type": "location",
                        "icon": "fa-check-square-o",
                        "description": "定位组件",
                        "classify": "form",
                        "options": {
                            "hide": 0,
                            "disabled": 0,
                            "placeholder": null,
                            "showCondition": null,
                            "customClass": null,
                            "width": "100%",
                            "labelHidden": 0,
                            "labelWidth": 0,
                            "labelLine": null,
                            "required": 0,
                            "center": null,
                            "saveFields": [],
                            "field": "field_1634615117342",
                            "name": "定位组件",
                            "rules": []
                        }
                    },
                    {
                        "id": "9d126a45-bd85-4e78-998c-85523da2b630",
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
                            "format": "http://192.168.100.179:8089/bpm/customize-api/dict/query?code=GSlevel&name=name&value=$self",
                            "showField": "name",
                            "valueField": "name",
                            "saveFields": [],
                            "autoType": 2,
                            "itfParams": {},
                            "field": "field_1634633021641",
                            "name": "自动补全",
                            "rules": []
                        }
                    },
                    {
                        "id": "f6822bda-a475-43d1-a470-a5ff84c1c1fe",
                        "type": "water-marking-camera",
                        "icon": "fa-square-o",
                        "description": "水印相机",
                        "classify": "form",
                        "options": {
                            "hide": 0,
                            "disabled": 0,
                            "placeholder": null,
                            "showCondition": null,
                            "customClass": null,
                            "width": "100%",
                            "labelHidden": 0,
                            "labelWidth": 0,
                            "labelLine": null,
                            "required": 0,
                            "multiple": 1,
                            "limit": 5,
                            "dataType": "String",
                            "field": "field_1634697515211",
                            "name": "水印相机",
                            "rules": []
                        }
                    },
                    {
                        "id": "b6b1837a-186a-4f06-96ef-83c91fe96a6d",
                        "type": "code-scanner",
                        "icon": "fa-sticky-note-o",
                        "description": "条码扫描",
                        "classify": "form",
                        "options": {
                            "hide": 0,
                            "disabled": 0,
                            "defaultValue": null,
                            "showCondition": null,
                            "placeholder": "电脑端不支持扫描，请输入条纹码",
                            "customClass": null,
                            "width": "100%",
                            "labelHidden": 0,
                            "labelWidth": 0,
                            "labelLine": null,
                            "required": 0,
                            "field": "field_1634700153987",
                            "name": "条码扫描",
                            "rules": []
                        }
                    },
                    {
                        "id": "91feac68-2a79-4a8a-a224-01c29350e45b",
                        "type": "audio",
                        "icon": "fa-dot-circle-o",
                        "description": "音频录制",
                        "classify": "form",
                        "options": {
                            "hide": 0,
                            "disabled": 0,
                            "readonly": 0,
                            "placeholder": null,
                            "showCondition": null,
                            "customClass": null,
                            "width": "100%",
                            "labelHidden": 0,
                            "labelWidth": 0,
                            "labelLine": null,
                            "required": 0,
                            "multiple": 1,
                            "limit": 5,
                            "dataType": "String",
                            "field": "field_1634700160854",
                            "name": "音频录制",
                            "rules": []
                        }
                    },
                    {
                        "id": "6d8b4192-29e1-4963-824f-cd56f7165c63",
                        "type": "signature",
                        "icon": "fa-check-square-o",
                        "description": "电子签名",
                        "classify": "form",
                        "options": {
                            "hide": 0,
                            "disabled": 0,
                            "readonly": 0,
                            "placeholder": null,
                            "showCondition": null,
                            "customClass": null,
                            "width": "100%",
                            "labelHidden": 0,
                            "labelWidth": 0,
                            "labelLine": null,
                            "required": 0,
                            "field": "field_1634700164206",
                            "name": "电子签名",
                            "rules": []
                        }
                    }
                ],
                "globalConfig": {
                    "base": {
                        "formHtmlName": "表单aaaa",
                        "formHtmlCode": "my-form",
                        "formHtmlType": "type1",
                        "formHtmlDescrip": "描述1111",
                        "formHtmlId": "",
                        "formHtmlEdition": "",
                        "objectId": "",
                        "objectEdition": "",
                        "formId": "",
                        "formEdition": ""
                    },
                    "customClass": null,
                    "print": 0,
                    "labelWidth": 0
                }
            },
        };
    },
    computed: {},
    methods: {}
};
</script>

<style lang="less">
.form-display-demo {
    overflow-y: auto;
    height: 100%;
    box-sizing: border-box;
}
</style>
