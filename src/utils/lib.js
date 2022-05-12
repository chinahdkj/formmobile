import $server from "./server";

export const GlobalDefaultOptions = () => {
    return {
        base: {
            formHtmlId: "", //表单id
            formHtmlEdition: "", //表单版本
            formHtmlCode: "", //表单编号
            formHtmlName: "", //表单名称
            formHtmlType: "", //表单类型
            formHtmlDescrip: "", //表单描述
            objectId: "", //主对象id
            objectEdition: "", //主对象版本
            formId: "", //主表id
            formEdition: "" //主表版本
        },
        customClass: null,
        disabled: 0,
        width: null
    }
}

export const InsideBindings = {
    DATATYPE: [
        {Value: "Text", Name: "字符"},
        {Value: "Number", Name: "数字"},
    ],
    
    DATATYPE_1: [
        {Value: "String", Name: "字符串"},
        {Value: "Array", Name: "数组"},
    ],

    DTYPE: [
        {Value: "Text", Name: "字符"},
        {Value: "Number", Name: "数字"},
        {Value: "Password", Name: "密码"},
    ],

    CTYPE: [
        {Value: "String", Name: "字符"},
        {Value: "Number", Name: "数字"},
        {Value: "Boolean", Name: "布尔值"},
        {Value: "Integer", Name: "整数"},
        {Value: "Float", Name: "浮点数"},
        {Value: "Url", Name: "URL地址"},
        {Value: "Email", Name: "邮箱地址"},
        {Value: "Telephone", Name: "手机号码"},
        {Value: "Idcard", Name: "身份证号"},
    ],

    WIDTH: [
        {Value: "100%", Name: "100%"},
        {Value: "50%", Name: "50%"},
        {Value: "33.33%", Name: "33%"},
        {Value: "25%", Name: "25%"}
    ],

    DATE_FORMAT: [
        {Value: "yyyy-MM-dd", Name: "yyyy-MM-dd"},
        {Value: "yyyy-MM", Name: "yyyy-MM"},
        {Value: "yyyy", Name: "yyyy"},
        {Value: "yyyy-MM-dd HH", Name: "yyyy-MM-dd HH"},
        {Value: "yyyy-MM-dd HH:mm", Name: "yyyy-MM-dd HH:mm"},
        {Value: "yyyy-MM-dd HH:mm:ss", Name: "yyyy-MM-dd HH:mm:ss"},
    ],
    
    DATE_SAVE_FORMAT: [
        {Value: "yyyy-MM-dd", Name: "yyyy-MM-dd"},
        {Value: "yyyy-MM", Name: "yyyy-MM"},
        {Value: "yyyy", Name: "yyyy"},
        {Value: "yyyy-MM-dd HH", Name: "yyyy-MM-dd HH"},
        {Value: "yyyy-MM-dd HH:mm", Name: "yyyy-MM-dd HH:mm"},
        {Value: "yyyy-MM-dd HH:mm:ss", Name: "yyyy-MM-dd HH:mm:ss"},
        {Value: "timestamp", Name: "时间戳"},
    ],
    
    TIME_FORMAT: [
        {Value: "HH", Name: "HH"},
        {Value: "HH:mm", Name: "HH:mm"},
        {Value: "HH:mm:ss", Name: "HH:mm:ss"},
        {Value: "mm:ss", Name: "mm:ss"},
        {Value: "ss", Name: "ss"},
    ],
    
    TIME_SAVE_FORMAT: [
        {Value: "HH", Name: "HH"},
        {Value: "HH:mm", Name: "HH:mm"},
        {Value: "HH:mm:ss", Name: "HH:mm:ss"},
        {Value: "mm:ss", Name: "mm:ss"},
        {Value: "ss", Name: "ss"},
        {Value: "timestamp", Name: "时间戳"},
    ],

    DATE_TYPE: [
        {Value: "year", Name: "year"},
        {Value: "month", Name: "month"},
        {Value: "date", Name: "date"},
        {Value: "dates", Name: "dates"},
        {Value: "week", Name: "week"},
        {Value: "datetime", Name: "datetime"},
        {Value: "datetimerange", Name: "datetimerange"},
        {Value: "daterange", Name: "daterange"},
        {Value: "monthrange", Name: "monthrange"}
    ]
};

