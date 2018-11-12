/**
 * Created by Administrator on 2018/11/7.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View, AsyncStorage
} from 'react-native';
import FetchUtil from "../../utils/FetchUtil";
import configAppNavigator from './App';

class Router extends Component {
    state = {
        checkedLogin: false
    };

    componentDidMount() {
        // refreshToken()
        //     .then(() => self.setState({ checkedLogin: true, isLoggedIn: true }))
        //     .catch(err => {
        //         console.log(err);
        //         self.setState({
        //             checkedLogin: true,
        //             isLoggedIn: false
        //         });
        //     });
        AsyncStorage.getItem("token", (error, user) => {
                let json = {
                    username: 'plat', password: '111', loginType: 'APP'
                };
                FetchUtil.postJsonEntity("http://172.28.1.20:8082/plat/tokenVali?token=" + user, json, (res)=> {
                    if (res && res == "SUCCESS") {
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