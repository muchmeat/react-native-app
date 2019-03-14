/**
 * 表单解析工具类
 */
import React from 'react';
import {
    View,
    Image,
    Text,
    ToastAndroid,
    TouchableOpacity,
    ImageBackground
} from "react-native";
import OpenFile from "react-native-doc-viewer";

import DateUtil from "../../../utils/DateUtil";
import styles from "../../example/style/Personal";
import GroupItem from "../../base/components/GroupItem2";
// import FileItem from "../../base/components/FileDetailItem";
import FileItem from "../../base/components/FileItem";
import GroupTitle from "../../base/components/GroupTitle2";
import FontAwesomeEnums from "../../../utils/enums/FontAwesomeEnums";
import Global from "../../../utils/Global";
import {NavigationActions} from "react-navigation";
import {isTel} from "../../../utils/common";
import {breadthFirstRecursion} from "./tcomb-form-native/lib/util";

/**
 * 从web端数据解析手机端表单配置
 * 时间格式默认为 yyyy-MM-dd HH-mm-ss
 * @param fields
 * @param t
 * @returns {{rows: Array, options: Array, values: Array}}
 */
export function getSetTTings(fields, t, navigation) {
    let rows = {};
    let _rows = t.struct(rows);
    let options = {};
    let _options = {fields: options};
    let values = {};
    if (fields && fields.length) {
        for (let col of fields) {
            if (col.fieldType === "text" || col.fieldType === "textarea" || col.fieldType === "number" || col.fieldType === "attachment" || col.fieldType === "selector"
                || col.fieldType === "select" || col.fieldType === "radio" || col.fieldType === "checkbox" || col.fieldType === "datePicker" || "SHAPE" === col.code) {

                //字段名
                let colName = col.code;
                let webOption = JSON.parse(col.fieldOptions);

                //是否作为填写项,位置标注除外
                if (webOption.hide_rights || webOption.add_hide_rights) {
                    if ("SHAPE" !== col.code) {
                        continue;
                    }
                }

                //是否必填
                let notNull = webOption.required;
                //配置初始化
                rows[colName];
                options[colName] = {};

                //公用属性
                options[colName].label = col.label;
                //单行，多行，数字
                if (col.fieldType === "text" || col.fieldType === "textarea" || col.fieldType === "number") {
                    rows[colName] = notNull ? t.String : t.maybe(t.String);
                    if (col.fieldType === "number") {
                        options[colName].keyboardType = 'numeric';
                        let regStr = '^(-?\\d+)(\\.\\d+)?$';
                        let error = "请输入浮点数";
                        if (webOption.integer) {
                            regStr = '^-?\\d+$';//整数
                        } else if (webOption.decimal) {
                            let decimal = Math.abs(webOption.decimal);
                            regStr = '^(-?\\d+)(\\.\\d{1,' + decimal + '})?$';
                            error = "请输入最多" + decimal + "位小数";
                        }
                        if (webOption.is_max) {
                            error += ",且最大数为" + webOption.max;
                        }
                        if (webOption.is_min) {
                            error += ",且最小数为" + webOption.min;
                        }
                        options[colName].error = error;
                        rows[colName] = t.refinement(notNull ? t.String : t.maybe(t.String), function (v) {
                            let flag = true;
                            if (webOption.is_max) {
                                if (Number(v) > Number(webOption.max)) {
                                    console.warn("max" + webOption.max);
                                    flag = false;
                                }
                            }
                            if (webOption.is_min) {
                                if (Number(v) < Number(webOption.min)) {
                                    console.warn("min" + webOption.min);
                                    flag = false;
                                }
                            }
                            var reg = new RegExp(regStr);
                            console.warn("reg:" + reg.test(v));
                            console.warn("flag:" + flag);
                            console.warn("notNull:" + notNull);
                            if (v) {
                                return reg.test(v) && flag;
                            } else {
                                if (notNull) {
                                    return false;
                                }
                                return true;
                            }
                        });
                    }
                    else {
                        options[colName].mode = col.fieldType;
                    }
                    options[colName].maxLength = webOption.max_length;
                    options[colName].placeholder = webOption.placeholder;
                    if (col.value) {
                        values[colName] = col.value;
                    } else {
                        values[colName] = webOption.default_value;
                    }
                }
                //select与radio移动端对应同一种类型
                else if (col.fieldType === "select" || col.fieldType === "radio") {
                    options[colName].mode = col.fieldType;
                    rows[colName] = notNull ? t.enums(getSelectValues(webOption.options), colName) : t.maybe(t.enums(getSelectValues(webOption.options), colName));
                    if (col.value) {
                        values[colName] = col.value;
                    }
                }
                //checkbox多选
                else if (col.fieldType === "checkbox") {
                    options[colName].mode = col.fieldType;
                    rows[colName] = notNull ? t.enumsMulti(getSelectValues(webOption.options), colName) : t.maybe(t.enumsMulti(getSelectValues(webOption.options), colName));
                    if (col.value) {
                        values[colName] = col.value;
                    }
                }
                //selector选择器(用户、组织)
                else if (col.fieldType === "selector") {
                    options[colName].mode = col.fieldType;
                    options[colName].selectorType = webOption.selector_type;
                    rows[colName] = notNull ? t.enumsMulti(getSelectorValues(webOption), colName) : t.maybe(t.enumsMulti(getSelectorValues(webOption), colName));
                    if (col.value) {
                        values[colName] = col.value;
                    }
                }
                //时间
                else if (col.fieldType === "datePicker") {
                    rows[colName] = notNull ? t.Date : t.maybe(t.Date);
                    options[colName].mode = "date";
                    //自定义类型转成datetime 或 date
                    if (webOption.datefmt_type === "custom") {
                        options[colName].mode = (webOption.datefmt.indexOf("h") > -1 || webOption.datefmt.indexOf("H") > -1) ? "datetime" : "date";
                    }
                    else {
                        options[colName].mode = webOption.datefmt_type;
                    }
                    //默认值类型，为today表示当前时间
                    if (webOption.default_value_type && webOption.default_value_type === 'today') {
                        values[colName] = new Date(getToday());
                    }
                    //默认值
                    if (webOption.default_value) {
                        values[colName] = new Date(webOption.default_value);
                    }
                    if (col.value) {
                        values[colName] = new Date(col.value);
                    }
                    //最大最小
                    if (webOption.is_start_date) {
                        switch (webOption.start_date_type) {
                            case "today":
                                options[colName].minimumDate = getToday();
                                break;
                            case "specific":  //格式  yyyy-MM-dd HH:mm:ss
                                options[colName].minimumDate = new Date(webOption.start_date);
                                break;
                            case "before":
                                options[colName].minimumDate = new Date(getToday().getTime() - 24 * 60 * 60 * 1000 * webOption.start_date);
                                break;
                            case "after":
                                options[colName].minimumDate = new Date(getToday().getTime() + 24 * 60 * 60 * 1000 * webOption.start_date);
                                break;
                        }
                    }
                    if (webOption.is_end_date) {
                        //maximumDate
                        switch (webOption.end_date_type) {
                            case "today":
                                options[colName].maximumDate = getToday();
                                break;
                            case "specific":  //格式  yyyy-MM-dd HH:mm:ss
                                options[colName].maximumDate = new Date(webOption.end_date);
                                break;
                            case "before":
                                options[colName].maximumDate = new Date(getToday().getTime() - 24 * 60 * 60 * 1000 * webOption.end_date);
                                break;
                            case "after":
                                options[colName].maximumDate = new Date(getToday().getTime() + 24 * 60 * 60 * 1000 * webOption.end_date);
                                break;
                        }
                    }
                }
                //上传附件
                else if (col.fieldType === "attachment") {
                    rows[colName] = (webOption.min_file_quantity > 0) ? t.list(t.String) : t.maybe(t.list(t.String));
                    options[colName].mode = "filePicker";
                    //数量限制，App没有最少限制
                    if (webOption.max_file_quantity && webOption.max_file_quantity > 0) {
                        options[colName].limit = webOption.max_file_quantity;
                    } else {
                        options[colName].limit = 4;
                    }
                    //类型筛选
                    if (webOption.media_type) {
                        options[colName].fileType = webOption.media_type;
                    }
                    if (col.value) {
                        values[colName] = col.value;
                    }
                }
                //定位，额外添加
                else if ("SHAPE" === colName) {
                    rows[colName] = notNull ? t.String : t.maybe(t.String);
                    options[colName].mode = "locate";
                    options[colName].placeholder = "请点击定位";
                    if (col.value) {
                        let position = col.value.replace(/[\,]+/, '');
                        if ("" != position) {
                            values[colName] = col.value;
                        }
                    }
                }
                options[colName].navigation = navigation;
            }

        }
    }
    return {rows: _rows, options: _options, values: values};
}

