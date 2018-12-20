import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableHighlight,
    FlatList,
    Image, PixelRatio, Dimensions
} from "react-native";
import {Input, Button, SearchBar, Card, ListItem, Icon} from 'react-native-elements'
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import Svg from "react-native-svg";

import * as timingCheckAction from "../../src/example/actions/timingCheckAction";
// import IconLib from "../../../resources/IconLib";
import IconLib from '../../assets/svg/IconLib';
// import DatePicker from "@src/base/components/DatePicker";
// import Item from "../../pages/timingCheck/HistoryRow";
import * as common from "../../utils/common";
import Global from "../../utils/Global";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const msg = {more: "正在努力加载...", end: "矮油，到底了！"};

class InitiateCollection2 extends Component {

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
        headerTitle: "发起采集"
    };

    componentWillMount() {
        let _this = this;
        _this.first = true;
        _this.searchOption = {pageNum: 1, pageSize: 3, userId: _this.props.userId};
        // _this.props.showDatePicker(false);
        console.log();
        _this._getList();
    }

    _changeAfter(type) {
        let _this = this;
        if (type === "kssj") {
            let options = {
                minimumDate: _this.refs.kssj._getValue(),
                maximumDate: new Date()
            };
            _this.refs.jssj._setOptions(options);
        } else if (type === "jssj") {
            let options = {
                minimumDate: null,
                maximumDate: _this.refs.jssj._getValue()
            };
            _this.refs.kssj._setOptions(options);
        }
    }

    _clear(type) {
        let _this = this;
        let options = {
            minimumDate: null,
            maximumDate: new Date()
        };
        if (type === "kssj") {
            _this.refs.kssj._setValue(null);
            _this.refs.jssj._setOptions(options);
        } else if (type === "jssj") {
            _this.refs.jssj._setValue(null);
            _this.refs.kssj._setOptions(options);
        }
    }

    _renderItem(props) {
        let _this = this;
        let {navigation} = _this.props;
        let lb = props.item.jclx;
        let jg = props.item.jcjg;
        let zddr = props.item.sfzddr;
        if (lb === "1") {
            lb = "定期检测";
        } else if (lb === "2") {
            lb = "抽查检测";
        }
        // return <Item bt={props.item.xm + "的" + lb}
        //              zddr={zddr}
        //              jg={jg}
        //              czsj={"检测时间:" + common.toYMDBYLONG(props.item.jcsj)}
        //              goto={()=>navigation.dispatch(NavigationActions.navigate({routeName:"dqjcEdit",params:{history:props.item}}))}/>
        return <ListItem
            containerStyle={{height: 75}}
            title={props.item.RWMC}
            subtitle={props.item.TOTAL + "条记录"}
            onPress={() => {
                console.warn(props.item.FORM_ID);
                // navigation.dispatch(NavigationActions.navigate({routeName: "dynamicsForm", params: {formId:props.item.FORM_ID}}))
            }}
            titleStyle={{fontSize: 16, color: "#333", paddingBottom: 4}}
            subtitleStyle={{fontSize: 14, color: "#999", paddingTop: 4}}
            leftElement={
                <View style={{justifyContent: "center", alignItems: "center", height: 50, width: 50, borderRadius: 25}}>
                    <Image source={{uri:Global.REQUEST_BASE_URL + '/medias/style/plat/image/dttb/案事件/'+ props.item.TBMC + '.png'}} style={{width: 50, height: 50}}/>
                </View>
            }
            badge={{value: '新增',containerStyle: {backgroundColor: '#FE922F'}, textStyle: {color: '#FFF'}, onPress:() => {
                    navigation.dispatch(NavigationActions.navigate({routeName: "dynamicsForm", params: {formId:props.item.FORM_ID}}))
                }
            }}
        />
    }

    //刷新
    _refreshing() {
        let _this = this;
        _this.props.setSearchName(null);
        // _this._clear("kssj");
        // _this._clear("jssj");
        _this.searchOption = {pageNum: 1, pageSize: 3, userId: _this.props.userId};
        let {setHistoryList} = _this.props;
        timingCheckAction.getHistoryList(_this.searchOption, [], setHistoryList);
    }

    //下一页
    _load() {
        this._getList();
    }

    _getList() {
        let _this = this;
        let {setHistoryList, isMax, rwdList} = _this.props;
        if (_this.first) {
            timingCheckAction.getHistoryList(_this.searchOption, [], _this.props.setHistoryList);
            _this.first = false;
        } else if (!isMax) {
            _this.searchOption.pageNum++;
            timingCheckAction.getHistoryList(_this.searchOption, rwdList, setHistoryList);
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

    _search() {
        let _this = this;
        _this.searchOption.kssj = _this.refs.kssj._getValue();
        _this.searchOption.jssj = _this.refs.jssj._getValue();
        _this.searchOption.name = _this.props.name;
        _this.searchOption.pageNum = 1;
        timingCheckAction.getHistoryList(_this.searchOption, [], _this.props.setHistoryList);
    }

    render() {
        let _this = this;
        let {showDatePicker, showPickerArea, rwdList, isMax, name, setSearchName} = _this.props;
        console.log(rwdList);
        // let header =
        //     <View style={[styles.history.header,showPickerArea ? null:{height:55}]}>
        //         <View style={styles.history.headerView}>
        //             <View style={styles.history.left}>
        //                 <View style={styles.history.leftView}><Text style={styles.history.leftText}>检测时间</Text></View>
        //                 <TouchableHighlight underlayColor="transparent" activeOpacity={0.5} onPress={()=>showDatePicker(!showPickerArea)}>
        //                     <View style={[styles.history.leftSvg,showPickerArea?styles.history.leftSvgShow:styles.history.leftSvgHide]}><Svg width={20} height={20} viewBox={"0 0 1024 1024"}>{IconLib.IC_TURNBOTTOM}</Svg></View>
        //                 </TouchableHighlight>
        //             </View>
        //             <View style={styles.history.right}>
        //                 <TextInput style={{flex:1}}
        //                            placeholder="输入吸毒人员姓名"
        //                            placeholderTextFontSize
        //                            editable={true}//是否可编辑
        //                            underlineColorAndroid ="transparent"
        //                            value={name}
        //                            onChangeText={(v)=>{
        //                                setSearchName(v);
        //                            }}//输入框改变触发的函数
        //                 />
        //                 <TouchableHighlight underlayColor="transparent" activeOpacity={0.5} onPress={()=>_this._search()} style={styles.history.rightSvg}>
        //                     <Svg width={24} height={24} viewBox={"0 0 1024 1024"}>{IconLib.IC_SEARCHER}</Svg>
        //                 </TouchableHighlight>
        //             </View>
        //         </View>
        //         <View>
        //             {/*<DatePicker ref="kssj" text="开始时间" minimumDate={null} maximumDate={new Date()} _clear={()=>_this._clear("kssj")} changeAfter={()=>_this._changeAfter("kssj")}/>*/}
        //             {/*<DatePicker ref="jssj" text="结束时间" minimumDate={null} maximumDate={new Date()} _clear={()=>_this._clear("jssj")} changeAfter={()=>_this._changeAfter("jssj")}/>*/}
        //         </View>
        //     </View>;
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    {/*<FlatList*/}
                    {/*ListFooterComponent={()=>{return <View style={styles.historyRow.footer}><Text style={styles.historyRow.footerText}>{isMax ? msg.end : msg.more}</Text></View>}}*/}
                    {/*// ListHeaderComponent={header}*/}
                    {/*keyboardShouldPersistTaps={"handled"}*/}
                    {/*ItemSeparatorComponent={()=> {return <View style={styles.historyRow.separator}/>}}*/}
                    {/*renderItem={(item,index) => _this._renderItem(item,index)}*/}
                    {/*onRefresh={() => _this._refreshing()}*/}
                    {/*refreshing={false}*/}
                    {/*onEndReachedThreshold={0.5}*/}
                    {/*onEndReached={() => _this._load()}*/}
                    {/*horizontal={false}*/}
                    {/*keyExtractor = {_this._key}*/}
                    {/*getItemLayout={(data, index) => (*/}
                    {/*{length: 70, offset: (70 + 2) * index, index}*/}
                    {/*)}*/}
                    {/*data={rwdList}>*/}
                    {/*</FlatList>*/}
                    <FlatList data={rwdList}
                        // renderItem={this._renderItem1}
                              renderItem={(item, index) => _this._renderItem(item, index)}
                              onRefresh={() => _this._refreshing()}
                              refreshing={false}
                              onEndReachedThreshold={0.5}
                              onEndReached={() => _this._load()}
                              keyExtractor={this._key}
                              ItemSeparatorComponent={this._separatorComponent}
                        // getItemLayout={(data, index) => (
                        //     {length: 70 + 1 / PixelRatio.get(), offset: 70 * index, index}
                        // )}
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
    valueTime: state.timingCheck.valueTime,
    // userId:state.loginIn.user.id,
    showPickerArea: state.timingCheck.showDatePicker,
    rwdList: state.timingCheck.rwdList,
    isMax: state.timingCheck.isMax,
    name: state.timingCheck.searchName
}), (dispatch) => ({
    // setValueTime:(time)=>dispatch(timingCheckAction.setValueTime(time)),
    showDatePicker: (bool) => dispatch(timingCheckAction.showDatePicker(bool)),
    setHistoryList: (list, bool) => dispatch(timingCheckAction.setRwdList(list, bool)),
    setSearchName: (name) => dispatch(timingCheckAction.setSearchName(name)),
}))(InitiateCollection2)
