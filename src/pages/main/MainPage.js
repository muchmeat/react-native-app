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
    PixelRatio, AsyncStorage
} from 'react-native';
import {connect} from 'react-redux'; // 引入connect函数
import {Header, Button, Card, ListItem} from 'react-native-elements';
import styles from '../../style/ThemeStyle';
import mainPageStyle from '../../style/MainPageStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconLib from '../../../assets/svg/IconLib';
import Svg from 'react-native-svg';
import {StackActions, NavigationActions} from 'react-navigation';
import FetchUtil from "../../../utils/FetchUtil";
const users = [
    {
        name: '待办工作',
        svg: IconLib.IC_MAIN_DBGZ,
        bgColor: "#20C6DC"
    }, {
        name: '数据统计',
        svg: IconLib.IC_MAIN_SJTJ,
        bgColor: "#27B4FC"
    }, {
        name: '地图定位',
        svg: IconLib.IC_MAIN_DTDW,
        bgColor: "#4A94FF"
    }, {
        name: '视频监控',
        svg: IconLib.IC_MAIN_SPJK,
        bgColor: "#4A94FF"
    }, {
        name: '施工日志',
        svg: IconLib.IC_MAIN_SGRZ,
        bgColor: "#27B4FC"
    }, {
        name: '岗前培训',
        svg: IconLib.IC_MAIN_VIDOE,
        bgColor: "#20C6DC"
    }, {
        name: '个人中心',
        svg: IconLib.IC_MAIN_GRZX,
        bgColor: "#20C6DC"
    }, {
        name: '任务管理',
        svg: IconLib.IC_MAIN_RWGL,
        bgColor: "#20C6DC"
    }
]

const {width} = Dimensions.get('window')
const cols = 4;
const vMargin = 10;
const cellWH = (width - 2 * vMargin - 15) / cols;


class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:users
        };
        this.getMenu();
    }
    static navigationOptions = {
        header: () => {
            return <Header
                placement="center"
                centerComponent={{text: '首页', style: {color: '#fff', fontSize: 18}}}
                containerStyle={{
                    paddingTop: 5,
                    height: 50,
                    backgroundColor: styles.color.theme
                }}
            />
        }
    };

    getMenu=()=>{
        let json={
            type: 'menu', parentCode: 'app'
        };
        FetchUtil.postJsonEntity("http://172.28.1.20:8082/plat/resource/getUserResource?type=menu&parentCode=app",json,(res)=>{
            alert(JSON.stringify(res));
        },(error)=>{
            alert(JSON.stringify(error));
        },()=>{

        });
    };

    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={()=> {

            }}>
                <View style={{
                    width: cellWH,
                    alignItems: 'center',
                    height: cellWH - 10,
                    marginLeft: 5,
                    marginBottom: 10,
                }}>
                    <View style={{
                        width: cellWH - 35,
                        height: cellWH - 35,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: item.bgColor,
                        borderRadius: (cellWH - 35) / 2
                    }}>
                        <Svg height="24" width="24" viewBox="0 0 1024 1024">
                            {item.svg}
                        </Svg>
                    </View>
                    <Text style={mainPageStyle.touchText}
                          numberOfLines={1}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    _keyExtractor = (item, index) => index.toString();

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={{width: styles.screen.width, height: styles.screen.height / 3 - 40}}
                                 source={require('../../../assets/images/main_title.png')}>
                </ImageBackground>
                <View style={{marginTop: 10}}>
                    <FlatList
                        data={this.state.data}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        numColumns={4}
                        horizontal={false}
                        contentContainerStyle={mainPageStyle.contentContainerStyle}
                    />
                </View>
                <ListItem
                    subtitle={"岗前培训"}
                    subtitleStyle={{fontSize: 15, color: "#222"}}
                    rightIcon={{
                        name: 'chevron-small-right',
                        color: '#ccc',
                        type: "entypo",
                        size: 24
                    }}
                    leftIcon={<View style={{justifyContent: "center", alignItems: "center"}}>
                        <Svg height="18" width="18" viewBox="0 0 1024 1024">
                            {IconLib.IC_VIDOE}
                        </Svg>
                    </View>}
                    containerStyle={{height: 45}}
                    onPress={() => {

                    }}
                />
                <ListItem
                    leftElement={<View style={mainPageStyle.leftElementStyle}>
                        <Text style={mainPageStyle.listText}>必学</Text>
                    </View>}
                    subtitle={"安全教育：安全基础知识"}
                    rightElement={<View style={mainPageStyle.rightElementStyle}>
                        <Text style={{fontSize: 13, color: "#f2860f"}}>去学习</Text>
                    </View>}
                    subtitleStyle={mainPageStyle.subtitleStyle}
                    containerStyle={mainPageStyle.containerStyle}
                    onPress={() => {

                    }}
                />
                <ListItem
                    leftElement={<View style={mainPageStyle.leftElementStyle}>
                        <Text style={mainPageStyle.listText}>必学</Text>
                    </View>}
                    subtitle={"钢结构工程施工基础知识"}
                    subtitleStyle={mainPageStyle.subtitleStyle}
                    rightElement={<View style={mainPageStyle.rightElementStyle}>
                        <Text style={{fontSize: 13, color: "#08c954"}}>已完成</Text>
                    </View>}
                    containerStyle={{height: 45}}
                    onPress={() => {

                    }}
                />
            </View>
        )
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({})
)(MainPage)
