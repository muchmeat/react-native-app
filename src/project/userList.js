/**
 * 用户选择列表
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    Button,
    PixelRatio,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    BackHandler,
    Image,
    Platform
} from "react-native";
import {ListItem, SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';

import Icon from "react-native-vector-icons/Feather";
import EmptyView from "../../src/base/components/EmptyView";
import LoadingButtonView from "../../src/base/components/LoadingButtonView";
import formStyle from "../base/tcom/tcomb-form-native/lib/stylesheets/formStyle";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const msg = {more: "正在努力加载...", end: "矮油，到底了！", noData: "没有相关记录"};
//每页条数
const pageSize = Math.ceil((SCREEN_HEIGHT - 80) / 50) + 1;

class userList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchName: '',
            isSingle: this.props.navigation.getParam("isSingle", true),
            userListData: this.props.navigation.getParam("userListData", []),
            currentUserListData: this.props.navigation.getParam("userListData", []),
            oldValue: this.props.navigation.getParam("oldValue", ""),
            nodesCheckedStatus: this._initNodesCheckedStatus(),
            loading: false
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: "用户选择",
            headerLeft: (
                <TouchableOpacity onPress={() => {
                    navigation.state.params.callBack(navigation.getParam("oldValue", ""));
                    navigation.goBack();
                }}>
                    <Image
                        style={styles.headerBackButton}
                        source={require('../../assets/images/androidback-icon.png')}
                    />
                </TouchableOpacity>
            ),
        };
    }

    _initNodesCheckedStatus = () => {
        let userListData = this.props.navigation.getParam("userListData", []);
        let oldValue = this.props.navigation.getParam("oldValue", "");
        let nodesCheckedStatus = new Map();
        userListData.map(item => {
            nodesCheckedStatus.set(item.ID, false);
        });
        //将旧值设置为checked
        oldValue = oldValue.split(",");
        for (let id of oldValue) {
            if ("" != id) {
                nodesCheckedStatus.set(Number.parseInt(id), true);
            }
        }
        return nodesCheckedStatus;
    };

    _key = (item, index) => {
        let key;
        try {
            key = item.id.toString();
        } catch (e) {
            key = index;
        }
        return key;
    };

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener("hardwareBackPress", this._onBackAndroid);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid);
        }
    }

    _onBackAndroid = () => {
        let _this = this;
        let {oldValue} = _this.state;
        _this.props.navigation.state.params.callBack(oldValue);
        _this.props.navigation.goBack();
        return true;
    }

    /**
     * 搜索
     * 用户名或者登录名
     * @param searchName
     * @private
     */
    _updateSearchName = searchName => {
        let {userListData} = this.state;
        let currentUserListData = [];
        for (let item of userListData) {
            if (item.USER_NAME.indexOf(searchName) > -1 || item.LOGIN_NAME.indexOf(searchName) > -1) {
                currentUserListData.push(item);
            }
        }
        this.setState({currentUserListData: currentUserListData, searchName: searchName})
    };

    /**
     * listitem的title自定义
     * @param mc
     * @returns {*}
     * @private
     */
    _getTitle(mc) {
        return (
            <Text style={{fontSize: 16, color: "#333", paddingBottom: 4}} numberOfLines={2}>{mc}</Text>
        )
    }

    /**
     * ListItem的点击事件
     * @private
     */
    _itemPress(item) {
        let {isSingle} = this.state;
        let nodesCheckedStatus = new Map(this.state.nodesCheckedStatus);
        if (isSingle) {
            for (let key of nodesCheckedStatus.keys()) {
                nodesCheckedStatus.set(key, false);
            }
        }
        let checked = !item.checked;
        item.checked = checked;
        //改变数据引用地址，触发更新
        let list = [];
        list = list.concat(this.state.currentUserListData);
        nodesCheckedStatus.set(item.ID, checked);
        this.setState({
            nodesCheckedStatus: nodesCheckedStatus,
            currentUserListData: list,
            click: true
        });
    }

    _renderItem({item, index}) {
        let _this = this;
        let {isSingle} = this.state;
        return (<ListItem
            containerStyle={{height: 50, paddingVertical: 5}}
            title={_this._getTitle(item.USER_NAME)}
            subtitle={item.DEFAULT_ORGAN_NAME}
            onPress={() => _this._itemPress(item)}
            titleStyle={{fontSize: 14, color: "#333"}}
            subtitleStyle={{fontSize: 14, color: "#999"}}
            leftElement={
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: 30,
                    width: 50,
                    borderRadius: 0
                }}>
                    <Icon size={20}
                          name={this.state.nodesCheckedStatus.get(item.ID) ? isSingle ? "check-circle" : "check-square" : isSingle ? "circle" : "square"}
                          color={formStyle.picker.checkColor}/>
                </View>
            }
        />)
    };

    /**
     * 用户选择回调
     * @private
     */
    _buttonPressCallback() {
        let _this = this;
        let {nodesCheckedStatus, isSingle} = _this.state;
        let checkedIds = "";
        for (let [key, value] of nodesCheckedStatus.entries()) {
            if (value) {
                checkedIds += key;
                if (!isSingle) {
                    checkedIds += ",";
                }
            }
        }
        _this.props.navigation.state.params.callBack(checkedIds);
        _this.props.navigation.goBack();
    }

    /**
     * 每行的分隔线
     * @returns {*}
     * @private
     */
    _separatorComponent = () => {
        return <View style={{
            width: SCREEN_WIDTH - 20,
            marginLeft: 10,
            marginRight: 10,
            borderBottomWidth: 1 / PixelRatio.get(),
            borderBottomColor: "#dedfe0"
        }}/>
    };

    /**
     * 列表为空时渲染
     * @returns {*}
     * @private
     */
    _ListEmptyComponent = () => {
        return <EmptyView text={msg.noData}/>
    };


    _getCheckedTotal() {
        let total = 0;
        let {nodesCheckedStatus,} = this.state;
        for (let [key, value] of nodesCheckedStatus.entries()) {
            if (value) {
                total++;
            }
        }
        return total;
    }

    render() {
        let _this = this;
        let {searchName, currentUserListData} = this.state;
        let total = _this._getCheckedTotal();
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, alignContent: "center", justifyContent: "center"}}>
                    <SearchBar
                        ref={search => this.search = search}
                        placeholder="请输入用户名或登录名"
                        containerStyle={{backgroundColor: "#fff", justifyContent: "center", flexDirection: "row"}}
                        // inputStyle={{backgroundColor: "#6f6e6e"}}
                        // inputContainerStyle={{backgroundColor: "#fff",justifyContent:"center",flexDirection:"row"}}
                        // leftIconContainerStyle={{backgroundColor: "#6f6e6e"}}
                        // rightIconContainerStyle={{backgroundColor: "#6f6e6e"}}
                        onChangeText={this._updateSearchName}
                        lightTheme={true}
                        value={searchName}
                    />
                    <FlatList data={currentUserListData}
                              renderItem={(item, index) => _this._renderItem(item, index)}
                              refreshing={false}
                              onEndReachedThreshold={0.1}
                              keyExtractor={this._key}
                              ItemSeparatorComponent={this._separatorComponent}
                              ListEmptyComponent={this._ListEmptyComponent}
                    />
                    <LoadingButtonView loading={_this.state.loading} text={msg.more}/>
                    <View style={[styles.loadingContainer]}>
                        <View style={styles.loadingView}>
                            <Text style={styles.text}>{"已选择" + total + "位"}</Text>
                            <Button title="确定" onPress={() => _this._buttonPressCallback()}
                                    color={styles.button.color}/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loadingContainer: {
        borderTopWidth: 1 / PixelRatio.get(),
        borderTopColor: "#dedfe0",
        backgroundColor: "#FFF"
    },
    loadingView: {
        justifyContent: 'space-between',
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10
    },
    text: {
        fontSize: 15,
        alignItems: 'center',
        color: "#808080",
    },
    button: {
        color: "#841584",
    },
    headerBackButton: {marginLeft: 15, tintColor: "#fff", width: 25, height: 25}
})


export default connect((state) => ({}), (dispatch) => ({}))(userList)
