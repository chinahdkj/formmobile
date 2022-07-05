import Vue from "vue"
import {BindRecords, DateFormat} from "./lib"

Vue.mixin({
    computed: {
        FORMRENDER_HEADER() {
            let headers = {};
            const uniwaterUtoken = window.localStorage.getItem("uniwater_utoken"); //统一平台token
            const sysToken = window.localStorage.getItem("sysToken"); //s7 token
            const token = window.localStorage.getItem("token"); //云平台token
            if(uniwaterUtoken) headers['uniwaterUtoken'] = uniwaterUtoken;
            if(sysToken) headers['sysToken'] = sysToken;
            if(token) headers['token'] = token;
            return headers;
        },
        FORMRENDER_TOKEN() {
            let token = "";
            if(this.FORMRENDER_HEADER['uniwaterUtoken'])
                token = this.FORMRENDER_HEADER['uniwaterUtoken']
            if(this.FORMRENDER_HEADER['sysToken'])
                token = this.FORMRENDER_HEADER['sysToken']
            if(this.FORMRENDER_HEADER['token'])
                token = this.FORMRENDER_HEADER['token']
            return token
        }
    },
    methods: {
        __BindRecords: BindRecords,
        __DateFormat: DateFormat,
    }
});
