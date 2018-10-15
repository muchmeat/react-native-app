import React, { Component } from 'react';
import {
    View,
    Text
} from "react-native";
import components from "../style/Components";

export default class GroupTitle extends Component {
    render() {
        return (
            <View style={components.groupTitle.view}>
                <Text>{this.props.title}</Text>
            </View>
        )

    }
}
