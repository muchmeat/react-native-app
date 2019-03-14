import React, {Component} from 'react';
import {
    View,
    ScrollView,
    findNodeHandle,
    UIManager,
    StyleSheet,
    Dimensions
} from "react-native";
import t from 'tcomb-form-native';
import {parseJson} from '../../../utils/common';
import defualt_themes from "../../example/style/ThemeStyle";
import DefualtBtn from '../../base/components/DefualtBtn';

import LocationBtn from '../../base/components/LocationBtn';
import {convertUTCTimeToLocalTime} from "../tcom/tcomb-form-native/lib/util";

const Form = t.form.Form;

export default class RxForm extends Component {

    _submit() {
        let _this = this;
        let result = _this.refs.form.validate();
        let fields = _this.props.options.fields;
        let fj = {};
        for (let field in fields) {
            if (fields[field].mode && (fields[field].mode === "imagePicker" || fields[field].mode === "filePicker")) {
                fj[field] = _this._getValue(field);
            }
        }
        if (result.errors && result.errors.length) {
            const handle = findNodeHandle(this.refs.form.getComponent(result.errors[0].path[0]));
            try {
                this.refs.form.getComponent(result.errors[0].path[0]).refs.input.focus();
            } catch (e) {
            }
            UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                this.scrollY = this.scrollY ? this.scrollY : 0;
                let toY = pageY;
                if (pageY < 0 || (pageY > 0 && pageY < this.scrollY)) {
                    toY = this.scrollY + pageY;
                } else if (pageY == 0) {
                    toY = this.scrollY;
                }
                this.scrollY = toY;
                this.refs.scroll.scrollTo({y: toY - 55, animated: true});
            });
        }
        result = parseJson(result);
        result.value = {
            ...result.value,
            ...fj
        };
        return result;
    }

    _getValue(code) {
        return this.refs.form.getComponent(code).state.value;
    }

    _setValue(code, v) {
        let _this = this;
        _this.refs.form.getComponent(code).setState({
            value: v
        }, function () {
            let v2 = _this.refs.form.getComponent(code).state.value;
            if (v2 != v)
                this.setState({value: v})
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        let _this = this;
        return (
            <View style={{flex: 1, backgroundColor: "#FFF", marginTop: 5, marginBottom: 5}}>
                <ScrollView ref="scroll" keyboardShouldPersistTaps={"handled"}
                            style={{backgroundColor: defualt_themes.color.fontWithe, paddingLeft: 10}}
                            onMomentumScrollEnd={(event) => {
                                _this.scrollY = event.nativeEvent.contentOffset.y;
                            }}>
                    <Form ref="form"
                          type={_this.props.rows}
                          value={_this.props.values}
                          options={_this.props.options}
                    />
                </ScrollView>
                <View/>
                <DefualtBtn text={"提交"} click={() => {
                    _this.props.save()
                }}/>
            </View>
        )

    }
}
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const ActivityIndicatorStyles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: "#eeece3",
        height: 40, width: 40, position: "absolute", left: width / 2 - 20, top: height / 2 - 20
    },
    mainContainer: {
        // borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 128,
        minWidth: 128,
        backgroundColor: "#eeece3"
    },
    imageContainer: {
        // paddingTop: 16,
        // paddingBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        paddingLeft: 8,
        paddingRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFFFFF',
        fontWeight: "bold",
        fontSize: 15,
        fontFamily: 'Avenir',
        marginBottom: 5,
    }
});