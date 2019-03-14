import React, {Component} from 'react';
import {
    View, Alert, ToastAndroid, BackHandler
} from 'react-native';
import {connect} from 'react-redux';
import styles from '../../style/ThemeStyle';
import RxForm from '../../../base/components/RxForm';
import t from "tcomb-form-native";
import * as formAction from '../../actions/formAction';
import * as formUtil from '../../../base/tcom/formUtil';
import * as types from '../../constants/formTypes';
import LoadingView from '../../../base/components/LoadingView';
import LoadingPage from '../../../base/components/LoadingPage';
import FetchUtil from "../../../../utils/FetchUtil";
import Global from "../../../../utils/Global";

class DynamicsForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            loadingText: "验证中"
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam("title", '采集')
        };
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

    /**
     * 控制loading遮罩层的显隐
     * @param visible
     */
    setModalLoading(visible, text) {
        this.setState({modalVisible: visible, loadingText: text});
    }

    /**
     * 验证名称是否重复，重复提示 否则保存
     * @param RxForm
     */
    validateAppDynamicFormMC(RxForm) {
        let _this = this;
        FetchUtil.postJsonParams(Global.REQUEST_BASE_URL + "/dynamicForm/validateAppDynamicFormMC", {
            mc: RxForm.value.MC,
            id: _this.props.navigation.getParam("id", ""),
            formId: _this.props.navigation.getParam("formId", null)
        }, (result) => {
            //遮罩层弹出
            console.disableYellowBox = true;
            _this.setModalLoading(true, "保存中···");
            if (result.success) {
                let formData = RxForm.value;
                let id = _this.props.navigation.getParam("id", null);
                let rwId = _this.props.navigation.getParam("rwId", null);
                formData["ID"] = id;
                formData["RWID"] = rwId;
                let params = {
                    formId: _this.props.navigation.getParam("formId", null),
                    formData: formData
                };
                FetchUtil.postFormRNFetch(Global.REQUEST_BASE_URL + "/dynamicForm/saveDynamicForm", params, (fetchBlobResponse) => {
                    let ar = JSON.parse(fetchBlobResponse.data);
                    if (ar.success) {
                        _this.props.navigation.state.params.callBack();
                        _this.props.navigation.goBack();
                        Alert.alert("温馨提示", "采集成功");
                    } else {
                        Alert.alert("温馨提示", "保存失败，请联系管理员");
                    }
                    _this.setModalLoading(false);
                }, (error) => {
                    _this.setModalLoading(false);
                    let arr = Object.keys(error);
                    if (arr.length == 0) {
                        Alert.alert("温馨提示", "网络不给力，请检查网络设置");
                    } else {
                        Alert.alert("温馨提示", "保存失败，请联系管理员");
                    }
                });
            } else {
                Alert.alert("温馨提示", "采集名称已存在");
            }
        }, (error) => {
            Alert.alert("温馨提示", "请求出错，请联系管理员");
        }, () => {
            Alert.alert("温馨提示", "请求超时，请检查网络状态");
        });
    }

    _submit2() {
        let _this = this;
        let RxForm = _this.refs.RxForm._submit();
        if (RxForm.errors.length > 0) {
            return false
        }
        _this.validateAppDynamicFormMC(RxForm);
    }


    /**
     * 表单提交,没有名称重复验证
     * @returns {boolean}
     * @private
     */
    _submit() {
        let _this = this;
        let RxForm = _this.refs.RxForm._submit();
        if (RxForm.errors.length > 0) {
            return false
        }
        //遮罩层弹出
        console.disableYellowBox = true;
        _this.setModalLoading(true, "保存中···");
        let formData = RxForm.value;
        let id = _this.props.navigation.getParam("id", null);
        let rwId = _this.props.navigation.getParam("rwId", null);
        formData["ID"] = id;
        formData["RWID"] = rwId;
        let params = {
            formId: _this.props.navigation.getParam("formId", null),
            formData: formData
        };
        FetchUtil.postFormRNFetch(Global.REQUEST_BASE_URL + "/dynamicForm/saveDynamicForm", params, (fetchBlobResponse) => {
            let ar = JSON.parse(fetchBlobResponse.data);
            if (ar.success) {
                _this.props.navigation.state.params.callBack();
                _this.props.navigation.goBack();
                Alert.alert("温馨提示", "采集成功");
            } else {
                Alert.alert("温馨提示", "保存失败，请联系管理员");
            }
            _this.setModalLoading(false);
        }, (error) => {
            _this.setModalLoading(false);
            let arr = Object.keys(error);
            if (arr.length == 0) {
                Alert.alert("温馨提示", "网络不给力，请检查网络设置");
            } else {
                Alert.alert("温馨提示", "保存失败，请联系管理员");
            }
        });
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
        if (types.GET_SUCCESS === formStatus || types.GET_SUCCESS_DATA === formStatus) {
            form = formUtil.getSetTTings(formData.fields, t, navigation);
        }
        return (
            <View style={styles.container}>
                {formData ?
                    <View style={styles.container}>
                        <LoadingView showLoading={_this.state.modalVisible}
                                     text={_this.state.loadingText}/>
                        <RxForm ref="RxForm" rows={form.rows} options={form.options} values={form.values}
                                save={() => {
                                    _this._submit()
                                }}/>
                    </View>
                    : <LoadingPage text={"加载中···"}/>
                }
            </View>
        )
    }

    componentWillUnmount() {

    }

}

export default connect(
    (state) => ({
            formStatus: state.formReducer.formStatus,
            formData: state.formReducer.formData
        }
    ), (dispatch) => ({
        setResult: (status, data) => dispatch(formAction.setResult(status, data))
    })
)(DynamicsForm)
