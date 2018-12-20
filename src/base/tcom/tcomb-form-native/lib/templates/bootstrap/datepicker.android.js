import React from "react";
import {
    View,
    Text,
    DatePickerAndroid,
    TimePickerAndroid,
    TouchableOpacity,
    TouchableNativeFeedback, PixelRatio,
} from "react-native";
import IconLib from "../../../../../../../assets/svg/IconLib";
import Svg from 'react-native-svg'
import formStyle from "../../stylesheets/formStyle";
import themeStyle from "../../../../../../example/style/ThemeStyle";

function dateTimeFontClick(locals) {
    let config = {
        date: locals.value || new Date(),
        mode: "spinner"
    };
    if (locals.minimumDate) {
        config.minDate = locals.minimumDate;
    }
    if (locals.maximumDate) {
        config.maxDate = locals.maximumDate;
    }
    DatePickerAndroid.open(config).then(function(date) {
        if (date.action !== DatePickerAndroid.dismissedAction) {
            let newDate = new Date(locals.value ? locals.value : new Date());
            newDate.setFullYear(date.year, date.month, date.day);
            TimePickerAndroid.open({
                is24Hour: true,
                hour: newDate.getHours() ? newDate.getHours() : new Date().getHours(),
                minute: newDate.getMinutes() ? newDate.getMinutes() : new Date().getMinutes(),
                mode: "spinner"
            }).then(function(time) {
                if (time.action !== TimePickerAndroid.dismissedAction) {
                    newDate.setHours(time.hour);
                    newDate.setMinutes(time.minute);
                    locals.onChange(newDate);
                }
            });
        }
    });
    if (typeof locals.onPress === "function") {
        locals.onPress();
    }
}

function dateTimeAfterClick(locals,formattedDateValue) {
    let setTime = {};
    if(!formattedDateValue){
        let config = {
            date: locals.value || new Date(),
            mode: "spinner"
        };
        if (locals.minimumDate) {
            config.minDate = locals.minimumDate;
        }
        if (locals.maximumDate) {
            config.maxDate = locals.maximumDate;
        }
        DatePickerAndroid.open(config).then(function(date) {
            if (date.action !== DatePickerAndroid.dismissedAction) {
                let newDate = new Date(locals.value ? locals.value : new Date());
                newDate.setFullYear(date.year, date.month, date.day);
                TimePickerAndroid.open({
                    is24Hour: true,
                    hour: newDate.getHours() ? newDate.getHours() : new Date().getHours(),
                    minute: newDate.getMinutes() ? newDate.getMinutes() : new Date().getMinutes(),
                    mode: "spinner"
                }).then(function(time) {
                    if (time.action !== TimePickerAndroid.dismissedAction) {
                        newDate.setHours(time.hour);
                        newDate.setMinutes(time.minute);
                        locals.onChange(newDate);
                    }
                });
            }
        });
    }else {
        TimePickerAndroid.open({
            is24Hour: true,
            hour: locals.value ? (locals.value.getHours() ? locals.value.getHours() : new Date().getHours()) : new Date().getHours(),
            minute: setTime.minute,
            mode:"spinner"
        }).then(function(time) {
            if (time.action !== TimePickerAndroid.dismissedAction) {
                const newTime = new Date(locals.value);
                newTime.setHours(time.hour);
                newTime.setMinutes(time.minute);
                locals.onChange(newTime);
            }
        });
    }
    if (typeof locals.onPress === "function") {
        locals.onPress();
    }
}

function dateClick(locals) {
    if (locals.mode === "time") {
        const now = new Date();
        const isDate = locals.value && locals.value instanceof Date;
        let setTime = {
            hour: isDate ? locals.value.getHours() : now.getHours(),
            minute: isDate ? locals.value.getMinutes() : now.getMinutes(),
            mode:"spinner"
        };
        TimePickerAndroid.open({
            is24Hour: true,
            hour: setTime.hour,
            minute: setTime.minute,
            mode: setTime.mode
        }).then(function(time) {
            if (time.action !== TimePickerAndroid.dismissedAction) {
                const newTime = new Date();
                newTime.setHours(time.hour);
                newTime.setMinutes(time.minute);
                locals.onChange(newTime);
            }
        });
    } else if (locals.mode === "date") {
        let config = {
            date: locals.value || new Date(),
            mode: "spinner"
        };
        if (locals.minimumDate) {
            config.minDate = locals.minimumDate;
        }
        if (locals.maximumDate) {
            config.maxDate = locals.maximumDate;
        }
        DatePickerAndroid.open(config).then(function(date) {
            if (date.action !== DatePickerAndroid.dismissedAction) {
                let newDate = new Date(date.year, date.month, date.day,0,0,0);
                locals.onChange(newDate);
            }
        });
    }
    if (typeof locals.onPress === "function") {
        locals.onPress();
    }
}


