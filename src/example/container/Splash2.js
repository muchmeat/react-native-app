import {Component} from "react";
import SplashScreen from "react-native-splash-screen";
import FetchUtil from "../../../utils/FetchUtil";
import {storeAccount} from "../../../utils/account";
import Global from "../../../utils/Global";
import {ToastAndroid, NativeModules, Alert} from "react-native";
import * as accountAction from "../actions/accountAction";
import {connect} from "react-redux";
import {login} from "../pages/login/login";

export default class Splash extends Component {
    constructor(props) {
        super(props);
        // this._bootstrapSSOAsync();
        this._bootstrapAsync()
    }

    _bootstrapAsync() {
        FetchUtil.postJsonStr(Global.REQUEST_BASE_URL + "/tokenVali", {}, (res) => {
            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            if (res && res.success) {
                storeAccount(res.data).then(() => this.props.navigation.navigate('App'));
            } else {
                this.props.navigation.navigate('Auth');
            }
            SplashScreen.hide();
        }, (error) => {
            this.props.navigation.navigate('Auth');
            // ToastAndroid.show("没有token信息 ", ToastAndroid.SHORT);
            SplashScreen.hide();
        }, () => {
        });
    };

    /**
     * 单点登录，不走登录login页面
     * @private
     */
    _bootstrapSSOAsync() {
        NativeModules.IntentModule.getDataFromIntent(
            (successMsg) => {
                console.warn("getDataFromIntent:" + successMsg);
                alert(successMsg);
                let json = {username: "plat", loginType: "Account"};
                FetchUtil.postJsonStr(Global.REQUEST_BASE_URL + "/loginSSOApp", json, (res) => {
                    // if (res && res.success) {
                    //     storeAccount(res.data).then(() => this.props.navigation.navigate('App'));
                    // }else{
                    //     this.props.navigation.navigate('Auth');
                    // }
                    //暂时为了验证通道打通
                    this.props.navigation.navigate('Auth');
                    SplashScreen.hide();
                }, (error) => {
                    Alert.alert("温馨提示", "登录异常，请联系管理员");
                }, () => {
                });
            }, (errMsg) => {
                alert(errMsg)
            }
        );


    };


    render() {
        return null;
    }

}