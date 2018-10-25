var React = require("react");
var { View, Text, Switch } = require("react-native");

function checkbox(locals) {
  if (locals.hidden) {
    return null;
  }

  var stylesheet = locals.stylesheet;
  var isMaybe = locals.isMaybe;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var checkboxStyle = stylesheet.checkbox.normal;
  var helpBlockStyle = stylesheet.helpBlock.normal;
  var errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
      formGroupStyle = stylesheet.formGroup.normal;
      controlLabelStyle = stylesheet.controlLabel.normal;
    checkboxStyle = stylesheet.checkbox.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

    var notNull = isMaybe ? null: (
        <Text style={{color:"red"}}>*</Text>
    );

  var label = locals.label ? (
    <Text style={[controlLabelStyle,{paddingHorizontal:5}]}>{locals.label}{notNull}</Text>
  ) : null;

  var error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {locals.error}
      </Text>
    ) : null;

  return (
    <View style={formGroupStyle}>
        <View style={{flexDirection:"row"}}>
            <View style={{width:120,height:45,flexDirection:"row",justifyContent:"flex-end",alignItems:"center",borderColor:"#999",backgroundColor:"#fff"}}>
                {label}
            </View>
            <Switch
                accessibilityLabel={locals.label}
                ref="input"
                disabled={locals.disabled}
                onTintColor={locals.onTintColor}
                thumbTintColor={locals.thumbTintColor}
                tintColor={locals.tintColor}
                style={[checkboxStyle,{flex:1,backgroundColor:"#fff"}]}
                onValueChange={value => locals.onChange(value)}
                value={locals.value}
            />
        </View>
        {error}
    </View>
  );
}

module.exports = checkbox;
