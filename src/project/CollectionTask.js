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

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const msg = {more: "正在努力加载...", end: "矮油，到底了！"};

const pageSize = Math.ceil((SCREEN_HEIGHT - 80) / 75) + 1;

class CollectionTask extends Component {

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
        _this.searchOption = {pageNum: 1, pageSize: 3, formId: formId, userId: _this.props.userId};
        _this._getList();
    }

    componentWillUnmount() {
        this.props.clearDynamicFormList();
    }

    //刷新
    _refreshing() {
        let _this = this;
        let formId = _this.props.navigation.getParam('formId', null);
        _this.searchOption = {pageNum: 1, pageSize: 3, formId: formId, userId: _this.props.userId};
        let {setDynamicFormList} = _this.props;
        collectionTaskAction.getDynamicFormList(_this.searchOption, [], setDynamicFormList);
    }

    //下一页
    _load() {
        this._getList();
    }

    //侧滑菜单渲染
    getQuickActions = (props) => {
        let _this = this;
        let {setDynamicFormList, dynamicFormList, isMax} = _this.props;
        let formId = _this.props.navigation.getParam('formId', null);
        return <View style={styles.quickAContent}>
            <TouchableHighlight
                onPress={() => {
                    let formId = _this.props.navigation.getParam('formId', null);
                    _this.props.navigation.dispatch(NavigationActions.navigate({
                        routeName: "dynamicsForm",
                        params: {
                            formId: formId, id: props.item.ID, callBack: () => {
                                //移除侧滑按钮效果
                                _this.refs.flatList.setState({openRowKey: props.index})
                                _this._refreshing();
                            }
                        }
                    }))
                }}
            >
                <View style={styles.quickEdit}>
                    <Text style={styles.delete}>修改</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => {
                    collectionTaskAction.deleteDynamicForm(props.item.ID, formId, dynamicFormList, props.index, setDynamicFormList, isMax);
                    //移除侧滑按钮效果
                    _this.refs.flatList.setState({openRowKey: props.index})
                }}
            >
                <View style={styles.quickDelete}>
                    <Text style={styles.delete}>删除</Text>
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
        let {setDynamicFormList, isMax, dynamicFormList} = _this.props;
        if (_this.first) {
            collectionTaskAction.getDynamicFormList(_this.searchOption, [], setDynamicFormList);
            _this.first = false;
        } else if (!isMax) {
            _this.searchOption.pageNum++;
            collectionTaskAction.getDynamicFormList(_this.searchOption, dynamicFormList, setDynamicFormList);
        }
    }

    //每行的分隔线
    _separatorComponent = () => {
        return <View style={{
            width: SCREEN_WIDTH - 20,
            marginLeft: 10,
            marginRight: 10,
            borderBottomWidth: 1 / PixelRatio.get(),
            borderBottomColor: "#dedfe0"
        }}/>
    };

    _renderItem(props) {
        let _this = this;
        let {navigation} = _this.props;
        // return <View style={{height:70,backgroundColor:"red"}}/>;
        return <ListItem
            containerStyle={{height: 75}}
            title={props.item.MC}
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
                        source={{uri: Global.DTTB_IMAGE_URL + navigation.getParam("tbmc", "案事件") + '.png'}}
                        style={{width: 50, height: 50}}/>
                </View>
            }
        />
    }

    render() {
        let _this = this;
        let {dynamicFormList, isMax} = _this.props;
        // console.warn("render");
        // console.warn(dynamicFormList);
        // let data = [{},{},{},{}];
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <SwipeableFlatList data={dynamicFormList}
                                       ref={"flatList"}
                                       renderItem={(item, index) => _this._renderItem(item, index)}
                        // onRefresh={() => _this._refreshing()}
                                       refreshing={false}
                                       renderQuickActions={(item, index) => this.getQuickActions(item, index)}//创建侧滑菜单
                                       maxSwipeDistance={120}//可展开（滑动）的距离
                                       bounceFirstRowOnMount={false}//进去的时候不展示侧滑效果
                                       onEndReachedThreshold={0.5}
                                       onEndReached={() => _this._load()}
                        // keyExtractor={this._key}
                        // horizontal={false}
                                       ItemSeparatorComponent={this._separatorComponent}
                        // getItemLayout={(data, index) => (
                        //     {length: 75, offset: (75 + 1) * index, index}
                        // )}
                    />


                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    },
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
    isMax: state.collectionTask.isMax
}), (dispatch) => ({
    setDynamicFormList: (list, bool) => dispatch(collectionTaskAction.setDynamicFormList(list, bool)),
    clearDynamicFormList: () => dispatch(collectionTaskAction.clearDynamicFormList())
}))(CollectionTask)
