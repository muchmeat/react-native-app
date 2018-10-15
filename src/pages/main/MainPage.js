import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  RefreshControl,
  Alert,
  NativeModules
} from 'react-native';
import { connect } from 'react-redux'; // 引入connect函数

class MainPage extends Component {

    render() {
        return(
              <View>

              </View>
        )
    }
}

export default connect(
    (state) =>({

    }),
    (dispatch) => ({

    })
)(MainPage)
