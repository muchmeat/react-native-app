/**
 * 采集任务
 */
import React, {Component} from 'react';
import {
    View,
    FlatList,
    Image, PixelRatio, Dimensions, SwipeableFlatList, TouchableHighlight, Text, StyleSheet
} from "react-native";
import {ListItem} from 'react-native-elements'
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

import * as collectionTaskAction from "../../src/example/actions/collectionTaskAction";
import Global from "../../utils/Global";
import EmptyView from "../../src/base/components/EmptyView";
import LoadingButtonView from "../../src/base/components/LoadingButtonView";
import * as resourceTaggingAction from "../example/actions/resourceTaggingAction";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const msg = {more: "正在努力加载...", end: "矮油，到底了！", noData: "没有相关记录"};
//每页条数
const pageSize = Math.ceil((SCREEN_HEIGHT - 80) / 75) + 1;

class CollectionTask extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    _key = (item, index) => {
        let key;
        try {
            key = item.ID.toString();
        } catch (e) {
            key = index;
        }
        return key;
    };

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: navigation.getParam('rwmc', '采集任务'),
        };
    };

    componentWillMount() {
        let _this = this;
        let formId = _this.props.navigation.getParam('formId', null);
        _this.first = true;
        _this.searchOption = {pageNum: 1, pageSize: pageSize, formId: formId, userId: _this.props.userId};
        _this._getList();
    }

    componentWillUnmount() {
        this.props.clearDynamicFormList();
    }

    /**
     * 下拉刷新
     * @private
     */
    _refreshing() {
        let _this = this;
        let formId = _this.props.navigation.getParam('formId', null);
        _this.searchOption = {pageNum: 1, pageSize: pageSize, formId: formId, userId: _this.props.userId};
        let {setDynamicFormList} = _this.props;
        collectionTaskAction.getDynamicFormList(_this.searchOption, [], setDynamicFormList);
    }

    /**
     * 下一页 当列表被滚动到距离内容最底部不足onEndReachedThreshold的距离时调用
     * @private
     */
    _onEndReached() {
        this._getList();
    }

    /**
     * 侧滑菜单渲染
     * @param props
     * @returns {*}
     * @private
     */
    _getQuickActions = (props) => {
        let _this = this;
        let {setDynamicFormList, dynamicFormList, isMax,rwdList,setRwdListTotal} = _this.props;
        let formId = _this.props.navigation.getParam('formId', null);
        return <View style={CTStyles.quickAContent}>
            <TouchableHighlight
                onPress={() => {
                    let formId = _this.props.navigation.getParam('formId', null);
                    _this.props.navigation.dispatch(NavigationActions.navigate({
                        routeName: "dynamicsForm",
                        params: {
                            formId: formId, id: props.item.ID, title: props.item.MC, callBack: () => {
                                //移除侧滑按钮效果
                                _this.refs.flatList.setState({openRowKey: props.index})
                                _this._refreshing();
                            }
                        }
                    }))
                }}
            >
                <View style={CTStyles.quickEdit}>
                    <Text style={CTStyles.delete}>修改</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => {
                    let rwdIndex = _this.props.navigation.getParam('rwdIndex', null);
                    rwdList[rwdIndex]["TOTAL"] = rwdList[rwdIndex]["TOTAL"] - 1;
                    setRwdListTotal(Object.assign([],rwdList));
                    collectionTaskAction.deleteDynamicForm(props.item.ID, formId, dynamicFormList, props.index, setDynamicFormList, isMax);
                    //移除侧滑按钮效果
                    _this.refs.flatList.setState({openRowKey: props.index})
                }}
            >
                <View style={CTStyles.quickDelete}>
                    <Text style={CTStyles.delete}>删除</Text>
                </View>
            </TouchableHighlight>
        </View>
    };

    /**
     * 获取动态表单采集任务列表
     * @private
     */
    _getList() {
        let _this = this;
        _this.setState({loading: true});
        let {setDynamicFormList, isMax, dynamicFormList} = _this.props;
        if (_this.first) {
            collectionTaskAction.getDynamicFormList(_this.searchOption, [], setDynamicFormList,() => {
                _this.setState({loading: false});
            });
            _this.first = false;
        } else if (!isMax) {
            _this.searchOption.pageNum++;
            collectionTaskAction.getDynamicFormList(_this.searchOption, dynamicFormList, setDynamicFormList,() => {
                _this.setState({loading: false});
            });
        }else{
            _this.setState({loading: false});
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

    /**
     * listitem的title自定义
     * @param mc
     * @returns {*}
     * @private
     */
    _getTitle(mc){
        return(
            <Text style={{fontSize: 16, color: "#333", paddingBottom: 4}} numberOfLines={2}>{mc}</Text>
        )
    }

    _renderItem(props) {
        let _this = this;
        let {navigation} = _this.props;
        return <ListItem
            containerStyle={{height: 75}}
            // title={props.item.MC}
            title={_this._getTitle(props.item.MC)}
            onPress={() => {
                let formId = _this.props.navigation.getParam('formId', null);
                navigation.dispatch(NavigationActions.navigate({
                    routeName: "DynamicsDetail",
                    params: {
                        formId: formId, id: props.item.ID, title: props.item.MC, callBack: () => {
                            _this._refreshing();
                        }
                    }
                }))
            }}
            titleStyle={{fontSize: 16, color: "#333", paddingBottom: 4}}
            subtitleStyle={{fontSize: 14, color: "#999", paddingTop: 4}}
            leftElement={
                <View style={{justifyContent: "center", alignItems: "center", height: 50, width: 50, borderRadius: 25}}>
                    <Image
                        source={{uri: Global.REQUEST_BASE_URL + navigation.getParam("tbmc", "/medias/style/plat/image/dttb/asj/11.png") }}
                        style={{width: 50, height: 50}}/>
                </View>
            }
        />
    }

    render() {
        let _this = this;
        let {dynamicFormList, isMax} = _this.props;
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <SwipeableFlatList data={dynamicFormList}
                                       ref={"flatList"}
                                       renderItem={(item, index) => _this._renderItem(item, index)}
                                       onRefresh={() => _this._refreshing()}
                                       refreshing={false}
                                       renderQuickActions={(item, index) => this._getQuickActions(item, index)}//创建侧滑菜单
                                       maxSwipeDistance={120}//可展开（滑动）的距离
                                       bounceFirstRowOnMount={false}//进去的时候不展示侧滑效果
                                       onEndReachedThreshold={0.2}
                                       onEndReached={() => _this._onEndReached()}
                                       ListEmptyComponent={this._ListEmptyComponent}
                                       keyExtractor={this._key}
                        // horizontal={false}
                                       ItemSeparatorComponent={this._separatorComponent}
                        // getItemLayout={(data, index) => (
                        //     {length: 75, offset: (75 + 1) * index, index}
                        // )}
                    />
                    <LoadingButtonView loading={_this.state.loading} text={msg.more}/>
                </View>
            </View>
        )
    }
}

const CTStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#aeffb1',
        height: 100,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,//漂浮的效果
        borderRadius: 5,//圆角
    },
    text: {
        color: '#444444',
        fontSize: 20,
        alignItems: 'center'
    },
    view: {height: SCREEN_HEIGHT, alignItems: 'center', justifyContent: 'center'},
    //侧滑菜单的样式
    quickAContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // marginRight: 15,
        // marginBottom: 10,
    },
    quickEdit: {
        backgroundColor: "#0905FF",
        flex: 1,
        alignItems: 'center',//水平居中
        justifyContent: 'center',//上下居中
        width: 60,
        // borderRadius: 5,
        // elevation: 5,//漂浮的效果
    },
    quickDelete: {
        backgroundColor: "#ff0834",
        flex: 1,
        alignItems: 'center',//水平居中
        justifyContent: 'center',//上下居中
        width: 60,
        // borderRadius: 5,
        // elevation: 5,//漂浮的效果
    },
    delete: {
        color: "#d8fffa",
        // marginRight: 30
    }
});

export default connect((state) => ({
    userId: 123,
    dynamicFormList: state.collectionTask.dynamicFormList,
    isMax: state.collectionTask.isMax,
    rwdList: state.resourceTagging.rwdList,
}), (dispatch) => ({
    setDynamicFormList: (list, bool) => dispatch(collectionTaskAction.setDynamicFormList(list, bool)),
    clearDynamicFormList: () => dispatch(collectionTaskAction.clearDynamicFormList()),
    setRwdListTotal: (list) => dispatch(resourceTaggingAction.setRwdListTotal(list))
}))(CollectionTask)
