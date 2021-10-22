import "./utils/mixin";
import Server from './utils/server';
import FormView from '../packages/form-view'
import FormDisplay from '../packages/form-display'

const components = [FormView, FormDisplay];

const install = (Vue, opts = {}) => {
    components.map(component => {
        Vue.component(component.name, component);
    });
    
    Vue.prototype.$server = Server;
    Vue.prototype.$OPTS = opts
}

if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}

window.FORM_Bindings = {}; //定义全局字典，在项目中进行字典赋值
window.FORMMOBILE_VERSION = require("../package").version;

export default {
    version: "1.0.0",
    install,
    ...components
};
