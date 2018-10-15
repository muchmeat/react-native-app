/**
 * Created by zk on 2018/3/22.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux'; // 引入connect函数
import {
    Text,
    View,
    TouchableHighlight,
    Dimensions,
} from 'react-native';
import *as mainAction from '../actions/mainAction';

const height = Dimensions.get('window').height;
class Drawer extends Component {

    click(){
        const {user,_changeAge} = this.props;
        user.age = 18;
        user.name = "zk";
        const user2 = {name:"zk",age:18};
        // const user3 = user;
        _changeAge(user2)
    }



    render(){
        const {user} = this.props;
        return (
            <View style={{flex:1}}>
                <View style={{height:height * 0.4,backgroundColor:"green",borderBottomWidth:1,borderColor:"#FFF",justifyContent:"flex-end",alignItems:"flex-start"}}>
                    <View style={{height:60,marginLeft:20,justifyContent:"center",alignItems:"center",}}>
                        <Text style={{color:"#fff"}} onPress={()=>{alert(user.age)}}>欢迎您：{user.name}</Text>
                        <Text style={{color:"#fff"}}>年龄：{user.age}</Text>
                    </View>
                </View>
                <TouchableHighlight style={{flex:1}} onPress={this.click.bind(this)} underlayColor={"#fff"} activeOpacity={0.8}>
                    <View></View>
                </TouchableHighlight>
            </View>);
    }
}


export default connect(
    (store)=>({
        user: store.loginIn.user
    }),
    (dispatch)=>({
        _changeAge: (user) => dispatch(mainAction.changeAge(user)),
    })
)(Drawer);
