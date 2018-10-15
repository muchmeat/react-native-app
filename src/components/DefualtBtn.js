import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight
} from "react-native";
import components from "../style/Components";

export default class DefualtBtn extends Component {
    render() {
        return (
            <View style={components.defaultBtn.view}>
                <TouchableHighlight activeOpacity={0.5} underlayColor='transparent' onPress={this.props.click}>
                    <View style={components.defaultBtn.touch}>
                        <Text style={components.defaultBtn.text}>{this.props.text}</Text>
                    </View>
                </TouchableHighlight>
            </View>
            )

    }
}
