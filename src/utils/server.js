import $http from "mue/src/lib/http";

const Server = {
    _Post: (params, prefix, headers = {}) => {
        return $http.post(`${prefix}/sys/sysinterface/externalInterface/post`, params)
    },
    _Get: (params, prefix, headers = {}) => {
        return $http.post(`${prefix}/sys/sysinterface/externalInterface/get`, params)
    }
};

export default Server
