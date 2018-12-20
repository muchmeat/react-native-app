import React, {Component} from 'react';
import {
    View,
    StyleSheet
} from "react-native";
import {Button} from 'react-native-elements';

export default class VideoBtn extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Button title={this.props.text}
                        buttonStyle={styles.touch}
                        titleStyle={styles.text}
                        onPress={this.props.click}/>
                <Button title={'删除视频'}
                        buttonStyle={styles.touch}
                        titleStyle={styles.text}
                        onPress={this.props.cancelClick}/>
            </View>
        )

    }
}
const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: "#008EFE",
        alignItems: "center",
        marginVertical: 5,
        marginHorizontal: 20,
        borderRadius: 8,
        justifyContent: "space-around",
        flexDirection: "row"
    },
    touch: {
        backgroundColor: "#D2B48C",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        elevation: 0
    },
    activeTouch: {
        backgroundColor: "#B81F00",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        elevation: 0
    },
    text: {
        fontSize: 18,
        color: "#FFF"
    }
});