function datepicker(locals) {

  if (locals.hidden) {
    return null;
  }

  let stylesheet = locals.stylesheet;
  let isMaybe = locals.isMaybe;
  let formGroupStyle = stylesheet.formGroup.normal;
  let controlLabelStyle = formStyle.label.normal;
  let errorBlockStyle = stylesheet.errorBlock;
  let dateValueStyle = stylesheet.dateValue.normal;

  // Setup the picker mode
  let datePickerMode = locals.mode;
  
  if (
    datePickerMode !== "date" &&
    datePickerMode !== "time" &&
    datePickerMode !== "datetime"
  ) {
    throw new Error(`Unrecognized date picker format ${datePickerMode}`);
  }

  /**
   * Check config locals for Android datepicker.
   * `locals.config.background: `TouchableNativeFeedback` background prop
   * `locals.config.format`: Date format function
   * `locals.config.dialogMode`: 'calendar', 'spinner', 'default'
   * `locals.config.dateFormat`: Date only format
   * `locals.config.timeFormat`: Time only format
   */
  let background = TouchableNativeFeedback.SelectableBackground(); // eslint-disable-line new-cap

  let formattedValue;
  let formattedTimeValue;
  let formattedDateValue;
  if(datePickerMode === "datetime"){
      formattedDateValue = formatDateTime(locals.value,"date");
      formattedTimeValue = formatDateTime(locals.value,"time");
  }else {
      formattedValue = formatDateTime(locals.value,datePickerMode);
  }

    let notNull = isMaybe ? <View style={{width:10}}/>:<View style={{width:10}}><Text style={formStyle.notNull}>*</Text></View>;

    if(locals.value){
        controlLabelStyle = formStyle.label.hasValue;
    }

    let label = locals.label ? (
        <View style={{flexDirection:"row"}}>{notNull}<Text style={[controlLabelStyle]}>{locals.label}</Text></View>
    ) : null;

    let error =
        locals.hasError ? (
            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingBottom:5,paddingLeft:125}}>
                <Svg height="14" width="14" viewBox="0 0 1024 1024">
                    {IconLib.FORM_ERROR}
                </Svg>
                <View style={{flex:1,paddingLeft:5}}>
                    <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
                        {locals.error ? locals.error : (locals.label ? locals.label.replace("*","") + "不能为空" : "不能为空")}
                    </Text>
                </View>
            </View>
        ) : null;

  let value = locals.value ? (
    <Text style={dateValueStyle}>{formattedValue}</Text>
  ) : null;

  let icon;
  if(datePickerMode === "datetime"){
      icon = <Svg height="22" width="22" viewBox="0 0 1024 1024">{IconLib.IC_TIME}</Svg>;
  }else if(datePickerMode === "date"){
      icon = <Svg height="22" width="22" viewBox="0 0 1024 1024">{IconLib.IC_DATE}</Svg>;
  }else if(datePickerMode === "time"){
      icon = <Svg height="22" width="22" viewBox="0 0 1024 1024">{IconLib.IC_TIME}</Svg>;
  }
  return (
    <View style={formGroupStyle}>
      {datePickerMode === "datetime" ? (
        <View style={{flex:1,flexDirection:"column",borderBottomWidth:1,borderColor:themeStyle.form.BORDER_COLOR_GRAY}}>
            <View style={{flex:1,flexDirection:"row"}}>
                <View style={{width:120,height:55,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                    {label}
                </View>
                <TouchableNativeFeedback
                    accessible={true}
                    disabled={locals.disabled}
                    ref="input"
                    background={background}
                    onPress={()=> {
                        dateTimeFontClick(locals,formattedDateValue);
                    }}
                >
                    <View style={{flex:1,background:"yellow",justifyContent:"center"}}>
                        <Text style={dateValueStyle}>{formattedDateValue}</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                    accessible={true}
                    disabled={locals.disabled}
                    ref="input"
                    background={background}
                    onPress={()=> {
                        dateTimeAfterClick(locals,formattedDateValue);
                    }}
                >
                    <View style={{flex:1,justifyContent:"center"}}>
                        <Text style={dateValueStyle}>{formattedTimeValue}</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableOpacity
                    onPress={()=>{
                        locals.isMaybe && locals.value ?
                            locals.onChange(null) : dateTimeFontClick(locals,formattedDateValue);
                    }}
                    style={{width:40,justifyContent:"center",alignItems:"center"}}>
                    <View style={{paddingRight:5}}>
                        {locals.isMaybe && locals.value ?
                            <Svg height="20" width="20" viewBox="0 0 1024 1024">{IconLib.IC_CLEAR}</Svg>
                            :
                            icon
                        }
                    </View>
                </TouchableOpacity>
            </View>
            {error}
        </View>
      ) : (
          <View style={{flex:1,flexDirection:"column",borderBottomWidth:1,borderColor:themeStyle.form.BORDER_COLOR_GRAY}}>
              <View style={{flex:1,flexDirection:"row"}}>
                  <View style={{width:120,height:55,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                      {label}
                  </View>
                  <TouchableNativeFeedback
                      accessible={true}
                      disabled={locals.disabled}
                      ref="input"
                      background={background}
                      onPress={()=> {
                          dateClick(locals);
                      }}>
                      <View style={{flex:1,justifyContent:"center"}}>
                          {value}
                      </View>
                  </TouchableNativeFeedback>
                  <TouchableOpacity
                      onPress={()=>{
                          locals.isMaybe && locals.value ?
                              locals.onChange(null) : dateClick(locals)
                      }}
                      style={{width:40,justifyContent:"center",alignItems:"center"}}>
                      <View style={{paddingRight:5}}>
                          {locals.isMaybe && locals.value ?
                              <Svg height="20" width="20" viewBox="0 0 1024 1024">{IconLib.IC_CLEAR}</Svg>
                              :
                              icon
                          }
                      </View>
                  </TouchableOpacity>
              </View>
              {error}
          </View>
      )}
    </View>
  );
}

function formatDateTime(inputTime,mode) {
    if (!inputTime){
      return null;
    }
    let date = new Date(inputTime);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    if(mode == "date"){
        return y + '-' + m + '-' + d;
    }else if(mode == "time"){
        return h+':'+minute+":00";
    }
};

module.exports = datepicker;
