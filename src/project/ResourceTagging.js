/**
 * 资源标注主页
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    PixelRatio,
    Dimensions,
    TextInput,
    ActivityIndicator,
    StyleSheet
} from "react-native";
import {ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

import * as resourceTaggingAction from "../../src/example/actions/resourceTaggingAction";
import Global from "../../utils/Global";
import EmptyView from "../../src/base/components/EmptyView";
import LoadingButtonView from "../../src/base/components/LoadingButtonView";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const msg = {more: "正在努力加载...", end: "矮油，到底了！", noData: "没有相关记录"};
//每页条数
const pageSize = Math.ceil((SCREEN_HEIGHT - 80) / 75) + 1;

class ResourceTagging extends Component {

    constructor(props) {
        super(props);
        this.state = {
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

    static navigationOptions = ({ navigation, navigationOptions }) => {
        navigationOptions.headerTitle =  "资源标注";
        return {
            ...navigationOptions
        };
    }

    componentWillMount() {
        let _this = this;
        _this.first = true;
        _this.searchOption = {pageNum: 1, pageSize: pageSize, userId: _this.props.userId};
        _this._getList();
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
            // title={props.item.RWMC}
            title={_this._getTitle(props.item.RWMC)}
            subtitle={props.item.TOTAL + "条记录"}
            onPress={() => {
                navigation.dispatch(NavigationActions.navigate({
                    routeName: "CollectionTask",
                    params: {formId: props.item.FORM_ID, rwmc: props.item.RWMC, tbmc: props.item.TBMC,rwdIndex:props.index}
                }))
            }}
            titleStyle={{fontSize: 16, color: "#333", paddingBottom: 4}}
            subtitleStyle={{fontSize: 14, color: "#999", paddingTop: 4}}
            leftElement={
                <View style={{justifyContent: "center", alignItems: "center",height: 50, width: 50, borderRadius: 0 }}>
                    <Image
                        source={{uri: Global.REQUEST_BASE_URL + props.item.TBMC }}
                        style={{width: 40, height: 40}}/>
                </View>
            }
            // badge={{
            //     value: '新增', containerStyle: {backgroundColor: '#FE922F'}, textStyle: {color: '#FFF'}, onPress: () => {
            //         navigation.dispatch(NavigationActions.navigate({
            //             routeName: "dynamicsForm",
            //             params: {
            //                 formId: props.item.FORM_ID, rwId: props.item.ID, title: props.item.RWMC, callBack: () => {
            //                     _this._refreshing();
            //                 }
            //             }
            //         }))
            //     }
            // }}
            badge={{
                children: _this._getBadgeChildren(),
                containerStyle: {backgroundColor: '#71f2fe'},
                textStyle: {color: '#FFF'},
                onPress: () => {
                    navigation.dispatch(NavigationActions.navigate({
                        routeName: "dynamicsForm",
                        params: {
                            formId: props.item.FORM_ID,
                            rwId: props.item.ID,
                            title: props.item.RWMC,
                            callBack: () => {
                                _this._refreshing();
                            }
                        }
                    }))
                }
            }}
        />
    }

    /**
     * 下拉刷新
     * @private
     */
    _refreshing() {
        let _this = this;
        _this.searchOption = {pageNum: 1, pageSize: pageSize, userId: _this.props.userId};
        let {setRwdList} = _this.props;
        resourceTaggingAction.getRwdList(_this.searchOption, [], setRwdList);
    }

    /**
     * 下一页 当列表被滚动到距离内容最底部不足onEndReachedThreshold的距离时调用
     * @private
     */
    _onEndReached() {
        this._getList();
    }

    /**
     * 获取资源任务单列表
     * @private
     */
    _getList() {
        let _this = this;
        _this.setState({loading: true});
        let {setRwdList, isMax, rwdList} = _this.props;
        if (_this.first) {
            resourceTaggingAction.getRwdList(_this.searchOption, [], _this.props.setRwdList, () => {
                _this.setState({loading: false});
            });
            _this.first = false;
        } else if (!isMax) {
            _this.searchOption.pageNum++;
            resourceTaggingAction.getRwdList(_this.searchOption, rwdList, setRwdList, () => {
                _this.setState({loading: false})
            });
        } else {
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
        let {rwdList, isMax} = _this.props;
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <FlatList data={rwdList}
                        // ListFooterComponent={()=>{return <View style={styles.footer}><Text style={styles.historyRow.footerText}>{isMax ? msg.end : msg.more}</Text></View>}}
                              renderItem={(item, index) => _this._renderItem(item, index)}
                              onRefresh={() => _this._refreshing()}
                              refreshing={false}
                              onEndReachedThreshold={0.1}
                              onEndReached={() => _this._onEndReached()}
                              keyExtractor={this._key}
                              ItemSeparatorComponent={this._separatorComponent}
                        // getItemLayout={(data, index) => (
                        //     {length: 70, offset: (70 + 2) * index, index}
                        // )}
                              ListEmptyComponent={this._ListEmptyComponent}
                    />
                    <LoadingButtonView loading={_this.state.loading} text={msg.more}/>
                </View>
            </View>
        )
    }
}

export default connect((state) => ({
    rwdList: state.resourceTagging.rwdList,
    isMax: state.resourceTagging.isMax,
}), (dispatch) => ({
    setRwdList: (list, bool) => dispatch(resourceTaggingAction.setRwdList(list, bool))
}))(ResourceTagging)
