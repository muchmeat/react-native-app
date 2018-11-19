'use strict';

import * as types from '../constants/loginTypes';

// 访问登录接口 根据返回结果来划分action属于哪个type,然后返回对象,给reducer处理
/**
 * 每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。
 * @returns {function(*)}
 */