export const formItemList = {
    formType: [
        {type: "text", icon: "fa-square-o", name: "单行文本", description: "单行文本", classify: "form"},
        {type: "textarea", icon: "fa-sticky-note-o", name: "多行文本", description: "多行文本", classify: "form"},
        {type: "radio", icon: "fa-dot-circle-o", name: "单选框组", description: "单选框组", classify: "form"},
        {type: "checkbox", icon: "fa-check-square-o", name: "多选框组", description: "多选框组", classify: "form"},
        {type: "select", icon: "fa-plus-square-o", name: "下拉框", description: "下拉框", classify: "form"},
        {type: "switch", icon: "iconfont icon-kaiguanliang", name: "开关", description: "开关", classify: "form"},
        {type: "input-number", icon: "fa-sticky-note-o", name: "计数器", description: "计数器", classify: "form"},
        {type: "time-picker", icon: "fa-sticky-note-o", name: "时间选择器", description: "时间选择器", classify: "form"},
        {type: "date-picker", icon: "fa-sticky-note-o", name: "日期选择器", description: "日期选择器", classify: "form"},
        {type: "rate", icon: "fa-sticky-note-o", name: "评分", description: "评分", classify: "form"},
        {type: "color-picker", icon: "fa-sticky-note-o", name: "颜色选择器", description: "颜色选择器", classify: "form"},
        {type: "slider", icon: "fa-sticky-note-o", name: "滑块", description: "滑块", classify: "form"},
        {type: "word", icon: "fa-sticky-note-o", name: "文字", description: "文字", classify: "form"},
        {type: "html", icon: "fa-sticky-note-o", name: "HTML", description: "HTML", classify: "form"},
    ],
    formSuper: [
        {type: "file", icon: "fa-square-o", name: "文件", description: "文件", classify: "form"},
        {type: "video", icon: "fa-sticky-note-o", name: "视频", description: "视频", classify: "form"},
        {type: "picture", icon: "fa-dot-circle-o", name: "图片", description: "图片", classify: "form"},
        {type: "editor", icon: "fa-check-square-o", name: "文本编辑器", description: "文本编辑器", classify: "form"},
        // {type: "cascader", icon: "fa-plus-square-o", name: "级联选择器", description: "级联选择器", classify: "form"},
    ],
    formLayouts: [
        {type: "grids", icon: "fa-navicon", name: "栅格布局", description: "栅格布局", classify: "layout"},
        {type: "tabs", icon: "fa-tags", name: "标签页", description: "标签页", classify: "layout"},
        {type: "card", icon: "fa-credit-card", name: "卡片", description: "卡片", classify: "layout"},
        {type: "split-line", icon: "fa-credit-card", name: "分割线", description: "分割线", classify: "layout"},
        {type: "sub-form", icon: "fa-credit-card", name: "子表单", description: "子表单", classify: "layout"},
    ],
    formFunctional: [
        {type: "user-picker", icon: "fa-square-o", name: "用户选择", description: "用户选择", classify: "form"},
        {type: "department-picker", icon: "fa-sticky-note-o", name: "部门选择", description: "部门选择", classify: "form"},
        {type: "ztree", icon: "fa-check-square-o", name: "树形选择器", description: "树形选择器", classify: "form"},
        {type: "expression", icon: "fa-dot-circle-o", name: "表达式计算", description: "表达式计算", classify: "form"},
        {type: "location", icon: "fa-check-square-o", name: "定位组件", description: "定位组件", classify: "form"},
        {type: "autocomplete", icon: "fa-check-square-o", name: "自动补全", description: "自动补全", classify: "form"},
    ],
    formMobile: [
        {type: "water-marking-camera", icon: "fa-square-o", name: "水印相机", description: "水印相机", classify: "form"},
        {type: "code-scanner", icon: "fa-sticky-note-o", name: "条码扫描", description: "条码扫描", classify: "form"},
        {type: "audio", icon: "fa-dot-circle-o", name: "音频录制", description: "音频录制", classify: "form"},
        {type: "signature", icon: "fa-check-square-o", name: "电子签名", description: "电子签名", classify: "form"},
    ]
}

