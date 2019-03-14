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
    TouchableOpacity,
    StyleSheet
} from "react-native";
import {ListItem, SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

import * as userListAction from "../../src/example/actions/userListAction";
import Icon from "react-native-vector-icons/Feather";
import EmptyView from "../../src/base/components/EmptyView";
import LoadingButtonView from "../../src/base/components/LoadingButtonView";
import formStyle from "../base/tcom/tcomb-form-native/lib/stylesheets/formStyle";
import {breadthFirstRecursion} from "../base/tcom/tcomb-form-native/lib/util";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const msg = {more: "正在努力加载...", end: "矮油，到底了！", noData: "没有相关记录"};
//每页条数
const pageSize = Math.ceil((SCREEN_HEIGHT - 80) / 50) + 1;

class userList2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchName: '',
            nodesCheckedStatus: {},
            currentNode: "",
            loading: false
        }
    }

    _key = (item, index) => {
        let key;
        try {
            key = item.id.toString();
        } catch (e) {
            key = index;
        }
        return key;
    };

    static navigationOptions = ({navigation, navigationOptions}) => {
        navigationOptions.headerTitle = "用户选择";
        return {
            ...navigationOptions
        };
    }

    componentWillMount() {
        let _this = this;
        _this.first = true;
        _this.searchOption = {pageNum: 1, pageSize: pageSize, searchName: ''};
        _this._getList();
    }

    updateSearchName = searchName => {
        this.setState({searchName}, () => {
            this._getList();
        });
    };

    _updateUserChecked(checkedUser) {
        let _this = this;
        let {userList} = _this.props;
        let {setCheckedUserList, checkedUserList} = _this.props;
        userList.map(item => {
            for (let user of checkedUser) {
                if (item.ID == user.ID) {
                    item.checked = true;
                    setCheckedUserList(checkedUserList, item);
                }
            }
        });
    }

    /**
     * 自定义button样式
     * @returns {*}
     * @private
     */
    _getBadgeChildren() {
        return (
            <View style={{width: 40, height: 40, alignItems: "center", justifyContent: "center"}}>
                <Text>新增</Text>
            </View>
        )
    }

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

    _renderItem(props) {
        let _this = this;
        let {setCheckedUserList, checkedUserList} = _this.props;
        return <ListItem
            containerStyle={{height: 50}}
            title={_this._getTitle(props.item.USER_NAME)}
            subtitle={props.item.DEFAULT_ORGAN_NAME}
            onPress={() => {
                // this.setState((state) => {
                //     const nodesCheckedStatus = new Map(state.nodesCheckedStatus);
                //     // if (isSingle) {
                //     //     for (let key of nodesCheckedStatus.keys()) {
                //     //         nodesCheckedStatus.set(key, false);
                //     //     }
                //     // }
                //     nodesCheckedStatus.set(props.item.ID, !nodesCheckedStatus.get(props.item.ID));
                //     return {
                //         nodesCheckedStatus
                //     };
                // })
                //改变state可以使状态变化，重新渲染
                this.setState({currentNode: props.item});
                props.item.checked = !props.item.checked;
                setCheckedUserList(checkedUserList, props.item)
            }}
            titleStyle={{fontSize: 14, color: "#333", marginVertical: 2}}
            subtitleStyle={{fontSize: 14, color: "#999", paddingTop: 1}}
            leftElement={
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: 30,
                    width: 50,
                    borderRadius: 0
                }}>
                    <Icon size={20}
                        // name={this.state.nodesCheckedStatus.get(props.item.id) ? isSingle ? "check-circle" : "check-square" : isSingle ? "circle" : "square"}
                        //   name={_this.state.nodesCheckedStatus.get(props.item.ID) ? "check-circle" : "square"}
                          name={props.item.checked ? "check-circle" : "square"}
                          color={formStyle.picker.checkColor}/>
                </View>
            }
            // rightElement={
            //     <View style={{justifyContent: "center", alignItems: "center", height: 30, width: 50, borderRadius: 0}}>
            //         <Icon size={20}
            //               name={false ? "check-circle" : "square"}
            //               color={formStyle.picker.checkColor}/>
            //     </View>
            // }
        />
    }

    _buttonPress() {
        let _this = this;
        let {checkedUserList} = _this.props;
        _this.props.navigation.state.params.callBack(JSON.stringify(checkedUserList));
        _this.props.navigation.goBack();
    }

    /**
     * 下拉刷新
     * @private
     */
    _refreshing() {
        let _this = this;
        _this.searchOption = {pageNum: 1, pageSize: pageSize};
        let {setUserList} = _this.props;
        userListAction.getUserList(_this.searchOption, [], setUserList);
    }

    /**
     * 下一页 当列表被滚动到距离内容最底部不足onEndReachedThreshold的距离时调用
     * @private
     */
    _onEndReached() {
        let _this = this;
        let {isMax, userList} = _this.props;
        if (!isMax) {
            _this._getList();
        }
    }

    /**
     * 获取资源任务单列表
     * @private
     */
    _getList() {
        let _this = this;
        const {searchName} = _this.state;
        _this.searchOption.searchName = searchName;
        _this.setState({loading: true});
        let {setUserList, isMax, userList} = _this.props;
        let checkedUser = _this.props.navigation.getParam("checkedUser", []);
        if (_this.first) {
            userListAction.getUserList(_this.searchOption, [], _this.props.setUserList, () => {
                _this.setState({loading: false});
                this._updateUserChecked(checkedUser);
            });
            _this.first = false;
        } else if (!isMax) {
            _this.searchOption.pageNum++;
            userListAction.getUserList(_this.searchOption, userList, setUserList, () => {
                _this.setState({loading: false});
                this._updateUserChecked(checkedUser);
            });
        } else if ("" != searchName) {
            _this.searchOption.pageNum = 1;
            userListAction.getUserList(_this.searchOption, [], setUserList, () => {
                _this.setState({loading: false});
                this._updateUserChecked(checkedUser);
            });
        } else {
            // console.warn("else")
            _this.setState({
                loading: false
            });
        }
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

    render() {
        let _this = this;
        let userListData = _this.props.navigation.getParam("userListData", []);
        let {userList, isMax} = _this.props;
        const {searchName} = this.state;
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <SearchBar
                        ref={search => this.search = search}
                        placeholder="请输入用户名或登录名"
                        containerStyle={{backgroundColor: "#fff"}}
                        onChangeText={this.updateSearchName}
                        value={searchName}
                    />
                    <FlatList data={userListData}
                              renderItem={(item, index) => _this._renderItem(item, index)}
                              // onRefresh={() => _this._refreshing()}
                              refreshing={false}
                              onEndReachedThreshold={0.1}
                              onEndReached={() => _this._onEndReached()}
                              keyExtractor={this._key}
                              ItemSeparatorComponent={this._separatorComponent}
                              ListEmptyComponent={this._ListEmptyComponent}
                    />
                    <LoadingButtonView loading={_this.state.loading} text={msg.more}/>
                    <View style={[styles.loadingContainer]}>
                        <View style={styles.loadingView}>
                            <Text style={styles.text}>{"已选择"}</Text>
                            <Button title="确定" onPress={() => _this._buttonPress()} color={styles.button.color}/>
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
    }
})


export default connect((state) => ({
    userList: state.userListReducer.userList,
    checkedUserList: state.userListReducer.checkedUserList == null ? [] : state.userListReducer.checkedUserList,
    isMax: state.userListReducer.isMax,
}), (dispatch) => ({
    setUserList: (list, bool) => dispatch(userListAction.setUserList(list, bool)),
    setCheckedUserList: (list, item) => dispatch(userListAction.setCheckedUserList(list, item))
}))(userList2)
