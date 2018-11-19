import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
    TouchableHighlight, ToastAndroid
} from "react-native";

import styles from "../../style/Personal";
import GroupItem from "../../../base/components/GroupItem2";
import FileItem from "../../../base/components/FileDetailItem";
import GroupTitle from "../../../base/components/GroupTitle2";
import { connect } from 'react-redux';
import Svg from "react-native-svg";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ThemeStyle from "../../style/ThemeStyle";

class Detail2 extends Component {

    static navigationOptions = {
        title: '详情-2',
    };

    componentDidMount(){

    }

    render() {
        return(
            <View style={styles.detail.container}>
                <ScrollView>
                    <View style={styles.idCard}>
                        <View style={styles.idCardImgView}>
                            <Image style={styles.idCardImg} resizeMode={"contain"} source={require("../../../../assets/images/excPic.jpg")}/>
                        </View>
                        <View style={{flex:1,height:90}}>
                            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingTop:5}}>
                                {/*<Svg height={20} width={20} viewBox="0 0 1024 1024">{IconLib.IC_NAME}</Svg>*/}
                                <FontAwesome name={"user"} size={26} color={ThemeStyle.color.theme}/>
                                <Text style={{fontSize:16,paddingLeft:15}}>朱二壮</Text>
                            </View>
                            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingBottom:5}}>
                                {/*<Svg height={16} width={22} viewBox="0 0 1024 1024">{IconLib.IC_CARD}</Svg>*/}
                                <FontAwesome name={"id-card"} size={22} color={ThemeStyle.color.theme}/>
                                <Text style={{fontSize:16,paddingLeft:10}}>34020119890213095X</Text>
                            </View>
                        </View>
                    </View>
                    <GroupTitle title={"主要信息"}/>
                    <View style={styles.group2}>
                        <GroupItem text={"姓名"} value={"朱二壮"}/>
                        <GroupItem text={"身份证号码"} value={"34020119890213095X"}/>
                        <GroupItem text={"出生日期"} value={"1989-02-13"}/>
                        <GroupItem text={"户籍地详址"} value={"芜湖市镜湖区伟星城五栋二单元801"}/>
                    </View>
                    <GroupTitle title={"其他信息"}/>
                    <View style={styles.group2}>
                        <GroupItem text={"涉毒人员来源"} value={"市局分发"}/>
                        <GroupItem text={"别名/绰号"} value={"二子"}/>
                        <GroupItem text={"通讯信息"} value={"18326908768"}/>
                    </View>
                    <GroupTitle title={"附件"}/>
                    <View style={styles.group2}>
                        <FileItem name={"朱二壮社区康复记录.doc"} type={"file-word-o"}/>
                        <FileItem name={"朱二壮吸毒记录.xml"} type={"file-excel-o"}/>
                    </View>
                    <GroupTitle title={"图片 (1/4)"}/>
                    <View style={styles.group2}>
                        <View style={[styles.detail.imgRow2,{flexDirection:"column",backgroundColor:"#FFF",justifyContent:"flex-start",alignItems:"flex-start"}]}>
                            <View style={{flex:1,flexDirection:"row",marginVertical:10}}>
                                <Image resizeMode={"contain"}  style={{height:70,width:70,marginLeft:10}} source={require("../../../../assets/images/excPic.jpg")}/>
                            </View>
                        </View>
                    </View>
                    <View style={{height:20}}/>
                </ScrollView>
            </View>
        )
    }
}

export default connect((state)=>({

}),(dispatch)=>({

}))(Detail2)
