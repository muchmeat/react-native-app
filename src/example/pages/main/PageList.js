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
    BackHandler
} from 'react-native';
import {connect} from 'react-redux'; // 引入connect函数
import {Header, Button, Card, ListItem} from 'react-native-elements';
import styles from '../../style/ThemeStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import IconLib from '../../../../assets/svg/IconLib';
import Svg from 'react-native-svg';
import {NavigationActions} from 'react-navigation';

const lists = [
    {
        name: "登录", icon: "exit-to-app", type: "material", second: [{
            name: '登录-1',
            page: "screen1",
            svg: IconLib.IC_MAIN_DBGZ
        },
            {
                name: '登录-2',
                page: "screen2",
                svg: IconLib.IC_MAIN_SJTJ
            },
            {
                name: '登录-3',
                page: "screen3",
                svg: IconLib.IC_MAIN_DTDW
            }
        ]
    },
    {
        name: "首页", icon: "home", type: "material", second: [{
            name: '首页-1',
            page: "MainPage",
            svg: IconLib.IC_MAIN_XXTX
        }, {
            name: '首页-2',
            page: "MainPage2",
            svg: IconLib.IC_MAIN_XXTX
        }]
    },
    {
        name: "列表", icon: "format-list-bulleted", type: "material", second: [{
            name: '列表-1',
            page: "List1",
            svg: IconLib.IC_MAIN_XXTX
        }, {
            name: '列表-2',
            page: "List3",
            svg: IconLib.IC_MAIN_XXTX
        }]
    },
    {name: "表单", icon: "line-style", type: "material", page: "form"},
    {
        name: "详情", icon: "assignment", type: "material", second: [{
            name: '详情-1',
            page: "Detail",
            svg: IconLib.IC_MAIN_XXTX
        }, {
            name: '详情-2',
            page: "Detail2",
            svg: IconLib.IC_MAIN_XXTX
        }]
    }];

class PageList extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam("title", '通用页面')
        };
    };

    constructor(props) {
        super(props);
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
        this.first = true;
        this.state = {
            data: lists
        }
    }

    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }

    onBackButtonPressAndroid = (state) => {
        if (!this.first) {
            this.first = true;
            this.props.navigation.setParams({title: "通用页面"});
            this.setState({
                data: lists
            })
            return true;
        } else {
            return false;
        }
    };

    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    _renderItem = ({item, index}) => (
        <ListItem
            subtitle={item.name}
            subtitleStyle={{fontSize: 16}}
            leftIcon={{
                name: item.icon,
                type: item.type,
                size: 28
            }}
            rightIcon={{
                name: 'chevron-small-right',
                color: '#ccc',
                type: "entypo",
                size: 24
            }}
            onPress={() => {
                if (item.page) {
                    this.props.navigation.dispatch(NavigationActions.navigate({routeName: item.page}))
                } else {
                    this.first = false;
                    this.props.navigation.setParams({title: item.name});
                    this.setState({
                        data: item.second
                    })
                }
            }}
        />
    )

    // _renderItem = ({item, index})=> {
    //     return (
    //         <TouchableOpacity activeOpacity={0.5} onPress={()=> {
    //             this.props.navigation.dispatch(NavigationActions.navigate({routeName: item.page}))
    //         }}>
    //             <View style={{
    //                 backgroundColor: "#FFF",
    //                 height: 50,
    //                 flexDirection: "row",
    //                 justifyContent: "flex-start",
    //                 alignItems: "center"
    //             }}>
    //                 <View style={{}}>
    //                     <Svg height="30" width="30" viewBox="0 0 1024 1024">
    //                         {item.svg}
    //                     </Svg>
    //                 </View>
    //                 <Text style={{fontSize: 16}} numberOfLines={1}>{item.name}</Text>
    //             </View>
    //         </TouchableOpacity>
    //     )
    // };

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
                    data={this.state.data}
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
    (state) => ({}),
    (dispatch) => ({})
)(PageList)
