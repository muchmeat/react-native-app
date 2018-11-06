import Svg from 'react-native-svg'
import IconLib from '../../../../../assets/svg/IconLib'
import formStyle from '../../stylesheets/formStyle'
import themeStyle from "../../../../../src/style/ThemeStyle"
let React = require("react");
let { View, Text, Switch } = require("react-native");

function checkbox(locals) {

    if (locals.hidden) {
        return null;
    }

    let isMaybe = locals.isMaybe;
    let formGroupStyle = formStyle.formGroup.normal;
    let controlLabelStyle = formStyle.label.normal;
    let checkboxStyle = formStyle.checkbox.checkbox;
    let errorBlockStyle = formStyle.errorBlock;

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
                    <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
                        {locals.error ? locals.error : (locals.label ? locals.label.replace("*","") + "不能为空" : "不能为空")}
                    </Text>
                </View>
            </View>
        ) : null;

    return (
        <View style={formGroupStyle}>
            <View style={formStyle.checkbox.view}>
                <View style={formStyle.checkbox.label}>
                    {label}
                </View>
                <View style={formStyle.checkbox.textView}>
                    <Text style={formStyle.checkbox.text}>{locals.value?"是":"否"}</Text>
                </View>
                <Switch
                    accessibilityLabel={locals.label}
                    ref="input"
                    disabled={locals.disabled}
                    onTintColor={themeStyle.color.theme}
                    thumbTintColor={themeStyle.color.theme}
                    style={checkboxStyle}
                    onValueChange={value => locals.onChange(value)}
                    value={locals.value}
                />
            </View>
            {error}
        </View>
    );
}

module.exports = checkbox;
