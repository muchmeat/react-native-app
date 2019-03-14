/**
 * 页面加载页，不占满屏幕，可以导航回退操作
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    Text
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class LoadingPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {text} = this.props;
        return (
            <View style={styles.loadingView}>
                <ActivityIndicator animating={true} color={styles.text.color} size="large"/>
                <Text style={styles.text}>{text}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    loadingView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: height -40
    },
    loadingImage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#ee9a5d',
        fontSize: 15,
        alignItems: 'center'
    }
})


