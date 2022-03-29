//基础组件
import DspText from "./form/form-item/text";
import DspTextarea from "./form/form-item/textarea";
import DspSelect from "./form/form-item/select";
import DspRadio from "./form/form-item/radio";
import DspCheckbox from "./form/form-item/checkbox";
import DspSwitch from "./form/form-item/switch";
import DspInputNumber from "./form/form-item/input-number";
import DspTimePicker from "./form/form-item/time-picker";
import DspDatePicker from "./form/form-item/date-picker";
import DspDateRangePicker from "./form/form-item/date-range-picker";
import DspRate from "./form/form-item/rate";
import DspColorPicker from "./form/form-item/color-picker";
import DspSlider from "./form/form-item/slider";
import DspWord from "./form/form-item/word";
import DspHtml from "./form/form-item/html";

//高级组件
import DspFile from "./form/form-item/super-form-item/file";
import DspVideo from "./form/form-item/super-form-item/video";
import DspPicture from "./form/form-item/super-form-item/picture";
import DspEditor from "./form/form-item/super-form-item/editor";
import DspDialog from "./form/form-item/super-form-item/dialog";
import DspCascader from "./form/form-item/super-form-item/cascader";
import DspCustom from "./form/form-item/super-form-item/custom";

//功能组件
import DspUserPicker from "./form/form-item/functional/user-picker";
import DspSubUser from "./form/form-item/functional/sub-user";
import DspDepartmentPicker from "./form/form-item/functional/department-picker";
import DspExpression from "./form/form-item/functional/expression";
import DspZtree from "./form/form-item/functional/ztree";
import DspLocation from "./form/form-item/functional/location";
import DspAutocomplete from "./form/form-item/functional/autocomplete";

//移动端组件
import DspWaterMarkingCamera from "./form/form-item/mobile/water-marking-camera";
import DspCodeScanner from "./form/form-item/mobile/code-scanner";
import DspAudio from "./form/form-item/mobile/audio";
import DspSignature from "./form/form-item/mobile/signature";
import DspNfc from "./form/form-item/mobile/nfc";

//布局组件
import DspTabsPanel from "./layout/tabs";
import DspGridsPanel from "./layout/grids";
import DspSplitLine from "./layout/split-line";
import DspCardPanel from "./layout/card";
import DspSubForm from "./form/sub-form/index"

let components = [
    DspText, DspTextarea, DspSelect, DspRadio, DspCheckbox, DspSwitch, DspInputNumber,
    DspTimePicker, DspDatePicker, DspDateRangePicker, DspRate, DspColorPicker, DspSlider,
    DspWord, DspHtml,
    
    DspFile,DspVideo,DspPicture,DspEditor,DspCascader, DspCustom, DspDialog,
    
    DspUserPicker, DspSubUser, DspDepartmentPicker, DspExpression, DspZtree, DspLocation, DspAutocomplete,
    
    DspWaterMarkingCamera, DspCodeScanner, DspAudio, DspSignature, DspNfc,
    
    DspTabsPanel, DspGridsPanel, DspSplitLine, DspCardPanel, DspSubForm
]

components.forEach((cmp) => {
    cmp.install = (Vue) => {
        Vue.component(cmp.name, cmp);
    }
});

export default {...components};