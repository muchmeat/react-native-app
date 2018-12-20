/**
 * 资源标注主页
 */
import React, {Component} from 'react';
import {
    View,
    FlatList,
    Image, PixelRatio, Dimensions
} from "react-native";
import {ListItem} from 'react-native-elements'
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

import * as resourceTaggingAction from "../../src/example/actions/resourceTaggingAction";
import Global from "../../utils/Global";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const msg = {more: "正在努力加载...", end: "矮油，到底了！"};

class ResourceTagging extends Component {

    _key = (item, index) => {
        let key;
        try {
            key = item.id.toString();
        } catch (e) {
            key = index;
        }
        return key;
    };

    static navigationOptions = {
        headerTitle: "资源标注"
    };

    componentWillMount() {
        let _this = this;
        _this.first = true;
        _this.searchOption = {pageNum: 1, pageSize: 3, userId: _this.props.userId};
        _this._getList();
    }

    _renderItem(props) {
        let _this = this;
        let {navigation} = _this.props;
        return <ListItem
            containerStyle={{height: 75}}
            title={props.item.RWMC}
            subtitle={props.item.TOTAL + "条记录"}
            onPress={() => {
                navigation.dispatch(NavigationActions.navigate({
                    routeName: "CollectionTask",
                    params: {formId: props.item.FORM_ID, rwmc: props.item.RWMC, tbmc: props.item.TBMC}
                }))
            }}
            titleStyle={{fontSize: 16, color: "#333", paddingBottom: 4}}
            subtitleStyle={{fontSize: 14, color: "#999", paddingTop: 4}}
            leftElement={
                <View style={{justifyContent: "center", alignItems: "center", height: 50, width: 50, borderRadius: 25}}>
                    <Image
                        source={{uri: Global.DTTB_IMAGE_URL + props.item.TBMC + '.png'}}
                        style={{width: 50, height: 50}}/>
                </View>
            }
            badge={{
                value: '新增', containerStyle: {backgroundColor: '#FE922F'}, textStyle: {color: '#FFF'}, onPress: () => {
                    navigation.dispatch(NavigationActions.navigate({
                        routeName: "dynamicsForm",
                        params: {formId: props.item.FORM_ID, rwId: props.item.ID,callBack: () => {
                                _this._refreshing();
                            }}
                    }))
                }
            }}
        />
    }

    //刷新
    _refreshing() {
        let _this = this;
        _this.searchOption = {pageNum: 1, pageSize: 3, userId: _this.props.userId};
        let {setRwdList} = _this.props;
        resourceTaggingAction.getRwdList(_this.searchOption, [], setRwdList);
    }

    //下一页
    _load() {
        this._getList();
    }

    /**
     * 获取资源任务单列表
     * @private
     */
    _getList() {
        let _this = this;
        let {setRwdList, isMax, rwdList} = _this.props;
        if (_this.first) {
            resourceTaggingAction.getRwdList(_this.searchOption, [], _this.props.setRwdList);
            _this.first = false;
        } else if (!isMax) {
            _this.searchOption.pageNum++;
            resourceTaggingAction.getRwdList(_this.searchOption, rwdList, setRwdList);
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

    render() {
        let _this = this;
        let {rwdList, isMax} = _this.props;
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <FlatList data={rwdList}
                        // ListFooterComponent={()=>{return <View style={styles.footer}><Text style={styles.historyRow.footerText}>{isMax ? msg.end : msg.more}</Text></View>}}
                              renderItem={(item, index) => _this._renderItem(item, index)}
                              // onRefresh={() => _this._refreshing()}
                              refreshing={false}
                        // onEndReachedThreshold={0.5}
                              onEndReached={() => _this._load()}
                              keyExtractor={this._key}
                              ItemSeparatorComponent={this._separatorComponent}
                              getItemLayout={(data, index) => (
                                  {length: 70, offset: (70 + 2) * index, index}
                              )}
                    />
                </View>
            </View>
        )
    }
}

export default connect((state) => ({
    rwdList: state.resourceTagging.rwdList,
    isMax: state.resourceTagging.isMax
}), (dispatch) => ({
    setRwdList: (list, bool) => dispatch(resourceTaggingAction.setRwdList(list, bool))
}))(ResourceTagging)