//初始赋值
export const GetDefaultValue = (dv, vars, field) => {
    if(vars && field && field in vars){
        return vars[field];
    }
    if(/\$\{\S+\}/.test(dv)){
        if(!vars){
            return null;
        }
        let es = /^\$\{\S+\}$/.test(dv) ? `return ${dv}` : dv;
        es = es.replace(/\$\{(\S+)\}/g, `vars["$1"]`);
        try{
            return  eval(`(function(){
                ${es};
            })()`);
        } catch(e){
            console.error(e);
            return null;
        }
    }
    else if(dv != undefined || dv != null ){
        return dv;
    }
    return null;
};

//表单项显示条件
export const needShow = (condition, model) => {
    if(!condition){
        return true;
    }

    let fields = condition.match(/\$\{(.|\n)+?\}/g) || [];

    fields.forEach((f) => {
        let ff = f.replace("${", "model['").replace("}", "']");
        condition = condition.replace(f, ff);
    });

    let r = true;
    try{
        r = eval(condition);
    } catch(e){
        console.error(e);
        r = true;
    }
    return !!r;
};

//replace 表达式中的${}
export const ReplaceFields = (expression) => {
    let fields = expression.match(/\$\{([^.]|\n)+?\}/g) || []; //匹配不带"."的,如${xxx}
    let pFields = expression.match(/\$\{parent.([^.]|\n)+?\}/g) || [] //匹配待“parent.”的，如${parent.xx}
    
    fields.forEach((f) => {
        let ff = f.replace("${", "model['").replace("}", "']");
        expression = expression.replace(f, ff);
    });
    
    //子表中的表达式组件替换主表中的某个值
    pFields.forEach((f) => {
        let ff = f.replace("${parent.", "vars['").replace("}", "']");
        expression = expression.replace(f, ff);
    });
    
    return expression
}


//表单项禁用条件 参数：条件表达式 、 表单数据或子表行数据、 表单数据（为子表单项时才有值，否则为undefined）、 是否新增（or修改）模式
export const needDisabled = (condition, model, vars, isNew) => {
    if(!condition){
        return false;
    }
    
    // let fields = condition.match(/\$\{(.|\n)+?\}/g) || [];
    let cdn = ReplaceFields(condition)
    let r = false;
    try{
        r = eval(cdn);
    } catch(e){
        console.error(e);
        r = false;
    }
    return !!r;
};

//表单项必填条件 参数：条件表达式 、 表单数据或子表行数据、 表单数据（为子表单项时才有值，否则为undefined）、 是否新增（or修改）模式
export const needMust = (condition, model, vars, isNew) => {
    if(!condition){
        return false;
    }
    
    // let fields = condition.match(/\$\{(.|\n)+?\}/g) || [];
    let cdn = ReplaceFields(condition)
    let r = false;
    try{
        r = eval(cdn);
    } catch(e){
        console.error(e);
        r = false;
    }
    return !!r;
};

//从静态数据或者字典数据中转义获取text，返回字符串
export const formatFromBinding = (value, bindings, bindKey) => { //值，字典数据， 字典key
    if(!value){
        return "";
    }
    
    let dict = {};
    if(bindKey === "__GroupTree") {
        for (let item of bindings) {
            dict[item.id] = item.name
        }
    } else {
        for (let item of bindings) {
            dict[item.Value] = item.Name
        }
    }

    let result = [];
    let val = Array.isArray(value) ? value :  value.split(",")
    val.forEach(f => {
        if (dict[f]) {
            result.push(dict[f]);
        }
    })
    return result.join(",");
}

//获取目标字典数据,返回数组
export const BindRecords = (key, bindings) => {
    let _bindings = bindings || {};
    if(_bindings[key] != null){
        return _bindings[key];
    }
    return window.FORM_Bindings[key] || [];
};

//日期时间格式转换
export const DateFormat = (value, format) => {
    if(!value){
        return "";
    }
    format = GetFormatString(format || "yyyy-MM-dd");
    let num = Number(value);
    if(!isNaN(num)){ //数字类型 or 字符串类型的数字
        return moment.unix(num).format(format);
    }
    return moment(value).format(format);
}

//饿了么时间格式兼容moment
export const GetFormatString = (fmt = "yyyy-MM-dd") => {
    return (fmt || "yyyy-MM-dd").replace(/d/g, "D").replace(/y/g, "Y");
};

