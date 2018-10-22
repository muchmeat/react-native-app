/**
 * 数据验证工具类
 * Created by ruixin on 16/7/12.
 */
import React, {Component} from 'react';

import IDValidator from './IDValidator';

export default class ValidateUtil extends Component {

    //非空验证
    static isNotNull(value) {
        if (!value || value.length == 0) {
            return '不可为空';
        }
        return null;
    }

    //验证真实姓名
    static isRealName(value) {
        if (value && value.length > 0) {
            //\u2022\u263b\uff65\u30fb 均为中英文中心圆点符号的unicode
            let reg = new RegExp(/^([\u4e00-\u9fa5\u2022\u263b\uff65\u30fb]{1,20}|[a-zA-Z\.\u2022\u263b\uff65\u30fb\s]{1,20})$/);
            if (!reg.test(value)) {
                return "真实性校验未通过";
            }
        }
        return null;
    }

    //身份证验证
    static isId(value) {
        if (!IDValidator.isValid(value)) {
            return '格式错误';
        }
        return null;
    }

    //验证密码强度
    static password(value) {
        let reg = new RegExp("^[0-9A-Za-z]{8,}$", "i");
        if (!reg.test(value)) {
            return "格式错误或强度不足";
        }
    }

    //验证整数
    static isInteger(value) {
        if (value && value.length > 0) {
            let reg = new RegExp("^[0-9]*$", "g");
            if (!reg.test(value)) {
                return "应输入非负整数";
            }
        }
        return null;
    }

    //验证正整数
    static isPositiveInteger(value) {
        if (value && value.length > 0) {
            let reg = new RegExp(/^([1-9]+[0-9]*)?$/);
            if (!reg.test(value)) {
                return "应输入正整数";
            }
        }
        return null;
    }

    //验证数字
    static isNumber(value) {
        if (value && value.length > 0) {
            let reg = new RegExp(/^-?[0-9]*(\.[0-9]+)?$/);
            if (!reg.test(value)) {
                return "应为有效数字";
            }
        }
        return null;
    }

    //验证正数
    static isPositiveNumber(value) {
        if (value && value.length > 0) {
            let reg1 = new RegExp(/^[1-9][0-9]*(\.[0-9]+)?$/);
            //0.x小数
            let reg2 = new RegExp(/^0\.[1-9]+[0-9]*$/);
            //0.000..x小数
            let reg3 = new RegExp(/^0\.0+[1-9]+[0-9]*$/);
            if (!reg1.test(value) && !reg2.test(value) && !reg3.test(value)) {
                return "应输入正数";
            }
        }
        return null;
    }

    //将15位身份证长度转换成18位
    static conver15CardTo18(idCard) {
        let num = idcode;//身份证号码
        let arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        let arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        let nTemp = 0, i;
        num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
        for (i = 0; i < 17; i) {
            nTemp = num.substr(i, 1) * arrInt[i];
        }
        num = arrCh[nTemp % 11];
        return num;
    }

    /**
     * 联系电话(手机)验证
     */
    static isTel(value) {
        if (value && value.length > 0) {
            if (!/^1[0-9]{10}$/.test(value)) {
                return "格式不正确";
            }
        }
        return null;
    }
}