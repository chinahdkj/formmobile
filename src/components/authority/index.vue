<template>
    
</template>

<script>
    export default {
        props: {
            authority: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                currentFieldAuth: {
                    edit: true,
                    required: false,
                    hide: false,
                    add: true, //子表单新增权限
                    remove: true //子表单删除权限
                }
            }
        },
        computed: {
            //当前用户组合
            frGroup() {
                return window.FORM_CurrentUser.group_id
            },
            //当前用户角色
            frRoles() {
                return window.FORM_CurrentUser.roles
            },
            //当前用户id
            frId() {
                return window.FORM_CurrentUser.user_id
            },
            //当前字段
            currentField() {
                if(this.field) return this.field
                if(this.item && this.item.options && this.item.options.field) {
                    return this.item.options.field
                }
                return null
            }
        },
        watch: {
            authority: {
                immediate: true, deep: true, handler(v) {
                    if(!(v || []).length) {
                        this.currentFieldAuth = {
                            edit: true,
                            required: false,
                            hide: false,
                            add: true,
                            remove: true
                        }
                        return
                    }

                    //子表
                    if(this.type === "sub-form" || (this.item && this.item.options && this.item.type === "sub-form")) {
                        let targetField = v.find(f => f.name === this.currentField)
                        if(targetField) {
                            this.setCurrentFieldAuth(targetField);
                        }
                    }
                    //子表中的字段
                    else if(this.parentField) {
                        let subForm = v.find(f => f.name === this.parentField)
                        if(subForm) {
                            let targetField = subForm.fields.find(f => f.name === this.currentField)
                            if(targetField) {
                                this.setCurrentFieldAuth(targetField);
                            }
                        }
                    } else {
                        //主表字段
                        let masterForm = v.find(f => f.isMain === "Y");
                        if(masterForm) {
                            let targetField = masterForm.fields.find(f => f.name === this.currentField)
                            if(targetField) {
                                this.setCurrentFieldAuth(targetField);
                            }
                        }
                    }
                }
            }
        },
        methods: {
            setCurrentFieldAuth(targetField) {
                //是否可以编辑
                if((targetField.edit || []).length)
                    this.currentFieldAuth.edit = this.getAuth(targetField.edit, true);
                //是否必填
                if((targetField.required || []).length)
                    this.currentFieldAuth.required = this.getAuth(targetField.required, false);
                //是否隐藏
                if((targetField.hide || []).length)
                    this.currentFieldAuth.hide = this.getAuth(targetField.hide, false);
                //子表操作权限
                if((targetField.buttons || []).length) {
                    let addHandle = targetField.buttons.find(f => f.fieldType === "add")
                    if(addHandle) {
                        this.currentFieldAuth.add = this.getAuth(addHandle.show || [], true);
                    }

                    let removeHandle = targetField.buttons.find(f => f.fieldType === "remove")
                    if(removeHandle) {
                        this.currentFieldAuth.remove = this.getAuth(removeHandle.show || [], true);
                    }
                }
            },
            getAuth(authArr, dft) {
                if(authArr.find(f => f.type === "all")) {
                    return true;
                }
                if(authArr.find(f => f.type === "none")) {
                    return false;
                }

                let flag = dft;
                //用户、角色、组织权限为“或”的关系
                for(let item of authArr) {
                    if(item.type === "employee") {
                        let users = (item.code || "").split(",");
                        if(users.length) {
                            flag = users.includes(this.frId)
                            if(flag) {
                                break;
                            }
                        }
                    }
                    if(item.type === "role") {
                        let roles = (item.code || "").split(",");
                        if(roles.length) {
                            let r = [...roles, ...(this.frRoles || [])]
                            flag = ([...new Set(r)].length < r.length)
                            if(flag) {
                                break;
                            }
                        }
                    }
                    if(item.type === "org") {
                        let org = (item.code || "").split(",");
                        if(org.length) {
                            flag = org.includes(this.frGroup)
                            if(flag) {
                                break;
                            }
                        }
                    }
                }

                return flag
            }
        }
    }
</script>
