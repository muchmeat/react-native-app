import React, { Component } from 'react';
import {
    View,
    Text,
    ToastAndroid,
    AsyncStorage
} from 'react-native';

import { connect } from 'react-redux'; // 引入connect函数
import *as loginAction from '../actions/loginAction';
import themeStyle from '../style/ThemeStyle';
import LoginBtn from '../components/LoginBtn';
import { NavigationActions } from 'react-navigation';

/**
 * redux 与 navigator相关，参数：type
 */
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'App2'})
    ]
});

class LoginPage extends Component {

    static navigationOptions =()=>({
        header:null
    });

      componentWillMount(){
          this.userName = "";
          this.passWord = "";
      }

      componentWillUnmount(){

      }

      componentDidMount(){

      }

     /**
      * 函数默认直接返回true，表示默认直接出发dom更新：
      * 返回false，表示dom不更新：
      * @param nextProps
      * @param nextState
      * @returns {boolean}
      */
     shouldComponentUpdate(nextProps, nextState) {

         return true;
     }

     render() {
        let _this = this;
        return(
           <View style={{flex:1}}>
               <View style={{flex:1}}>
                   <Text>我是登录页面</Text>
               </View>
          </View>
        )
     }
}

/**
 * 先进入connect方法
 * 传递store
 * 此处的state参数是全局的,执行第一个方法等于对此页面的props赋值，第二个方法给页面的方法'赋值'
 */
export default connect(
  (state) => ({
      // status: state.loginIn.status
  }),
  (dispatch) => ({
      // login: (user) => dispatch(loginAction.login(user))
  })
)(LoginPage)
