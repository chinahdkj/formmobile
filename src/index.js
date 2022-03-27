import Vue from 'vue'
import Server from './utils/server';
import FormView from '../packages/form-view'
import FormDisplay from '../packages/form-display'
import {BindRecords, DateFormat} from "./utils/lib"
import renders from "./render/index";
import displays from "./display/index";

const components = [FormView, FormDisplay, ...Object.values(renders), ...Object.values(displays)];

const install = (Vue, opts = {}) => {
    components.map(component => {
        Vue.component(component.name, component);
    });
    
    Vue.prototype.$server = Server;
    Vue.prototype.$OPTS = opts
    
    Vue.mixin({
        methods: {
            __BindRecords: BindRecords,
            __DateFormat: DateFormat,
        }
    });
}

if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}

window.moment = moment;
window.$ = $;
window.FORM_Bindings = {}; //定义全局字典，在项目中进行字典赋值
window.FORMMOBILE_VERSION = require("../package").version;
window.FORM_PLAT = "mobile"

export default {
    version: "1.0.0",
    install,
    ...components
};
