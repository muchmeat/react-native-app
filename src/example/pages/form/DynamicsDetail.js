import React, {Component} from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity, ToastAndroid
} from "react-native";
import {NavigationActions} from 'react-navigation';

import styles from "../../style/Personal";
import GroupItem from "../../../base/components/GroupItem2";
import FileItem from "../../../base/components/FileDetailItem";
import GroupTitle from "../../../base/components/GroupTitle2";
import {connect} from 'react-redux';
import * as formAction from "../../actions/formAction";
import * as formUtil from "../../../base/tcom/formUtil";
import DateUtil from "../../../../utils/DateUtil";
import FontAwesomeEnums from "../../../../utils/enums/FontAwesomeEnums";
import Global from "../../../../utils/Global";
import OpenFile from 'react-native-doc-viewer';


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

    /**
     * 打开附件
     * @param type
     * @param id 附件id
     */
    openAttachment(type, id) {
        console.warn("type:" + type);
        let name = FontAwesomeEnums.getName(type);
        console.warn("name:" + name);
        if ("mp4" === type) {
            // this.props.navigation.navigate('VideoScreen', {videoSource: {uri:Global.REQUEST_BASE_URL+"/attachment/getImage?id=261"}});
            // this.props.navigation.navigate('VideoScreen', {videoSource: {uri:"http://172.28.1.208:8082/zybzzxt/medias/upload/VIDEO1.mp4"}});
            this.props.navigation.dispatch(
                NavigationActions.navigate({
                    routeName: "VideoPlay",
                    // params: {videoSource: {uri: Global.REQUEST_BASE_URL + "/attachment/getImage?id=" + id}}
                    params: {uri: Global.REQUEST_BASE_URL + "/attachment/getImage?id=" + id}
                })
            )
        }
    }

    render() {
        let _this = this;
        let {formStatus, formData,navigation} = _this.props;
        let detailContain = [];
        console.warn("formStatus:" + formStatus);
        if ("1" === formStatus || "4" === formStatus) {
            detailContain = formUtil.getDetail(formData.fields,navigation);
            {/*if (formData.fields && formData.fields.length) {*/}
                {/*for (let col of formData.fields) {*/}
                    {/*if (col.fieldType === "text" || col.fieldType === "textarea" || col.fieldType === "number" || col.fieldType === "attachment"*/}
                        {/*|| col.fieldType === "select" || col.fieldType === "radio" || col.fieldType === "datePicker") {*/}
            //             //字段属性
            //             let webOption = JSON.parse(col.fieldOptions);
            //             //单行，多行，数字
            //             if (col.fieldType === "text" || col.fieldType === "textarea" || col.fieldType === "number") {
                            {/*mainContain.push(<GroupItem text={col.label} value={col.value}/>);*/}
                        {/*}*/}
                        {/*//selector与radio对应移动端同一种类型*/}
                        {/*else if (col.fieldType === "select" || col.fieldType === "radio") {*/}
            //                 mainContain.push(<GroupItem text={col.label}
                                                        {/*value={formUtil.getSelectorLabel(webOption.options)}/>);*/}
            //             }
                        {/*//时间*/}
                        {/*else if (col.fieldType === "datePicker") {*/}
                            {/*let time = DateUtil.format(col.value, webOption.datefmt);*/}
                            {/*console.warn(time);*/}
                            {/*mainContain.push(<GroupItem text={col.label} value={time}/>);*/}
                        {/*}*/}
                        {/*//上传附件*/}
                        {/*else if (col.fieldType === "attachment") {*/}
                            {/*//类型筛选*/}
                            {/*if (webOption.media_type) {*/}
                                {/*if ("images" === webOption.media_type.toLowerCase()) {*/}
            //                         let items = [];
            //                         console.warn(col.value);
            //                         for (let file of col.value) {
            //                             items.push(<TouchableOpacity onPress={() => {
            //                                 console.warn("TouchableOpacity");
            //                                 OpenFile.openDoc([{
            //                                     url: Global.REQUEST_BASE_URL + "/attachment/getFileBase64?id=" + file.id,
            //                                     fileName: file.fileName,
            //                                     cache: false,
            //                                     fileType: file.type
                                            {/*}], (error, url) => {*/}
                                                {/*if (error) {*/}
                                                    {/*ToastAndroid.show("打开文件失败", ToastAndroid.SHORT)*/}
            //                                     } else {
            //                                         console.warn(url);
            //                                     }
            //                                 })
            //                                 // OpenFile.openDocb64([{
            //                                 //     base64: file.data,
            //                                 //     fileName: file.fileName,
            //                                 //     fileType: file.type,
            //                                 //     cache: false /*Use Cache Folder Android*/
            //                                 // }], (error, url) => {
            //                                 //     if (error) {
            //                                 //         ToastAndroid.show("打开文件失败", ToastAndroid.SHORT)
            //                                 //     }
            //                                 // })
            //                             }
            //                             }><ImageBackground style={{height: 70, width: 40, marginLeft: 10}}
            //                                                source={require("../../../../assets/images/defualt_header.png")}>
            //                                 <Image resizeMode={"contain"}
            //                                        style={{height: 70, width: 70, marginLeft: 10}}
            //                                        source={{uri: Global.REQUEST_BASE_URL + "/attachment/getImage?id=" + file.id}}
            //                                 /></ImageBackground>
            //                             </TouchableOpacity>)
            //                         }
            //                         attachmentContain.push(<GroupTitle title={col.label}/>);
            //                         attachmentContain.push(
            //                             <View style={styles.group2}>
            //                                 <View style={[styles.detail.imgRow2, {
            //                                     flexDirection: "column",
            //                                     backgroundColor: "#FFF",
            //                                     justifyContent: "flex-start",
            //                                     alignItems: "flex-start"
            //                                 }]}>
            //                                     <View style={{
            //                                         flex: 1,
            //                                         flexDirection: "row",
            //                                         marginVertical: 10
            //                                     }}>{items}</View>
            //                                 </View>
            //                             </View>);
            //                     }
            //                     else {
            //                         let items = [];
            //                         for (let file of col.value) {
            //                             items.push(<FileItem name={file.fileName}
            //                                                  type={FontAwesomeEnums.getCode(file.type)} onPress={() => {
            //                                 _this.openAttachment(file.type, file.id)
            //                             }}/>)
            //                         }
            //                         attachmentContain.push(<GroupTitle title={col.label}/>);
            //                         attachmentContain.push(<View style={styles.group2}>{items}</View>);
            //                     }
            //                 }
            //                 else {
            //                     let items = [];
            //                     for (let file of col.value) {
            //                         items.push(<FileItem name={file.fileName}
            //                                              type={FontAwesomeEnums.getCode(file.type)} onPress={() => {
            //                             _this.openAttachment(file.type, file.id)
            //                         }}/>)
            //                     }
            //                     attachmentContain.push(<GroupTitle title={col.label}/>);
            //                     attachmentContain.push(<View style={styles.group2}>{items}</View>);
            //                 }
            //             }
            //         }
            //     }
            // }
        }
        return (
            <View style={styles.detail.container}>
                <ScrollView>
                    {detailContain}
                    <View style={{height: 20}}/>
                </ScrollView>
            </View>
        )
    }
}

export default connect((state) => ({
    formStatus: state.formReducer.formGetStatus,
    formData: state.formReducer.formData
}), (dispatch) => ({
    setResult: (status, data) => dispatch(formAction.setResult(status, data))
}))(DynamicsDetail)
