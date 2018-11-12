/**
 * Created by Administrator on 2018/10/25.
 */
import React, {Component} from 'react';
import {
    AsyncStorage,
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    Dimensions,
    PixelRatio
} from 'react-native';

export default
class Wait extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        header:null
    };

    render() {
        return (<View style={{flex: 1}}>
            <View style={{height:Dimensions.get('window').height,width:Dimensions.get('window').width}}>
                <Text style={{fontSize: 16}}>
                    该模块还在奋力开发中
                </Text>
            </View>
        </View>)
    }
}