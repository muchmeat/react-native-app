import IconLib from "../../../../../../../assets/svg/IconLib";
import Svg from 'react-native-svg'
import formStyle from '../../stylesheets/formStyle'
import themeStyle from "../../../../../../example/style/ThemeStyle";
let React = require("react");
let { View, Text, Picker } = require("react-native");

function select(locals) {
  if (locals.hidden) {
    return null;
  }

  let isMaybe = locals.isMaybe;
  let formGroupStyle = formStyle.formGroup.normal;
  let controlLabelStyle = formStyle.label.normal;
  let selectStyle = Object.assign(
    {color: themeStyle.form.LABEL_COLOR},
    formStyle.picker.normal,
    formStyle.picker.pickerContainer.normal
  );

    let notNull = isMaybe ? <View style={{width:10}}/>:<View style={{width:10}}><Text style={formStyle.notNull}>*</Text></View>;

    if(locals.value){
        controlLabelStyle = formStyle.label.hasValue;
    }

    let label = locals.label ? (
        <View style={{flexDirection:"row"}}>{notNull}<Text style={[controlLabelStyle]}>{locals.label}</Text></View>
    ) : null;

    let error =
        locals.hasError ? (
            <View style={[formStyle.error,{paddingLeft:0}]}>
                <Svg height="14" width="14" viewBox="0 0 1024 1024">
                    {IconLib.FORM_ERROR}
                </Svg>
                <View style={formStyle.errorView}>
                    <Text accessibilityLiveRegion="polite" style={formStyle.errorText}>
                        {locals.error ? locals.error : (locals.label ? locals.label.replace("*","") + "不能为空" : "不能为空")}
                    </Text>
                </View>
            </View>
        ) : null;

  let options = locals.options.map(({ value, text }) => (
    <Picker.Item key={value} value={value} label={text} />
  ));

  return (
    <View style={formGroupStyle}>
        <View style={formStyle.picker.view}>
            <View style={formStyle.picker.label}>
                {label}
            </View>
            <View style={formStyle.picker.pickerView}>
                <Picker
                    accessibilityLabel={locals.label}
                    ref="input"
                    style={{color: themeStyle.form.INPUT_COLOR}}
                    selectedValue={locals.value}
                    onValueChange={locals.onChange}
                    enabled={locals.enabled}
                    mode={locals.mode}
                    prompt={locals.prompt}
                    itemStyle={{paddingLeft:10}}
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
