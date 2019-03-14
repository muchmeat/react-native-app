/**
 * edited by czq on 2018/12/20.
 */
import React, {Component} from 'react';
import {
    View
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesomeEnums from "../../../utils/enums/FontAwesomeEnums";
import Global from "../../../utils/Global";
import {NavigationActions} from "react-navigation";


export default class FileDetailItem extends Component {

    /**
     * 打开附件
     * @param type
     * @param id 附件id
     * @param 路由
     */
    openAttachment(type, id, navigation) {
        type = FontAwesomeEnums.getName(type);
        if ("AVI,WMV,MPEG,MP4,MKV,FLV,RMVB".indexOf(type.toUpperCase()) !== -1) {
            navigation.dispatch(
                NavigationActions.navigate({
                    routeName: "VideoPlay",
                    params: {uri: Global.FILE_BYTE_URL + id}
                })
            )
        }
    }

    render() {
        const {name, type, id, navigation} = this.props;

        return (
            <View style={{
                height: 40,
                backgroundColor: "#FFF",
                paddingLeft: 15,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center"
            }}>
                {/*<Svg height={28} width={28} viewBox="0 0 1024 1024">{type}</Svg>*/}
                {/*<FontAwesome name={type} size={22} color={ThemeStyle.color.theme} onPress={()=>{console.warn("onPress")}}/>*/}
                {/*<Text style={{fontSize:16,paddingLeft:10}}>{name}</Text>*/}
                <FontAwesome.Button name={type} backgroundColor={"#FFF"} color={"#3E3A39"} onPress={() => {
                    this.openAttachment(type, id, navigation)
                }}>
                    {name}
                </FontAwesome.Button>
            </View>
        );
    }

}