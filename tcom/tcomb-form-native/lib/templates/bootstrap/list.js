var React = require("react");
import ImagePicker from "../components/ImagePicker";

var { View,Image, Text, TouchableHighlight,Dimensions,NativeModules } = require("react-native");
var WIDTH = Dimensions.get("window").width;

function renderRow(locals) {
        if(locals.value && locals.value.length && locals.items){
            let rows = [];
            for(const item of locals.value){
                let type = item.base64 ? "default":"new";
                let imageSource = type === "default" ? item.base64 : item;
                rows.push(<TouchableHighlight
                                activeOpacity={0.5}
                                underlayColor='transparent'
                                key={ guid()}
                                style={{width:(WIDTH-10)/4,paddingTop:10,paddingLeft:10}}
                                onPress={()=>{
                                    locals.navigation.navigate("IV",{
                                        imageSource: imageSource,
                                        imageSources:locals.items,
                                        imageValues:locals.value,
                                        setImgs:(index)=>{
                                            locals.onChange(locals.value[index],new Date().toDateString(),locals.path,"remove",index);
                                        }
                                    })
                                }}>
                    <Image style={{height:90}} source ={{uri:'data:image/png;base64,'+ imageSource}}/>
                </TouchableHighlight>)
            }
            return (<View style={{height:125,backgroundColor:"#FFF",borderTopWidth:1,borderColor:"#F8F8F8",flexDirection:"column",justifyContent:"flex-start"}}>
                        <View style={{flexDirection:"row"}}>{rows}</View>
                <View style={{width:WIDTH,flexDirection:"row",justifyContent:"flex-end",paddingRight:10}}><Text>{locals.items.length}{locals.limit ? "/" + locals.limit : null}</Text></View>
            </View>)
        }else{
            return null;
        }
}


function list(locals) {

  let cameraSize = {
      srcWidth: 100,
      srcHeight: 100,
      width: 200,
      height: 200
  };
  if (locals.hidden) {
    return null;
  }
  var stylesheet = locals.stylesheet;
  var isMaybe = locals.isMaybe;
  var fieldsetStyle = stylesheet.fieldset;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    controlLabelStyle = stylesheet.controlLabel.normal;
  }

  var notNull = !isMaybe ? (
      <Text style={{color:"red"}}>*</Text>
  ):null;

  var label = locals.label ? (
      <Text style={[controlLabelStyle,{paddingLeft:10,width:100}]}>{locals.label}{notNull}</Text>
  ) : null;

  var error =
      locals.hasError ? (
          <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end"}}>
              <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
                  {locals.error ? locals.error : (locals.label ? locals.label.replace("*","") + "不能为空" : "不能为空")}
              </Text>
          </View>
      ) : null;

  var rows = renderRow(locals);
  // var addButton = locals.add ? renderRowButton(locals.add, stylesheet) : null;
  return (
    <View style={[fieldsetStyle,{backgroundColor:"#F8F8F8",paddingBottom: 2}]}>
        <View style={{height:45,flexDirection:"row",justifyContent:"space-around",alignItems:"center",backgroundColor:"#fff"}}>
            {label}
            <ImagePicker type={["normal"]}
                         source={require('../../icon/imgUp.png')}
                         cameraSize={cameraSize}
                         style = {{flex:1,flexDirection:"row",justifyContent:"flex-end",marginRight:10,alignItems:"center"}}
                         beforePick={()=>{
                             return locals.limit ? locals.items.length >= locals.limit :true;
                         }}
                         afterPick={(source)=>{
                             locals.onChange(source,new Date().toDateString(),locals.path,"add");
                         }}
            />
        </View>
        {rows ? rows : null}
        {error}
    </View>
  );
}

function guid() {
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

module.exports = list;
