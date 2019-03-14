import React, {Component} from 'react';
import {StyleSheet, View, TextInput, ScrollView, FlatList, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from "react-native-vector-icons/Feather";
import {breadthFirstRecursion, recursionTreeUnChecked} from '../../util';
import formStyle from "../../stylesheets/formStyle";

const treeSelectStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    textName: {
        fontSize: 14,
        marginLeft: 5,
        marginRight: 50
    },
    contentContainer: {
        paddingBottom: 20,
        backgroundColor: 'white',
    },
    collapseIcon: {
        width: 0,
        height: 0,
        marginRight: 2,
        borderStyle: 'solid',
    }
});

export default class TreeSelect2 extends Component {
    constructor(props) {
        super(props);
        this.routes = [];
        this.state = {
            nodesStatus: this._initNodesStatus(),
            nodesCheckedStatus: this._initNodesCheckedStatus(),
            currentNode: null,
            searchValue: ''
        };
    }

    _initNodesStatus = () => {
        const {isOpen = false, data, openIds = []} = this.props;
        const nodesStatus = new Map();
        if (!isOpen) {
            if (openIds && openIds.length) {
                for (let id of openIds) { // eslint-disable-line
                    const routes = this._find(data, id);
                    routes.map(parent => nodesStatus.set(parent.id, false));
                }
            }
            return nodesStatus;
        }
        breadthFirstRecursion(data).map(item => {
            //默认展开到第二层级
            if (item.children && item.children.length > 0 && "o_" === item.pId) {
                nodesStatus.set(item.id, true);
            } else {
                nodesStatus.set(item.id, false);
            }
        });
        return nodesStatus;
    };

    _initNodesCheckedStatus = () => {
        const {data} = this.props;
        const nodesCheckedStatus = new Map();
        breadthFirstRecursion(data).map(item => {
            nodesCheckedStatus.set(item.id, item.checked);
        });
        return nodesCheckedStatus;
    };

    _find = (data, id) => {
        const stack = [];
        let going = true;

        const walker = (childrenData, innerId) => {
            childrenData.forEach(item => {
                if (!going) return;
                stack.push({
                    id: item.id,
                    name: item.name,
                    pId: item.pId
                });
                if (item['id'] === innerId) {
                    going = false;
                } else if (item['children']) {
                    walker(item['children'], innerId);
                } else {
                    stack.pop();
                }
            });
            if (going) stack.pop();
        };

        walker(data, id);
        return stack;
    };

    //节点 展开与收起
    _onPressCollapse = ({e, item}) => {
        this.setState((state) => {
                const nodesStatus = new Map(state.nodesStatus);
                nodesStatus.set(item && item.id, !nodesStatus.get(item && item.id)); // toggle
                return {
                    currentNode: item.id,
                    nodesStatus
                };
            }
        );
    };

    //叶子节点
    _onClickLeaf = ({e, item}) => { // eslint-disable-line
        const {onClickLeaf, onClick, isSingle} = this.props;
        const {data} = this.props;
        const routes = this._find(data, item.id);
        this.setState((state) => {
            const nodesCheckedStatus = new Map(state.nodesCheckedStatus);
            if (isSingle) {
                for (let key of nodesCheckedStatus.keys()) {
                    nodesCheckedStatus.set(key, false);
                }
            }
            nodesCheckedStatus.set(item.id, !nodesCheckedStatus.get(item.id));
            return {
                currentNode: item.id,
                nodesCheckedStatus
            };
        }, () => {
            if (isSingle) {
                recursionTreeUnChecked(data);
            }
            item.checked = !item.checked;
            onClick && onClick(item, routes);
            // onClickLeaf && onClickLeaf({item, routes});
        });
    };

    //节点处的图标样式
    _renderTreeNodeIcon = (isOpen) => {
        const {isShowTreeId = false, selectedItemStyle, itemStyle, treeNodeStyle} = this.props;
        const collapseIcon = isOpen ? {
            borderRightWidth: 5,
            borderRightColor: 'transparent',
            borderLeftWidth: 5,
            borderLeftColor: 'transparent',
            borderTopWidth: 10,
            borderTopColor: 'black',
        } : {
            borderBottomWidth: 5,
            borderBottomColor: 'transparent',
            borderTopWidth: 5,
            borderTopColor: 'transparent',
            borderLeftWidth: 10,
            borderLeftColor: 'black',
        };
        const openIcon = treeNodeStyle && treeNodeStyle.openIcon;
        const closeIcon = treeNodeStyle && treeNodeStyle.closeIcon;

        return openIcon && closeIcon ? <View>{isOpen ? openIcon : closeIcon}</View> :
            <View style={[treeSelectStyles.collapseIcon, collapseIcon]}/>;
    };

