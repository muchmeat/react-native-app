/**
 * Created by zk on 2018/3/22.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableHighlight,
    Dimensions,
} from 'react-native';
import IconLib from "../../../assets/svg/IconLib";
import ThemeStyle from "../../example/style/ThemeStyle";
import Svg from "react-native-svg";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class FileDetailItem extends Component {

    render(){
        const {name,type} = this.props;

        return (
            <View style={{height:40,backgroundColor:"#FFF",paddingLeft:15,flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}}>
                {/*<Svg height={28} width={28} viewBox="0 0 1024 1024">{type}</Svg>*/}
                <FontAwesome name={type} size={22} color={ThemeStyle.color.theme}/>
                <Text style={{fontSize:16,paddingLeft:10}}>{name}</Text>
            </View>
            );
    }
}