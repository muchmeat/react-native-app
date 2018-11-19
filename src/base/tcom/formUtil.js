/**
 * 表单解析工具类
 */

import t from "tcomb-form-native";

/**
 * 从web端数据解析手机端表单配置
 * @param fields
 * @returns {{rows: Array, options: Array, values: Array}}
 */
export function getSetTTings(fields,t) {
    let rows = {};
    let _rows = t.struct(rows);
    let options = {};
    let _options = {fields:options};
    let values = {};
    if(fields && fields.length){
        for(let col of fields){
            if(col.fieldType === "text" || col.fieldType === "textarea" || col.fieldType === "number" || col.fieldType === "attachment"
                || col.fieldType === "selector" || col.fieldType === "radio" || col.fieldType === "datePicker"){
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
                if(col.fieldType === "text" || col.fieldType === "textarea" || col.fieldType === "number"){
                    rows[colName] = notNull ? t.String : t.maybe(t.String);
                    if(col.fieldType === "number")
                        options[colName].keyboardType='numeric';
                    else
                        options[colName].mode = col.fieldType;
                    options[colName].maxLength = webOption.max_length;
                    options[colName].placeholder = webOption.placeholder;
                }
                //selector与radio对应移动端同一种类型
                else if(col.fieldType === "selector" || col.fieldType === "radio"){
                    rows[colName] = notNull ? t.enums(getSelectorValues(webOption.options),colName) : t.maybe(t.enums(getSelectorValues(webOption.options),colName));
                }
                //时间
                else if(col.fieldType === "datePicker"){
                    rows[colName] = notNull ? t.Date : t.maybe(t.Date);
                    options[colName].mode = "date";
                    if(webOption.datefmt_type === "custom")
                        options[colName].mode = (webOption.datefmt.indexOf("h") >-1 || webOption.datefmt.indexOf("H") >-1) ? "datetime" : "date";
                    else
                        options[colName].mode = webOption.datefmt_type;
                    //最大最小
                    if(webOption.is_start_date){
                        switch (webOption.start_date_type){
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
                    if(webOption.is_end_date){
                        //maximumDate
                        switch (webOption.end_date_type){
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
                else if(col.fieldType === "attachment"){
                    rows[colName] = (webOption.min_file_quantity > 0) ? t.list(t.String) : t.maybe(t.list(t.String));
                    options[colName].mode = "filePicker";
                    //数量限制，App没有最少限制
                    if(webOption.max_file_quantity && webOption.max_file_quantity > 0)
                        options[colName].limit = webOption.max_file_quantity;
                    else
                        options[colName].limit = 4;
                    //类型筛选
                    if(webOption.media_type)
                        options[colName].fileType = webOption.media_type;
                }
            }

        }
    }
    return {rows:_rows,options:_options,values:values};
}


//selector获取value值
function getSelectorValues(options) {
    let result = {};
    if(!options || !options.length)
        return result;
    //排序
    let newArray = options.sort(sortRule);
    for(let option of newArray){
        result[option.val] = option.label;
    }
    return result;
}

function sortRule(a,b) {
    return a.$index - b.$index;
}


//获取今日Date类型时间
function getToday() {
    let date= new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setMilliseconds(0);
    return date;
}