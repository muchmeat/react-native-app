import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight
} from "react-native";
import components from "../../example/style/Components";
import {Button} from 'react-native-elements';

export default class DefualtBtn extends Component {
    render() {
        return (
            <View style={components.defaultBtn.view}>
                {/*<TouchableHighlight activeOpacity={0.5} underlayColor='transparent' onPress={this.props.click}>*/}
                    {/*<View style={components.defaultBtn.touch}>*/}
                        {/*<Text style={components.defaultBtn.text}>{this.props.text}</Text>*/}
                    {/*</View>*/}
                {/*</TouchableHighlight>*/}
                <Button  title={this.props.text}
                         buttonStyle={components.defaultBtn.touch}
                         loading = {this.props.loading}
                         loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
                         onPress={this.props.click}/>
            </View>
            )

    }
}
