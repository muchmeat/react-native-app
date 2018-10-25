import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { StackNavigator,DrawerNavigator,TabNavigator} from 'react-navigation';
import ThemeStyle from '../style/ThemeStyle'
import LoginPage from '../pages/LoginPage'
import Tab from '../pages/Tab'
import Wait from '../pages/Wait'
import MainPage from '../pages/main/MainPage'
import PageList from '../pages/main/PageList'
import Main1 from '../pages/main/Main1'
import List1 from '../pages/list/List1'
import List2 from '../pages/list/List2'
import List3 from '../pages/list/List3'
import screen1 from '../pages/login/screen1'
import screen2 from '../pages/login/screen2'
import screen3 from '../pages/login/screen3'
import screen4 from '../pages/login/screen4'
import form from '../pages/form/Form'
import Detail from '../pages/form/Detail'
import Detail2 from '../pages/form/Detail2'


const tabs = TabNavigator({
    1: {
        screen: MainPage,
        navigationOptions:{
            tabBarLabel: '首页'
        },
    },
    2: {
        screen: PageList,
        navigationOptions:{
            tabBarLabel: '页面'
        },
    },
    3: {
        screen: Wait,
        navigationOptions:{
            tabBarLabel: '组件'
        },
    }
},{
    lazy: true, // 是否懒加载
    // initialRouteName: '1',
    //设置TabNavigator的位置
    tabBarPosition: 'bottom',
    //是否在更改标签时显示动画
    animationEnabled: true,
    //是否允许在标签之间进行滑动
    swipeEnabled: true,
    //按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    backBehavior: "none",
    tabBarComponent:props => <Tab {...props}/>,
    tabBarOptions: {
        //是否使标签大写，默认为true
        upperCaseLabel: false,
        showIcon: true,//是否显示图标，默认关闭
        showLabel: true,//是否显示label，默认开启
        pressOpacity: 0.8,
        pressColor: "#ccc",
        activeTintColor: ThemeStyle.color.theme,//label和icon的前景色 活跃状态下（选中）
        inactiveTintColor: ThemeStyle.color.fontGray,//label和icon的前景色 活跃状态下（未选中）
        style: {
            height: 70,
            backgroundColor: '#fff',
            zIndex: 0,
            position: 'relative',
        },
        indicatorStyle: {//标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
            height: 0,
        },
        labelStyle: {//文字样式
            fontSize: 12,
            paddingVertical: 0,
            marginTop: 10,
        },
        iconStyle: {//图标样式
            marginTop: 5
        },
        tabStyle: {
            backgroundColor: '#fff',
        },
    }
});


const App= StackNavigator ({
    tabs:{screen:tabs},
    screen1: {screen: screen1},
    screen2: {screen: screen2},
    screen3: {screen: screen3},
    Main1: {screen: Main1},
    login:{screen:LoginPage},
    main:{screen:MainPage},
    form:{screen:form},
    List1: {screen: List1},
    List3: {screen: List3},
    Detail: {screen: Detail},
    Detail2: {screen: Detail2},
},{
    initialRouteName: 'tabs', // 默认显示界面
    headerMode: 'float',       //header的显示模式，值为none时不显示
    mode: 'card',              //使用默认风格
    navigationOptions: {       //此处设置的navigationOptions属性为所有页面使用，页面可以设置static navigationOptions，将此属性覆盖
                               //右边的button，可在页面上写
                               // headerRight:<View style={{paddingRight:20,height:50,width:60,alignItems:"center"}}><Text style={{flex:1}} onPress={()=>{alert("曹尼玛啊")}}>重中之重</Text></View>,
        headerStyle: {
            backgroundColor: ThemeStyle.color.theme
        },
        headerTitleStyle: {
            color: ThemeStyle.color.fontWithe,
            fontSize: ThemeStyle.font.size_L,
            fontWeight:"normal"
        },
        //返回图标颜色
        headerTintColor: '#fff',
        //返回图标按住的样色
        headerPressColorAndroid:"transparent",
        //header是否透明，默认false不透明
        // headerTransparent:true
        //返回上一页手势功能，在ios默认true，Android默认false
        // gesturesEnabled:true
        //手势水平垂直滑动多少触发
        // gestureResponseDistance:{
        //     horizontal:25,
        //     vertical:100,
        // }
        //手势滑动的方向
        // gestureDirection:"right-to-left"
        // headerMode:"none"
        //path属性适用于其他app或浏览器使用url打开本app并进入指定页面。path属性用于声明一个界面路径，例如：【/pages/Home】。此时我们可以在手机浏览器中输入：app名称://pages/Home来启动该App，并进入Home界面。
        // path:'../pages/MainPage'
    }
});

export default App
