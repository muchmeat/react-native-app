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
import {NavigationActions} from 'react-navigation';

const lists = [
    {
        name: '登录-1',
        page: "screen1",
        svg: IconLib.IC_MAIN_DBGZ
    }, {
        name: '登录-2',
        page: "screen2",
        svg: IconLib.IC_MAIN_SJTJ
    }, {
        name: '登录-3',
        page: "screen3",
        svg: IconLib.IC_MAIN_DTDW
    }, {
        name: '登录-4',
        page: "screen4",
        svg: IconLib.IC_MAIN_XCKC
    }, {
        name: '表单',
        page: "form",
        svg: IconLib.IC_MAIN_GRZX
    }, {
        name: '列表-1',
        page: "List1",
        svg: IconLib.IC_MAIN_XXTX
    }, {
        name: '列表-2',
        page: "List3",
        svg: IconLib.IC_MAIN_XXTX
    }
    , {
        name: '详情-1',
        page: "Detail",
        svg: IconLib.IC_MAIN_XXTX
    }, {
        name: '详情-2',
        page: "Detail2",
        svg: IconLib.IC_MAIN_XXTX
    }
]


class PageList extends Component {
    _renderItem = ({item, index})=> {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={()=> {
                this.props.navigation.dispatch(NavigationActions.navigate({routeName: item.page}))
            }}>
                <View style={{
                    backgroundColor: "#FFF",
                    height: 50,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center"
                }}>
                    <View style={{}}>
                        <Svg height="30" width="30" viewBox="0 0 1024 1024">
                            {item.svg}
                        </Svg>
                    </View>
                    <Text style={{fontSize: 16}} numberOfLines={1}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    _keyExtractor = (item, index) => index.toString();
    //每行的分隔线
    _separatorComponent = () => {
        return <View style={{
            width: styles.screen.width - 20,
            marginLeft: 10,
            marginRight: 10,
            borderBottomWidth: styles.line.width,
            borderBottomColor: styles.line.color
        }}/>
    };


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={lists}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={this._separatorComponent}
                />
            </View>
        )
    }
}

export default connect(
    (state) =>({}),
    (dispatch) => ({})
)(PageList)
