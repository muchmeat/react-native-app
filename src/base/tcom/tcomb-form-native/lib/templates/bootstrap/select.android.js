import IconLib from "../../../../../../../assets/svg/IconLib";
import Svg from 'react-native-svg'
import formStyle from '../../stylesheets/formStyle'
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
    {},
    formStyle.picker.normal,
    formStyle.picker.pickerContainer.normal
  );

    let notNull = isMaybe ? null: (
        <Text style={formStyle.notNull}>*  </Text>
    );

    let label = locals.label ? (
        <Text style={controlLabelStyle}>{notNull}{locals.label}</Text>
    ) : null;

    let error =
        locals.hasError ? (
            <View style={formStyle.error}>
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
                    style={[selectStyle]}
                    selectedValue={locals.value}
                    onValueChange={locals.onChange}
                    enabled={locals.enabled}
                    mode={locals.mode}
                    prompt={locals.prompt}
                    itemStyle={[locals.itemStyle]}
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
