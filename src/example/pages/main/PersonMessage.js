import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux'; // 引入connect函数
import {NavigationActions} from 'react-navigation';
import {Avatar, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import styles from '../../style/ThemeStyle';
import Global from "../../../../utils/Global";
import FetchUtil from "../../../../utils/FetchUtil";

class PersonMessage extends Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: "我的"
    });

    render() {
        let {user} = this.props;
        return (
            <View style={[styles.container, {justifyContent: "center", alignItems: "center"}]}>
                <Avatar
                    size="xlarge"
                    rounded
                    // source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
                    source={{uri: Global.FILE_BYTE_URL + "440"}}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                />
                <View style={PmStyles.containerStyle}>
                    <Text style={PmStyles.titleStyle}>{user ? user.dftDeptName : '未知'}</Text>
                </View>
                <View style={PmStyles.containerStyle}>
                    <Text style={PmStyles.titleStyle}>用户名:{user ? user.name : '未知'}</Text>
                    {/*<Text style={PmStyles.titleStyle}>用户名:10010</Text>*/}
                </View>
                <View style={PmStyles.containerStyle}>
                    <Text style={PmStyles.titleStyle}>修改密码</Text>
                    <Icon
                        name='note'
                        color='#2B96F9'
                        size={20}
                        onPress={() => {
                            this.props.navigation.dispatch(NavigationActions.navigate({routeName: "ChangePwd"}))
                        }}
                    />
                </View>
                <View style={PmStyles.containerStyle}>
                    <TouchableOpacity onPress={() => {
                        FetchUtil.postJsonStr(Global.REQUEST_BASE_URL + "/logoutApp", {}, (res) => {
                            AsyncStorage.removeItem("token");
                            this.props.navigation.navigate('Auth');
                        }, (error) => {
                            AsyncStorage.removeItem("token");
                            this.props.navigation.navigate('Auth');
                        }, () => {
                            AsyncStorage.removeItem("token");
                            this.props.navigation.navigate('Auth');
                        });
                    }}>
                        <View style={PmStyles.containerStyle}>
                            <Text style={[PmStyles.titleStyle, PmStyles.logout]}>退出登录</Text>
                            <Icon
                                name='logout'
                                color='#ff0e1a'
                                size={20}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const PmStyles = StyleSheet.create({
    containerStyle: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        margin: 8
    },
    titleStyle: {
        fontSize: 18,
        marginRight: 10
    },
    logout: {color: "#ff0e1a"}
})

export default connect(
    (state) => ({
        user: state.accountReducer.user
    }),
    (dispatch) => ({})
)(PersonMessage)
