import $http from "mue/src/lib/http";

const Server = {
    _Post: (params, prefix, headers = {}, header) => {
        return $http.sourcePost(`${prefix}/sys/sysinterface/externalInterface/post`, params, false, null, header)
    },
    _Get: (params, prefix, headers = {}, header) => {
        return $http.sourcePost(`${prefix}/sys/sysinterface/externalInterface/get`, params, false, null, header)
    }
};

export default Server
