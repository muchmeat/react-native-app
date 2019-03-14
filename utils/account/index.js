import {AsyncStorage} from "react-native";

/**
 * 缓存用户信息
 * @param data
 */
export async function storeAccount(data) {
    try {
        //TODO 用户信息应保存在redux中
        await AsyncStorage.multiSet([["token", data.token], ["user", JSON.stringify(data.user)]]);
    } catch (e) {
        console.warn('Error: ', e);
    }
}

/**
 * 获取缓存用户信息
 * @param data
 */
export async function getAccountUser() {
    return await AsyncStorage.getItem('user').then((user) => {
        if (user !== null) {
            console.warn(1);
            console.warn(1+user);
            return user;
        } else {
            console.warn(3);
            return null
        }
    }).catch(() => {
        console.warn(2);
        return null
    });
}