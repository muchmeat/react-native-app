/**
 * 表单解析工具类
 */
import React from 'react';
import {
    View,
    Image,
    ToastAndroid,
    TouchableOpacity,
    ImageBackground
} from "react-native";
import DateUtil from "../../../utils/DateUtil";
import styles from "../../example/style/Personal";
import GroupItem from "../../base/components/GroupItem2";
import FileItem from "../../base/components/FileDetailItem";
import GroupTitle from "../../base/components/GroupTitle2";
import FontAwesomeEnums from "../../../utils/enums/FontAwesomeEnums";
import OpenFile from "react-native-doc-viewer";
import Global from "../../../utils/Global";

/**
 * 从web端数据解析手机端表单配置
 * 时间格式默认为 yyyy-MM-dd HH-mm-ss
 * @param fields
 * @param t
 * @returns {{rows: Array, options: Array, values: Array}}
 */
export function getSetTTings(fields, t,navigation) {
    let rows = {};
    let _rows = t.struct(rows);
    let options = {};
    let _options = {fields: options};
    let values = {};
    if (fields && fields.length) {
        for (let col of fields) {
            if (col.fieldType === "text" || col.fieldType === "textarea" || col.fieldType === "number" || col.fieldType === "attachment"
                || col.fieldType === "select" || col.fieldType === "radio" || col.fieldType === "datePicker" || "SHAPE" === col.code) {

                //字段名
                let colName = col.code;
                let webOption = JSON.parse(col.fieldOptions);
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
                //selector与radio对应移动端同一种类型
                else if (col.fieldType === "select" || col.fieldType === "radio") {
                    rows[colName] = notNull ? t.enums(getSelectorValues(webOption.options), colName) : t.maybe(t.enums(getSelectorValues(webOption.options), colName));
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
        for (let col of fields) {
            if (col.fieldType === "text" || col.fieldType === "textarea" || col.fieldType === "number" || col.fieldType === "attachment"
                || col.fieldType === "select" || col.fieldType === "radio" || col.fieldType === "datePicker" || "SHAPE" === col.code) {
                //字段名
                let colName = col.code;
                //字段属性
                let webOption = JSON.parse(col.fieldOptions);
                //单行，多行，数字
                if (col.fieldType === "text" || col.fieldType === "textarea" || col.fieldType === "number") {
                    mainContain.push(<GroupItem text={col.label} value={col.value}/>);
                }
                //selector与radio对应移动端同一种类型
                else if (col.fieldType === "select" || col.fieldType === "radio") {
                    mainContain.push(<GroupItem text={col.label}
                                                value={getSelectorLabel(webOption.options)}/>);
                }
                //时间
                else if (col.fieldType === "datePicker") {
                    let time = DateUtil.format(col.value, webOption.datefmt);
                    console.warn(time);
                    mainContain.push(<GroupItem text={col.label} value={time}/>);
                }
                //上传附件
                else if (col.fieldType === "attachment") {
                    //类型筛选
                    if (webOption.media_type) {
                        if ("images" === webOption.media_type.toLowerCase()) {
                            let items = [];
                            console.warn(col.value);
                            for (let file of col.value) {
                                items.push(<TouchableOpacity onPress={() => {
                                    console.warn("TouchableOpacity");
                                    OpenFile.openDoc([{
                                        url: Global.REQUEST_BASE_URL + "/attachment/getFileBase64?id=" + file.id,
                                        fileName: file.fileName,
                                        cache: false,
                                        fileType: file.type
                                    }], (error, url) => {
                                        if (error) {
                                            ToastAndroid.show("打开文件失败", ToastAndroid.SHORT)
                                        } else {
                                            console.warn(url);
                                        }
                                    })
                                    // OpenFile.openDocb64([{
                                    //     base64: file.data,
                                    //     fileName: file.fileName,
                                    //     fileType: file.type,
                                    //     cache: false /*Use Cache Folder Android*/
                                    // }], (error, url) => {
                                    //     if (error) {
                                    //         ToastAndroid.show("打开文件失败", ToastAndroid.SHORT)
                                    //     }
                                    // })
                                }
                                }><ImageBackground style={{height: 70, width: 40, marginLeft: 10}}
                                                   source={require("../../../assets/images/defualt_header.png")}>
                                    <Image resizeMode={"contain"}
                                           style={{height: 70, width: 70, marginLeft: 10}}
                                           source={{uri: Global.REQUEST_BASE_URL + "/attachment/getImage?id=" + file.id}}
                                    /></ImageBackground>
                                </TouchableOpacity>)
                            }
                            attachmentContain.push(<GroupTitle title={col.label}/>);
                            attachmentContain.push(
                                <View style={styles.group2}>
                                    <View style={[styles.detail.imgRow2, {
                                        flexDirection: "column",
                                        backgroundColor: "#FFF",
                                        justifyContent: "flex-start",
                                        alignItems: "flex-start"
                                    }]}>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: "row",
                                            marginVertical: 10
                                        }}>{items}</View>
                                    </View>
                                </View>);
                        }
                        else {
                            let items = [];
                            for (let file of col.value) {
                                items.push(<FileItem name={file.fileName}
                                                     type={FontAwesomeEnums.getCode(file.type)} navigation={navigation}
                                                     id={file.id}/>)
                            }
                            attachmentContain.push(<GroupTitle title={col.label}/>);
                            attachmentContain.push(<View style={styles.group2}>{items}</View>);
                        }
                    }
                    else {
                        let items = [];
                        for (let file of col.value) {
                            items.push(<FileItem name={file.fileName}
                                                 type={FontAwesomeEnums.getCode(file.type)} navigation={navigation}
                                                 id={file.id}/>)
                        }
                        attachmentContain.push(<GroupTitle title={col.label}/>);
                        attachmentContain.push(<View style={styles.group2}>{items}</View>);
                    }
                }
                //定位，额外添加
                else if ("SHAPE" === colName) {
                    let position = col.value.replace(/[\,]+/, '');
                    if ("" === position) {
                        mainContain.push(<GroupItem text={col.label} value={"未定位"}/>);
                    }else{
                        mainContain.push(<GroupItem text={col.label} value={"已定位"}/>);
                    }
                }
            }
        }
    }
    return [<GroupTitle title={"主要信息"}/>].concat(mainContain).concat(attachmentContain);
}

//selector获取value值
function getSelectorValues(options) {
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

//selector获取label值
export function getSelectorLabel(options) {
    let result = {};
    if (!options || !options.length)
        return result;
    //排序
    let newArray = options.sort(sortRule);
    for (let option of newArray) {
        result = option.label;
    }
    return result;
}

function sortRule(a, b) {
    return a.$index - b.$index;
}

//获取今日Date类型时间
function getToday() {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setMilliseconds(0);
    return date;
}