/*

  a bootstrap like style

*/
"use strict";

import { Platform,PixelRatio } from "react-native";

var LABEL_COLOR = "#3E3A39";
var INPUT_COLOR = "#3E3A39";
var ERROR_COLOR = "#a94442";
var HELP_COLOR = "#999999";
var BORDER_COLOR = "#ddd";
var DISABLED_COLOR = "#777777";
var DISABLED_BACKGROUND_COLOR = "#eeeeee";
var FONT_SIZE = 16;
var ERROR_SIZE = 13;
var FONT_WEIGHT = "400";

var stylesheet = Object.freeze({
  fieldset: {},
  // the style applied to the container of all inputs
  formGroup: {
    normal: {
        backgroundColor:"#F8F8F8",
        paddingBottom: 2,
    },
    error: {
        backgroundColor:"#F8F8F8",
        paddingBottom: 2,
    }
  },
  controlLabel: {
    normal: {
      flex:1,
      color: LABEL_COLOR,
      paddingLeft:10,
      fontSize: FONT_SIZE,
      fontWeight: FONT_WEIGHT
    },
    // the style applied when a validation error occours
    error: {
      flex:1,
      color: ERROR_COLOR,
      paddingLeft:10,
      fontSize: FONT_SIZE,
      fontWeight: FONT_WEIGHT
    }
  },
  helpBlock: {
    normal: {
      color: HELP_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2
    },
    // the style applied when a validation error occours
    error: {
      color: HELP_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2
    }
  },
  errorBlock: {
    marginRight:5,
    fontSize: ERROR_SIZE,
    marginBottom: 2,
    color: ERROR_COLOR
  },
  textboxView: {
    normal: {},
    error: {},
    notEditable: {
      paddingTop:5,
      paddingRight:5,
    }
  },
  textbox: {
    normal: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 45,
      paddingVertical: Platform.OS === "ios" ? 7 : 0,
      paddingHorizontal: 7,
      fontWeight:"normal",
    },
    // the style applied when a validation error occours
    error: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 45,
      paddingVertical: Platform.OS === "ios" ? 7 : 0,
      paddingHorizontal: 7,
      // borderWidth:1,
      fontWeight:"normal",
      // borderColor: ERROR_COLOR,
    },
    // the style applied when the textbox is not editable
    notEditable: {
      fontSize: FONT_SIZE,
      height: 36,
      paddingVertical: Platform.OS === "ios" ? 7 : 0,
      paddingHorizontal: 7,
      borderRadius: 4,
      // borderColor: BORDER_COLOR,
      // borderWidth: 1,
      // marginBottom: 5,
      color: DISABLED_COLOR,
      // backgroundColor: DISABLED_BACKGROUND_COLOR
    }
  },
  checkbox: {
    normal: {
      marginBottom: 0
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 0
    }
  },
  pickerContainer: {
    normal: {
      marginBottom: 1,
      borderRadius: 4,
      borderColor: BORDER_COLOR,
      borderWidth: 1/PixelRatio.get()
    },
    error: {
      marginBottom: 4,
      borderRadius: 4,
      borderColor: ERROR_COLOR,
      borderWidth: 1
    },
    open: {
      // Alter styles when select container is open
    }
  },
  select: {
    normal: Platform.select({
      android: {
        flex:1,
        height:45,
        paddingLeft: 7,
        color: INPUT_COLOR
      },
      ios: {}
    }),
    // the style applied when a validation error occours
    error: Platform.select({
      android: {
        flex:1,
        height:45,
        paddingLeft: 7,
        color: ERROR_COLOR
      },
      ios: {}
    })
  },
  pickerTouchable: {
    normal: {
      height: 44,
      flexDirection: "row",
      alignItems: "center"
    },
    error: {
      height: 44,
      flexDirection: "row",
      alignItems: "center"
    },
    active: {
      borderBottomWidth: 1,
      borderColor: BORDER_COLOR
    }
  },
  pickerValue: {
    normal: {
      fontSize: FONT_SIZE,
      paddingLeft: 7
    },
    error: {
      fontSize: FONT_SIZE,
      paddingLeft: 7
    }
  },
  datepicker: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  },
  dateTouchable: {
    normal: {},
    error: {}
  },
  dateValue: {
    normal: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      paddingLeft: 7,
    },
    error: {
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      padding: 7,
      marginBottom: 5
    }
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center"
  },
  button: {
    height: 36,
    backgroundColor: "#48BBEC",
    borderColor: "#48BBEC",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  }
});

module.exports = stylesheet;
