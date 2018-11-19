import React, {Component} from 'react'
import {
    Modal,
    View,
    Text,
    BackHandler,
    TouchableHighlight
} from 'react-native'
import styles from "../../example/style/Components";


export default class ModalMenu extends Component{

    constructor(props){
        super(props);
        this.state={
            visible:false
        }
    }

    // componentWillMount(){
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // }
    //
    // handleBackButton(){
    //     alert("1");
    //     return true;
    // }

    _setVisible(bool){
        this.setState({
            visible:bool
        })
    }

    render(){
        let _this=this;
        let items = [];
        let menus = _this.props.menus;
        if(menus){
            for(let i in menus){
                items.push(
                    <TouchableHighlight activeOpacity={0.8} underlayColor='transparent' key={i}
                                        onPress={()=>{
                                            menus[i].click();
                                        }}>
                        <View style={styles.modalMenu.itemView}>
                            <Text style={styles.modalMenu.text}>{menus[i].text}</Text>
                        </View>
                    </TouchableHighlight>
                )
            }
        }
        return (
                <Modal
                    visible={_this.state.visible}
                    transparent={true}
                    animationType='none'
                    onRequestClose={() => _this._setVisible(false)}>
                    <TouchableHighlight activeOpacity={1} underlayColor='transparent' style={styles.modalMenu.modal}
                                      onPress={()=>{this._setVisible(false)}}
                    >
                        <View style={styles.modalMenu.tip}>
                            <View style={styles.modalMenu.tipTop}/>
                            {items}
                        </View>
                    </TouchableHighlight>
                </Modal>
        )
    }
}
