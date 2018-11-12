import React, { Component } from 'react';
import {
    View
} from "react-native";
import components from "../../example/style/Components";
import {Text} from "react-native-elements";

export default class GroupTitle extends Component {
    render() {
        return (
            <View style={components.groupTitle.view}>
                <Text>{this.props.title}</Text>
            </View>
        )

    }
}
