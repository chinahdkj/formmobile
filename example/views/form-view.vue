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
                            "labelLine": 0,
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
                        "id": "9b62a117-b98a-4925-aba7-a8fe6b149712",
                        "type": "split-line",
                        "icon": "fa-credit-card",
                        "description": "分割线",
                        "classify": "layout",
                        "options": {
                            "hide": 0,
                            "position": "left",
                            "showCondition": null,
                            "field": "field_1634780378588",
                            "name": "移动端组件"
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
                    },
                    {
                        "id": "27ed1505-f634-45e7-8259-c484b0266623",
                        "type": "tabs",
                        "icon": "fa-tags",
                        "description": "标签页",
                        "classify": "layout",
                        "options": {
                            "hide": 0,
                            "customClass": null,
                            "type": "normal",
                            "position": "top",
                            "showCondition": null,
                            "field": "field_1634717760983",
                            "name": "标签页"
                        },
                        "tabs": [
                            {
                                "value": "32de97ad-7775-4a28-b279-5c7913cb7dc0",
                                "name": "标签",
                                "children": [
                                    {
                                        "id": "28e2e0f3-5113-4cd6-a246-e1a84b58abf7",
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
                                            "required": 0,
                                            "regular": 0,
                                            "field": "field_1634723175403",
                                            "name": "单行文本1",
                                            "rules": [],
                                            "checkType": null
                                        }
                                    }
                                ]
                            },
                            {
                                "name": "标签1",
                                "value": "e11b1bfa-be52-47e8-b4ec-d54451655535",
                                "children": [
                                    {
                                        "id": "607ca2bd-38c9-48e2-a52c-612916dbfe15",
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
                                            "required": 0,
                                            "regular": 0,
                                            "field": "field_1634723182912",
                                            "name": "单行文本2",
                                            "rules": [],
                                            "checkType": null
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "4ffb694a-8cdf-43d7-ad94-ffef4283e8d9",
                        "type": "card",
                        "icon": "fa-credit-card",
                        "description": "卡片",
                        "classify": "layout",
                        "options": {
                            "hide": 0,
                            "customClass": null,
                            "showTitle": 1,
                            "title": "标题",
                            "shadow": "never",
                            "showCondition": null,
                            "showBorder": 0,
                            "titleLine": 0,
                            "field": "field_1634726256768",
                            "name": "卡片"
                        },
                        "cardItem": [
                            {
                                "id": "4fbe11e3-6441-42ca-bdbf-1797e42b5644",
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
                                    "required": 0,
                                    "regular": 0,
                                    "field": "field_1634726277237",
                                    "name": "单行文本",
                                    "rules": [],
                                    "checkType": null
                                }
                            },
                            {
                                "id": "f1d28a5e-097b-4e3e-98c5-91a636aef4e0",
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
                                    "field": "field_1634726668285",
                                    "name": "多行文本",
                                    "rules": []
                                }
                            }
                        ]
                    },
                    {
                        "id": "7b413c2f-1420-4c20-a7b7-b7324f753ce9",
                        "type": "grids",
                        "icon": "fa-navicon",
                        "description": "栅格布局",
                        "classify": "layout",
                        "options": {
                            "hide": 0,
                            "customClass": null,
                            "gutter": 20,
                            "showCondition": null,
                            "isBorder": 0,
                            "isLast": 0,
                            "field": "field_1634783830568",
                            "name": "栅格布局"
                        },
                        "cols": [
                            {
                                "value": "9055bf19-a7ac-40f4-956b-b9bd2b3633f1",
                                "span": 12,
                                "children": [
                                    {
                                        "id": "e0af5961-62d6-4288-a21b-1447cc6f1d25",
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
                                            "required": 0,
                                            "regular": 0,
                                            "field": "field_1634783850506",
                                            "name": "单行文本1",
                                            "rules": [],
                                            "checkType": null
                                        }
                                    }
                                ]
                            },
                            {
                                "value": "ad57f0a6-0559-4ab4-90a6-f16bab459206",
                                "span": 12,
                                "children": [
                                    {
                                        "id": "7d71f7b3-2c75-45bc-b4bc-d437036136c5",
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
                                            "required": 0,
                                            "regular": null,
                                            "field": "field_1634783853606",
                                            "name": "单行文本2",
                                            "rules": []
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "48ec50a0-3fe2-4c32-90d3-8cadc2da1b20",
                        "type": "sub-form",
                        "icon": "fa-credit-card",
                        "description": "子表单",
                        "classify": "layout",
                        "options": {
                            "hide": 0,
                            "customClass": null,
                            "disabled": 0,
                            "labelHidden": 0,
                            "labelWidth": 0,
                            "showCondition": null,
                            "labelLine": null,
                            "width": "100%",
                            "showRowNum": true,
                            "subFormId": "",
                            "subFormEdition": "",
                            "subObjectId": "",
                            "subObjectEdition": "",
                            "field": "field_1634785315756",
                            "name": "子表单",
                            "dataType": null
                        },
                        "subs": [
                            {
                                "id": "f471672f-e864-4afa-9912-61b0b4b0319b",
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
                                    "required": 0,
                                    "regular": 0,
                                    "field": "field_1634785366887",
                                    "name": "单行文本",
                                    "rules": [],
                                    "checkType": null
                                }
                            },
                            {
                                "id": "a249b17a-a3a1-4a7f-b01b-82aadc3822f0",
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
                                    "dataType": "String",
                                    "customClass": null,
                                    "width": "100%",
                                    "labelHidden": 0,
                                    "labelWidth": 0,
                                    "labelLine": null,
                                    "required": 0,
                                    "field": "field_1634785372296",
                                    "name": "下拉框",
                                    "rules": []
                                }
                            },
                            {
                                "id": "cefb2e67-b2c5-4975-8088-9b546107db0e",
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
                                    "multiple": 0,
                                    "placeholder": "",
                                    "accept": "",
                                    "dataType": "String",
                                    "isDownload": 0,
                                    "field": "field_1634785400687",
                                    "name": "文件",
                                    "rules": []
                                }
                            },
                            {
                                "id": "9a73fc68-7072-4383-a16b-31b7dd433183",
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
                                    "multiple": 0,
                                    "limit": 5,
                                    "accept": ".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF",
                                    "dataType": "String",
                                    "thumbZip": 0,
                                    "isComment": 0,
                                    "field": "field_1634785404113",
                                    "name": "图片",
                                    "rules": []
                                }
                            }
                        ]
                    },
                    {
                        "id": "8b7c28cb-c54c-4274-b8ba-dc1354c0fb0e",
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
                            "required": 0,
                            "regular": 0,
                            "field": "field_1634898577921",
                            "name": "单行文本",
                            "rules": [],
                            "checkType": null
                        }
                    },
                    {
                        "id": "2bd82338-9d3b-48c0-b2dd-a80d54858bd2",
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
                            "labelLine": null,
                            "required": 0,
                            "field": "field_1634898611699",
                            "name": "单选框组",
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
            model: {
                text0: "bbbccccc",
                field_1634287958035: "/upload/65de37a5168c9c3a5d95360c67d56051.jpg,/upload/6f7bcf4e14f2d39a0fb550e39c15cc8d.png",
                field_1634700160854: "/upload/5/56/5659d10fc7e544f6b6dad5e4d2ec7c72.wav",
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
