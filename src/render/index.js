//基础组件
import FtmText from "./form/form-item/text";
import FtmTextarea from "./form/form-item/textarea";
import FtmSelect from "./form/form-item/select";
import FtmRadio from "./form/form-item/radio";
import FtmCheckbox from "./form/form-item/checkbox";
import FtmSwitch from "./form/form-item/switch";
import FtmInputNumber from "./form/form-item/input-number";
import FtmTimePicker from "./form/form-item/time-picker";
import FtmDatePicker from "./form/form-item/date-picker";
import FtmDateRangePicker from "./form/form-item/date-range-picker";
import FtmRate from "./form/form-item/rate";
import FtmColorPicker from "./form/form-item/color-picker";
import FtmSlider from "./form/form-item/slider";
import FtmWord from "./form/form-item/word";
import FtmHtml from "./form/form-item/html";

//高级组件
import FtmFile from "./form/form-item/super-form-item/file";
import FtmVideo from "./form/form-item/super-form-item/video";
import FtmPicture from "./form/form-item/super-form-item/picture";
import FtmEditor from "./form/form-item/super-form-item/editor";
import FtmCascader from "./form/form-item/super-form-item/cascader";


//功能组件
import FtmUserPicker from "./form/form-item/functional/user-picker";
import FtmSubUser from "./form/form-item/functional/sub-user";
import FtmDepartmentPicker from "./form/form-item/functional/department-picker";
import FtmExpression from "./form/form-item/functional/expression";
import FtmZtree from "./form/form-item/functional/ztree";
import FtmLocation from "./form/form-item/functional/location";
import FtmAutocomplete from "./form/form-item/functional/autocomplete";

//移动端组件
import FtmWaterMarkingCamera from "./form/form-item/mobile/water-marking-camera";
import FtmCodeScanner from "./form/form-item/mobile/code-scanner";
import FtmAudio from "./form/form-item/mobile/audio";
import FtmSignature from "./form/form-item/mobile/signature";
import FtmNfc from "./form/form-item/mobile/nfc";

//布局组件
import TabsPanel from "./layout/tabs";
import GridsPanel from "./layout/grids";
import SplitLine from "./layout/split-line";
import CardPanel from "./layout/card";
import SubForm from "./form/sub-form/index"

let components = [
    FtmText, FtmTextarea, FtmSelect, FtmRadio, FtmCheckbox, FtmSwitch, FtmInputNumber,
    FtmTimePicker, FtmDatePicker, FtmDateRangePicker, FtmRate, FtmColorPicker, FtmSlider, FtmWord, FtmHtml,
    
    FtmFile, FtmVideo, FtmPicture, FtmEditor, FtmCascader,
    
    FtmUserPicker, FtmSubUser, FtmDepartmentPicker, FtmExpression, FtmZtree, FtmLocation, FtmAutocomplete,
    
    FtmWaterMarkingCamera, FtmCodeScanner, FtmAudio, FtmSignature, FtmNfc,
    
    TabsPanel, GridsPanel, SplitLine, CardPanel, SubForm
]

components.forEach((cmp) => {
    cmp.install = (Vue) => {
        Vue.component(cmp.name, cmp);
    }
});

export default {...components};