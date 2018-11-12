import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableNativeFeedback,
    DatePickerAndroid,
    Image,
    TouchableHighlight
} from "react-native";
import * as common from "../../../utils/common";



export default class DatePicker extends Component {
    constructor(props) {
        super(props);
        let _this =this;
        let {minimumDate,maximumDate} = _this.props;
        this.state = {
            value:null,
            minimumDate:minimumDate,
            maximumDate:maximumDate,
        }
    }

    _getValue() {
        return this.state.value;
    }

    _setValue(v) {
        this.setState({
            value:v
        });
    }

    _setOptions(o){
        this.setState({
            minimumDate:o.minimumDate,
            maximumDate:o.maximumDate,
        })
    }

    _datePicker(value,minimumDate,maximumDate,changeAfter){
        let _this = this;
        let config = {
            mode: "default",
            date: value || new Date(),
        };
        if (minimumDate) {
            config.minDate = minimumDate;
        }
        if (maximumDate) {
            config.maxDate = maximumDate;
        }
        DatePickerAndroid.open(config).then(function(date) {
            if (date.action !== DatePickerAndroid.dismissedAction) {
                _this.setState({
                    value : new Date(date.year, date.month, date.day,0,0,0)
                },()=>changeAfter())
            }
        });
    }

    _clear(){
        let _this = this;
        _this.props._clear();
    }

    render(){
        let _this = this;
        let {value,minimumDate,maximumDate} = _this.state;
        let {text,changeAfter} = _this.props;
       return <View style={{flexDirection:"row",justifyContent:"flex-start",marginBottom:2}}>
            <TouchableNativeFeedback
                accessible={true}
                ref="picker"
                background={TouchableNativeFeedback.SelectableBackground()}
                onPress={()=> {
                    _this._datePicker(value,minimumDate,maximumDate,changeAfter);
                }}
            >
                <View style={{flexDirection:"row",flex:1}}>
                    <View style={{width:120,height:45,flexDirection:"row",justifyContent:"flex-end",alignItems:"center",backgroundColor:"#fff"}}>
                        <Text style={{
                            flex:1,
                            color: "#3E3A39",
                            paddingLeft:10,
                            fontSize: 16,
                            fontWeight: "400"
                        }}>{text}</Text>
                    </View>
                    <View style={{flex:1,backgroundColor:"#fff",justifyContent:"center"}}>
                        <Text style={{
                            color: "#3E3A39",
                            fontSize: 16,
                            paddingLeft: 7,}}>{common.formatDateTime(value,"date")}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
            <View style={{backgroundColor:"#fff",width:50,justifyContent:"center",alignItems:"center"}}>
                { !value ?
                    <TouchableHighlight underlayColor="transparent" activeOpacity={0.5} onPress={()=>_this._datePicker(value,minimumDate,maximumDate,changeAfter)}>
                        <Image style={{height:24,width:24}} source={require("../../resources/img/date.png")}/>
                    </TouchableHighlight>
                    :
                    <TouchableHighlight underlayColor="transparent" activeOpacity={0.5} onPress={()=>_this._clear()}>
                        <Image style={{height:24,width:24}} source={require("../../resources/img/delete.png")}/>
                    </TouchableHighlight>
                }
            </View>
        </View>;
    }
}