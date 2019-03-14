/**
 * 当列表数据为空时显示页
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Dimensions,
    Modal
} from 'react-native';
import Global from "../../../utils/Global";
import ImageViewer from 'react-native-image-zoom-viewer';

const {width, height} = Dimensions.get('window');

export default class ImageView extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        console.warn("ids");
        this.images = [];
        let ids = this.props.navigation.getParam("ids", null);
        for(let id  of ids){
            // let image = {url:Global.FILE_BYTE_URL + id};
            let image = {url:Global.REQUEST_BASE_URL + "/medias/uploadDir/jpg.jpg"};
            this.images.push(image);
        }
    }

    render() {
        return (
            <Modal visible={true} transparent={true}>
                <ImageViewer imageUrls={this.images}/>
            </Modal>
        )
    }
}


