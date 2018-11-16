import React, { Component } from 'react';
import { View, Image} from "react-native";
import components from "../../example/style/Components";

export default class Loading extends Component {
    render() {
        return <View style={[components.load.view,this.props.viewStyle]}>
                    <Image source={ require("../../../assets/images/loading.gif")}
                           style={[components.load.image,this.props.imageStyle]}/>
                </View>
    }
}
