import React, {Component} from 'react';
import {
    View,
    ScrollView, ActivityIndicator, PixelRatio, Dimensions, Text
} from "react-native";

import styles from "../../style/Personal";
import {connect} from 'react-redux';
import * as formAction from "../../actions/formAction";
import * as formUtil from "../../../base/tcom/formUtil";
import * as types from '../../constants/formTypes';
import LoadingPage from '../../../base/components/LoadingPage';

class DynamicsDetail extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            // title: '详情-2',
            headerTitle: navigation.getParam('title', '详情'),
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
        }
    }

    componentDidMount() {

    }

    shouldComponentUpdate(props, states) {
        let {formStatus, formData, navigation} = props;
        if (types.GET_SUCCESS_DATA == formStatus) {
            this.detailPage = formUtil.getDetail(formData.fields, navigation);
        }
        return true;
    }

    render() {
        let _this = this;
        let loading = <LoadingPage text={"加载中···"}/>;
        return (
            <View style={styles.detail.container}>
                <ScrollView>
                    {_this.detailPage ? _this.detailPage : loading}
                    <View style={{height: 20}}/>
                </ScrollView>
            </View>
        )
    }
}

export default connect((state) => ({
    formStatus: state.formReducer.formStatus,
    formData: state.formReducer.formData
}), (dispatch) => ({
    setResult: (status, data) => dispatch(formAction.setResult(status, data))
}))(DynamicsDetail)
