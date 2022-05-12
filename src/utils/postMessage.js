// postMessage 协议定义
const actions = {
    "FRD-CLOSE-DIALOG": (view, params) => {
        if (Object.keys(params || {}).length) {
            for(let [key, value] of Object.entries(params)) {
                view.$set(view.postMessageModel, key, value);
            }
        }
        view.dialog.visible = false;
    },
    //表单赋值
    "FRD-SET-MODEL": (view, params) => {
        console.log("FRD-SET-MODEL:表单赋值", params);
        if("$$field" in params && params["$$field"] !== view.field) {
            //确保只在当前组件接收此postMessage
            return
        } else {
            delete params["$$field"]
        }
        
        if (Object.keys(params || {}).length) {
            for(let [key, value] of Object.entries(params)) {
                view.$set(view.postMessageModel, key, value);
            }
        }
    },
    //子表新增数据
    "FRD-PUSH-SUB-MODEL": (view, params) => {
        console.log('FRD-PUSH-SUB-MODEL:子表新增数据',params)
        let prms = deepClone(params)
        if("$$field" in prms && prms["$$field"] !== view.field) {
            //确保只在当前组件接收此postMessage
            return
        } else {
            delete prms["$$field"]
        }
        
        if (Object.keys(prms || {}).length) {
            for(let [key, value] of Object.entries(prms)) {
                console.log(view.pushPostMessageModel,key,value)
                view.$set(view.pushPostMessageModel, key, value);
            }
        }
    }
};

export default {
    data() {
        return {
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
