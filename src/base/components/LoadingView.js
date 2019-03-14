/**
 * 页面遮罩层，全屏，不可回退操作，用于数据保存等
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Modal,
    ActivityIndicator,
    Text
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class LoadingView extends Component {
    constructor(props) {
        super(props);
    }

    _close() {
        console.log("onRequestClose ---- Nothing to do on it ")
    }

    render() {
        const {showLoading,text, opacity, backgroundColor} = this.props;
        return (
            <Modal onRequestClose={() => this._close()} visible={showLoading} transparent>
                <View style={[styles.loadingView, {
                    opacity: opacity || 0.3,
                    backgroundColor: backgroundColor || 'gray'
                }]}></View>
                <View style={styles.loadingImageView}>
                    <View style={styles.loadingImage}>
                        <ActivityIndicator
                            animating={true}
                            color={styles.text.color}
                            size="large"/>
                    </View>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        width:width,
        height:height -80,
    },
    loadingImage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingImageView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 60,
        position: "absolute",
        left: width / 2 - 20,
        top: height / 2 - 20
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#899bff',
        fontWeight: "bold",
        fontSize: 15,
        fontFamily: 'Avenir',
        marginBottom: 5,
    }
})


