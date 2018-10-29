import IconLib from "../../../../../assets/svg/IconLib";
import Svg from 'react-native-svg'
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
    formGroupStyle = stylesheet.formGroup.normal;
    controlLabelStyle = stylesheet.controlLabel.normal;
    selectStyle = stylesheet.select.normal;
  }

    var notNull = isMaybe ? null: (
        <Text style={{color:"red"}}>*  </Text>
    );

    var label = locals.label ? (
        <Text style={[controlLabelStyle]}>{notNull}{locals.label}</Text>
    ) : null;

    var error =
        locals.hasError ? (
            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingBottom:5,paddingLeft:5}}>
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

  var options = locals.options.map(({ value, text }) => (
    <Picker.Item key={value} value={value} label={text} />
  ));

  return (
    <View style={[formGroupStyle]}>
        <View style={{flexDirection:"row",borderBottomWidth:1,borderColor:"#999"}}>
            <View style={{width:120,height:45,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                {label}
            </View>
            <View style={{flex:1,flexDirection:"column"}}>
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
                {error}
            </View>
        </View>
    </View>
  );
}

module.exports = select;
