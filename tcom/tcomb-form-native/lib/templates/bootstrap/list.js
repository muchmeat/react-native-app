import IconLib from "../../../../../assets/svg/IconLib";
import {formatSize} from "../../../../../utils/common";
import Svg from "react-native-svg";
let React = require("react");
import ImagePicker from "../components/ImagePicker";
import {PixelRatio} from "react-native";
import themeStyle from "../../../../../src/style/ThemeStyle";

let { View,Text, TouchableHighlight,Dimensions,NativeModules} = require("react-native");
let WIDTH = Dimensions.get("window").width;

function renderRow(locals) {
        // if(locals.value && locals.value.length && locals.items){
        //     let rows = [];
        //     for(const item of locals.value){
        //         let type = item.base64 ? "default":"new";
        //         let imageSource = type === "default" ? item.base64 : item;
        //         rows.push(<TouchableHighlight
        //                         activeOpacity={0.5}
        //                         underlayColor='transparent'
        //                         key={ guid()}
        //                         style={{width:(WIDTH-10)/4,paddingTop:10,paddingLeft:10}}
        //                         onPress={()=>{
        //                             locals.navigation.navigate("IV",{
        //                                 imageSource: imageSource,
        //                                 imageSources:locals.items,
        //                                 imageValues:locals.value,
        //                                 setImgs:(index)=>{
        //                                     locals.onChange(locals.value[index],new Date().toDateString(),locals.path,"remove",index);
        //                                 }
        //                             })
        //                         }}>
        //             <Image style={{height:90}} source ={{uri:'data:image/png;base64,'+ imageSource}}/>
        //         </TouchableHighlight>)
        //     }
        //     return (<View style={{height:125,backgroundColor:"#FFF",borderTopWidth:1,borderColor:"#999",flexDirection:"column",justifyContent:"flex-start"}}>
        //                 <View style={{flexDirection:"row"}}>{rows}</View>
        //         <View style={{width:WIDTH,flexDirection:"row",justifyContent:"flex-end",paddingRight:10}}><Text>{locals.items.length}{locals.limit ? "/" + locals.limit : null}</Text></View>
        //     </View>)
        // }else{
        //     return null;
        // }
    if(locals.value && locals.value.length && locals.items){
        // console.warn(locals.value);
        let rows = [];
        for(let i=0;i<locals.value.length;i++){
            let item = locals.value[i];
            rows.push(<View key={guid()} style={{flexDirection:"row",borderBottomWidth:1/PixelRatio.get(),borderColor:"#CCC"}}>
                <View style={{flex:1}}>
                    <TouchableHighlight activeOpacity={0.8} underlayColor='transparent' onPress={()=>{}} >
                        <View style={{flex:1,height:40,width:WIDTH * 0.8,flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}}>
                            <Svg height={28} width={28} viewBox="0 0 1024 1024">{IconLib.IC_IMAGEPICKER}</Svg>
                            <View style={{flex:1,marginLeft:10}}>
                                <Text numberOfLines={1} style={{fontSize:16}}>{item.fileName}</Text>
                                {/*<Text style={{fontSize:14}}>{formatSize(item.fileSize)}</Text>*/}
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight activeOpacity={0.8} underlayColor='transparent' onPress={()=>{
                    locals.onChange(item,new Date().toDateString(),locals.path,"remove",i);
                }}>
                    <View style={{marginRight:10,height:40,justifyContent:"center",alignItems:"center"}}>
                        <Svg height="20" width="20" viewBox="0 0 1024 1024">{IconLib.IC_CLEAR}</Svg>
                    </View>
                </TouchableHighlight>
            </View>)
        }
        return rows;
    }else {
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
  let stylesheet = locals.stylesheet;
  let isMaybe = locals.isMaybe;
  let formGroupStyle = stylesheet.formGroup.normal;
  let controlLabelStyle = stylesheet.controlLabel.normal;
  let errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    controlLabelStyle = stylesheet.controlLabel.normal;
  }

    let notNull = isMaybe ? <Text/>: (
        <Text style={{color:"red"}}>*  </Text>
    );

    let limit;
    if(locals.value && locals.value.length && locals.value.length === locals.limit){
        limit = <Text style={[{color: themeStyle.form.LABEL_COLOR,
            fontSize: 14,
            fontWeight: themeStyle.form.FONT_WEIGHT},{color:"red"}]}>{" ("+locals.value.length +"/"+locals.limit+")"}</Text>;
    }else {
        limit = <Text style={{color: themeStyle.form.LABEL_COLOR,
            fontSize: 14,
            fontWeight: themeStyle.form.FONT_WEIGHT}}>{" ("+locals.value.length +"/"+locals.limit+")"}</Text>;
    }

    let label = locals.label ? (
        <Text style={controlLabelStyle}>{notNull}{locals.label}{limit}</Text>
    ) : null;

    let error =
        locals.hasError ? (
            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingBottom:5,paddingLeft:125}}>
                <Svg height="14" width="14" viewBox="0 0 1024 1024">
                    {IconLib.FORM_ERROR}
                </Svg>
                <View style={{flex:1,paddingLeft:5}}>
                    <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
                        {locals.error ? locals.error : (locals.label ? locals.label.replace("*","") + "不能为空" : "不能为空")}
                    </Text>
                </View>
            </View>
        ) : <View/>;
    let rows = renderRow(locals);
  // let addButton = locals.add ? renderRowButton(locals.add, stylesheet) : null;
    if(locals.mode === "imagePicker"){
        return (<View style={formGroupStyle}>
            <View style={{flexDirection:"column",borderBottomWidth:1,borderColor:"#999"}}>
                <View style={{flexDirection:"row"}}>
                    <View style={{width:120,height:55,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                        {label}
                    </View>
                    <ImagePicker svgWidth={28}
                                 svgHeight={28}
                                 svgBtm={IconLib.IC_IMAGEPICKER}
                                 cameraSize={cameraSize}
                                 style = {{flex:1,flexDirection:"row",justifyContent:"flex-end",alignItems:"center",paddingRight:10}}
                                 beforePick={()=>{
                                     return locals.limit ? locals.items.length >= locals.limit :true;
                                 }}
                                 afterPick={(response)=>{
                                     locals.onChange(response,new Date().toDateString(),locals.path,"add");
                                 }}
                    />
                </View>
                {rows ? rows : null}
                {error}
            </View>
        </View>);
    }else {

        return (<View style={formGroupStyle}>
            <View style={{flexDirection:"column",borderBottomWidth:1,borderColor:"#999"}}>
                <View style={{flexDirection:"row"}}>
                    <View style={{width:120,height:55,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                        {label}
                    </View>
                    <TouchableHighlight  activeOpacity={0.8} underlayColor='transparent' onPress={()=>{
                        NativeModules.DocPickerModule.initiateFilePicker();
                    }}>
                        <View style={{flex:1}}>
                            <Text>11111111111111</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                {rows ? rows : null}
                {error}
            </View>
        </View>);
    }
}

function guid() {
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

module.exports = list;
