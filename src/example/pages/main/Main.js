import React, {Component} from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    PixelRatio
} from 'react-native';
import {connect} from 'react-redux'; // 引入connect函数

import styles from '../../style/ThemeStyle';
import IconLib from '../../../../assets/svg/IconLib';
import Svg from 'react-native-svg';
import {NavigationActions} from 'react-navigation';

const {width} = Dimensions.get('window');

class Main extends Component {

    // static navigationOptions = ({ navigation, navigationOptions }) => {
    //     navigationOptions.header = null;
    //     return {
    //         ...navigationOptions
    //     };
    // }

    // static navigationOptions = {
    //     header: null
    // };

    static navigationOptions = ({navigation}) => ({
        header: () => {
            return (
                <View style={{height:60,backgroundColor:"#FFF",alignItems:"center",justifyContent:"center"}}>
                    <TouchableHighlight style={{position: "absolute", left: 0, top: 0}} activeOpacity={1}
                                      underlayColor='transparent' onPress={() => {
                        navigation.navigate("Wait");
                    }}>
                        <View style={{height: 60, width: 60, justifyContent: "center", alignItems: "center"}}>
                            <Svg width={20} height={20} viewBox="0 0 1024 1024">{IconLib.IC_CARD}</Svg>
                        </View>
                    </TouchableHighlight>
                    <Text style={{fontSize: 20}}>安顺</Text>
                </View>)
        }
    });

    render() {
        // let list = [
        //     {name: "指令下发", page: "Wait"}, {name: "线索上报", page: "Wait"}, {name: "联勤联动", page: "Wait"},
        //     {name: "社区防范", page: "Wait"}, {name: "资源标注", page: "ResourceTagging"}, {name: "防控反馈", page: "Wait"}];
        let list = [
            {name: "指令下发", page: "screen1"}, {name: "线索上报", page: "screen2"}, {name: "联勤联动", page: "screen3"},
            {name: "社区防范", page: "PersonMessage"}, {name: "资源标注", page: "ResourceTagging"}, {
                name: "防控反馈",
                page: "Wait"
            }];
        let grid = [];
        for (let item of list) {
            grid.push(
                <View style={{
                    borderWidth: 1 / PixelRatio.get(),
                    borderColor: "#e0e0d1",
                    marginHorizontal: 5,
                    marginVertical: 15,
                    width: width / 3 - 20
                }}>
                    <TouchableOpacity style={{
                        padding: 5,
                        justifyContent: 'center',
                        flexDirection: "column",
                        alignItems: 'center'
                    }} onPress={() => {
                        this.props.navigation.dispatch(NavigationActions.navigate({routeName: item.page}))
                    }}>
                        <Image style={{width: 40, height: 40}}
                               source={require("../../../../assets/images/list.png")}/>
                        <Text style={{fontSize: 15}}>{item.name}</Text>
                    </TouchableOpacity>
                </View>)
        }
        return (
            <View style={styles.container}>
                <ImageBackground style={{width: styles.screen.width, height: styles.screen.height / 3 - 40}}
                                 source={require('../../../../assets/images/main_img1.jpg')}>
                </ImageBackground>
                <View style={{
                    paddingVertical: 10,
                    justifyContent: 'flex-start',
                    flexDirection: "row",
                    borderWidth: 1 / PixelRatio.get(),
                    borderColor: "#e0e0d1",
                    backgroundColor: "#FFF",
                    paddingLeft: 15
                }}>
                    <Text style={{fontSize: 25, alignItems: 'center'}}>智 慧 防 控</Text>
                </View>
                <View style={{
                    flex: 1,
                    paddingVertical: 20,
                    justifyContent: 'center',
                    flexDirection: "row",
                    flexWrap: 'wrap',
                    backgroundColor: "#FFF"
                }}>
                    {grid}
                </View>
            </View>
        )
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({})
)(Main)
