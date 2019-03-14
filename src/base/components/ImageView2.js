/**
 * 当列表数据为空时显示页
 */
import React, {Component} from 'react';
import {
    Image,
    Dimensions,
    View,
    StatusBar,
    StyleSheet
} from 'react-native';
import Global from "../../../utils/Global";

const {width, height} = Dimensions.get('window');

export default class ImageView2 extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        header: null
    };

    componentWillMount() {
        this.params = this.props.navigation.state.params;
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}
                />
                <Image resizeMode='contain' style={styles.fullScreen} source={{uri: this.params.uri}}
                       defaultSource={require("../../../assets/images/list.png")}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    fullScreen: {
        top: 0,
        bottom: 0,
        height: height,
        width: width
    },
})

