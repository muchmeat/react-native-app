import React, { Component } from 'react'
import {
  Alert,
  LayoutAnimation,
  TouchableOpacity,
  Dimensions,
  Image,
  UIManager,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native'
// import { Font } from 'expo'
import { Input, Button } from 'react-native-elements'
import ThemeStyle from '../../style/ThemeStyle';
import Icon from 'react-native-vector-icons/SimpleLineIcons'

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true)

const USER_COOL = require('../../../assets/images/user-cool.png')
const USER_STUDENT = require('../../../assets/images/user-student.png')
const USER_HP = require('../../../assets/images/user-hp.png')

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class LoginScreen2 extends Component {

  static navigationOptions = {
    title: '登录-2',
    headerStyle: {
      backgroundColor:ThemeStyle.color.theme,
      height:50
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff', fontSize: 16
    },
  };
    // static navigationOptions =()=>({
    //     drawerLabel:'登录页二',
    //     header:null
    // });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      selectedType: null,
      // fontLoaded: false,
      username: '',
      email: '',
      password: '',
      confirmationPassword: '',
      emailValid: true,
      passwordValid: true,
      usernameValid: true,
      confirmationPasswordValid: true,
    }

    this.setSelectedType = this.setSelectedType.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.validatePassword = this.validatePassword.bind(this)
    this.validateConfirmationPassword = this.validateConfirmationPassword.bind(
      this,
    )
    this.signup = this.signup.bind(this)
  }

  // async componentDidMount() {
  //   await Font.loadAsync({
  //     light: require('../../../assets/fonts/Ubuntu-Light.ttf'),
  //     bold: require('../../../assets/fonts/Ubuntu-Bold.ttf'),
  //     lightitalic: require('../../../assets/fonts/Ubuntu-Light-Italic.ttf'),
  //   })
  //
  //   this.setState({ fontLoaded: true })
  // }

  signup() {
    LayoutAnimation.easeInEaseOut()
    const usernameValid = this.validateUsername()
    const emailValid = this.validateEmail()
    const passwordValid = this.validatePassword()
    const confirmationPasswordValid = this.validateConfirmationPassword()
    if (
      emailValid &&
      passwordValid &&
      confirmationPasswordValid &&
      usernameValid
    ) {
      this.setState({ isLoading: true })
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut()
        this.setState({ isLoading: false })
        Alert.alert('🎸', 'You rock')
      }, 1500)
    }
  }

  validateUsername() {
    const { username } = this.state
    const usernameValid = username.length > 0
    LayoutAnimation.easeInEaseOut()
    this.setState({ usernameValid })
    usernameValid || this.usernameInput.shake()
    return usernameValid
  }

  validateEmail() {
    const { email } = this.state
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const emailValid = re.test(email)
    LayoutAnimation.easeInEaseOut()
    this.setState({ emailValid })
    emailValid || this.emailInput.shake()
    return emailValid
  }

  validatePassword() {
    const { password } = this.state
    const passwordValid = password.length >= 8
    LayoutAnimation.easeInEaseOut()
    this.setState({ passwordValid })
    passwordValid || this.passwordInput.shake()
    return passwordValid
  }

  validateConfirmationPassword() {
    const { password, confirmationPassword } = this.state
    const confirmationPasswordValid = password === confirmationPassword
    LayoutAnimation.easeInEaseOut()
    this.setState({ confirmationPasswordValid })
    confirmationPasswordValid || this.confirmationPasswordInput.shake()
    return confirmationPasswordValid
  }

  setSelectedType = selectedType =>
    LayoutAnimation.easeInEaseOut() || this.setState({ selectedType })

  render() {
    const {
      isLoading,
      selectedType,
      confirmationPassword,
      email,
      emailValid,
      password,
      passwordValid,
      confirmationPasswordValid,
      username,
      usernameValid,
    } = this.state

    return  <ScrollView
			scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.container}
        >
          <KeyboardAvoidingView
            behavior="position"
            contentContainerStyle={styles.formContainer}
          >
            <Text style={styles.signUpText}>选择身份</Text>
            {/*<Text style={styles.whoAreYouText}>你 是 谁 ?</Text>*/}
            <View style={styles.userTypesContainer}>
              <UserTypeItem
                label="物业人员"
                labelColor="#ECC841"
                image={USER_COOL}
                onPress={() => this.setSelectedType('parent')}
                selected={selectedType === 'parent'}
              />
              <UserTypeItem
                label="小区用户"
                labelColor="#2CA75E"
                image={USER_STUDENT}
                onPress={() => this.setSelectedType('child')}
                selected={selectedType === 'child'}
              />
              <UserTypeItem
                label="公安干事"
                labelColor="#36717F"
                image={USER_HP}
                onPress={() => this.setSelectedType('teacher')}
                selected={selectedType === 'teacher'}
              />
            </View>
            <View style={{width: '80%', alignItems: 'center'}}>
              <FormInput
                refInput={input => (this.usernameInput = input)}
                icon="user"
                value={username}
                onChangeText={username => this.setState({ username })}
                placeholder="用户名/警号"
                returnKeyType="next"
                errorMessage={usernameValid ? null : 'Your username can\'t be blank'}
                onSubmitEditing={() => {
                  this.validateUsername()
                  this.emailInput.focus()
                }}
              />
              <FormInput
                refInput={input => (this.emailInput = input)}
                icon="envelope"
                value={email}
                onChangeText={email => this.setState({ email })}
                placeholder="邮箱"
                keyboardType="email-address"
                returnKeyType="next"
                errorMessage={emailValid ? null : 'Please enter a valid email address'}
                onSubmitEditing={() => {
                  this.validateEmail()
                  this.passwordInput.focus()
                }}
              />
              <FormInput
                refInput={input => (this.passwordInput = input)}
                icon="lock"
                value={password}
                onChangeText={password => this.setState({ password })}
                placeholder="密码"
                secureTextEntry
                returnKeyType="next"
                errorMessage={passwordValid ? null : 'Please enter at least 8 characters'}
                onSubmitEditing={() => {
                  this.validatePassword()
                  this.confirmationPasswordInput.focus()
                }}
              />
              <FormInput
                refInput={input => (this.confirmationPasswordInput = input)}
                icon="lock"
                value={confirmationPassword}
                onChangeText={confirmationPassword =>
                  this.setState({ confirmationPassword })}
                placeholder="确认密码"
                secureTextEntry
                errorMessage={confirmationPasswordValid ? null : 'The password fields are not identics'}
                returnKeyType="go"
                onSubmitEditing={() => {
                  this.validateConfirmationPassword()
                  this.signup()
                }}
              />
            </View>
            <Button
              loading={isLoading}
              title="保 存"
              containerStyle={{ flex: -1 }}
              buttonStyle={styles.signUpButton}
              // linearGradientProps={{
              //   colors: ['#FF9800', '#F44336'],
              //   start: 1,
              //   end: 0.2,
              // }}
              titleStyle={styles.signUpButtonText}
              onPress={this.signup}
              disabled={isLoading}
            />
          </KeyboardAvoidingView>
          <View style={styles.loginHereContainer}>
            <Text style={styles.alreadyAccountText}>
              已经注册过了 点此
            </Text>
            <Button
              title="登 录"
              titleStyle={styles.loginHereText}
              containerStyle={{ flex: -1 }}
              buttonStyle={{ backgroundColor: 'transparent',elevation:0 }}
              underlayColor="transparent"
              onPress={() => Alert.alert('🔥', 'You can login here')}
            />
          </View>
        </ScrollView>
  }
}

export const UserTypeItem = props => {
  const { image, label, labelColor, selected, ...attributes } = props
  return (
    <TouchableOpacity {...attributes}>
      <View
        style={[
          styles.userTypeItemContainer,
          selected && styles.userTypeItemContainerSelected,
        ]}
      >
        <Text style={[styles.userTypeLabel, { color: labelColor }]}>
          {label}
        </Text>
        <Image
          source={image}
          style={[
            styles.userTypeMugshot,
            selected && styles.userTypeMugshotSelected,
          ]}
        />
      </View>
    </TouchableOpacity>
  )
}

export const FormInput = props => {
  const { icon, refInput, ...otherProps } = props
  return (
    <Input
      {...otherProps}
      ref={refInput}
      inputContainerStyle={styles.inputContainer}
      leftIcon={<Icon name={icon} color="#7384B4" size={18} />}
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
    paddingLeft: 8,
    borderRadius: 40,
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
    elevation:0
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
