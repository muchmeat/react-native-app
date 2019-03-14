import React from 'react';
import {createStackNavigator, createBottomTabNavigator, createSwitchNavigator} from 'react-navigation';
import Icon from "react-native-vector-icons/Ionicons";
import ThemeStyle from '../style/ThemeStyle'
import Wait from '../pages/Wait'
import MainPage from '../pages/main/MainPage'
import MainPage2 from '../pages/main/MainPage2'
import PageList from '../pages/main/PageList'
import List1 from '../pages/list/List1'
import List3 from '../pages/list/List3'
import screen1 from '../pages/login/screen1'
import screen2 from '../pages/login/screen2'
import screen3 from '../pages/login/screen3'
import Splash from './Splash'
import form from '../pages/form/Form'
import Detail from '../pages/form/Detail'
import Detail2 from '../pages/form/Detail2'
import DynamicsForm from '../pages/form/DynamicsForm'
import VideoPlay from '../../base/components/VideoPlay'
import ImageView2 from "../../base/components/ImageView2";
import PersonMessage from "../pages/main/PersonMessage";
import InitiateCollection from "../../project/InitiateCollection";
import CollectionTask from "../../project/CollectionTask";
import ImageView from "../../base/components/ImageView";
import VideoForm from "../../project/VideoForm";
import ProcessAcquisition from "../../project/ProcessAcquisition";
import VideoScreen from "../../base/components/VideoScreen";
import ResourceTagging from "../../project/ResourceTagging";
import userList from "../../project/userList";
import DynamicsDetail from "../pages/form/DynamicsDetail";
import login from "../pages/login/login";
import ChangePwd from "../pages/form/ChangePwd";
import InitiateCollection2 from "../../project/InitiateCollection2";
import Main from "../pages/main/Main";

const Tabs2 = createBottomTabNavigator({
    'Home': {
        screen: MainPage,
        navigationOptions: {
            tabBarLabel: '首页', // tabBar显示的文字
            tabBarIcon: ({tintColor}) => ( // tabBar显示的图标
                // 这里使用了react-native-vector-icons, 不熟悉的请看上方连接
                <Icon name='md-planet' color={tintColor} size={24} style={ThemeStyle.tabBarImage}/>
            )
        }
    },
    'Page': {
        screen: createStackNavigator({P: PageList}, {
            // headerLayoutPreset: 'center',
            navigationOptions: {
                headerStyle: {
                    backgroundColor: ThemeStyle.color.theme,
                    height: 48,
                },
                headerTitleStyle: {
                    fontSize: ThemeStyle.font.size_L,
                    color: ThemeStyle.color.fontWhite
                },
                //返回图标颜色
                headerTintColor: '#fff',
            }
        }),
        navigationOptions: {
            tabBarLabel: '页面', // tabBar显示的文字
            tabBarIcon: ({tintColor}) => ( // tabBar显示的图标
                // 这里使用了react-native-vector-icons, 不熟悉的请看上方连接
                <Icon name='md-today' color={tintColor} size={24} style={ThemeStyle.tabBarImage}/>
            )
        }
    },
    'Component': {
        screen: Wait,
        navigationOptions: {
            tabBarLabel: '组件', // tabBar显示的文字
            tabBarIcon: ({tintColor}) => ( // tabBar显示的图标
                // 这里使用了react-native-vector-icons, 不熟悉的请看上方连接
                <Icon name='md-options' color={tintColor} size={24} style={ThemeStyle.tabBarImage}/>
            )
        }
    }
}, {
    headerMode: 'screen',
    initialRouteName: 'Home',
    swipeEnabled: false,
    // tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: ThemeStyle.color.theme,
        inactiveTintColor: '#999',
        // pressColor: "#26D4FE",   //不使用涟漪效果
        style: {
            height: 48,
            backgroundColor: '#fff',
        },
        indicatorStyle: {
            height: 0, // 不显示indicator
        },
        labelStyle: ThemeStyle.tabBarLabel,
        tabStyle: ThemeStyle.tabBarItem,
        iconStyle: ThemeStyle.tabBarIcon,
        showIcon: true, // 是否显示图标, 默认为false
        showLabel: true, // 是否显示label
    },
});

const TITLES2 = ["React Native模板", "通用页面", "通用组件"];
//设置嵌入stack的tab Title
Tabs2.navigationOptions = ({navigation}) => {
    if (navigation.state.index === 1) {
        return {
            header: null
        };
    } else {
        return {
            headerTitle: TITLES[navigation.state.index]
        };
    }
};

