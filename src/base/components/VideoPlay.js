import React, {
    Component
} from 'react';

import {
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
    Image,
    ActivityIndicator,
    Text,
    StatusBar,
    BackHandler
} from 'react-native';

import Video from 'react-native-video';

/**
 * 三个参数
 *
 * fullBuffer 全部缓冲
 * poster 海报
 * uri / require
 * {uri:"https://media.w3.org/2010/05/sintel/trailer.mp4"}
 * @param result
 * @returns {string}
 */

function formatTime(result) {
    let h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
    let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
    let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
    if(result >= 3600)
        return h + ":" + m + ":" + s;
    else
        return m + ":" + s;
}

export default class VideoPlay extends Component {

    static navigationOptions = {
        header: null
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            tag: 1,
            rate: 1,
            volume: 1,
            muted: false,
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
        };
    }


    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        this.params = this.props.navigation.state.params;
        console.log(this.state.tag + "lamb");

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid = () => {
        this.props.navigation.goBack();
        return true;
    };

    onLoad = (data) => {
        this.setState({
            duration: data.duration,
            paused: false
        });
    };

    onProgress = (data) => {
        this.setState({
            currentTime: data.currentTime,
        });
    };

    onEnd = () => {
        this.setState({paused: true});
        this.video.seek(0)
    };

    onAudioBecomingNoisy = () => {
        this.setState({paused: true})
    };

    onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
        this.setState({paused: !event.hasAudioFocus})
    };

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    };


    render() {
        let height = Dimensions.get("window").height;
        let width = Dimensions.get("window").width;
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
        let icon;
        let styleIcon = {height:40,width:40,position:"absolute",left:width/2 - 20,top:height/2 - 20};
        if(!this.state.duration){
            icon = <ActivityIndicator style={styleIcon} size='small' color='#bfbfbf'/>;
        }else if(this.state.duration && (!this.state.currentTime||this.state.currentTime <=0.5) ){
            icon = <Image style={styleIcon} source={require("../../../assets/icons/play.png")}/>;
        }else if(this.state.currentTime && this.state.paused){
            icon = <Image style={styleIcon} source={require("../../../assets/icons/stop.png")}/>;
        }else {
            icon = null;
        }
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={'#000'} />
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.fullScreen}
                    onLayout={()=> {
                        if(this.state.paused)
                            this.setState({
                                screen:height>width,
                                paused: false
                            });
                        else
                            this.setState({
                                screen:height>width,
                                paused: false
                            });
                    }}
                    onPress={() => this.setState({paused: !this.state.paused})}>
                    <Video
                        ref={(ref: Video) => {
                            this.video = ref
                        }}
                        /* For ExoPlayer */
                        poster={this.params.poster}  //海报
                        source={{uri:this.params.uri}}
                        style={styles.fullScreen}
                        rate={this.state.rate}
                        paused={this.state.paused}
                        volume={this.state.volume}
                        muted={this.state.muted}
                        resizeMode={"contain"}
                        onLoadStart={this.onLoadStart}
                        onLoad={this.onLoad}
                        onProgress={this.onProgress}
                        onEnd={this.onEnd}
                        onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                        onAudioFocusChanged={this.onAudioFocusChanged}
                        allowsExternalPlayback={false}
                        bufferConfig={(this.params.fullBuffer && this.state.duration) ? {
                            minBufferMs: this.state.duration * 1000,
                            maxBufferMs: this.state.duration * 1000,
                            bufferForPlaybackMs: this.state.duration * 1000,
                            bufferForPlaybackAfterRebufferMs: this.state.duration * 1000
                        } :{
                            minBufferMs: 20000,
                            maxBufferMs: 50000,
                            bufferForPlaybackMs: 5000,
                            bufferForPlaybackAfterRebufferMs: 5000
                        }}
                        onBuffer={(e)=>{}}
                        repeat={false}
                    />
                    {icon}
                </TouchableOpacity>

                <View style={styles.controls}>
                    <View style={styles.timeTextView}><Text style={styles.timeText}>{this.state.currentTime ? formatTime(this.state.currentTime) : "00:00"}</Text></View>
                    <TouchableOpacity activeOpacity={1} style={{flex:1}} onPress={(e)=> {
                        this.video.seek(parseInt(e.nativeEvent.locationX/(width - 90) *  this.state.duration));
                    }}>
                        <View style={styles.progress}>
                            <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]}/>
                            <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.timeTextView}><Text style={styles.timeText}>{this.state.duration ? formatTime(this.state.duration) : "00:00"}</Text></View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    textStyle: {
        paddingLeft: 10,
        paddingTop: 25,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    btnStyle: {
        paddingRight: 10,
        paddingTop: 25,
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        position: 'absolute',
        bottom: 20,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center"
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
        justifyContent:"center",alignItems:"center"
    },
    innerProgressCompleted: {
        height: 2,
        backgroundColor: '#3399FF',
    },
    innerProgressRemaining: {
        height: 2,
        backgroundColor: '#cccccc',
    },
    volumeControl: {
        fontSize: 25,
        color: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    timeTextView:{
        width:45,justifyContent:"center",alignItems:"center"
    },
    timeText:{
        color:"#fff",fontSize:12
    }
});
