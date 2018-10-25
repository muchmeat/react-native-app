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
    TouchableOpacity,
    PixelRatio
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
        name: '视频监控',
        svg: IconLib.IC_MAIN_SPJK,
        bgColor:"#4A94FF"
    }, {
        name: '施工日志',
        svg: IconLib.IC_MAIN_SGRZ,
        bgColor:"#27B4FC"
    }, {
        name: '岗前培训',
        svg: IconLib.IC_MAIN_VIDOE,
        bgColor:"#20C6DC"
    }, {
        name: '个人中心',
        svg: IconLib.IC_MAIN_GRZX,
        bgColor:"#20C6DC"
    }, {
        name: '任务管理',
        svg: IconLib.IC_MAIN_RWGL,
        bgColor:"#20C6DC"
    }
]

const {width, height} = Dimensions.get('window')
const cols = 4;
const vMargin = 10;
const cellWH = (width - 2 * vMargin - 15) / cols;
const hMargin = 25;


class MainPage extends Component {
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
                    height:cellWH-10,marginBottom:10
                }}>
                    <View style={{width:cellWH-35,height:cellWH-35,justifyContent: "center", alignItems: "center",backgroundColor:item.bgColor,borderRadius:(cellWH-35)/2}}>
                        <Svg height="24" width="24" viewBox="0 0 1024 1024">
                            {item.svg}
                        </Svg>
                    </View>
                    <Text style={{marginTop: 5, textAlign: 'center',color:"#444"}} numberOfLines={1}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    _keyExtractor = (item, index) => index.toString();

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={{width: styles.screen.width, height: styles.screen.height / 3 - 30}}
                                 source={require('../../../assets/images/bg_screen1.jpg')}>
                </ImageBackground>
                <View style={{marginTop:10}}>
                    <FlatList
                        data={users}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        numColumns={4}
                        horizontal={false}
                        contentContainerStyle={{// 主轴方向
                            justifyContent: 'space-between',
                            alignItems: 'center', // 必须设置,否则换行不起作用
                            paddingHorizontal: 5
                        }}
                    />
                </View>
                <ListItem
                    subtitle={"岗前培训"}
                    subtitleStyle={{ fontSize:15,color:"#222"}}
                    rightIcon={{name:'chevron-small-right',
                        color:'#ccc',
                        type:"entypo",
                        size:20}}
                    leftIcon={<View style={{justifyContent: "center", alignItems: "center"}}>
                        <Svg height="24" width="24" viewBox="0 0 1024 1024">
                            {IconLib.IC_VIDOE}
                        </Svg>
                    </View>}
                    containerStyle={{height:45}}
                    onPress={()=>{

                    }}
                />
                <ListItem
                    leftElement={<View style={{height:18,width:45,justifyContent: "center", alignItems: "center",backgroundColor:"#FE922F",borderRadius:10}}>
                        <Text style={{fontSize:12,color:"#FFF"}}>必学</Text>
                    </View>}
                    subtitle={"安全教育：安全基础知识"}
                    rightElement={<View style={{justifyContent: "center", alignItems: "center"}}>
                        <Text style={{fontSize:13,color:"#f2860f"}}>去学习</Text>
                    </View>}
                    subtitleStyle={{ fontSize:14,color:"#888"}}
                    containerStyle={{height:45,borderBottomWidth:1/PixelRatio.get(),borderBottomColor:styles.line.color}}
                    onPress={()=>{

                    }}
                />
                <ListItem
                    leftElement={<View style={{height:18,width:45,justifyContent: "center", alignItems: "center",backgroundColor:"#FE922F",borderRadius:10}}>
                        <Text style={{fontSize:12,color:"#FFF"}}>必学</Text>
                    </View>}
                    subtitle={"钢结构工程施工基础知识"}
                    subtitleStyle={{ fontSize:14,color:"#888"}}
                    rightElement={<View style={{justifyContent: "center", alignItems: "center"}}>
                        <Text style={{fontSize:13,color:"#08c954"}}>已完成</Text>
                    </View>}
                    containerStyle={{height:45}}
                    onPress={()=>{

                    }}
                />
            </View>
        )
    }
}

export default connect(
    (state) =>({}),
    (dispatch) => ({})
)(MainPage)
