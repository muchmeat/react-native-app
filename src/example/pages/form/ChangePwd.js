import React, {Component} from 'react'
import {
    Alert,
    LayoutAnimation,
    TouchableOpacity,
    Dimensions,
    Image,
    ToastAndroid,
    StyleSheet,
    ScrollView,
    Text,
    View
} from 'react-native'
import {Input, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import FetchUtil from "../../../../utils/FetchUtil";
import Global from "../../../../utils/Global";
import * as types from "../../constants/formTypes";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class ChangePwd extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            show2: false,
            show3: false,
            isLoading: false,
            password: '',
            oldPassword: '',
            confirmationPassword: '',
            passwordValid: true,
            oldPasswordValid: true,
            confirmationPasswordValid: true,
            confirmationPasswordSameValid: false
        }

        this.validatePassword = this.validatePassword.bind(this)
        this.validateOldPassword = this.validateOldPassword.bind(this)
        this.validateConfirmationPassword = this.validateConfirmationPassword.bind(this)
        this.confirmationPasswordSameValid = this.confirmationPasswordSameValid.bind(this)
        this.changePwd = this.changePwd.bind(this)
    }

    changePwd() {
        LayoutAnimation.easeInEaseOut();
        const passwordValid = this.validatePassword()
        const oldPasswordValid = this.validateOldPassword()
        const confirmationPasswordValid = this.validateConfirmationPassword()
        const confirmationPasswordSameValid = this.confirmationPasswordSameValid()
        if (
            passwordValid &&
            confirmationPasswordValid &&
            oldPasswordValid &&
            !confirmationPasswordSameValid
        ) {
            this.setState({isLoading: true});
            const {password, oldPassword} = this.state;
            let json = {
                oldPwd: oldPassword,
                newPwd: password
            }
            FetchUtil.postJsonParams(Global.REQUEST_BASE_URL + "/main/changePwd", json, (response) => {
                this.setState({isLoading: false});
                console.warn(response);
                ToastAndroid.show("修改成功", ToastAndroid.SHORT);
                this.props.navigation.goBack();
            }, (error) => {
                console.warn(error);
                Alert.alert("温馨提示", "密码修改失败，请联系管理员");
                this.setState({isLoading: false});
            }, () => {
            })
            // setTimeout(() => {
            //     LayoutAnimation.easeInEaseOut()
            //     this.setState({isLoading: false})
            //     Alert.alert('🎸', 'You rock')
            // }, 1500)
        }
    }

    validatePassword() {
        const {password} = this.state
        const passwordValid = password.length >= 3
        LayoutAnimation.easeInEaseOut()
        this.setState({passwordValid})
        passwordValid || this.passwordInput.shake()
        return passwordValid
    }

    validateOldPassword() {
        const {oldPassword} = this.state
        const oldPasswordValid = oldPassword.length >= 3
        LayoutAnimation.easeInEaseOut()
        this.setState({oldPasswordValid})
        oldPasswordValid || this.oldPasswordInput.shake()
        return oldPasswordValid
    }

    validateConfirmationPassword() {
        const {password, confirmationPassword} = this.state
        const confirmationPasswordValid = password === confirmationPassword
        LayoutAnimation.easeInEaseOut()
        this.setState({confirmationPasswordValid})
        confirmationPasswordValid || this.confirmationPasswordInput.shake()
        return confirmationPasswordValid
    }

    confirmationPasswordSameValid() {
        const {password, oldPassword} = this.state
        const confirmationPasswordSameValid = password === oldPassword
        LayoutAnimation.easeInEaseOut()
        this.setState({confirmationPasswordSameValid})
        !confirmationPasswordSameValid || this.passwordInput.shake()
        return confirmationPasswordSameValid
    }

    render() {
        const {
            isLoading,
            confirmationPassword,
            password,
            oldPassword,
            passwordValid,
            oldPasswordValid,
            confirmationPasswordValid,
            confirmationPasswordSameValid,
        } = this.state

        return <ScrollView
            scrollEnabled={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.container}
        >
            <Text style={styles.signUpText}>修改密码</Text>
            <View style={{width: '80%', alignItems: 'center'}}>
                <FormInput
                    refInput={input => (this.oldPasswordInput = input)}
                    icon={this.state.show ? "lock-open" : "lock"}
                    leftPress={() => {
                        this.setState({show: !this.state.show})
                    }}
                    rightPress={() => {
                        this.setState({oldPassword: ""})
                    }}
                    value={oldPassword}
                    onChangeText={oldPassword => this.setState({oldPassword})}
                    placeholder="原密码"
                    secureTextEntry={!this.state.show}
                    returnKeyType="next"
                    errorMessage={oldPasswordValid ? null : '请至少输入3个字符'}
                    onSubmitEditing={() => {
                        this.validateOldPassword()
                    }}
                />
                <FormInput
                    refInput={input => (this.passwordInput = input)}
                    icon={this.state.show2 ? "lock-open" : "lock"}
                    leftPress={() => {
                        this.setState({show2: !this.state.show2})
                    }}
                    rightPress={() => {
                        this.setState({password: ""})
                    }}
                    value={password}
                    onChangeText={password => this.setState({password})}
                    placeholder="新密码"
                    secureTextEntry={!this.state.show2}
                    returnKeyType="next"
                    errorMessage={passwordValid ? confirmationPasswordSameValid ? "新密码不能与旧密码相同" : null : '请至少输入3个字符'}
                    onSubmitEditing={() => {
                        this.validatePassword()
                        this.confirmationPasswordInput.focus()
                    }}
                />
                <FormInput
                    refInput={input => (this.confirmationPasswordInput = input)}
                    icon={this.state.show3 ? "lock-open" : "lock"}
                    leftPress={() => {
                        this.setState({show3: !this.state.show3})
                    }}
                    rightPress={() => {
                        this.setState({confirmationPassword: ""})
                    }}
                    value={confirmationPassword}
                    onChangeText={confirmationPassword =>
                        this.setState({confirmationPassword})}
                    placeholder="确认密码"
                    secureTextEntry={!this.state.show3}
                    errorMessage={confirmationPasswordValid ? null : '密码不一致'}
                    returnKeyType="go"
                    onSubmitEditing={() => {
                        this.validateConfirmationPassword()
                        this.changePwd()
                    }}
                />
            </View>
            <Button
                loading={isLoading}
                title="确 认 修 改"
                containerStyle={{flex: -1}}
                buttonStyle={styles.signUpButton}
                titleStyle={styles.signUpButtonText}
                onPress={this.changePwd}
                disabled={isLoading}
            />
        </ScrollView>
    }
}

