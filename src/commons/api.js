import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'

// axios 配置
axios.defaults.timeout = 5000;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = "application/json;charset=UTF-8"
axios.defaults.withCredentials = true; // 可写入设置的cookies
axios.defaults.baseURL = '';


//POST传参序列化
axios.interceptors.request.use((config) => {
  // console.log(config)
  if (config.method === 'post') {
    config.data = JSON.stringify(config.data);
  }
  let _token = localStorage.getItem('x-auth-token');

  if (!!_token) {
    config.headers['x-auth-token'] = _token;
  }
  if (config.method === 'post' || config.method === 'put') {
    var params = {}
    var str = []
    var data = typeof config.data === 'string' ? JSON.parse(config.data) : config.data
    // console.log(data, typeof data, 0)
    for (var k in data) {
      if (typeof data[k] !== 'function') {
        // 参数是对象，并且不为空
        if (typeof data[k] === 'object') {
          params[k] = JSON.stringify(data[k])
        } else {
          params[k] = data[k]
        }
      }
    }
    // console.log(params, 1)
    if (config.headers['Content-Type'] !== 'application/json') {
      Object.keys(params).map(function (key) {
        str.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
      })
      config.data = str.join('&')
      // console.log(str, str.join('&'))
      config.url = config.url + '?' + str.join('&')
    }
  }
  return config;
}, (error) => {
  console.log("错误的传参");
  alert("错误的传参")
  return Promise.reject(error);
});

//返回状态判断 
axios.interceptors.response.use((res) => {
  if (isWeiXin()) {
    if (res.data.code === 401) {
      localStorage.removeItem('x-auth-userid');
      localStorage.removeItem('x-auth-token');
      getBaseData()
    }
  }
  if (res.statusText === 'ok') {
    // console.log(res.data.msg)
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  console.log("网络异常");
  // alert("网络异常")
  return Promise.reject(error);
});

// get方式
export function getFetch (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// post方式
export function postFetch (url, params, headers) {
  let headersObj = headers || null;
  let paramsObj = params || null
  console.log(paramsObj, typeof paramsObj)
  return new Promise((resolve, reject) => {
    axios.post(url, paramsObj, headersObj)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function fetch (url, method = 'GET', params) {
  return new Promise((resolve, reject) => {
    let _data = {
      method: method,
      url: url
    }
    if (!!params) {
      _data.params = params;
    }
    _data.timeout = 12000;
    axios(_data)
      .then((response) => {
        if (response.data.code !== 0) {
          Vue.prototype.alertMsg(response.data.message);
        }
        resolve(response.data)
      })
  })
}

let dataExport = {
  // 生成订单
  postNewOrder (params) {
    return postFetch('/shop-api/shop/order/genNewOrder', params, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  // 获取地址列表
  getCommentList (params) {
    return getFetch('https://m.toutiao.com/log/sentry/v2/api/slardar/main/?ev_type=ajax&ax_status=200&ax_type=get&ax_duration=228&ax_size=4689&ax_protocol=https&ax_domain=mp.toutiao.com&ax_path=%2Fget_media_info%2F&version=1.0.1&bid=toutiao_mp&pid=index_new&hostname=mp.toutiao.com&protocol=https&timestamp=1552035591489', params)
  },
  // 订单支付
  postPayOrder (params) {
    return postFetch('/shop-api/shop/order/genpay', params, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export default dataExport
