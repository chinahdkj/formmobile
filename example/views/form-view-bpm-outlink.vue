<template>
  <div>
    <form-view ref="formView" :form-object="formObject" v-model="model"></form-view>
  </div>
</template>

<script>
const actions = {
  //bpm点击提交数据时触发
  "BPM-BEFORE-SUBMIT": (view, params) => {
    console.log ("bpm点击提交数据时触发--------", params);
    view.bpmModel = params.model;
    if (view.$refs.formView) {
      view.$refs.formView._getFormData ().then (({ model }) => {
        if (window.parent) {
          window.parent.postMessage ({ action: "SEND-MODEL-TO-BPM", params: { model, status: "success" } }, "*");
        }
      }).catch ((err) => {
        if (window.parent) {
          window.parent.postMessage ({ action: "SEND-MODEL-TO-BPM", params: { model: {}, status: "fail" } }, "*");
        }
      });
    }
  },
  //bpm提交数据成功时触发
  "BPM-SUBMIT-SUCCESS": (view, params) => {
    console.log ("bpm提交数据成功时触发--------", params);
    let model = params.model;
    if (params.type === "create-order") {
      //新建工单
      //接口存数据
    }

    if (params.type === "operate-order") {
      //处理工单
    }
  },
  //bpm点击保存数据时触发
  "BPM-BEFORE-SAVE": (view, params) => {
    console.log ("bpm点击保存数据时触发--------", params);
    view.bpmModel = params.model;
    if (view.$refs.formView) {
      view.$refs.formView._getFormData ().then (({ model }) => {
        if (window.parent) {
          window.parent.postMessage ({ action: "SEND-MODEL-TO-BPM", params: { model, status: "success" } }, "*");
        }
      }).catch ((err) => {
        if (window.parent) {
          window.parent.postMessage ({ action: "SEND-MODEL-TO-BPM", params: { model: {}, status: "fail" } }, "*");
        }
      });
    }
  },
  //bpm提交数据成功时触发
  "BPM-SAVE-SUCCESS": (view, params) => {
    console.log ("bpm保存数据成功时触发--------", params);
    let model = params.model;
    if (params.type === "create-order") {
      //新建工单
      //接口存数据
    }

    if (params.type === "operate-order") {
      //处理工单
    }
  }
};
export default {
  name: "form-view-bpm-outlink",
  components: {},
  props: {},
  data() {
    return {
      formObject: {
        "list": [
          {
            "id": "690815a4-741a-491a-b4f0-1384f6ef4823",
            "type": "text",
            "icon": "fa-square-o",
            "classify": "form",
            "options": {
              "dataType": "Text",
              "hide": 0,
              "disabled": 0,
              "readonly": 0,
              "defaultValue": "aaaaa",
              "placeholder": null,
              "customClass": null,
              "width": "100%",
              "labelWidth": 90,
              "labelLine": null,
              "labelHidden": 0,
              "required": 0,
              "checkType": "String",
              "regular": null,
              "field": "text0",
              "name": "单行文本",
              "rules": [
                {
                  "type": "String"
                }
              ]
            }
          },
          {
            "id": "7fc818d5-9498-4fcd-9855-89af85800a24",
            "type": "text",
            "icon": "fa-square-o",
            "classify": "form",
            "options": {
              "dataType": "Text",
              "hide": 0,
              "disabled": 0,
              "readonly": 0,
              "defaultValue": "",
              "placeholder": null,
              "customClass": null,
              "width": "100%",
              "labelWidth": 90,
              "labelLine": null,
              "labelHidden": 0,
              "required": 0,
              "checkType": "String",
              "regular": 0,
              "field": "text1",
              "name": "文本",
              "rules": [
                {
                  "type": "String"
                }
              ]
            }
          },
          {
            "id": "371bd7db-eba6-4e51-8ea9-56334665082c",
            "type": "time-picker",
            "icon": "fa-sticky-note-o",
            "classify": "form",
            "options": {
              "hide": 0,
              "disabled": 0,
              "editable": 0,
              "clearable": 1,
              "readonly": 0,
              "placeholder": null,
              "arrowControl": 0,
              "defaultValue": null,
              "customClass": null,
              "width": "100%",
              "isRange": false,
              "labelHidden": 0,
              "labelWidth": 90,
              "labelLine": null,
              "required": 0,
              "format": "HH:mm:ss",
              "valueFormat": "HH:mm:ss",
              "field": "field_time",
              "name": "时间选择器",
              "rules": []
            }
          },
          {
            "id": "09af65bc-9862-43f4-b9c1-e55cd3f0d57b",
            "type": "text",
            "icon": "fa-square-o",
            "classify": "form",
            "options": {
              "dataType": "Number",
              "hide": 0,
              "disabled": 0,
              "readonly": 0,
              "defaultValue": "",
              "placeholder": null,
              "customClass": null,
              "width": "100%",
              "labelWidth": 90,
              "labelLine": null,
              "labelHidden": 0,
              "required": 0,
              "checkType": "Number",
              "regular": 0,
              "field": "number1",
              "name": "数字",
              "rules": [
                {
                  "type": "Number"
                }
              ]
            }
          },
          {
            "id": "7a9290df-406a-4ec2-ad7a-a6712466fe48",
            "type": "grids",
            "icon": "fa-navicon",
            "classify": "layout",
            "options": {
              "hide": 0,
              "customClass": null,
              "gutter": null,
              "field": "field_ly_grid1",
              "name": "栅格布局"
            },
            "cols": [
              {
                "value": "ab1e01d0-4214-4ee3-8284-1d432c40c8d9",
                "span": 12,
                "children": [
                  {
                    "id": "69fc7c66-979a-4715-9acd-9f4244034f91",
                    "type": "text",
                    "icon": "fa-square-o",
                    "classify": "form",
                    "options": {
                      "dataType": "Text",
                      "hide": 0,
                      "disabled": 0,
                      "readonly": 0,
                      "defaultValue": "",
                      "placeholder": "请输入手机号",
                      "customClass": null,
                      "width": "100%",
                      "labelWidth": 90,
                      "labelLine": null,
                      "labelHidden": 0,
                      "required": 1,
                      "checkType": "Telephone",
                      "regular": 0,
                      "field": "phone",
                      "name": "手机号",
                      "rules": [
                        {
                          "type": "Telephone"
                        }
                      ]
                    }
                  }
                ]
              },
              {
                "value": "57f14276-cd9a-4be2-a5c8-7d33435de6cd",
                "span": 12,
                "children": [
                  {
                    "id": "57a3747b-d1d4-402c-a28d-27852e993979",
                    "type": "radio",
                    "icon": "fa-dot-circle-o",
                    "classify": "form",
                    "options": {
                      "hide": 0,
                      "disabled": 0,
                      "defaultValue": null,
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
                      "labelWidth": 90,
                      "labelLine": null,
                      "required": 0,
                      "field": "field_radio",
                      "name": "单选框组",
                      "rules": []
                    }
                  }
                ]
              }
            ]
          },
          {
            "id": "38a9c320-5535-44d3-9533-273026f72bf8",
            "type": "grids",
            "icon": "fa-navicon",
            "classify": "layout",
            "options": {
              "hide": 0,
              "customClass": null,
              "gutter": null,
              "field": "field_ly_grid2",
              "name": "栅格布局"
            },
            "cols": [
              {
                "value": "a1fdbf8d-666b-4a42-837e-9de735705051",
                "span": 12,
                "children": [
                  {
                    "id": "88aedf27-a986-4171-a884-6e46dc0830c3",
                    "type": "text",
                    "icon": "fa-square-o",
                    "classify": "form",
                    "options": {
                      "dataType": "Text",
                      "hide": 0,
                      "disabled": 0,
                      "readonly": 1,
                      "defaultValue": "583381696@qq.com",
                      "placeholder": null,
                      "customClass": null,
                      "width": "100%",
                      "labelWidth": 90,
                      "labelLine": null,
                      "labelHidden": 0,
                      "required": 1,
                      "checkType": "Email",
                      "regular": 0,
                      "field": "email",
                      "name": "邮箱",
                      "rules": [
                        {
                          "type": "Email"
                        }
                      ]
                    }
                  }
                ]
              },
              {
                "value": "9c73c310-574d-4640-80ce-1b35d8ae2603",
                "span": 12,
                "children": [
                  {
                    "id": "3573660f-5a40-4e88-bb6e-68d4113d37cd",
                    "type": "text",
                    "icon": "fa-square-o",
                    "classify": "form",
                    "options": {
                      "dataType": "Text",
                      "hide": 0,
                      "disabled": 1,
                      "readonly": 0,
                      "defaultValue": "user1",
                      "placeholder": null,
                      "customClass": null,
                      "width": "100%",
                      "labelWidth": 90,
                      "labelLine": null,
                      "labelHidden": 0,
                      "required": 0,
                      "checkType": "String",
                      "regular": 0,
                      "field": "user",
                      "name": "人员",
                      "rules": [
                        {
                          "type": "String"
                        }
                      ]
                    }
                  }
                ]
              }
            ]
          },
          {
            "id": "cf500a06-f9c2-44c5-9908-b4c7aa3438b3",
            "type": "grids",
            "icon": "fa-navicon",
            "classify": "layout",
            "options": {
              "hide": 0,
              "customClass": null,
              "gutter": null,
              "field": "field_ly_grid3",
              "name": "栅格布局"
            },
            "cols": [
              {
                "value": "bc73cf03-ac34-423f-afe4-1901de2616d5",
                "span": 12,
                "children": [
                  {
                    "id": "fe852edc-3ab0-49a1-985d-c5a15c0c357a",
                    "type": "checkbox",
                    "icon": "fa-check-square-o",
                    "classify": "form",
                    "options": {
                      "hide": 0,
                      "disabled": 0,
                      "defaultValue": null,
                      "dataType": "String",
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
                      "labelWidth": 90,
                      "labelLine": null,
                      "required": 0,
                      "field": "field_checkbox",
                      "name": "多选框组",
                      "rules": []
                    }
                  }
                ]
              },
              {
                "value": "ee77e21d-c345-4972-a754-b50bbf3494e1",
                "span": 12,
                "children": [
                  {
                    "id": "347d8423-4690-431a-9d36-08756bd73c7d",
                    "type": "switch",
                    "icon": "iconfont icon-kaiguanliang",
                    "classify": "form",
                    "options": {
                      "hide": 0,
                      "disabled": 0,
                      "defaultValue": false,
                      "customClass": null,
                      "labelHidden": 0,
                      "labelWidth": 90,
                      "labelLine": null,
                      "required": 0,
                      "field": "field_switch",
                      "name": "开关",
                      "rules": []
                    }
                  }
                ]
              }
            ]
          },
          {
            "id": "9805f3e5-ac93-4097-b000-81913edeeefc",
            "type": "split-line",
            "icon": "fa-credit-card",
            "classify": "layout",
            "options": {
              "hide": 0,
              "position": "left",
              "field": "field_ly_line11",
              "name": "分割线1"
            }
          },
          {
            "id": "73cdd953-1092-49a0-8bb0-d9816867f0e2",
            "type": "tabs",
            "icon": "fa-tags",
            "classify": "layout",
            "options": {
              "hide": 0,
              "customClass": null,
              "type": "normal",
              "position": "top",
              "field": "field_ly_tab1",
              "name": "标签页"
            },
            "tabs": [
              {
                "value": "8cfc81c7-c9fc-4792-9a9f-6ebd6db0bc4c",
                "name": "标签",
                "children": [
                  {
                    "id": "9c923bdf-c1f2-43ab-b8c6-0a1bd14f2fbc",
                    "type": "text",
                    "icon": "fa-square-o",
                    "classify": "form",
                    "options": {
                      "dataType": "Text",
                      "hide": 0,
                      "disabled": 0,
                      "readonly": 0,
                      "defaultValue": "",
                      "placeholder": null,
                      "customClass": null,
                      "width": "100%",
                      "labelWidth": 90,
                      "labelLine": null,
                      "labelHidden": 0,
                      "required": 0,
                      "checkType": "String",
                      "regular": 0,
                      "field": "field_text11",
                      "name": "单行文本1",
                      "rules": [
                        {
                          "type": "String"
                        }
                      ]
                    }
                  }
                ]
              },
              {
                "value": "9b3e0651-8400-4284-a920-2e19f88c388f",
                "name": "标签1",
                "children": [
                  {
                    "id": "48ccbeea-72df-4c59-96d8-d8d2712bd4b6",
                    "type": "text",
                    "icon": "fa-square-o",
                    "classify": "form",
                    "options": {
                      "dataType": "Text",
                      "hide": 0,
                      "disabled": 0,
                      "readonly": 0,
                      "defaultValue": "",
                      "placeholder": null,
                      "customClass": null,
                      "width": "100%",
                      "labelWidth": 90,
                      "labelLine": null,
                      "labelHidden": 0,
                      "required": 0,
                      "checkType": "String",
                      "regular": 0,
                      "field": "field_text22",
                      "name": "单行文本2",
                      "rules": [
                        {
                          "type": "String"
                        }
                      ]
                    }
                  }
                ]
              }
            ]
          },
          {
            "id": "a3b63e68-0657-459b-9f38-74059093e630",
            "type": "split-line",
            "icon": "fa-credit-card",
            "classify": "layout",
            "options": {
              "hide": 0,
              "position": "left",
              "field": "field_ly_line22",
              "name": "分割线2"
            }
          },
          {
            "id": "08d629c9-accc-44cf-8ff8-5babddc51b5c",
            "type": "sub-form",
            "icon": "fa-credit-card",
            "classify": "layout",
            "options": {
              "hide": 0,
              "customClass": null,
              "disabled": 0,
              "labelHidden": 0,
              "labelWidth": 90,
              "labelLine": null,
              "width": "100%",
              "showRowNum": true,
              "field": "field_zbd",
              "name": "子表单"
            },
            "subs": [
              {
                "id": "c20d9b10-5ab4-41fb-a79a-16749f5935a5",
                "type": "text",
                "icon": "fa-square-o",
                "classify": "form",
                "options": {
                  "dataType": "Text",
                  "hide": 0,
                  "disabled": 0,
                  "readonly": 0,
                  "defaultValue": "",
                  "placeholder": null,
                  "customClass": null,
                  "width": "100%",
                  "labelWidth": 90,
                  "labelLine": null,
                  "labelHidden": 0,
                  "required": 0,
                  "checkType": "String",
                  "regular": 0,
                  "field": "field_zbd-text",
                  "name": "单行文本",
                  "rules": [
                    {
                      "type": "String"
                    }
                  ]
                }
              },
              {
                "id": "8b63cf60-0582-4472-825c-dab8953a4c97",
                "type": "date-picker",
                "icon": "fa-sticky-note-o",
                "classify": "form",
                "options": {
                  "hide": 0,
                  "disabled": 0,
                  "editable": 0,
                  "clearable": 1,
                  "readonly": 0,
                  "placeholder": null,
                  "defaultValue": null,
                  "customClass": null,
                  "width": "100%",
                  "dateType": "date",
                  "labelHidden": 0,
                  "labelWidth": 90,
                  "labelLine": null,
                  "required": 0,
                  "format": "yyyy-MM-dd",
                  "valueFormat": "yyyy-MM-dd",
                  "field": "field_zbd-date",
                  "name": "日期选择器",
                  "rules": []
                }
              },
              {
                "id": "fb87cd32-244d-44ae-a646-d22a6534a0b2",
                "type": "input-number",
                "icon": "fa-sticky-note-o",
                "classify": "form",
                "options": {
                  "hide": 0,
                  "disabled": 0,
                  "defaultValue": 0,
                  "customClass": null,
                  "width": "100%",
                  "labelHidden": 0,
                  "labelWidth": 90,
                  "labelLine": null,
                  "required": 0,
                  "controls": true,
                  "controlsPosition": "",
                  "min": 0,
                  "max": 100,
                  "step": 1,
                  "field": "field_zbd-number",
                  "name": "计数器",
                  "rules": []
                }
              }
            ]
          },
          {
            "id": "4e06d957-e4ed-4f25-a2fa-342cbec272f7",
            "type": "color-picker",
            "icon": "fa-sticky-note-o",
            "classify": "form",
            "options": {
              "hide": 0,
              "disabled": 0,
              "defaultValue": null,
              "customClass": null,
              "labelHidden": 0,
              "labelWidth": 90,
              "labelLine": null,
              "required": 0,
              "showAlpha": false,
              "field": "field_color",
              "name": "颜色选择器",
              "rules": []
            }
          },
          {
            "id": "ee9a987b-a909-4ab8-8356-502e206df902",
            "type": "rate",
            "icon": "fa-sticky-note-o",
            "classify": "form",
            "options": {
              "hide": 0,
              "disabled": 0,
              "defaultValue": 0,
              "customClass": null,
              "width": "100%",
              "labelHidden": 0,
              "labelWidth": 90,
              "labelLine": null,
              "required": 0,
              "max": 5,
              "allowHalf": false,
              "showScore": false,
              "field": "field_rate",
              "name": "评分",
              "rules": []
            }
          },
          {
            "id": "6613ebbb-13ec-411f-a3d4-44b6c7b8059c",
            "type": "html",
            "icon": "fa-sticky-note-o",
            "classify": "form",
            "options": {
              "width": "100%",
              "hide": 0,
              "defaultValue": "<div style=\"color:red\">This is a html</div>",
              "customClass": null,
              "labelHidden": 0,
              "labelWidth": 90,
              "labelLine": null,
              "field": "field_html",
              "name": "HTML",
              "rules": []
            }
          },
          {
            "id": "11c522dc-478f-4ba7-a7f2-c336759267c8",
            "type": "textarea",
            "icon": "fa-sticky-note-o",
            "classify": "form",
            "options": {
              "hide": 0,
              "disabled": 0,
              "readonly": 0,
              "defaultValue": "",
              "placeholder": null,
              "rows": 3,
              "customClass": null,
              "width": "100%",
              "labelWidth": 90,
              "labelHidden": 0,
              "labelLine": null,
              "required": 0,
              "regular": 0,
              "field": "field_textarea",
              "name": "多行文本",
              "rules": []
            }
          }
        ],
        "globalConfig": {
          "customClass": null,
          "print": 0
        }
      },
      bpmModel: {}, //bpm传递过来的表单信息
      projectId: "",
      model: {}
    };
  },
  computed: {
    //路由中拿初始化参数
    vars() {
      let q = {...(this.$route.query || {})};
      if(q.vars){
        q.vars = decodeURIComponent(q.vars);
      }
      return q.vars || "";
    }
  },
  watch: {
    vars: {
      immediate:true, handler(v) {
        let params = {};
        if (typeof v === "string") {
          try {
            params= JSON.parse(v);
            this.model = params
          } catch (e) {
            console.log(e)
            params = {};
            this.model = params
          }
        }
        this.projectId = params.ID || ""
      }
    }
  },
  methods: {
    receive(e) {
      try {
        let {action, params} = e.data;
        if (!action || typeof actions[action] !== "function") {
          return;
        }
        actions[action](this, params);
      } catch (error) {
        console.error("接收消息指令失败", error);
      }
    }
  },
  beforeMount() {
    window.addEventListener("message", this.receive, false);
  },
  beforeDestroy() {
    window.removeEventListener("message", this.receive, false);
  }
};
</script>

<style scoped>

</style>