import React from "react";
import {
  View,
  Text,
  Image,
  DatePickerAndroid,
  TimePickerAndroid,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";


function dateTimeFontClick(locals) {
    let config = {
        date: locals.value || new Date(),
        mode: "default"
    };
    if (locals.minimumDate) {
        config.minDate = locals.minimumDate;
    }
    if (locals.maximumDate) {
        config.maxDate = locals.maximumDate;
    }
    DatePickerAndroid.open(config).then(function(date) {
        if (date.action !== DatePickerAndroid.dismissedAction) {
            var newDate = new Date(locals.value ? locals.value : new Date());
            newDate.setFullYear(date.year, date.month, date.day);
            TimePickerAndroid.open({
                is24Hour: true,
                hour: newDate.getHours() ? newDate.getHours() : new Date().getHours(),
                minute: newDate.getMinutes() ? newDate.getMinutes() : new Date().getMinutes()
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
            mode: "default"
        };
        if (locals.minimumDate) {
            config.minDate = locals.minimumDate;
        }
        if (locals.maximumDate) {
            config.maxDate = locals.maximumDate;
        }
        DatePickerAndroid.open(config).then(function(date) {
            if (date.action !== DatePickerAndroid.dismissedAction) {
                var newDate = new Date(locals.value ? locals.value : new Date());
                newDate.setFullYear(date.year, date.month, date.day);
                TimePickerAndroid.open({
                    is24Hour: true,
                    hour: newDate.getHours() ? newDate.getHours() : new Date().getHours(),
                    minute: newDate.getMinutes() ? newDate.getMinutes() : new Date().getMinutes()
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
            minute: setTime.minute
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
            minute: isDate ? locals.value.getMinutes() : now.getMinutes()
        };
        TimePickerAndroid.open({
            is24Hour: true,
            hour: setTime.hour,
            minute: setTime.minute
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
            mode: "default"
        };
        if (locals.minimumDate) {
            config.minDate = locals.minimumDate;
        }
        if (locals.maximumDate) {
            config.maxDate = locals.maximumDate;
        }
        DatePickerAndroid.open(config).then(function(date) {
            if (date.action !== DatePickerAndroid.dismissedAction) {
                var newDate = new Date(date.year, date.month, date.day,0,0,0);
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

  var stylesheet = locals.stylesheet;
  var isMaybe = locals.isMaybe;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var errorBlockStyle = stylesheet.errorBlock;
  var dateValueStyle = stylesheet.dateValue.normal;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    dateValueStyle = stylesheet.dateValue.error;
  }

  // Setup the picker mode
  var datePickerMode = locals.mode;
  
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
  // var formattedValue = String(locals.value);
  var background = TouchableNativeFeedback.SelectableBackground(); // eslint-disable-line new-cap
  // var formattedDateValue = locals.value ? locals.value.toDateString() : null;
  // var formattedTimeValue = locals.value ? locals.value.toTimeString() : null;
  // if (locals.config) {
  //   if (locals.config.format) {
  //     formattedValue = locals.config.format(locals.value);
  //   }
  //   if (locals.config.background) {
  //     background = locals.config.background;
  //   }
  //   if (locals.config.dialogMode) {
  //     dialogMode = locals.config.dialogMode;
  //   }
  //   if (locals.config.dateFormat) {
  //     formattedDateValue = locals.config.dateFormat(locals.value);
  //   }
  //   if (locals.config.timeFormat) {
  //     formattedTimeValue = locals.config.timeFormat(locals.value);
  //   }
  // }

  var formattedValue;
  var formattedTimeValue;
  var formattedDateValue;
  if(datePickerMode == "datetime"){
      formattedDateValue = formatDateTime(locals.value,"date");
      formattedTimeValue = formatDateTime(locals.value,"time");
  }else {
      formattedValue = formatDateTime(locals.value,datePickerMode);
  }

  var notNull = !isMaybe ? (
      <Text style={{color:"red"}}>*</Text>
  ):null;
  var label = locals.label ? (
      <Text style={[controlLabelStyle]}>{locals.label}{notNull}</Text>
  ) : null;

  var error =
    locals.hasError ? (
        <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end"}}>
            <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
                {locals.error ? locals.error : (locals.label ? locals.label.replace("*","") + "不能为空" : "不能为空")}
            </Text>
        </View>
    ) : null;

  var value = locals.value ? (
    <Text style={dateValueStyle}>{formattedValue}</Text>
  ) : null;


  return (
    <View style={formGroupStyle}>
      {datePickerMode === "datetime" ? (
        <View style={{flexDirection:"row"}}>
            <View style={{width:120,height:45,flexDirection:"row",justifyContent:"flex-end",alignItems:"center",backgroundColor:"#fff"}}>
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
            <View style={{flex:1,backgroundColor:"#fff",justifyContent:"center"}}>
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
            <View style={{flex:1,backgroundColor:"#fff",justifyContent:"center"}}>
              <Text style={dateValueStyle}>{formattedTimeValue}</Text>
            </View>
          </TouchableNativeFeedback>
            <TouchableOpacity
                onPress={()=>{
                    locals.isMaybe && locals.value ?
                        locals.onChange(null) : dateTimeFontClick(locals,formattedDateValue);
                }}
                style={{backgroundColor:"#fff",width:50,justifyContent:"center",alignItems:"center"}}>
                {locals.isMaybe && locals.value ?
                    <Image style={{height:24,width:24}} source={require("../../icon/delete.png")}/>
                    :
                    <Image style={{height: 24, width: 24}} source={require("../../icon/time.png")}/>
                }
            </TouchableOpacity>
        </View>
      ) : (
          <View style={{flexDirection:"row",justifyContent:"flex-start"}}>
              <TouchableNativeFeedback
                  accessible={true}
                  disabled={locals.disabled}
                  ref="input"
                  background={background}
                  onPress={()=> {
                      dateClick(locals);
                  }}
              >
                  <View style={{flexDirection:"row",flex:1}}>
                      <View style={{width:120,height:45,flexDirection:"row",justifyContent:"flex-end",alignItems:"center",backgroundColor:"#fff"}}>
                          {label}
                      </View>
                      <View style={{flex:1,backgroundColor:"#fff",justifyContent:"center"}}>
                          {value}
                      </View>
                  </View>
              </TouchableNativeFeedback>
              <TouchableOpacity
                  onPress={()=>{
                      locals.isMaybe && locals.value ?
                      locals.onChange(null) : dateClick(locals)
                  }}
                  style={{backgroundColor:"#fff",width:50,justifyContent:"center",alignItems:"center"}}>
                  {locals.isMaybe && locals.value ?
                      <Image style={{height:24,width:24}} source={require("../../icon/delete.png")}/>
                      :
                      <Image style={{height:24,width:24}} source={require("../../icon/date.png")}/>
                  }
              </TouchableOpacity>
          </View>
      )}
      {error}
    </View>
  );
}

function formatDateTime(inputTime,mode) {
    if (!inputTime){
      return null;
    }
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    if(mode == "date"){
        return y + '-' + m + '-' + d;
    }else if(mode == "time"){
        return h+':'+minute+":00";
    }
};

module.exports = datepicker;