import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground, Dimensions, Alert, AsyncStorage} from 'react-native';
import {Input, Button} from 'react-native-elements'
import ThemeStyle from '../../style/ThemeStyle'
import FetchUtil from "../../../../utils/FetchUtil";
import Global from "../../../../utils/Global";
import {StackActions, NavigationActions} from 'react-navigation';
import {storeAccount} from "../../../../utils/account";


import Icon from 'react-native-vector-icons/FontAwesome';
import * as accountAction from "../../actions/accountAction";
import {connect} from "react-redux";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../../assets/images/bg_screen1.jpg');

export class login extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            // fontLoaded: false,
            email: '',
            email_valid: true,
            password: '',
            login_failed: false,
            showLoading: false
        };
    }

    // async componentDidMount() {
    //     await Font.loadAsync({
    //         'georgia': require('../../../assets/fonts/Georgia.ttf'),
    //         'regular': require('../../../assets/fonts/Montserrat-Regular.ttf'),
    //         'light': require('../../../assets/fonts/Montserrat-Light.ttf'),
    //         'bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
    //     });
    //
    //     this.setState({ fontLoaded: true });
    // }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    submitLoginCredentials() {
        let {setAccount} = this.props;
        const {showLoading, password, email} = this.state;
        if (password && email) {
            this.setState({
                showLoading: !showLoading
            }, () => {
                let json = {
                    param: {
                        username: email, password: password, loginType: "Account"
                    }
                };
                let json2 = {username: email, password: password, loginType: "Account"};
                console.log(json2);
                FetchUtil.postJsonStr(Global.REQUEST_BASE_URL + "/loginValiApp", json2, (res) => {
                    if (res && res.success) {
                        setAccount(res.data);
                        storeAccount(res.data).then(() => this.props.navigation.navigate('App'));
                    }
                }, (error) => {
                    this.setState({
                        showLoading: false
                    },()=>{
                        Alert.alert("温馨提示", "用户名或者密码错误");
                    });
                }, () => {
                });
            });
        } else {
            alert("用户名密码为空");
        }
    }

    render() {
        const {email, password, email_valid, showLoading} = this.state;
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={BG_IMAGE}
                    style={styles.bgImage}
                >
                    <View style={styles.loginView}>
                        <View style={styles.loginTitle}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.travelText}>安顺大防控作战平台</Text>
                                {/*<Text style={styles.plusText}>+</Text>*/}
                            </View>
                            {/*<View style={{marginTop: -10}}>*/}
                                {/*<Text style={styles.travelText}>合成作战平台</Text>*/}
                            {/*</View>*/}
                        </View>
                        <View style={styles.loginInput}>
                            <Input
                                leftIcon={
                                    <Icon
                                        name='user-o'
                                        color='rgba(171, 189, 219, 1)'
                                        size={25}
                                    />
                                }
                                containerStyle={{marginVertical: 10}}
                                onChangeText={email => this.setState({email})}
                                value={email}
                                inputStyle={{marginLeft: 10, fontSize: 15, color: 'white'}}
                                keyboardAppearance="light"
                                placeholder="用户名"
                                autoFocus={false}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                returnKeyType="next"
                                ref={input => this.emailInput = input}
                                onSubmitEditing={() => {
                                    this.setState({email_valid: this.validateEmail(email)});
                                    this.passwordInput.focus();
                                }}
                                blurOnSubmit={false}
                                placeholderTextColor="white"
                                errorStyle={{textAlign: 'center', fontSize: 12}}
                                errorMessage={email_valid ? null : "Please enter a valid email address"}
                            />
                            <Input
                                leftIcon={
                                    <Icon
                                        name='lock'
                                        color='rgba(171, 189, 219, 1)'
                                        size={25}
                                    />
                                }
                                containerStyle={{marginVertical: 10}}
                                onChangeText={(password) => this.setState({password})}
                                value={password}
                                inputStyle={{marginLeft: 10, fontSize: 15, color: 'white'}}
                                secureTextEntry={true}
                                keyboardAppearance="light"
                                placeholder="密 码"
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="default"
                                returnKeyType="done"
                                ref={input => this.passwordInput = input}
                                blurOnSubmit={true}
                                placeholderTextColor="white"
                            />
                        </View>
                        <Button
                            title='登 录'
                            activeOpacity={0}
                            underlayColor="transparent"
                            onPress={this.submitLoginCredentials.bind(this)}
                            loading={showLoading}
                            loadingProps={{size: 'small', color: 'white'}}
                            disabled={!email_valid && password.length < 8}
                            buttonStyle={{height: 50, width: 300, borderRadius: 30, elevation: 0}}
                            containerStyle={{borderColor: 'white', elevation: 0}}
                            titleStyle={{fontWeight: 'bold', color: 'white'}}
                        />
                        <View style={styles.footerView}>
                            {/*<Text style={{color: 'grey'}}>*/}
                            {/*New here?*/}
                            {/*</Text>*/}
                            {/*<Button*/}
                            {/*title="Create an Account"*/}
                            {/*clear*/}
                            {/*activeOpacity={0.5}*/}
                            {/*titleStyle={{color: 'white', fontSize: 15}}*/}
                            {/*containerStyle={{marginTop: -10}}*/}
                            {/*onPress={() => console.log('Account created')}*/}
                            {/*/>*/}
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginView: {
        marginTop: 150,
        backgroundColor: 'transparent',
        width: 300,
        height: 400,
    },
    loginTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    travelText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'bold'
    },
    plusText: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'regular'
    },
    loginInput: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerView: {
        marginTop: 20,
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default connect(
    (state) => ({}),
    (dispatch) => ({
        setAccount: (data) => dispatch(accountAction.setAccount(data))
    })
)(login)