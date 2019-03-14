/**
 * 当列表数据为空时显示页
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class EmptyView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {text} = this.props;
        return (
            <View style={styles.view}><Text style={styles.text}>{text}</Text></View>
        )
    }
}
const styles = StyleSheet.create({
    text: {
        color: '#444444',
        fontSize: 20,
        alignItems: 'center'
    },
    view: {height: height - 80, alignItems: 'center', justifyContent: 'center'}
});


