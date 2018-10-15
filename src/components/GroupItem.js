import React, { Component } from 'react';
import {
    View,
    Text
} from "react-native";
import components from "../style/Components";

export default class GroupTitle extends Component {
    render() {
        return (
            <View style={components.groupItem.container}>
                <View style={components.groupItem.left}>
                    <Text numberOfLines={1} style={components.groupItem.leftText}>{this.props.text}</Text>
                </View>
                <View style={[components.groupItem.right,this.props.right ? { paddingRight: 0} : null]}>
                    <Text style={components.groupItem.rightText} numberOfLines={1}>{this.props.value}</Text>
                </View>
            </View>
        )

    }
}
