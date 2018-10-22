var React = require("react");
// import { UIManager} from 'NativeModules';
var { View, Text, TextInput,PixelRatio,Dimensions,ScrollView,NativeModules } = require("react-native");
const width  = Dimensions.get("window").width;

function textbox(locals) {

  if (locals.hidden) {
    return null;
  }

  var mode = locals.mode;
  var isMaybe = locals.isMaybe;
  var maxLength = locals.maxLength;
  var stylesheet = locals.stylesheet;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var textboxStyle = stylesheet.textbox.normal;
  var textboxViewStyle = stylesheet.textboxView.normal;
  var helpBlockStyle = stylesheet.helpBlock.normal;
  var errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    textboxStyle = stylesheet.textbox.error;
  }

  if (locals.editable === false) {
    textboxStyle = stylesheet.textbox.notEditable;
    textboxViewStyle = stylesheet.textboxView.notEditable;
  }


  var notNull = isMaybe ? null: (
      <Text style={{color:"red"}}>*</Text>
  );

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

    if(mode == "textarea"){
        return (
            <View style={formGroupStyle}>
                <View style={{height:45,flexDirection:"row",justifyContent:"flex-start",alignItems:"center",backgroundColor:"#fff"}}>
                    {label}
                </View>
                <View style={{height:90,backgroundColor:"#fff",borderColor:"#F8F8F8",borderTopWidth:1,justifyContent:"flex-start"}}>
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
                        multiline={true}
                        onChangeText={value => locals.onChange(value)}
                        onChange={locals.onChangeNative}
                        placeholder={locals.placeholder}
                        numberOfLines={10}
                        style={[textboxStyle,{height:90,width:width,flexDirection:"column",borderColor:"#F8F8F8",alignItems:"flex-start",paddingBottom:20}]}
                        value={locals.value ? locals.value.toString() : ""}
                    />
                    <View style={{position:"absolute",bottom:0,width:width,flexDirection:"row",justifyContent:"flex-end"}}>
                        <Text style={{paddingRight:5}}>{locals.value ? locals.value.length : 0}/{maxLength}</Text>
                    </View>
                </View>
                {error}
            </View>
        )
    }else {
        return(
            <View style={formGroupStyle}>
                <View style={{flexDirection:"row"}}>
                    <View style={{width:120,height:45,flexDirection:"row",justifyContent:"flex-end",alignItems:"center",borderColor:"#999",backgroundColor:"#fff"}}>
                        {label}
                    </View>
                    <View style={[textboxViewStyle,{flex:1,backgroundColor:"#fff"}]}>
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
                            // blurOnSubmit = {true}
                            // onSubmitEditing = {(event)=>{console.warn(JSON.stringify(locals))}}
                        />
                    </View>
                </View>
                {error}
            </View>
         )
    }
}

module.exports = textbox;
