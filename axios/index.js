import axios from 'axios'; // eslint-disable-line import/no-extraneous-dependencies
import qs from 'qs'; // eslint-disable-line import/no-extraneous-dependencies

const axSymbol = Symbol('axios');
const doReqSymobol = Symbol('doReq');

export class Nxios {
  constructor(config) {
    this[axSymbol] = axios.create({ ...config });
  }

  get axios() {
    return this[axSymbol];
  }

  set axios(ax) {
    this.error = new Error(`you shouldn't change the axios attribute to ${ax}`);
    throw this.error;
  }

  /**
   * GET方式请求数据，RESTful API中用于获取(retrieve)记录。
   * 请求参数(config.params)以查询字符串的方式被拼接在url上。
   * @param {String} url
   * @param {Object | URLSearchParams} params
   * @param {Object} config
   * @returns {Promise<any>}
   */
  get(url, params = {}, config = {}) {
    return this[doReqSymobol]('get', url, Object.assign(config, { params }));
  }

  /**
   * POST方式请求数据，RESTful API中用于创建(create)记录。
   * 请求参数(config.data)以JSON方式序列化，并放置在request.body中。
   * Content-Type:application/json
   * @param {String} url
   * @param {Object} data
   * @param {Object} config
   * @returns {Promise<any>}
   */
  post(url, data = {}, config = {}) {
    return this[doReqSymobol]('post', url, data, config);
  }

  /**
   * POST方式请求数据，RESTful API中用于创建(create)记录。
   * 请求参数(config.data)以表单方式序列化，并放置在request.body中。
   * Content-Type:application/x-www-form-urlencoded
   * @param {String} url
   * @param {Object} data
   * @param {Object} config
   * @returns {Promise<any>}
   */
  postForm(url, data = {}, config = {}) {
    return this[doReqSymobol]('post', url, qs.stringify(data), config);
  }

  /**
   * DELETE方式请求数据，RESTful API中用于删除(delete)记录。
   * 请求参数(config.data)以JSON方式序列化，并放置在request.body中。
   * Content-Type:application/json
   * @param {String} url
   * @param {Object} data
   * @param {Object} config
   */
  delete(url, data = {}, config = {}) {
    return this[doReqSymobol]('delete', url, Object.assign(config, { data }));
  }

  /**
   * DELETE方式请求数据，RESTful API中用于删除(delete)记录。
   * 请求参数(config.data)以表单方式序列化，并放置在request.body中。
   * Content-Type:application/x-www-form-urlencoded
   * @param {String} url
   * @param {Object} data
   * @param {Object} config
   */
  deleteForm(url, data = {}, config = {}) {
    return this[doReqSymobol](
      'delete',
      url,
      Object.assign(config, { data: qs.stringify(data) }),
    );
  }

  /**
   * PUT方式请求数据，RESTful API中用于更新(update)记录。
   * 请求参数(config.data)以JSON方式序列化，并放置在request.body中。
   * Content-Type:application/json
   * @param {String} url
   * @param {Object} data
   * @param {Object} config
   * @returns {Promise<any>}
   */
  put(url, data = {}, config = {}) {
    return this[doReqSymobol]('put', url, data, config);
  }

  /**
   * PUT方式请求数据，RESTful API中用于更新(update)记录。
   * 请求参数(config.data)以表单方式序列化，并放置在request.body中。
   * Content-Type:application/x-www-form-urlencoded
   * @param {String} url
   * @param {Object} data
   * @param {Object} config
   * @returns {Promise<any>}
   */
  putForm(url, data = {}, config = {}) {
    return this[doReqSymobol]('put', url, qs.stringify(data), config);
  }

  /**
   * PATCH方式请求数据，RESTful API中用于更新(update)记录。
   * 请求参数(config.data)以JSON方式序列化，并放置在request.body中。
   * Content-Type:application/json
   * @param {String} url
   * @param {Object} data
   * @param {Object} config
   * @returns {Promise<any>}
   */
  patch(url, data = {}, config = {}) {
    return this[doReqSymobol]('patch', url, data, config);
  }

  /**
   * PATCH方式请求数据，RESTful API中用于更新(update)记录。
   * 请求参数(config.data)以表单方式序列化，并放置在request.body中。
   * Content-Type:application/x-www-form-urlencoded
   * @param {String} url
   * @param {Object} data
   * @param {Object} config
   * @returns {Promise<any>}
   */
  patchForm(url, data = {}, config = {}) {
    return this[doReqSymobol]('patch', url, qs.stringify(data), config);
  }

  [doReqSymobol](method = 'post', url, data = {}, config = {}) {
    // 私有方法
    return new Promise((resolve, reject) => {
      if (!url) {
        reject(new Error('url empty.'));
      }

      const reqMethod = this.axios[method];
      if (!reqMethod) {
        reject(new Error(`invalid method ${method}`));
      }

      reqMethod
        .bind(this.axios)(url, data, config)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }
}

export default Nxios;
