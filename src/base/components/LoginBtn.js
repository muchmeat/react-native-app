import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight
} from "react-native";
import components from "../../example/style/Components";
import themeStyle from "../../example/style/ThemeStyle";

export default class LoginBtn extends Component {

    constructor(props){
        super(props);
        this.state={
            click:false
        }
    }

    _enClick(bool){
        this.setState({
            click:bool
        })
    }

    _click(){
        if(this.state.click)
            this.props.click();
    }

    render() {
        return (
            <TouchableHighlight activeOpacity={1} underlayColor='transparent' onPress={()=>this._click()}>
                <View style={[components.defaultBtn.touch,{backgroundColor:this.state.click ? themeStyle.color.theme : themeStyle.color.theme_a}]}>
                    <Text style={components.defaultBtn.text}>{this.props.text}</Text>
                </View>
            </TouchableHighlight>
        )

    }
}
