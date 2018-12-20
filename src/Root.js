import React, {Component} from 'react';
import {SafeAreaView, StatusBar} from "react-native";
import {Provider} from 'react-redux';
import configureStore from './example/store/ConfigureStore';

import styles from './example/style/ThemeStyle';
import App from './example/container/Router';
// import App from './project/VideoForm';

const store = configureStore();

/**
 * Provider 是一个React组件，它的作用是保存store给子组件中的connect使用。
 *
 * 想要把store绑定在视图层上，得用到React-redux中的两个主角:Provider和Connect，
 * 在api文档第一段话,作者说通常情况下你无法使用connect()去connect一个没有继承Provider的组
 * 件，也就是说如果你想在某个子组件中使用Redux维护的store数据，它必须是包裹在Provider中并且被
 * connect过的组件，Provider的作用类似于提供一个大容器，将组件和Redux进行关联，在这个基础
 * 上，connect再进行store的传递。
 */
export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <SafeAreaView style={styles.container}>
                    <StatusBar
                        backgroundColor={styles.color.theme}
                    />
                    <App/>
                </SafeAreaView>
            </Provider>
        )
    }
}
