/**
 * 枚举父类(对象)
 */
import React, {Component} from 'react';

export default class BaseEnum extends Component {

    static getName(code) {
        for (let value of Object.values(this.get())) {
            if (value.code == code) {
                return value.name;
            }
        }
        return null;
    }

    static getCode(name) {
        for (let value of Object.values(this.get())) {
            if (value.name == name) {
                return value.code;
            }
        }
        return null;
    }

    static getValue(code) {
        for (let value of Object.values(this.get())) {
            if (value.code == code) {
                return value;
            }
        }
        return null;
    }

    static getData() {
        let data = [];
        for (let value of Object.values(this.get())) {
            data.push(value.name);
        }
        return data;
    }

    static getEntries() {
        let data = [];
        for (let entry of Object.values(this.get())) {
            data.push(entry);
        }
        return data;
    }
}