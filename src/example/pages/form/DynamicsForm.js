import React, {Component} from 'react';
import {
    View, Alert, NativeModules
} from 'react-native';
import {connect} from 'react-redux';
import styles from '../../style/ThemeStyle';
import RxForm from '../../../base/components/RxForm';
import t from "tcomb-form-native";
import DefualtBtn from '../../../base/components/DefualtBtn';
import * as formAction from '../../actions/formAction';
import * as formUtil from '../../../base/tcom/formUtil';
import Loading from "../../../base/components/Loading";
import FetchUtil from "../../../../utils/FetchUtil";
import Global from "../../../../utils/Global";

class DynamicsForm extends Component {

    static navigationOptions = {
        title: '表单',
    };


    componentWillMount() {
        let _this = this;
        let {setResult} = _this.props;
        let formId = _this.props.navigation.getParam("formId", null);
        let id = _this.props.navigation.getParam("id", null);
        //id为动态表主键，区分编辑与新增状态
        if (null != id) {
            formAction.getFormData(id, formId, setResult);
        } else {
            formAction.getFormSetting(formId, setResult);
        }
    }

    _submit() {
        let _this = this;
        let RxForm = _this.refs.RxForm._submit();
        console.log(RxForm);
        if (RxForm.errors.length > 0) {
            return
        }
        let formData = RxForm.value;
        let id = _this.props.navigation.getParam("id", null);
        let rwId = _this.props.navigation.getParam("rwId", null);
        formData["ID"] = id;
        formData["RWID"] = rwId;
        let params = {
            formId: _this.props.navigation.getParam("formId", null),
            formData: formData
        };
        // FetchUtil.postJsonStr(Global.REQUEST_BASE_URL + "/dynamicForm/saveDynamicForm", params, (ar) => {
        //     if (ar.success) {
        //         Alert.alert("温馨提示", "采集成功");
        //         _this.props.navigation.state.params.callBack();
        //         _this.props.navigation.goBack();
        //     } else {
        //         Alert.alert("温馨提示", "保存失败，请联系管理员");
        //     }
        // }, (error) => {
        //     alert(JSON.stringify(error));
        // }, () => {
        // });
        // FetchUtil.postForm(Global.REQUEST_BASE_URL + "/dynamicForm/saveDynamicForm",params, (ar) => {
        //     if (ar.success) {
        //         Alert.alert("温馨提示", "采集成功");
        //         _this.props.navigation.state.params.callBack();
        //         _this.props.navigation.goBack();
        //     } else {
        //         Alert.alert("温馨提示", "保存失败，请联系管理员");
        //     }
        // }, (error) => {
        //     console.warn("error");
        //     alert(JSON.stringify(error));
        // }, () => {
        // });
        console.warn(formData);
        FetchUtil.postFormRNFetch(Global.REQUEST_BASE_URL + "/dynamicForm/saveDynamicForm", params, (fetchBlobResponse) => {
            console.log(fetchBlobResponse);
            let ar = JSON.parse(fetchBlobResponse.data);
            if (ar.success) {
                Alert.alert("温馨提示", "采集成功");
                _this.props.navigation.state.params.callBack();
                _this.props.navigation.goBack();
            } else {
                Alert.alert("温馨提示", "保存失败，请联系管理员");
            }
        }, (error) => {
            alert(JSON.stringify(error));
        });
        // NativeModules.Location.startLocation((location) => {
        //     if (location !== "") {
        //         if (location === "locateFailed" || "nogps" === location) {
        //             Alert.alert("温馨提示", "请检查GPS状态");
        //         } else if (location === "close") {
        //             Alert.alert("温馨提示", "GPS已关闭");
        //         } else {
        //             let formData = RxForm.value;
        //             let id = _this.props.navigation.getParam("id", null);
        //             let rwId = _this.props.navigation.getParam("rwId", null);
        //             formData["ID"] = id;
        //             formData["RWID"] = rwId;
        //             formData["latitude"] = location.split(",")[0];
        //             formData["longitude"] = location.split(",")[1];
        //             let params = {
        //                 formId: _this.props.navigation.getParam("formId", null),
        //                 formData: formData
        //             };
        //             // FetchUtil.postJsonStr(Global.REQUEST_BASE_URL + "/dynamicForm/saveDynamicForm", params, (ar) => {
        //             //     if (ar.success) {
        //             //         Alert.alert("温馨提示", "采集成功");
        //             //         _this.props.navigation.state.params.callBack();
        //             //         _this.props.navigation.goBack();
        //             //     } else {
        //             //         Alert.alert("温馨提示", "保存失败，请联系管理员");
        //             //     }
        //             // }, (error) => {
        //             //     alert(JSON.stringify(error));
        //             // }, () => {
        //             // });
        //             // FetchUtil.postForm(Global.REQUEST_BASE_URL + "/dynamicForm/saveDynamicForm",params, (ar) => {
        //             //     if (ar.success) {
        //             //         Alert.alert("温馨提示", "采集成功");
        //             //         _this.props.navigation.state.params.callBack();
        //             //         _this.props.navigation.goBack();
        //             //     } else {
        //             //         Alert.alert("温馨提示", "保存失败，请联系管理员");
        //             //     }
        //             // }, (error) => {
        //             //     console.warn("error");
        //             //     alert(JSON.stringify(error));
        //             // }, () => {
        //             // });
        //             console.warn(formData);
        //             FetchUtil.postFormRNFetch(Global.REQUEST_BASE_URL + "/dynamicForm/saveDynamicForm", params, (fetchBlobResponse) => {
        //                 if (fetchBlobResponse.respInfo.status === 200) {
        //                     Alert.alert("温馨提示", "采集成功");
        //                     _this.props.navigation.state.params.callBack();
        //                     _this.props.navigation.goBack();
        //                 } else {
        //                     Alert.alert("温馨提示", "保存失败，请联系管理员");
        //                 }
        //             }, (error) => {
        //                 alert(JSON.stringify(error));
        //             });
        //         }
        //     }
        // })
    }

    componentDidMount() {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        let _this = this;
        let {formStatus, formData, navigation} = _this.props;
        let form = {};
        if ("1" === formStatus || "4" === formStatus) {
            form = formUtil.getSetTTings(formData.fields, t, navigation);
        }
        return (
            <View style={styles.container}>
                {formData ?
                    <RxForm ref="RxForm" rows={form.rows} options={form.options} values={form.values}
                            locationTitle={"1" == formStatus ? "定位" : "重定位"} submit={() => {
                        _this._submit()
                    }}/>
                    : <Loading viewStyle={{height: 200}} imageStyle={{width: 42, height: 42}}/>
                }
            </View>
        )
    }

    componentWillUnmount() {

    }

}

export default connect(
    (state) => ({
            formStatus: state.formReducer.formGetStatus,
            formData: state.formReducer.formData
        }
    ), (dispatch) => ({
        setResult: (status, data) => dispatch(formAction.setResult(status, data))
    })
)(DynamicsForm)
