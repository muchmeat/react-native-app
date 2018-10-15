/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Root from './src/Root';

/**
 * store有四个方法。
 * getState： 获取应用当前State。
 * subscribe：添加一个变化监听器。
 * dispatch：分发 action。修改State。
 * replaceReducer：替换 store 当前用来处理 state 的 reducer。
 */
type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <Root/>
        );
    }
}