/**
 * 从web端数据解析手机端表单配置,返回展示数据
 * @param fields
 * @param navigation 路由
 * @returns {*[]}
 */
export function getDetail(fields, navigation) {
    let mainContain = [];
    let attachmentContain = [];
    if (fields && fields.length) {
        for (const col of fields) {
            if (col.fieldType === "text" || col.fieldType === "textarea" || col.fieldType === "number" || col.fieldType === "attachment" || col.fieldType === "selector"
                || col.fieldType === "select" || col.fieldType === "radio" || col.fieldType === "checkbox" || col.fieldType === "datePicker" || "SHAPE" === col.code) {
                //字段名
                let colName = col.code;
                //字段属性
                let webOption = JSON.parse(col.fieldOptions);

                //是否作为填写项,位置标注除外
                // if (webOption.hide_rights || webOption.add_hide_rights) {
                //     if ("SHAPE" !== col.code) {
                //         continue;
                //     }
                // }

                //单行，多行，数字
                if (col.fieldType === "text" || col.fieldType === "textarea" || col.fieldType === "number") {
                    mainContain.push(<GroupItem text={col.label} value={col.value}/>);
                }
                //select与radio对应移动端同一种类型
                else if (col.fieldType === "select" || col.fieldType === "radio") {
                    mainContain.push(<GroupItem text={col.label}
                                                value={getSelectLabel(webOption.options, col.value)}/>);
                }
                //checkbox多选
                else if (col.fieldType === "checkbox") {
                    mainContain.push(<GroupItem text={col.label}
                                                value={getCheckboxLabel(webOption.options, col.value)}/>);
                }
                //selector选择器(用户、组织)
                else if (col.fieldType === "selector") {
                    mainContain.push(<GroupItem text={col.label}
                                                value={getSelectorLabel(webOption.options, col.value, webOption.selector_type, webOption.is_single)}/>);
                }
                //时间
                else if (col.fieldType === "datePicker") {
                    let time = DateUtil.format(col.value, webOption.datefmt);
                    mainContain.push(<GroupItem text={col.label} value={time}/>);
                }
                //上传附件
                else if (col.fieldType === "attachment") {
                    let emptyText = <Text style={{fontSize: 16, color: "#ffc92a"}}>无相关内容</Text>;
                    let emptyView = <View style={styles.group2}>
                        <View style={[styles.detail.imgRow2.flex, {
                            flexDirection: "column",
                            backgroundColor: "#FFF",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            paddingLeft: 15
                        }]}>
                            <View style={{
                                flex: 1,
                                flexDirection: "row",
                                marginVertical: 10
                            }}>{emptyText}
                            </View>
                        </View>
                    </View>;
                    let items = [];
                    for (let file of col.value) {
                        items.push(<FileItem name={file.fileName} data={file.data}
                                             type={file.type} navigation={navigation}
                                             id={file.id}/>)
                    }
                    attachmentContain.push(<GroupTitle title={col.label}/>);
                    attachmentContain.push(<View
                        style={styles.group2}>{items.length && items.length > 0 ? items : emptyView}</View>);
                    //类型筛选
                    // if (webOption.media_type) {
                    //     if ("images" === webOption.media_type.toLowerCase()) {
                    //         let items = [];
                    //         // let defaultSource = require("../../../assets/images/list.png");
                    //         for (let file of col.value) {
                    //             items.push(
                    //                 <TouchableOpacity onPress={() => {
                    //                     // OpenFile.openDoc([{
                    //                     //     // url: "http://172.28.1.208:8082/zybzzxt/attachment/getImage?id=360",
                    //                     //     // fileName: file.fileName,
                    //                     //     // cache: false,
                    //                     //     // fileType:file.type
                    //                     //     url: Global.REQUEST_BASE_URL + "/attachment/downloadApp?id=" + file.id,
                    //                     //     fileName: file.fileName,
                    //                     //     cache: true,
                    //                     //     fileType: file.type
                    //                     // }], (error, url) => {
                    //                     //     if (error) {
                    //                     //         ToastAndroid.show("打开文件失败", ToastAndroid.SHORT)
                    //                     //     }
                    //                     // })
                    //                     navigation.dispatch(
                    //                         NavigationActions.navigate({
                    //                             routeName: "ImageView2",
                    //                             params: {uri: Global.FILE_BYTE_URL + file.id}
                    //                         })
                    //                     )
                    //                 }
                    //                 }>
                    //                     <View style={{paddingRight: 10}}>
                    //                         <Image resizeMode={"cover"}
                    //                                style={{height: 70, width: 70}}
                    //                                source={{uri: Global.FILE_BYTE_URL + file.id}}
                    //                                defaultSource={require("../../../assets/images/list.png")}/>
                    //                     </View>
                    //                 </TouchableOpacity>
                    //             )
                    //         }
                    //         attachmentContain.push(<GroupTitle title={col.label}/>);
                    //         attachmentContain.push(<View style={styles.group2}>
                    //             <View style={[styles.detail.imgRow2.flex, {
                    //                 flexDirection: "column",
                    //                 backgroundColor: "#FFF",
                    //                 justifyContent: "flex-start",
                    //                 alignItems: "flex-start",
                    //                 paddingLeft: 15
                    //             }]}>
                    //                 <View style={{
                    //                     flex: 1,
                    //                     flexDirection: "row",
                    //                     marginVertical: 10
                    //                 }}>{items.length && items.length > 0 ? items : emptyText}</View>
                    //             </View>
                    //         </View>);
                    //     }
                    //     else {
                    //         let items = [];
                    //         for (let file of col.value) {
                    //             items.push(<FileItem name={file.fileName} data={file.data}
                    //                                  type={file.type} navigation={navigation}
                    //                                  id={file.id}/>)
                    //         }
                    //         attachmentContain.push(<GroupTitle title={col.label}/>);
                    //         attachmentContain.push(<View
                    //             style={styles.group2}>{items.length ? items : emptyView}</View>);
                    //     }
                    // }
                    // else {
                    //     let items = [];
                    //     for (let file of col.value) {
                    //         items.push(<FileItem name={file.fileName} data={file.data}
                    //                              type={file.type} navigation={navigation}
                    //                              id={file.id}/>)
                    //     }
                    //     attachmentContain.push(<GroupTitle title={col.label}/>);
                    //     attachmentContain.push(<View style={styles.group2}>{items.length && items.length > 0? items : emptyView}</View>);
                    // }
                }
                //定位，额外添加
                else if ("SHAPE" === colName) {
                    if (col.value) {
                        let position = col.value.replace(/[\,]+/, '');
                        if ("" === position) {
                            mainContain.push(<GroupItem text={col.label} value={"未定位"}/>);
                        } else {
                            mainContain.push(<GroupItem text={col.label} value={"已定位"}/>);
                        }
                    } else {
                        mainContain.push(<GroupItem text={col.label} value={"未定位"}/>);
                    }
                }
            }
        }
    }
    let title = [];
    title.push(<GroupTitle title={"主要信息"}/>);
    return title.concat(mainContain).concat(attachmentContain);
}

