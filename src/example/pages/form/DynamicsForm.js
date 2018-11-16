import React, {Component} from 'react';
import {
    View,
} from 'react-native';
import {connect} from 'react-redux';
import styles from '../../style/ThemeStyle';
import RxForm from '../../../base/components/RxForm';
import t from "tcomb-form-native";
import DefualtBtn from '../../../base/components/DefualtBtn';
import * as formAction from '../../actions/formAction';
import * as formUtil from '../../../base/tcom/formUtil';
import Loading from "../../../base/components/Loading";

class DynamicsForm extends Component {

    static navigationOptions = {
        title: '表单',
    };


    componentWillMount() {
        let _this = this;
        let {setResult} = _this.props;
        formAction.getFormSetting(182,setResult);
    }

    _commit(){
        let _this = this;
        let val = _this.refs.RxForm._commit();
    }

    componentDidMount() {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        let _this = this;
        let {formStatus,formData} = _this.props;
        let form ={};
        if(formStatus === "1"){
            form = formUtil.getSetTTings(formData.fields,t);
        }
        return (
            <View style={styles.container}>
                {formData ?
                    <RxForm ref="RxForm" rows={form.rows} options={form.options} values={form.values}/>
                    :<Loading viewStyle={{height:200}} imageStyle={{width:42,height:42}}/>
                }
                <DefualtBtn text={"提  交"} click={()=>{_this._commit()}}/>
            </View>
        )
    }

    componentWillUnmount() {

    }

}

export default connect(
    (state) => ({
        formStatus:state.formReducer.formGetStatus,
        formData:state.formReducer.formData,
    }),
    (dispatch) => ({
        setResult: (status,data) => dispatch(formAction.setResult(status,data)),
    })
)(DynamicsForm)