export const FormInput = props => {
    const {icon, refInput, leftPress, rightPress, ...otherProps} = props
    return (
        <Input
            {...otherProps}
            ref={refInput}
            inputContainerStyle={styles.inputContainer}
            leftIcon={<Icon name={icon} color="#7384B4" size={18} onPress={leftPress}/>}
            rightIcon={<Icon name={"close"} color="#7384B4" size={22} onPress={rightPress}/>}
            inputStyle={styles.inputStyle}
            autoFocus={false}
            autoCapitalize="none"
            keyboardAppearance="dark"
            errorStyle={styles.errorInputStyle}
            autoCorrect={false}
            blurOnSubmit={false}
            placeholderTextColor="#7384B4"
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
        paddingTop: 20,
        backgroundColor: '#293046',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    signUpText: {
        color: 'white',
        fontSize: 28,
        fontFamily: 'light',
    },
    whoAreYouText: {
        color: '#7384B4',
        fontFamily: 'bold',
        fontSize: 14,
    },
    userTypesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: SCREEN_WIDTH,
        alignItems: 'center',
    },
    userTypeItemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5,
    },
    userTypeItemContainerSelected: {
        opacity: 1,
    },
    userTypeMugshot: {
        margin: 4,
        height: 70,
        width: 70,
    },
    userTypeMugshotSelected: {
        height: 100,
        width: 100,
    },
    userTypeLabel: {
        color: 'yellow',
        fontFamily: 'bold',
        fontSize: 11,
    },
    inputContainer: {
        paddingHorizontal: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(110, 120, 170, 1)',
        height: 45,
        marginVertical: 10,
    },
    inputStyle: {
        flex: 1,
        marginLeft: 10,
        color: 'white',
        fontFamily: 'light',
        fontSize: 16,
    },
    errorInputStyle: {
        marginTop: 0,
        textAlign: 'center',
        color: '#F44336',
    },
    signUpButtonText: {
        fontFamily: 'bold',
        fontSize: 13,
    },
    signUpButton: {
        width: 250,
        borderRadius: 50,
        height: 45,
        elevation: 0
    },
    loginHereContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    alreadyAccountText: {
        fontFamily: 'lightitalic',
        fontSize: 12,
        color: 'white',
    },
    loginHereText: {
        color: '#FF9800',
        fontFamily: 'lightitalic',
        fontSize: 12,
    },
})
