import Vue from "vue"
import {BindRecords, DateFormat} from "./lib"

Vue.mixin({
    methods: {
        __BindRecords: BindRecords,
        __DateFormat: DateFormat,
    }
});