const Tabs = createBottomTabNavigator({
    'A': {
        screen: Main,
        navigationOptions: {
            tabBarLabel: '首页', // tabBar显示的文字
            tabBarIcon: ({tintColor}) => ( // tabBar显示的图标
                // 这里使用了react-native-vector-icons, 不熟悉的请看上方连接
                <Icon name='md-home' color={tintColor} size={24} style={ThemeStyle.tabBarImage}/>
            )
        }
    },
    'B': {
        screen: Wait,
        navigationOptions: {
            tabBarLabel: '消息', // tabBar显示的文字
            tabBarIcon: ({tintColor}) => ( // tabBar显示的图标
                // 这里使用了react-native-vector-icons, 不熟悉的请看上方连接
                <Icon name='md-chatboxes' color={tintColor} size={24} style={ThemeStyle.tabBarImage}/>
            )
        }
    },
    'C': {
        screen: PersonMessage,
        navigationOptions: {
            tabBarLabel: '我的', // tabBar显示的文字
            tabBarIcon: ({tintColor}) => ( // tabBar显示的图标
                // 这里使用了react-native-vector-icons, 不熟悉的请看上方连接
                <Icon name='md-person' color={tintColor} size={24} style={ThemeStyle.tabBarImage}/>
            )
        }
    }
}, {
    initialRouteName: 'A',
    swipeEnabled: false,
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: ThemeStyle.color.theme,
        inactiveTintColor: '#999',
        pressColor: "#26D4FE",
        style: {
            height: 56,
            backgroundColor: '#fff',
        },
        indicatorStyle: {
            height: 0, // 不显示indicator
        },
        labelStyle: ThemeStyle.tabBarLabel,
        tabStyle: ThemeStyle.tabBarItem,
        iconStyle: ThemeStyle.tabBarIcon,
        showIcon: true, // 是否显示图标, 默认为false
        showLabel: true, // 是否显示label
    },
});

const TITLES = ["首页", "消息", "我的"];
//设置嵌入stack的tab Title
Tabs.navigationOptions = ({navigation}) => {
    const component = Tabs.router.getComponentForState(navigation.state);
    if (typeof component.navigationOptions === "function") {
        return component.navigationOptions({navigation})
    }
    return {
        headerTitle: TITLES[navigation.state.index]
    };
};

const AppStack = createStackNavigator({
    tabs: {screen: Tabs},
    screen1: {screen: screen1},
    screen2: {screen: screen2},
    screen3: {screen: screen3},
    main: {screen: MainPage},
    form: {screen: form},
    dynamicsForm: {screen: DynamicsForm},
    List1: {screen: List1},
    List3: {screen: List3},
    Detail: {screen: Detail},
    Detail2: {screen: Detail2},
    MainPage: {screen: MainPage},
    MainPage2: {screen: MainPage2},
    VideoForm: {screen: VideoForm},
    VideoScreen: {screen: VideoScreen},
    VideoPlay: {screen: VideoPlay},
    ImageView: {screen: ImageView},
    ImageView2: {screen: ImageView2},
    InitiateCollection: {screen: InitiateCollection},
    InitiateCollection2: {screen: InitiateCollection2},
    ProcessAcquisition: {screen: ProcessAcquisition},
    ResourceTagging: {screen: ResourceTagging},
    CollectionTask: {screen: CollectionTask},
    DynamicsDetail: {screen: DynamicsDetail},
    login: {screen: login},
    Wait: {screen: Wait},
    PersonMessage: {screen: PersonMessage},
    ChangePwd: {screen: ChangePwd},
    userList: {screen: userList},
}, {
    // initialRouteName:  'VideoForm', // 默认显示界面
    // initialRouteName:  isLoggedIn ? 'tabs':'screen1', // 默认显示界面
    // initialRouteName:  isLoggedIn ? 'tabs':'login', // 默认显示界面
    initialRouteName: 'tabs', // 默认显示界面
    // initialRouteName:  'ResourceTagging', // 默认显示界面
    // initialRouteName:  'tabs', // 默认显示界面
    // initialRouteName:  "form", // 默认显示界面
    headerMode: 'screen',       //header的显示模式，值为none时不显示
    mode: 'card',              //使用默认风格
    navigationOptions: {       //此处设置的navigationOptions属性为所有页面使用，页面可以设置static navigationOptions，将此属性覆盖
                               //右边的button，可在页面上写
                               // headerRight:<View style={{paddingRight:20,height:50,width:60,alignItems:"center"}}><Text style={{flex:1}} onPress={()=>{alert("曹尼玛啊")}}>重中之重</Text></View>,
                               // header:null,
        headerStyle: {
            backgroundColor: ThemeStyle.color.theme,
        },
        headerTitleStyle: {
            color: ThemeStyle.color.fontWithe,
        },
        //返回图标颜色
        headerTintColor: '#fff',
        //返回图标按住的样色（MD）
        // headerPressColorAndroid: "transparent",
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
    },
    // transitionConfig: () => ({ //自定义动画效果
    //     screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    // })
});

export default createSwitchNavigator(
    {
        Splash: Splash,
        Auth: login,
        App: AppStack,
    },
    {
        initialRouteName: 'Splash'
    });