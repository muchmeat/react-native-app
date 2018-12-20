/**
 * 日期工具类
 * Created by ruixin on 16/7/18.
 */
import React, {Component} from 'react';
import moment from "moment";
import 'moment/locale/zh-cn';

const sevendays = moment().add(-7, 'days').format('YYYY-MM-DD');  //7天前
const yesterday = moment().add(-1, 'days').format('YYYY-MM-DD');  //昨天
const hour = moment().get('hour');              //当前时间的小时
const mins = moment().get('minute');            //获取当前时间的分钟
const seconds = moment().get('second');         //获取当前时间的秒数

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.pattern=function(fmt) {
    var o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    var week = {
        "0" : "/u65e5",
        "1" : "/u4e00",
        "2" : "/u4e8c",
        "3" : "/u4e09",
        "4" : "/u56db",
        "5" : "/u4e94",
        "6" : "/u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

export default class DateUtil extends Component {

    /**
     * 与当前时间比对，返回对应的信息
     * @returns {*}
     * @param time YYYY:MM:DD HH:MM:SSE   Date
     */
    static returnTime(time) {
        let sys_date = time.substr(0, 10);   //消息的日期
        let week = time.substr(19, 3);      //消息的星期


        let hhS = time.substr(11, 2);         //消息的小时  在显示的时候，我们需要01:01:02的时间显示
        let mmS = time.substr(14, 2);         //消息的分钟
        let ssS = time.substr(17, 2);         //消息的秒
        let hh = parseInt(hhS);         //消息的小时
        let mm = parseInt(mmS);         //消息的分钟
        let ss = parseInt(ssS);         //消息的秒

        if (sys_date <= sevendays) {           //该消息是否是7天以前的？
            return sys_date;                 //显示 年-月-日
        } else if (sys_date <= yesterday) {     //该消息是否是1-7天以前的？
            return week;                     //显示 星期？
        } else {                               //一天之内

            let currentSec = hour * 3600 + mins * 60 + seconds;      //当前时间的总秒数
            let second = hh * 3600 + mm * 60 + ss;                   //消息时间的总秒数
            let result = currentSec - second;                    //差值
            if (result >= 3600) {                                    //如果大于1小时
                return hhS + ':' + mmS + ':' + ssS;                         //显示 时：分：秒
            } else if (result >= 60) {                              //如果1-60分钟
                return Math.floor(result / 60) + "分钟前";           //取向下整除的分钟
            } else {                                               //如果小于1分钟
                return "刚刚";
            }
        }
    }

    /**
     * 获取时间段描述
     * @param hour 小时
     * @returns {*}
     */
    static getPeriodDescription(hour) {
        if (hour >= 0 && hour < 5) {
            return '凌晨';
        } else if (hour >= 5 && hour < 8) {
            return '早晨';
        } else if (hour >= 8 && hour < 11) {
            return '上午';
        } else if (hour >= 11 && hour < 13) {
            return '中午';
        } else if (hour >= 13 && hour < 17) {
            return '下午';
        } else if (hour >= 17 && hour < 19) {
            return '傍晚';
        } else if (hour >= 19 && hour <= 23) {
            return '晚上';
        } else {
            return '您';
        }
    }

    /**
     * 获取白天还是黑夜
     * @param hour
     * @returns {*}
     */
    static getDayOrNight(hour) {
        if (hour >= 6 && hour < 18) {
            return 'Day';
        } else {
            return 'Night';
        }
    }

    /**
     * 获取特定格式的 年月日 星期
     * @param date
     * @returns {string}
     */
    static getYMDW(date) {
        let week;
        if (date.getDay() == 0) week = "星期日";
        if (date.getDay() == 1) week = "星期一";
        if (date.getDay() == 2) week = "星期二";
        if (date.getDay() == 3) week = "星期三";
        if (date.getDay() == 4) week = "星期四";
        if (date.getDay() == 5) week = "星期五";
        if (date.getDay() == 6) week = "星期六";
        return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日," + week;
    }


    /**
     * 获取日期
     */
    static getYMD() {
        let _moment = moment();
        return _moment.format(defaultFormat);
    }

    /**
     * 获取日期
     */
    static getYMDHms() {
        let _moment = moment();
        return _moment.format(defaultAllFormat);
    }


    /**
     * 将毫秒数时间戳字符串格式化为提供格式的日期
     *
     * @param timestamp
     * @param fmt
     * @returns {string}
     */
    static format(timestamp, fmt) {
        if (timestamp && fmt) {
            return new Date(timestamp).pattern(fmt);
        } else if (timestamp) {
            return moment(timestamp).format(defaultFormat2);
        }
        return "";
    }


    static getPickerYMD() {
        let _moment = moment();
        return [_moment.year() + "年", (_moment.month() + 1) + "月", _moment.date() + "日"];
    }

    /**
     * 将日期选择框格式转为后台保存格式
     * @param pickedValue
     * @returns {string}
     */
    static parseDateFormat(pickedValue) {
        return pickedValue.join("").replace(/年|月/g, "-").replace(/日/g, "");
    }

    /**
     * 将yyyy-MM-dd格式日期转换为DatePicker接收格式
     * @param str
     * @returns {Array|*}
     */
    static parsePickerFormat(str) {
        if (str) {
            let _moment = moment(str, defaultFormat);
            if (_moment) {
                return [_moment.year() + "年", (_moment.month() + 1) + "月", _moment.date() + "日"];
            }
        }
        return this.getPickerYMD();
    }
}

const
    defaultFormat = "YYYY-MM-DD";
const
    defaultAllFormat = "YYYYMMDDHHmmss";
const
    defaultFormat2 = "YYYY-MM-DD HH:mm:ss";