//通用检验
export const ValidateCommon  = (type) => {
    let rule = {};
    switch (type) {
        case 'String':
            rule = {validator: _isString};
            break;
        case 'Number':
            rule = {validator: _isNumber};
            break;
        case 'Boolean':
            rule = {validator: _isBoolean};
            break;
        case 'Integer':
            rule = {validator: _isInteger};
            break;
        case 'Float':
            rule = {validator: _isFloat};
            break;
        case 'Url':
            rule = {validator: _isUrl};
            break;
        case 'Email':
            rule = {validator: _isEmail};
            break;
        case 'Telephone':
            rule = {validator: _isTelephone};
            break;
        case 'Idcard':
            rule = {validator: _isIdcard};
            break;
        default:
            rule = {}
    }
    return rule
}

const _isString = (rule, value, callback) => {
    Validate.checkIsString(value) ? callback() : callback(new Error('请输入字符串'));
}
const _isNumber = (rule, value, callback) => {
    Validate.checkIsNumber(value) ? callback() : callback(new Error('请输入数字'));
}
const _isBoolean = (rule, value, callback) => {
    Validate.checkIsBoolean(value) ? callback() : callback(new Error('请输入布尔值'));
}
const _isInteger = (rule, value, callback) => {
    Validate.checkIsInteger(value) ? callback() : callback(new Error('请输入整数'));
}
const _isFloat = (rule, value, callback) => {
    Validate.checkIsFloat(value) ? callback() : callback(new Error('请输入浮点数'));
}
const _isUrl = (rule, value, callback) => {
    Validate.checkIsUrl(value) ? callback() : callback(new Error('请输入正确格式的url地址'));
}
const _isEmail = (rule, value, callback) => {
    Validate.checkIsEmail(value) ? callback() : callback(new Error('请输入正确格式的邮箱地址'));
}
const _isTelephone = (rule, value, callback) => {
    Validate.checkIsTelephone(value) ? callback() : callback(new Error('请输入正确格式的手机号码'));
}
const _isIdcard = (rule, value, callback) => {
    Validate.checkIsIdcard(value) ? callback() : callback(new Error('请输入正确格式的身份证号'));
}

//校验方法
export const Validate = {
    checkIsString(v) {
        return v == null || typeof(v) === "string";
    },
    checkIsNumber(v) {
        return typeof(v) === "number" && !isNaN(v);
    },
    checkIsBoolean(v) {
        return typeof(v) === "boolean";
    },
    checkIsInteger(v) {
        return Number.isInteger(v);
    },
    checkIsFloat(v) {
        return /^-?\d*\.\d+$/.test(v);
    },
    checkIsUrl(v) {
        return /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(v);
    },
    checkIsEmail(v) {
        return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(v);
    },
    checkIsTelephone(v) {
        return /^1([358][0-9]|4[56789]|6[2567]|7[012345678]|9[189])[0-9]{8}$/.test(v);
    },
    checkIsIdcard(v) {
        return /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(v);
    }
}
