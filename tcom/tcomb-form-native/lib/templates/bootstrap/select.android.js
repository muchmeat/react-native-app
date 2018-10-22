var React = require("react");
var { View, Text, Picker,PixelRatio } = require("react-native");

function select(locals) {
  if (locals.hidden) {
    return null;
  }

  var stylesheet = locals.stylesheet;
  var isMaybe = locals.isMaybe;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var selectStyle = Object.assign(
    {},
    stylesheet.select.normal,
    stylesheet.pickerContainer.normal
  );
  var helpBlockStyle = stylesheet.helpBlock.normal;
  var errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    selectStyle = stylesheet.select.error;
  }

  var notNull = !locals.isMaybe ? (
      <Text style={{color:"red"}}>*</Text>
  ):null;
  var label = locals.label ? (
      <Text style={[controlLabelStyle]}>{locals.label}{notNull}</Text>
  ) : null;

  // var help = locals.help ? (
  //   <Text style={helpBlockStyle}>{locals.help}</Text>
  // ) : null;

  var error =
    locals.hasError ? (
        <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end"}}>
            <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
                {locals.error ? locals.error : (locals.label ? locals.label.replace("*","") + "不能为空" : "不能为空")}
            </Text>
        </View>
    ) : null;

  var options = locals.options.map(({ value, text }) => (
    <Picker.Item key={value} value={value} label={text} />
  ));

  return (
    <View style={[formGroupStyle]}>
        <View style={{flexDirection:"row"}}>
            <View style={{width:120,height:45,flexDirection:"row",justifyContent:"flex-end",alignItems:"center",backgroundColor:"#fff"}}>
                {label}
            </View>
            <View style={{flex:1,backgroundColor:"#fff"}}>
                <Picker
                    accessibilityLabel={locals.label}
                    ref="input"
                    style={[selectStyle]}
                    selectedValue={locals.value}
                    onValueChange={locals.onChange}
                    help={locals.help}
                    enabled={locals.enabled}
                    mode={locals.mode}
                    prompt={locals.prompt}
                    itemStyle={locals.itemStyle}
                >
                    {options}
                </Picker>
            </View>
        </View>
      {error}
    </View>
  );
}

module.exports = select;
