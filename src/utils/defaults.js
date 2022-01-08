export const InputDefaultOptions = () => {
    return {
        dataType: "Text", hide: 0, disabled: 0, readonly: 0, defaultValue: "", showCondition: null,
        placeholder: null, customClass: null, width: "100%", labelWidth: null,
        labelLine: null, labelHidden: 0, required: 0, regular: null
    };
};

export const InputDefaults = {
    text() {
        return {
            dataType: "Text", hide: 0, disabled: 0, readonly: 0, defaultValue: "", showCondition: null,
            placeholder: null, customClass: null, width: "100%", labelWidth: null,
            labelLine: null, labelHidden: 0, required: 0, regular: null, defaultType: "static", autoType: 1,
            interface: "", itfParams: "", afterQuery: ""
        };
    },
    textarea() {
        return {
            hide: 0, disabled: 0, readonly: 0, defaultValue: "", showCondition: null, placeholder: null, rows: 3,
            customClass: null, width: "100%", labelWidth: null, labelHidden: 0, labelLine: null,
            required: 0, regular: null, showWordLimit: 0
        };
    },
    select() {
        return {
            hide: 0, disabled: 0, defaultValue: null, showCondition: null, placeholder: null, multiple: 0,
            expandTags: 'collapse', optionsType: "static", bindings: [], dataType: "String",
            customClass: null, width: "100%", labelHidden: 0, labelWidth: null, labelLine: null,
            required: 0, autoType: 1, interface: "", itfParams: "", afterQuery: ""
        };
    },
    radio() {
        return {
            hide: 0, disabled: 0, defaultValue: null, showCondition: null, optionsType: "static",
            bindings: [], customClass: null, layoutMode: "inline", width: "100%",
            labelHidden: 0, labelWidth: null, labelLine: null, required: 0
        };
    },
    checkbox() {
        return {
            hide: 0, disabled: 0, defaultValue: [], showCondition: null, dataType: "Array", optionsType: "static", bindings: [],
            customClass: null, layoutMode: "inline", width: "100%", labelHidden: 0,
            labelWidth: null, labelLine: null, required: 0
        };
    },
    switch() {
        return {
            hide: 0, disabled: 0, defaultValue: "0", showCondition: null, customClass: null,
            labelHidden: 0, labelWidth: null, labelLine: null, required: 0
        };
    },
    "input-number"() {
        return {
            hide: 0, disabled: 0, defaultValue: 0, showCondition: null, customClass: null, width: "100%",
            labelHidden: 0, labelWidth: null, labelLine: null, required: 0,
            controls: true, controlsPosition: "", min: 0,
            max: 100, step: 1
        };
    },
    "time-picker"() {
        return {
            hide: 0, disabled: 0, editable: 0, clearable: 1, readonly: 0, placeholder: null,
            arrowControl: 0, defaultValue: null, showCondition: null, customClass: null, width: "100%",
            isRange: false, labelHidden: 0, labelWidth: null, labelLine: null, required: 0,
            format: "HH:mm:ss", valueFormat: "String"
        };
    },
    "date-picker"() {
        return {
            hide: 0, disabled: 0, editable: 0, clearable: 1, readonly: 0, placeholder: null, showCondition: null,
            defaultValue: null, customClass: null,  width: "100%", labelHidden: 0, labelWidth: null, labelLine: null,
            required: 0, mode: "default", format: "yyyy-MM-dd", valueFormat: "String",
            defaultType: "static", dftActivity: "",
            max: {value: "", offsetType: "static", offset: 0, unit: "days"},
            min: {value: "", offsetType: "static", offset: 0, unit: "days"},
            dateChange: ""
        };
    },
    "date-range-picker"() {
        return {
            hide: 0, disabled: 0, editable: 0, clearable: 1, readonly: 0, placeholder: null, showCondition: null,
            defaultValue: null, customClass: null,  width: "100%",
            labelHidden: 0, labelWidth: null, labelLine: null, required: 0, format: "yyyy-MM-dd", dataType: "Array",
            isTimestamp: 0
        };
    },
    rate() {
        return {
            hide: 0, disabled: 0, defaultValue: 0, customClass: null, width: "100%", showCondition: null,
            labelHidden: 0, labelWidth: null, labelLine: null, required: 0,
            max: 5, allowHalf: false, showScore: false
        };
    },
    "color-picker"() {
        return {
            hide: 0, disabled: 0, defaultValue: null, customClass: null, showCondition: null,
            labelHidden: 0, labelWidth: null, labelLine: null, required: 0,
            showAlpha: false
        };
    },
    slider() {
        return {
            hide: 0, disabled: 0, defaultValue: 0, customClass: null, width: "100%", showCondition: null,
            labelHidden: 0, labelWidth: null, labelLine: null, required: 0,
            showStops: false, showTooltip: true, range:0, min: 0, max: 100, step: 1
        };
    },
    word() {
        return {
            hide: 0, defaultValue: 'This is a text', showCondition: null, width: "100%", customClass: null,
            labelHidden: 0, labelWidth: null, labelLine: null, fontSize: '12px', color: '#333333',
            fontWeight: 'normal', customStyle: []
        };
    },
    html() {
        return {
            width: "100%", hide: 0, defaultValue: '<div style="color:red">This is a html</div>', showCondition: null,
            customClass: null, labelHidden: 0, labelWidth: null, labelLine: null,
        };
    },
    
    //高级组件
    file() {
        return {
            hide: 0, disabled: 0, defaultValue: null,customClass: null, width: "100%", showCondition: null,
            labelWidth: null, labelLine: null, labelHidden: 0, required: 0, multiple: 0, placeholder: "", accept:"",
            dataType:"String", isDownload: 0
        };
    },
    
    video() {
        return {
            hide: 0, disabled: 0, defaultValue: null,customClass: null, width: "100%", showCondition: null,
            labelWidth: null, labelLine: null, labelHidden: 0, required: 0, multiple: 0,placeholder: "",
            dataType:"String", isDownload: 0
        };
    },
    
    picture() {
        return {
            hide: 0, disabled: 0, readonly: 0, defaultValue: null,customClass: null, width: "100%", showCondition: null,
            labelWidth: null, labelLine: null, labelHidden: 0, required: 0, multiple: 0,limit: 5,
            accept:'.jpg,.jpeg,.png,.gif,.JPG,.JPEG,.GIF', dataType:"String", thumbZip: 0, isComment: 0
        };
    },
    
    editor() {
        return {
            hide: 0, disabled: 0, defaultValue: null,customClass: null, width: "100%", showCondition: null,
            labelWidth: null, labelLine: null, labelHidden: 0, required: 0,
        };
    },
    
    cascader() {
        return {
            hide: 0, disabled: 0,clearable:0, defaultValue: null,customClass: null, width: "100%", showCondition: null,
            labelWidth: null, labelLine: null, labelHidden: 0, required: 0, multiple: 0,bindings: []
        }
    },
    
    dialog() {
        return {
            ide: 0, disabled: 0, defaultValue: null,customClass: null, width: "100%", showCondition: null,
            labelWidth: null, labelLine: null, labelHidden: 0, btnName: "操作按钮", url: "", fullscreen: 0,
            dialogWidth: "50%", dialogHeight: "", dialogClass: "", dialogTitle: "", btnWidth: ""
        }
    },
    
    custom() {
        return {
            ide: 0, disabled: 0, defaultValue: null,customClass: null, width: "100%", showCondition: null,
            labelWidth: null, labelLine: null, labelHidden: 0,
            platType: "pc", customHandle: {}, customHandleMobile: {},
            dspPlatType: "pc", dspCustomHandle: {}, dspCustomHandleMobile: {},
        }
    },
    
    //布局组件
    tabs() {
        return {
            hide: 0, customClass: null, type: "normal", position: "top", showCondition: null,
        };
    },
    grids() {
        return {
            hide: 0, customClass: null, gutter: 20, showCondition: null, isBorder: 0, isLast: 0, showInForm: 0,
            showInDetail: 1
        };
    },
    "sub-form"() {
        return {
            hide: 0, customClass: null, disabled: 0, labelHidden: 0, labelWidth: null, showCondition: null,
            labelLine: null, width: "100%", showRowNum: true, subFormId: "", subFormEdition: "",
            subObjectId: "", subObjectEdition: "", displayType: "default", colNum: 1, addHidden: 0, deleteHidden: 0,
            itfData: {enable: 0, url: "", afterQuery: null}, buttonName: "子表单明细",fullscreen: 0, dlgWidth: "50%"
        };
    },
    "split-line"() {
        return {
            hide: 0, position: "left", showCondition: null
        };
    },
    card() {
        return {
            hide: 0, customClass: null, showTitle: 1, title: "标题", shadow: "never", showCondition: null,
            showBorder: 0, titleLine: 0,
        };
    },
    
    //功能组件
    "user-picker"() {
        return {
            hide: 0, disabled: 0, defaultValue: null, placeholder: null, showCondition: null,
            customClass: null, width: "100%", labelHidden: 0, labelWidth: null,
            labelLine: null, required: 0, multiple: 0, linkage: ""
        };
    },
    "sub-user"() {
        return {
            hide: 0, disabled: 0, defaultValue: null, placeholder: null, showCondition: null,
            customClass: null, width: "100%", labelHidden: 0, labelWidth: null,
            labelLine: null, required: 0, linkage: "", panelHeight: 300
        };
    },
    "department-picker"() {
        return {
            hide: 0, disabled: 0, defaultValue: null, placeholder: null, showCondition: null,
            customClass: null, width: "100%", labelHidden: 0, labelWidth: null,
            labelLine: null, required: 0, multiple: 0, bindings: [], dataMode: "simple", linkage: "",
            wholePath: 0
        };
    },
    expression() {
        return {
            hide: 0, disabled: 0, defaultValue: null, placeholder: null, showCondition: null,
            customClass: null, width: "100%", labelHidden: 0, labelWidth: null,
            labelLine: null, required: 0, expression: null
        };
    },
    ztree() {
        return {
            hide: 0, disabled: 0, defaultValue: null, placeholder: null, showCondition: null,
            customClass: null, width: "100%", labelHidden: 0, labelWidth: null,
            labelLine: null, required: 0, multiple: 0, bindings: [], dataMode: "simple", linkage: "",
            wholePath: 0, dict: "", sourceType: "dict", interface: "", saveFields: [], autoType: 1, itfParams: "" ,
            afterQuery: ""};
    },
    location() {
        return {
            hide: 0, disabled: 0, placeholder: null, showCondition: null,
            customClass: null, width: "100%", labelHidden: 0, labelWidth: null,
            labelLine: null, required: 0, center: null, saveFields: [],
            gwtOption: "", customType: "", map_options: ""
        };
    },
    autocomplete() {
        return {
            hide: 0, disabled: 0, defaultValue: null, placeholder: null, showCondition: null,
            customClass: null, width: "100%", labelHidden: 0, labelWidth: null,
            labelLine: null, required: 0, format: "", showField: "", valueField: "", saveFields: [],
            autoType: 1, itfParams: ""
        }
    },
    
    //移动端组件
    "water-marking-camera"() {
        return {
            hide: 0, disabled: 0, readonly: 0, placeholder: null, showCondition: null,
            customClass: null, width: "100%", labelHidden: 0, labelWidth: null,
            labelLine: null, required: 0, multiple: false, limit: 5, dataType:"String"
        };
    },
    "code-scanner"() {
        return {
            hide: 0, disabled: 0, defaultValue: null, showCondition: null,
            placeholder: "电脑端不支持扫描，请输入条纹码", customClass: null,
            width: "100%", labelHidden: 0, labelWidth: null, labelLine: null, required: 0
        };
    },
    audio() {
        return {
            hide: 0, disabled: 0, readonly: 0, placeholder: null, showCondition: null,
            customClass: null, width: "100%", labelHidden: 0, labelWidth: null,
            labelLine: null, required: 0, multiple: false, limit: 5, dataType:"String"
        };
    },
    signature() {
        return {
            hide: 0, disabled: 0, readonly: 0, placeholder: null, showCondition: null,
            customClass: null, width: "100%", labelHidden: 0, labelWidth: null,
            labelLine: null, required: 0
        };
    }
};
