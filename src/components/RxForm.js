import React, { Component } from 'react';
import {
    View,
    ScrollView, findNodeHandle, UIManager
} from "react-native";
import t from 'tcomb-form-native';
import defualt_themes from "../style/ThemeStyle";

const Form = t.form.Form;

export default class RxForm extends Component {

    _commit(){
        const result = this.refs.form.validate();
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
            <View style={{flex:1, backgroundColor:defualt_themes.color.defaultBg,marginTop:5}}>
                <ScrollView ref = "scroll" keyboardShouldPersistTaps={"handled"}
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
            </View>
        )

    }
}
