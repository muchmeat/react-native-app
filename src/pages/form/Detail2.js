import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
    TouchableHighlight, ToastAndroid
} from "react-native";

import styles from "../../style/Personal";
import GroupItem from "../../components/GroupItem2";
import GroupTitle from "../../components/GroupTitle2";
import { connect } from 'react-redux';
import ThemeStyle from "../../style/ThemeStyle";


class Detail extends Component {

    static navigationOptions = {
        title: '详情-2',
    };

    componentDidMount(){

    }

    render() {
        return(
            <View style={[styles.detail.container]}>
                <ScrollView>
                    <GroupTitle title={"主要信息"}/>
                    <View style={styles.group2}>
                        <View style={[styles.detail.imgRow2,{flexDirection:"column",height:115,justifyContent:"flex-start",alignItems:"flex-start"}]}>
                            <GroupItem text={"照片(1/4)"}/>
                            <View style={{flex:1,flexDirection:"row"}}>
                                <Image resizeMode={"contain"}  style={{height:70,width:70,marginLeft:10}} source={require("../../../assets/images/defualt_header.png")}/>
                            </View>
                        </View>
                        <GroupItem text={"姓名"} value={"朱二壮"}/>
                        {/*<GroupItem text={"性别"} value={"男"}/>*/}
                        <GroupItem text={"身份证号码"} value={"34020119890213095x"}/>
                        <GroupItem text={"出生日期"} value={"1989-02-13"}/>
                        <GroupItem text={"户籍地详址"} value={"芜湖市镜湖区伟星城五栋二单元801"}/>
                        {/*<GroupItem text={"户籍地派出所"} value={"天门山派出所"}/>*/}
                        {/*<GroupItem text={"居住地详址"} value={"芜湖市镜湖区伟星城五栋二单元801"}/>*/}
                        {/*<GroupItem text={"居住地派出所"} value={"天门山派出所"}/>*/}
                    </View>
                    <GroupTitle title={"其他信息"}/>
                    <View style={styles.group2}>
                        <GroupItem text={"涉毒人员来源"} value={"市局分发"}/>
                        <GroupItem text={"别名/绰号"} value={"二子"}/>
                        {/*<GroupItem text={"民族"} value={"汉族"}/>*/}
                        {/*<GroupItem text={"身高(cm)"} value={"185cm"}/>*/}
                        {/*<GroupItem text={"文化程度"} value={"文盲"}/>*/}
                        {/*<GroupItem text={"国籍"} value={"中国"}/>*/}
                        {/*<GroupItem text={"身体状况"} value={"良"}/>*/}
                        {/*<GroupItem text={"家庭条件"} value={"良"}/>*/}
                        {/*<GroupItem text={"婚姻状况"} value={"已婚"}/>*/}
                        {/*<GroupItem text={"从业状况"} value={"创业"}/>*/}
                        {/*<GroupItem text={"工作单位"} value={"无"}/>*/}
                        <GroupItem text={"通讯信息"} value={"18326908768"}/>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default connect((state)=>({

}),(dispatch)=>({

}))(Detail)
