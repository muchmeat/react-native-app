import React, { Component } from 'react';
import {
    View,
    ScrollView, findNodeHandle, UIManager
} from "react-native";
import t from 'tcomb-form-native';
import {parseJson} from '../../../utils/common';
import defualt_themes from "../../example/style/ThemeStyle";
import DefualtBtn from '../../base/components/DefualtBtn';
import LocationBtn from '../../base/components/LocationBtn';
import {convertUTCTimeToLocalTime} from "../tcom/tcomb-form-native/lib/util";

const Form = t.form.Form;

export default class RxForm extends Component {

    _submit(){
        let _this = this;
        let result = _this.refs.form.validate();
        let fields = _this.props.options.fields;
        let fj = {};
        for(let field in fields){
            if(fields[field].mode && (fields[field].mode === "imagePicker" || fields[field].mode === "filePicker")){
                fj[field] = _this._getValue(field);
            }
            if(fields[field].mode && ("datetime".indexOf(fields[field].mode) > -1 )){
                let UTC = _this._getValue(field);
                if(UTC){
                    fj[field] = UTC;
                }
            }
        }
        if(result.errors && result.errors.length){
            const handle = findNodeHandle(this.refs.form.getComponent(result.errors[0].path[0]));
            try {
                this.refs.form.getComponent(result.errors[0].path[0]).refs.input.focus();
            } catch (e) {
            }
            UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                this.scrollY = this.scrollY ? this.scrollY: 0;
                let toY = pageY;
                if( pageY < 0 || (pageY > 0 && pageY < this.scrollY)){
                    toY = this.scrollY + pageY;
                }else if(pageY == 0){
                    toY =this.scrollY;
                }
                this.scrollY = toY;
                this.refs.scroll.scrollTo({ y :toY - 55,animated: true});
            });
        }
        result = parseJson(result);
        result.value = {
            ...result.value,
            ...fj
        };
        return result;
    }

    _getValue(code){
        return this.refs.form.getComponent(code).state.value;
    }

    _setValue(code,v){
        let _this = this;
        _this.refs.form.getComponent(code).setState({
            value:v
        },function () {
            let v2 = _this.refs.form.getComponent(code).state.value;
            if(v2!=v)
                this.setState({value:v})
        })
    }

    render() {
        let _this = this;
        return (
            <View style={{flex:1,backgroundColor:"#FFF",paddingLeft:10,marginTop:5,marginBottom:5}}>
                <ScrollView ref = "scroll" keyboardShouldPersistTaps={"handled"}
                            style={{ backgroundColor:defualt_themes.color.fontWithe,}}
                            onMomentumScrollEnd ={(event)=>{
                                _this.scrollY = event.nativeEvent.contentOffset.y;
                            }}>
                    <Form
                        ref="form"
                        type={_this.props.rows}
                        value={_this.props.values}
                        options={_this.props.options}
                    />
                </ScrollView>
                <View/>
                {/*<LocationBtn text={_this.props.locationTitle} click={() => {*/}
                {/*_this.props.location()*/}
                {/*}}/>*/}
                <DefualtBtn text={"定位并提交"} click={() => {
                    _this.props.submit()
                }}/>
            </View>
        )

    }
}
