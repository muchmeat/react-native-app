/**
 * Created by Administrator on 2018/11/7.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View, AsyncStorage
} from 'react-native';
import FetchUtil from "../../utils/FetchUtil";
import Global from "../../utils/Global";
import configAppNavigator from './App';

class Router extends Component {
    state = {
        checkedLogin: false
    };

    componentDidMount() {
        AsyncStorage.getItem("token", (error, user) => {
                let json = {
                    token:user
                };
                FetchUtil.postJsonStr1(Global.REQUEST_BASE_URL+"/tokenVali", json, (res)=> {
                    if (res && res.success) {
                        this.setState({checkedLogin: true, isLoggedIn: true})
                    } else {
                        this.setState({
                            checkedLogin: true,
                            isLoggedIn: false
                        });
                    }
                }, (error)=> {
                    this.setState({
                        checkedLogin: true,
                        isLoggedIn: false
                    });
                }, ()=> {
                    this.setState({
                        checkedLogin: true,
                        isLoggedIn: false
                    });
                });
        })

    }

    render() {
        const {checkedLogin, isLoggedIn} = this.state;
        if (!checkedLogin) {
            return null;
        }
        const AppNavigator = configAppNavigator(isLoggedIn);
        return (
            <View style={styles.container}>
                <AppNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Router;