import React, {Component} from 'react';
import {
    View,
} from 'react-native';
import {connect} from 'react-redux';
import styles from '../../style/ThemeStyle';
import RxForm from '../../components/RxForm';
import {isTel} from '../../../utils/common';
import t from "tcomb-form-native";
import DefualtBtn from '../../components/DefualtBtn';
import {Header,Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons'

class form1 extends Component {

    static navigationOptions = {
        title: '表单',
    };

    // static navigationOptions={
    //     header:()=>{
    //         return <Header
    //             placement="left"
    //             leftComponent={{ icon: 'menu', color: '#fff'}}
    //             centerComponent={{ text: '表单示例', style: { color: '#fff'} }}
    //             containerStyle={{
    //                 paddingTop:5,
    //                 height:60,
    //                 backgroundColor:styles.color.theme
    //                 // justifyContent:"center",
    //                 // alignItems:"center"
    //             }}
    //         />
    //     }
    // };

    componentWillMount() {
        let _this = this;
        let pgjg = t.enums({
            "1":"良好",
            "2":"不配合"
        }, 'pgjg');
        let thfs = t.enums({
            "1":"见面谈话",
            "2":"通讯工具通话"
        }, 'thfs');
        let jfmd = t.enums({
            "1":"康复情况",
            "2":"复吸调查",
            "3":"其它",
        }, 'jfmd');
        let cxfs = t.enums({
            "1":"步行/骑行",
            "2":"自驾",
            "3":"其它",
        }, 'cxfs');
        let jslxfs = t.refinement(t.String, function (v) {
            if( !v || v.indexOf("-") == -1 || v.indexOf(";") == -1)
                return false;
            let vs = v.split(";");
            let vs1 = vs[0].split("-");
            let vs2 = vs[1].split("-");
            return vs1[0] && isTel(vs1[1]) && vs2[0] && isTel(vs2[1]);
        });
        _this.rows = t.struct({
            thry:t.String,
            thdd:t.String,
            sfjzd:t.Boolean,
            cxfs:cxfs,
            fycc:t.maybe(t.String),
            thrq:t.Date,
            thsj:t.Date,
            thfs:thfs,
            jfmd:jfmd,
            jslxfs:jslxfs,
            pgjg:pgjg,
            fj:t.list(t.String),
            pynr:t.String,
        });
        _this.options = {
            fields: {
                thry:{
                    label: '谈话人员',
                    placeholder:' 输入谈话人员',
                    maxLength:50,
                    onSubmitEditing:() => _this.refs.RxForm.refs.form.getComponent('thdd').refs.input.focus()
                },
                thdd:{
                    label: '谈话地点',
                    placeholder:' 输入谈话地点',
                    maxLength:100,
                    onSubmitEditing:() => _this.refs.RxForm.refs.form.getComponent('fycc').refs.input.focus()
                },
                sfjzd:{
                    label: '是否居住地'
                },
                cxfs:{
                    label: '出行方式'
                },
                fycc:{
                    label: '费用产出',
                    maxLength:100,
                    onSubmitEditing:() => _this.refs.RxForm.refs.form.getComponent('jslxfs').refs.input.focus()
                },
                thrq:{
                    label:"谈话日期",
                    mode:"date",
                    maximumDate:new Date()
                },
                thsj:{
                    label:"谈话时间",
                    mode:"datetime"
                },
                thfs:{
                    label:"谈话方式",
                },
                jfmd:{
                    label:"家访目的",
                },
                jslxfs:{
                    label:"家属联系方式",
                    error:"请输入“姓名-联系电话;姓名-联系电话”格式",
                    onSubmitEditing:() => _this.refs.RxForm.refs.form.getComponent('pynr').refs.input.focus()
                },
                pgjg:{
                    label:"评估结果",
                },
                fj:{
                    label:"现场照片",
                    navigation:_this.props.navigation,
                    limit:4,
                },
                pynr:{
                    label:"评语内容",
                    mode:"textarea",
                    placeholder:' 输入评语内容',
                    maxLength:500,
                    onSubmitEditing:() => _this._commit()
                }
            }
        };
        _this.values = {

        }
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
        return (
            <View style={styles.container}>
                <RxForm ref="RxForm" rows={_this.rows} options={_this.options} values={_this.values}/>
                <DefualtBtn text={"提  交"} click={()=>{_this._commit()}}/>
            </View>
        )
    }

    componentWillUnmount() {

    }

}

export default connect(
    (state) => ({}),
    (dispatch) => ({})
)(form1)
