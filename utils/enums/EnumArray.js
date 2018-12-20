/**
 * 枚举父类(数组)
 * Created by ruixin on 16/7/14.
 */
import React, {Component} from 'react';

export default class EnumArray extends Component {

    static getName(code) {
        for (let value of this.get()) {
            if (value.code == code) {
                return value.name;
            }
        }
        return null;
    }

    static getCode(name) {
        for (let value of this.get()) {
            console.warn(name);
            console.warn(value);
            if (value.name == name) {
                return value.code;
            }
        }
        return null;
    }

    static getObject(code){
        for (let value of this.get()) {
            if (value.code == code) {
                return value;
            }
        }
        return null;
    }

    static getData() {
        let data = [];
        for (let value of this.get()) {
            data.push(value.name);
        }
        return data;
    }
}