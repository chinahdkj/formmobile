import $http from "mue/src/lib/http";

const Server = {
    _Post: (params, prefix, headers = null) => {
        return $http.sourcePost(`${prefix}/sys/sysinterface/externalInterface/post`, params, false, null, headers)
    },
    _Get: (params, prefix, headers = null) => {
        return $http.sourcePost(`${prefix}/sys/sysinterface/externalInterface/get`, params, false, null, headers)
    }
};

export default Server