/**
 * 选择器需要的值
 * options 选项数据
 * isSingle 是否多选属性 true为多选 false则为单选
 * @param webOption
 */
function getSelectorValues(webOption) {
    let result = {};
    let options = JSON.parse(webOption.options);
    if (!options || !options.length)
        return result;
    result["options"] = options;
    result["isSingle"] = webOption.is_single;
    return result;
}

/**
 * Selector获取显示值
 * @param options 数据
 * @param val 匹配值
 * @param selectorType 选择器类型
 * @param isSingle 是否单选
 * @returns {string}
 */
export function getSelectorLabel(options, val, selectorType, isSingle) {
    let result = "";
    if (!options || !options.length || !val)
        return result;
    let newArray = val.split(",");
    if ("user" == selectorType) {
        //用户数据
        options = JSON.parse(options);
        for (let option of options) {
            for (let id of newArray) {
                if (id == option.ID) {
                    result += option.USER_NAME;
                    if (!isSingle) {
                        result += "；";
                    }
                    continue
                }
            }
        }
    } else {
        //树数据
        breadthFirstRecursion(JSON.parse(options)).map(item => {
            for (let index of newArray) {
                if (index == item.id) {
                    result += item.name;
                    if (!isSingle) {
                        result += "；";
                    }
                    continue
                }
            }
        });
    }
    return result;
}


//select获取value值
function getSelectValues(options) {
    let result = {};
    if (!options || !options.length)
        return result;
    //排序
    let newArray = options.sort(sortRule);
    for (let option of newArray) {
        result[option.val] = option.label;
    }
    return result;
}

//select获取label值
export function getSelectLabel(options, val) {
    let result = "";
    if (!options || !options.length)
        return result;
    //排序
    let newArray = options.sort(sortRule);
    for (let option of newArray) {
        if (val == option.val) {
            result = option.label;
        }
    }
    return result;
}

//checkbox获取label值
export function getCheckboxLabel(options, val) {
    let result = "";
    if (!options || !options.length || !val)
        return result;
    let newOptions = getSelectValues(options);
    let newArray = val.split(",").sort(sortRule2);
    for (let index of newArray) {
        result += newOptions[index] + "；";
    }
    return result;
}

function sortRule(a, b) {
    return a.$index - b.$index;
}

function sortRule2(a, b) {
    return a.substring(a.lastIndexOf("_") + 1) - b.substring(b.lastIndexOf("_") + 1);
}

//获取今日Date类型时间
function getToday() {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setMilliseconds(0);
    return date;
}