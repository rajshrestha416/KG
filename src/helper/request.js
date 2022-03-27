import needle from "needle";

const option = {
    headers: {
        "authorization": `Bearer ${process.env.REACT_APP_TOKEN}`
    }
};

const get = async (url) => {
    var _res;
    await needle("get",
        `${process.env.REACT_APP_BASE_URL}/${url}`,
        option).then((response) => {
            _res = response.body;
        }).catch(err => {
            _res = err;
        });
    return _res;
};


const post = async (url, data) => {
    var _res;
    await needle('post',
        `${process.env.REACT_APP_BASE_URL}/${url}`, data,
        option).then((response) => {
            _res = response.body;
        }).catch(err => {
            _res = err;
        });
    return _res
};

const put = async(url, data) => {
    var _res;
    await needle('put',
        `${process.env.REACT_APP_BASE_URL}/${url}`, data,
        option).then((response) => {
            _res = response.body;
        }).catch(err => {
            _res = err;
        });
    return _res
};


const del = async(url, data) => {
    var _res;
    await needle('delete',
        `${process.env.REACT_APP_BASE_URL}/${url}`, data,
        option).then((response) => {
            _res = response.body;
        }).catch(err => {
            _res = err;
        });
    return _res
};

export default {
    get,
    post,
    put,
    del
};