    _renderRow = ({item}) => {
        const {isShowTreeId = false, isSingle, selectedItemStyle, itemStyle, treeNodeStyle} = this.props;
        const {backgroundColor, fontSize, color} = itemStyle && itemStyle;
        const openIcon = treeNodeStyle && treeNodeStyle.openIcon;
        const closeIcon = treeNodeStyle && treeNodeStyle.closeIcon;

        const selectedBackgroundColor = selectedItemStyle && selectedItemStyle.backgroundColor;
        const selectedFontSize = selectedItemStyle && selectedItemStyle.fontSize;
        const selectedColor = selectedItemStyle && selectedItemStyle.color;
        const isCurrentNode = this.state.currentNode === item.id;

        if (item && item.children && item.children.length) {
            const isOpen = this.state.nodesStatus && this.state.nodesStatus.get(item && item.id) || false;
            return (
                <View style={{flex: 1}}>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: isCurrentNode ? selectedBackgroundColor || '#FFEDCE' : backgroundColor || '#fff',
                        marginBottom: 2,
                        height: 30,
                        alignItems: 'center'
                    }}
                    >
                        <TouchableOpacity onPress={(e) => this._onPressCollapse({e, item})}>
                            {this._renderTreeNodeIcon(isOpen)}
                        </TouchableOpacity>
                        {
                            isShowTreeId && <Text style={{fontSize: 14, marginLeft: 4}}>{item.id}</Text>
                        }
                        <TouchableOpacity activeOpacity={1}
                                          onPress={(e) => {
                                              this._onClickLeaf({e, item})
                                          }}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{marginHorizontal: 3}}>
                                    <Icon size={20}
                                          name={this.state.nodesCheckedStatus.get(item.id) ? isSingle ? "check-circle" : "check-square" : isSingle ? "circle" : "square"}
                                          color={formStyle.picker.checkColor}/>
                                </View>
                                <Text style={[treeSelectStyles.textName, isCurrentNode ?
                                    {fontSize: selectedFontSize, color: selectedColor} : {
                                        fontSize,
                                        color
                                    }]}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {
                        !isOpen ? null :
                            <FlatList
                                keyExtractor={(childrenItem, i) => i.toString()}
                                style={{flex: 1, marginLeft: 15}}
                                onEndReachedThreshold={0.5}
                                {...this.props}
                                data={item.children}
                                extraData={this.state}
                                renderItem={this._renderRow}
                            />
                    }
                </View>
            );
        }
        return (
            <TouchableOpacity onPress={(e) => this._onClickLeaf({e, item})}>
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: isCurrentNode ? selectedBackgroundColor || '#FFEDCE' : backgroundColor || '#fff',
                    marginBottom: 2,
                    height: 30,
                    alignItems: 'center',
                    marginLeft: 15
                }}
                >
                    <View style={{marginHorizontal: 3}}>
                        <Icon size={20}
                              // name={this.state.nodesCheckedStatus.get(item.id) ? "check-square" : "square"}
                              name={this.state.nodesCheckedStatus.get(item.id) ? isSingle ? "check-circle" : "check-square" : isSingle ? "circle" : "square"}
                              color={formStyle.picker.checkColor}/>
                    </View>
                    <Text
                        style={[treeSelectStyles.textName, isCurrentNode ?
                            {fontSize: selectedFontSize, color: selectedColor} : {fontSize, color}]}
                    >{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    _onSearch = () => {
        const {searchValue} = this.state;

    };

    _onChangeText = (key, value) => {
        this.setState({
            [key]: value
        });
    };

    _renderSearchBar = () => {
        const {searchValue} = this.state;
        return (
            <View style={{
                flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 5,
                borderColor: '#555', marginHorizontal: 10,
            }}>
                <TextInput
                    style={{height: 38, paddingHorizontal: 5, flex: 1}}
                    value={searchValue}
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    autoCorrect={false}
                    blurOnSubmit
                    clearButtonMode="while-editing"
                    placeholder="搜索节点"
                    placeholderTextColor="#e9e5e1"
                    onChangeText={(text) => this._onChangeText('searchValue', text)}
                />
                <TouchableOpacity onPress={this._onSearch}>
                    <Ionicons name="ios-search" style={{fontSize: 25, marginHorizontal: 5}}/>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        const {data} = this.props;
        return (
            <View style={treeSelectStyles.container}>
                <FlatList
                    keyExtractor={(item, i) => i.toString()}
                    style={{flex: 1, marginVertical: 5, paddingHorizontal: 15}}
                    onEndReachedThreshold={0.01}
                    {...this.props}
                    data={data}
                    extraData={this.state}
                    renderItem={this._renderRow}
                />
            </View>
        );
    }
}
