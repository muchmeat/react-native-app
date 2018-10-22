/**
 * Created by zhangkun on 2018/4/12.
 */
import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    PixelRatio
} from 'react-native';
import IconLib from "../../assets/svg/IconLib";
import Svg from 'react-native-svg';
import {connect} from "react-redux";

 class Tab extends Component {

    renderItem = (route, index) => {
        let _this = this;
        const {
            navigation,
            jumpToIndex
        } = _this.props;

        const focused = index === navigation.state.index;
        const color = focused ? _this.props.activeTintColor : _this.props.inactiveTintColor;
        let TabScene = {
            focused:focused,
            route:route,
            tintColor:color
        };
        return (
            <TouchableOpacity
                key={index}
                style={[styles.tabItem]}
                onPress={() => {
                    jumpToIndex(index)
                }}
            >
                <View
                    style={styles.tabItem}>
                    {focused ? iconsFouces[index]:icons[index]}
                    <Text style={{ ...styles.tabText,marginTop:3,color }}>{this.props.getLabel(TabScene)}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    render(){
        const {navigation} = this.props;
        const {routes} = navigation.state;  //[{key:1,routeName:"1"},..]
        return (<View style={{width:WIDTH,backgroundColor:"#F5F5F9",borderTopWidth:1/PixelRatio.get(),borderColor:"#8b8b8b"}}>
                    <View style={styles.tab}>
                        {routes && routes.map((route,index) => this.renderItem(route, index))}
                    </View>
                </View>);
    }
}

const WIDTH = Dimensions.get('window').width;

const icons = [
    <Svg height={24} width={24} viewBox="0 0 1024 1024">{IconLib.TAB_ONE}</Svg>,
    <Svg height={24} width={24} viewBox="0 0 1024 1024">{IconLib.TAB_TWO}</Svg>,
    <Svg height={24} width={24} viewBox="0 0 1024 1024">{IconLib.TAB_THREE}</Svg>,
    <Svg height={24} width={24} viewBox="0 0 1024 1024">{IconLib.TAB_FIVE}</Svg>
];

const iconsFouces = [
    <Svg height={24} width={24} viewBox="0 0 1024 1024">{IconLib.TAB_ONE2}</Svg>,
    <Svg height={24} width={24} viewBox="0 0 1024 1024">{IconLib.TAB_TWO2}</Svg>,
    <Svg height={24} width={24} viewBox="0 0 1024 1024">{IconLib.TAB_THREE2}</Svg>,
    <Svg height={24} width={24} viewBox="0 0 1024 1024">{IconLib.TAB_FIVE2}</Svg>
];

const styles = {
    tab:{
        width:WIDTH,
        backgroundColor:'transparent',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'flex-end'
    },
    tabItem:{
        height:55,
        width:100,
        alignItems:'center',
        justifyContent:'center'
    },
    tabText:{
        marginTop:5,
        fontSize:13
    },
    tabTextChoose:{
        color:"#ccc"
    }
}

export default connect(
    (state)=>({

    }),(dispatch)=>({

    })
)(Tab);