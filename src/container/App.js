import React from 'react';
import { StackNavigator,DrawerNavigator } from 'react-navigation';
import ThemeStyle from '../style/ThemeStyle'
import LoginPage from '../pages/LoginPage'
import MainPage from '../pages/main/MainPage'
import Main1 from '../pages/main/Main1'
import List1 from '../pages/list/List1'
import List2 from '../pages/list/List2'
import List3 from '../pages/list/List3'
import screen1 from '../pages/login/screen1'
import screen2 from '../pages/login/screen2'
import screen3 from '../pages/login/screen3'
import screen4 from '../pages/login/screen4'

const draw = DrawerNavigator({
    login:{screen:LoginPage},
    screen1: {screen: screen1},
    screen2: {screen: screen2},
    screen3: {screen: screen3},
    screen4: {screen: screen4},
    Main1: {screen: Main1},
},{
    initialRouteName: 'login',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: false,
    tabBarPosition:'bottom'
});

const App= StackNavigator ({
    draw:{screen:draw,navigationOptions:{header:null}},
    login:{screen:LoginPage},
    main:{screen:MainPage},
    List1: {screen: List1},
    List3: {screen: List3},
},{
    initialRouteName: 'draw', // 默认显示界面
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
