/**
 * Created by Administrator on 2018/10/25.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableHighlight,
    RefreshControl,
    Alert,
    NativeModules,
    ImageBackground,
    FlatList,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux'; // 引入connect函数
import {Header, Button, Card, ListItem} from 'react-native-elements';
import styles from '../../style/ThemeStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconLib from '../../../assets/svg/IconLib';
import Svg from 'react-native-svg';

const users = [
    {
        name: '待办工作',
        svg: IconLib.IC_MAIN_DBGZ,
        bgColor:"#20C6DC"
    }, {
        name: '数据统计',
        svg: IconLib.IC_MAIN_SJTJ,
        bgColor:"#27B4FC"
    }, {
        name: '地图定位',
        svg: IconLib.IC_MAIN_DTDW,
        bgColor:"#4A94FF"
    }, {
        name: '现场勘查',
        svg: IconLib.IC_MAIN_XCKC,
        bgColor:"#4A94FF"
    }, {
        name: '个人中心',
        svg: IconLib.IC_MAIN_GRZX,
        bgColor:"#27B4FC"
    }, {
        name: '消息提醒',
        svg: IconLib.IC_MAIN_XXTX,
        bgColor:"#20C6DC"
    }
]

const {width, height} = Dimensions.get('window')
const cols = 3;
const vMargin = 10;
const cellWH = (width - 2 * vMargin - 15) / cols;
const hMargin = 25;


class MainPage2 extends Component {
    static navigationOptions = {
        header: ()=> {
            return <Header
                placement="center"
                centerComponent={{text: '首页', style: {color: '#fff', fontSize: 18}}}
                containerStyle={{
                    paddingTop: 5,
                    height: 50,
                    backgroundColor: styles.color.theme
                    // justifyContent:"center",
                    // alignItems:"center"
                }}
            />
        }
    };

    _renderItem = ({item, index})=> {
        return (
            <TouchableOpacity activeOpacity={0.5}>
                <View style={{
                    width: cellWH,
                    alignItems: 'center',
                    height:cellWH-20,marginBottom:10
                }}>
                    <View style={{width:cellWH-50,height:cellWH-50,justifyContent: "center", alignItems: "center",backgroundColor:item.bgColor,borderRadius:10}}>
                        <Svg height="30" width="30" viewBox="0 0 1024 1024">
                            {item.svg}
                        </Svg>
                    </View>
                    <Text style={{marginTop: 5, textAlign: 'center'}} numberOfLines={1}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    _keyExtractor = (item, index) => index.toString();

    render() {
        return (
            <View style={styles.container}>
                {/*<Button*/}
                {/*title='搜索'*/}
                {/*buttonStyle={{*/}
                {/*height: 32,*/}
                {/*width: styles.screen.width - 20,*/}
                {/*backgroundColor: '#fff',*/}
                {/*borderRadius: 10,*/}
                {/*elevation: 0*/}
                {/*}}*/}
                {/*containerStyle={{*/}
                {/*height: 45,*/}
                {/*width: styles.screen.width,*/}
                {/*justifyContent: "center",*/}
                {/*alignItems: "center"*/}
                {/*}}*/}
                {/*titleStyle={{fontSize: 16, color: '#BBBBBB'}}*/}
                {/*icon={*/}
                {/*<View style={{justifyContent: "center", alignItems: "center"}}>*/}
                {/*<Svg height="30" width="30" viewBox="0 0 1024 1024">*/}
                {/*{IconLib.IC_SEARCH}*/}
                {/*</Svg>*/}
                {/*</View>*/}
                {/*}*/}
                {/*/>*/}
                <ImageBackground style={{width: styles.screen.width, height: styles.screen.height / 3 - 30}}
                                 source={require('../../../assets/images/main_title.png')}>
                </ImageBackground>
                <View style={{backgroundColor: "#FFF", marginTop: 20}}>
                    <View style={{paddingLeft: 15, paddingTop: 15, paddingBottom: 10}}>
                        <Text style={{fontSize: 16}}>常用事项</Text>
                    </View>
                    <FlatList
                        data={users}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        numColumns={3}
                        horizontal={false}
                        contentContainerStyle={{// 主轴方向
                            justifyContent: 'space-between',
                            // 一行显示不下,换一行
                            alignItems: 'center', // 必须设置,否则换行不起作用
                            paddingHorizontal: 5
                        }}
                    />
                </View>

            </View>
        )
    }
}

export default connect(
    (state) =>({}),
    (dispatch) => ({})
)(MainPage2)
