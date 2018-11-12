let React = require("react");
let { View, Text, TextInput,TouchableHighlight } = require("react-native");
import Svg from 'react-native-svg'
import IconLib from '../../../../../../../assets/svg/IconLib'
import formStyle from '../../stylesheets/formStyle'

function textbox(locals) {

  if (locals.hidden) {
    return null;
  }

  let mode = locals.mode;
  let isMaybe = locals.isMaybe;
  let maxLength = locals.maxLength;
  let formGroupStyle = formStyle.formGroup.normal;
  let controlLabelStyle = formStyle.label.normal;
  let textboxStyle = formStyle.textBox.textFont;
  let errorBlockStyle = formStyle.errorBlock;

  if (locals.editable === false) {
    textboxStyle = formStyle.notEditable;
  }

  let notNull = isMaybe ? <Text/>: (
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
    ) : <View/>;

    if(mode === "textarea"){
        return (
            <View style={formGroupStyle}>
                <View style={formStyle.textBox.labelView}>
                    {label}
                </View>
                <View style={formStyle.textBox.inputView}>
                    <TextInput
                        accessibilityLabel={locals.label}
                        ref="input"
                        autoCapitalize={locals.autoCapitalize}
                        autoCorrect={locals.autoCorrect}
                        autoFocus={locals.autoFocus}
                        blurOnSubmit={locals.blurOnSubmit}
                        editable={locals.editable}
                        keyboardType={locals.keyboardType}
                        maxLength={locals.maxLength}
                        multiline={true}
                        onBlur={locals.onBlur}
                        onEndEditing={locals.onEndEditing}
                        onFocus={locals.onFocus}
                        onLayout={locals.onLayout}
                        onSelectionChange={locals.onSelectionChange}
                        onSubmitEditing={locals.onSubmitEditing}
                        onContentSizeChange={locals.onContentSizeChange}
                        placeholderTextColor={locals.placeholderTextColor}
                        secureTextEntry={locals.secureTextEntry}
                        selectTextOnFocus={locals.selectTextOnFocus}
                        selectionColor={locals.selectionColor}
                        numberOfLines={locals.numberOfLines}
                        underlineColorAndroid={locals.underlineColorAndroid}
                        clearButtonMode={locals.clearButtonMode}
                        clearTextOnFocus={locals.clearTextOnFocus}
                        enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
                        keyboardAppearance={locals.keyboardAppearance}
                        onKeyPress={locals.onKeyPress}
                        returnKeyType={locals.returnKeyType}
                        selectionState={locals.selectionState}
                        onChangeText={value => locals.onChange(value)}
                        onChange={locals.onChangeNative}
                        placeholder={locals.placeholder}
                        style={[textboxStyle,formStyle.textBox.textAreaFont]}
                        value={locals.value ? locals.value.toString() : ""}
                    />
                    <View style={formStyle.textBox.textAreaError}>
                        {error}
                        <Text style={formStyle.textBox.textAreaErrorFont}>{locals.value ? locals.value.length : 0}/{maxLength}</Text>
                    </View>
                </View>
            </View>
        )
    }else {
        return(
            <View style={formGroupStyle}>
                <View style={formStyle.textBox.textInput}>
                    <View style={formStyle.textBox.textInputLabel}>
                        {label}
                    </View>
                    <View style={formStyle.textBox.textInputRight}>
                        <View style={formStyle.textBox.textInputView}>
                            <TextInput
                                accessibilityLabel={locals.label}
                                ref="input"
                                autoCapitalize={locals.autoCapitalize}
                                autoCorrect={locals.autoCorrect}
                                autoFocus={locals.autoFocus}
                                blurOnSubmit={locals.blurOnSubmit}
                                editable={locals.editable}
                                keyboardType={locals.keyboardType}
                                maxLength={locals.maxLength}
                                multiline={locals.multiline}
                                onBlur={locals.onBlur}
                                onEndEditing={locals.onEndEditing}
                                onFocus={locals.onFocus}
                                // onBlur = {
                                //     // const handle = findNodeHandler(this.refs.input);
                                //     NativeModules.UIManager.measure(this.refs.input, (x, y, width, height, pageX, pageY) => {
                                //         console.warn("y:"+y);
                                //     });
                                // }
                                onLayout={locals.onLayout}
                                onSelectionChange={locals.onSelectionChange}
                                onSubmitEditing={locals.onSubmitEditing}
                                onContentSizeChange={locals.onContentSizeChange}
                                placeholderTextColor={locals.placeholderTextColor}
                                secureTextEntry={locals.secureTextEntry}
                                selectTextOnFocus={locals.selectTextOnFocus}
                                selectionColor={locals.selectionColor}
                                numberOfLines={locals.numberOfLines}
                                underlineColorAndroid={locals.underlineColorAndroid}
                                clearButtonMode={locals.clearButtonMode}
                                clearTextOnFocus={locals.clearTextOnFocus}
                                enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
                                keyboardAppearance={locals.keyboardAppearance}
                                onKeyPress={locals.onKeyPress}
                                returnKeyType={locals.returnKeyType}
                                selectionState={locals.selectionState}
                                onChangeText={value => locals.onChange(value)}
                                onChange={locals.onChangeNative}
                                placeholder={locals.placeholder}
                                style={textboxStyle}
                                value={locals.value ? locals.value.toString() : ""}
                            />
                            {locals.value ?
                            <TouchableHighlight activeOpacity={0.8} underlayColor='transparent' onPress={()=>{
                                locals.onChange("");
                            }}>
                                <View style={formStyle.textBox.clear}>
                                    <Svg height="20" width="20" viewBox="0 0 1024 1024">{IconLib.IC_CLEAR}</Svg>
                                </View>
                            </TouchableHighlight>
                                :null}
                        </View>
                        {error}
                    </View>
                </View>
            </View>
         )
    }
}

module.exports = textbox;
