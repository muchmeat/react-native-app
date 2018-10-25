import React, { Component } from 'react';
import {
    View
} from "react-native";
import components from "../style/Components";
import {Text} from "react-native-elements";

export default class GroupTitle2 extends Component {
    render() {
        return (
            <View style={components.groupItem2.container}>
                <View style={components.groupItem2.left}>
                    <Text numberOfLines={1} style={components.groupItem2.leftText}>{this.props.text+"："}</Text>
                </View>
                <View style={[components.groupItem2.right,this.props.right ? { paddingRight: 0} : null]}>
                    <Text style={components.groupItem2.rightText} numberOfLines={1}>{this.props.value}</Text>
                </View>
            </View>
        )

    }
}