//解析路径
export const TransferUrl = (url, model, vars) => {
    let fields = url.match(/\$\{([^.]|\n)+?\}/g) || []; //匹配不带"."的,如${xxx}
    let pFields = url.match(/\$\{parent.([^.]|\n)+?\}/g) || [] //匹配待“parent.”的，如${parent.xx}
    
    fields.forEach((f) => {
        let ff = f.replace("${", "").replace("}", "");
        url = url.replace(f, model[ff]);
    });
    //子表中的表达式组件替换主表中的某个值
    pFields.forEach((f) => {
        let ff = f.replace("${parent.", "").replace("}", "");
        url = url.replace(f, vars[ff]);
    });
    url = url.replace("$token", window.sessionStorage.getItem("authortoken"))
    return url;
}

//深度拷贝
export const deepClone = (obj) => {
    return $.extend(true, Array.isArray(obj) ? [] : {}, obj);
};


//深层次对象中取值
export const objectGet = (object, expression) => {
    if(!(object && expression)){
        throw new Error("both object and expression args are required");
    }
    let exp = expression.trim();
    if(exp in object){
        return object[exp];
    }
    
    return exp.split(".").reduce(function(prev, curr){
        var arr = curr.match(/(.*?)\[(.*?)\]/);
        if(arr){
            return prev && prev[arr[1]][arr[2]];
        }
        else{
            return prev && prev[curr];
        }
    }, object);
};

//字典转换 Name,Value => name,code,children
//mue-select及mue-tree-picker数据格式需要
export const TransBindings = (source) => {
    let bindings = source || [];
    return bindings.map(m => {
        return {name: m.Name, code: m.Value, pid: m.pid, children: []}
    })
};

//解析表达式取值（表达式, 表单数据或子表行数据, 表单数据（为子表单项时才有值，否则为undefined））
export const EvalExpression = (expression, model, vars) => {
    let result = "";
    try{
        if(/return\s+/.test(expression)){
            // let es = expression.replace(/\$\{(\S+)\}/g, `vars["$1"]`);
            let es = ReplaceFields(expression);
            result = eval(`(function(){
                                ${es};
                            })()`);
        }
    } catch(e){
        console.error(e);
        result = "";
    }
    return result;
}

//字符串转数组
export function strToArr(urlStrs){
    let arr = [];
    (urlStrs || "").split(",").forEach((f) => {
        f = f.trim();
        if(f){
            arr.push(f);
        }
    });
    return arr;
}

//树数据转换（转为code,name,children形式）
export function TreeDataTrans(nodes) {
    return nodes.map((v) => {
        const haveChildren = Array.isArray(v.children) && v.children.length > 0;
        let obj = v;
        obj.sourceCode = v.code
        obj.code = v.id
        obj.children = haveChildren ? TreeDataTrans(v.children) : []
        return obj
    });
    
}

/* 从接口获取数据
* url 接口地址
* urlPrefix 接口地址前缀
* model 表单数据
* afterQuery 查询接口处理钩子
* autoType 接口类型 (POST/GET)
* itfParams post传参参数
* */
export const GetInterfaceData = (url, urlPrefix, model, afterQuery, autoType, itfParams, vars) => {
    return new Promise((resolve, reject) => {
        let res_Url = TransferUrl(url, model, vars);
        console.log(model)
        let success = (res) => {
            let result = null;
            //接口返回数据结构处理
            if (afterQuery) {
                try {
                    result = eval(`(function (res) {
                        ${afterQuery}
                    })(res)`)
                    resolve(result);
                } catch (e) {
                    resolve(result)
                    console.error(e)
                }
            } else {
                if (res.Code === 0) {
                    resolve(res.Response)
                } else {
                    reject(res.Message)
                }
            }
        }
        
        let fail = (e) => {
            console.log(e);
        }
        
        if (autoType === 1) {
            let bodyParams = EvalExpression(itfParams, model, vars)
            let params = {url: res_Url, body: bodyParams}
            $server._Post(params, urlPrefix || "").then(success).catch(fail);
        } else {
            $server._Get({url: res_Url}, urlPrefix || "").then(success).catch(fail);
        }
    });
}
