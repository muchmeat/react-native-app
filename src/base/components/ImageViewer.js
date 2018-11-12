import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class ImageViewer extends Component {

    static navigationOptions = {
        headerTitle: "照片",
        headerStyle:{backgroundColor:"#000"},
    };

    componentWillMount(){
        this.imageSource = this.props.navigation.state.params.imageSource;
    }

    render() {
        let _this = this;

        return (
            <View style={styles.container}>
                <Swiper dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                    activeDot={<View style={{backgroundColor: '#fff', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                    paginationStyle={{
                        bottom: 70
                    }}
                    loop={false}>
                    {_this.imageSource.map((img)=>{
                        return <ScrollView key={img}>
                            <Image resizeMode='contain' style={{width:width,height:height-100}} source={{uri:'data:image/png;base64,'+img.base64}}/>
                        </ScrollView>
                    })}
                </Swiper>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    imageContainer: {
        flex: 1,
        // backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 300,
        width: 400,
    },
});
