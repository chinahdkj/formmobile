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
    "FRD-SET-MODEL": (view, params) => {
        console.log("params", params);
        if (Object.keys(params || {}).length) {
            for(let [key, value] of Object.entries(params)) {
                view.$set(view.postMessageModel, key, value);
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
