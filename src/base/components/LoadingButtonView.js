/**
 * 列表页底部上拉加载页
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Text, PixelRatio
} from 'react-native';


export default class LoadingButtonView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {loading, text} = this.props;
        return (
            <View style={[styles.loadingContainer, {display: loading ? "flex" : "none"}]}>
                <View style={styles.loadingView}>
                    <Text style={styles.text}>{text}</Text>
                    <ActivityIndicator animating={loading} color={styles.text.color} size="small"/>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    loadingContainer: {
        borderTopWidth: 1 / PixelRatio.get(),
        borderTopColor: "#dedfe0",
        backgroundColor: "#FFF"
    },
    loadingView: {
        justifyContent: 'center',
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 5
    },
    text: {
        fontSize: 15,
        alignItems: 'center',
        color: "#808080"
    }
})


