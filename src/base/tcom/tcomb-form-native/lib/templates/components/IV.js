import React, { Component } from 'react'
import {
    View,
    Image,
    StatusBar,
    Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper'
const { width, height } = Dimensions.get('window')

const styles = {
    wrapper: {
        // backgroundColor: '#f00'
    },

    slide: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    container: {
        flex: 1,
    },

    imgBackground: {
        width,
        height,
        backgroundColor: 'transparent',
        position: 'absolute'
    },

    image: {
        width,
        height,
    }
}

export default class extends Component {
    constructor(props){
        super(props);
        this.imageSource = this.props.navigation.imageSource;
    }
    render () {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' />
                <Image
                    source={require('../../icon/bg.jpg')}
                    style={styles.imgBackground}
                />
                <Swiper style={styles.wrapper}
                        dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                        activeDot={<View style={{backgroundColor: '#fff', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                        paginationStyle={{
                            bottom: 70
                        }}
                        loop={false}>
                    <View style={styles.slide}>
                        <Image
                            style={styles.image}
                            source={require('../../icon/1.jpg')}
                            resizeMode='cover'
                        />
                    </View>
                    <View style={styles.slide}>
                        <Image
                            style={styles.image}
                            source={require('../../icon/2.jpg')}
                            resizeMode='cover'
                        />
                    </View>
                    <View style={styles.slide}>
                        <Image style={styles.image} source={require('../../icon/3.jpg')} />
                    </View>
                    <View style={styles.slide}>
                        <Image
                            style={styles.image}
                            source={{uri: this.imageSource[i]}}
                            resizeMode='cover'
                        />
                    </View>
                </Swiper>
            </View>
        )
    }
}
