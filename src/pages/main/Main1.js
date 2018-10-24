import React, {Component} from 'react';
import {StyleSheet, View, ImageBackground, Dimensions, Image, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Input, Button, SearchBar, Card, ListItem, Icon} from 'react-native-elements'
import Svg from 'react-native-svg';
import IconLib from '../../../assets/svg/IconLib';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const users = [
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    }, {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    }
]

export default class LoginScreen1 extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    _onMomentumScrollBegin = ()=> {
        this.refs.search.setNativeProps({
            style: {opacity: 0}
        })
    };
    onScrollBeginDrag = ()=> {
        this.refs.search.setNativeProps({
            style: {opacity: 0}
        })
    };

    _onMomentumScrollEnd = ()=> {
        this.refs.search.setNativeProps({
            style: {opacity: 1}
        })
    };
    onScrollEndDrag = ()=> {
        this.refs.search.setNativeProps({
            style: {opacity: 1}
        })
    };


    render() {
        return (
            <View style={styles.container}>

                    <ImageBackground style={{
                        width: SCREEN_WIDTH,
                        height: SCREEN_HEIGHT / 3,
                    }}
                                     source={require('../../../assets/images/bg_screen4.jpg')}>
                        <View style={{height: 50, flexDirection: "row"}} ref="search">
                            <View style={{
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#FFF",
                                height: 49
                            }}>
                                <Text>123</Text>
                            </View>
                            <SearchBar
                                lightTheme
                                containerStyle={{
                                    flex: 1,
                                    height: 50,
                                    backgroundColor: "#FFF"
                                }}
                                inputContainerStyle={{backgroundColor: "#ccc"}}
                                inputStyle={{backgroundColor: "#ccc"}}
                                onChangeText={()=> {
                                }}
                                onClearText={()=> {
                                }}
                                icon={{type: 'font-awesome', name: 'search'}}
                                placeholder=''/>
                        </View>
                    </ImageBackground>
                    <View style={{
                        height: 80, width: SCREEN_WIDTH - 40, backgroundColor: "#4BA7ED",
                        position: "relative", top: -50, left: 20, borderRadius: 8, justifyContent: 'center',
                        alignItems: 'center', flexDirection: "row"
                    }}>

                        <TouchableOpacity activeOpacity={0.8}
                                          onPress={() => {

                                          }}>
                            <View style={{
                                width: (SCREEN_WIDTH - 60) / 2,
                                height: 80,
                                alignItems: "center",
                                justifyContent: 'center'
                            }}>
                                <Svg height="48" width="40" viewBox="0 0 113 95">
                                    {IconLib.IC_MAIN_SFZSM}
                                </Svg>
                                <Text style={{color: '#fff'}}>身份证识别</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} underlayColor='transparent'
                                          onPress={() => {

                                          }}>
                            <View style={{
                                width: (SCREEN_WIDTH - 60) / 2,
                                height: 80,
                                alignItems: "center",
                                justifyContent: 'center'
                            }}>
                                <View style={{marginTop: 12}}>
                                    <Svg height={34} width={32} viewBox="0 0 91 90">
                                        {IconLib.IC_MAIN_SCAN}
                                    </Svg>
                                </View>
                                <View style={{height: 30, justifyContent: "center", alignItems: "center"}}>
                                    <Text style={{color: '#fff'}}>二维码扫描</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flex:1,alignItems: "center",
                        justifyContent: 'space-between', position: "relative", top: -25
                    }}>
                        <TouchableOpacity activeOpacity={0.8}
                                          onPress={() => {

                                          }}>
                            <View style={{width:SCREEN_WIDTH - 40,
                                height: 57,
                                alignItems: "center",
                                justifyContent: 'flex-start',
                                flexDirection: "row",
                                backgroundColor: "#FFF",
                                borderRadius: 8}}>
                                <View style={{height: 60, width: 85, justifyContent: "center", alignItems: "center"}}>
                                    <Svg height="34" width="34" viewBox="0 0 1081 1024">
                                        {IconLib.IC_RHZF}
                                    </Svg>
                                </View>
                                <View style={{justifyContent: "center", alignItems: "flex-start"}}>
                                    <Text style={{color: '#333', fontSize: 16, lineHeight: 30}}>入户走访</Text>
                                    <Text style={{color: '#999', fontSize: 12}}>采集房内三实基础信息</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}
                                          onPress={() => {

                                          }}>

                            <View style={{width: SCREEN_WIDTH - 40,
                                height: 57,
                                alignItems: "center",
                                justifyContent: 'flex-start',
                                flexDirection: "row",
                                backgroundColor: "#FFF",
                                borderRadius: 8}}>
                                <View style={{height: 60, width: 85, justifyContent: "center", alignItems: "center"}}>
                                    <Svg height="34" width="34" viewBox="0 0 1081 1024">
                                        {IconLib.IC_RKDJ}
                                    </Svg>
                                </View>
                                <View style={{justifyContent: "center", alignItems: "flex-start"}}>
                                    <Text style={{color: '#333', fontSize: 16, lineHeight: 30}}>人口登记</Text>
                                    <Text style={{color: '#999', fontSize: 12}}>快速采集辖区实有人口</Text>
                                </View>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}
                                          onPress={() => {

                                          }}>
                            <View style={{width:SCREEN_WIDTH - 40,
                                height: 57,
                                alignItems: "center",
                                justifyContent: 'flex-start',
                                flexDirection: "row",
                                backgroundColor: "#FFF",
                                borderRadius: 8}}>
                                <View style={{height: 60, width: 85, justifyContent: "center", alignItems: "center"}}>
                                    <Svg height="34" width="34" viewBox="0 0 1081 1024">
                                        {IconLib.IC_DWDJ}
                                    </Svg>
                                </View>
                                <View style={{justifyContent: "center", alignItems: "flex-start"}}>
                                    <Text style={{color: '#333', fontSize: 16, lineHeight: 30}}>单位采集</Text>
                                    <Text style={{color: '#999', fontSize: 12}}>采集单位信息和从业人员</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}
                                          onPress={() => {

                                          }}>
                            <View style={{width: SCREEN_WIDTH - 40,
                                height: 57,
                                alignItems: "center",
                                justifyContent: 'flex-start',
                                flexDirection: "row",
                                backgroundColor: "#FFF",
                                borderRadius: 8}}>
                                <View style={{height: 60, width: 85, justifyContent: "center", alignItems: "center"}}>
                                    <Svg height="32" width="32" viewBox="0 0 1024 1024">
                                        {IconLib.IC_MAIN_QBXS}
                                    </Svg>
                                </View>
                                <View style={{justifyContent: "center", alignItems: "flex-start"}}>
                                    <Text style={{color: '#333', fontSize: 16, lineHeight: 30}}>情报线索</Text>
                                    <Text style={{color: '#999', fontSize: 12}}>收集上报辖区情报线索</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }

});
