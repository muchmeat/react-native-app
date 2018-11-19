/*

  a bootstrap like style

*/
"use strict";

import { Platform,PixelRatio } from "react-native";
import themeStyle from "../../../../../example/style/ThemeStyle"

let stylesheet = Object.freeze({
  fieldset: {},
  // the style applied to the container of all inputs
  formGroup: {
    normal: {
        backgroundColor:"#FFF",
    },
    error: {
        backgroundColor:"#FFF",
        paddingBottom: 2,
    }
  },
  controlLabel: {
    normal: {
        flex:1,
        color: themeStyle.form.LABEL_COLOR,
        fontSize: themeStyle.form.FONT_SIZE,
        fontWeight: themeStyle.form.FONT_WEIGHT
    },
    // the style applied when a validation error occours
    error: {
      flex:1,
      color: themeStyle.form.ERROR_COLOR,
      paddingLeft:10,
      fontSize: themeStyle.form.FONT_SIZE,
      fontWeight: themeStyle.form.FONT_WEIGHT
    }
  },
  helpBlock: {
    normal: {
      fontSize: themeStyle.form.FONT_SIZE,
      marginBottom: 2
    },
    // the style applied when a validation error occours
    error: {
      fontSize: themeStyle.form.FONT_SIZE,
      marginBottom: 2
    }
  },
  errorBlock: {
    marginRight:5,
    fontSize: themeStyle.form.ERROR_SIZE,
    color: themeStyle.form.ERROR_COLOR
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
      flex:1,
      color: themeStyle.form.INPUT_COLOR,
      fontSize: themeStyle.form.FONT_SIZE,
      height: 55,
      paddingVertical: Platform.OS === "ios" ? 7 : 0,
      paddingHorizontal: 7,
      fontWeight:"normal",
    },
    // the style applied when a validation error occours
    error: {
      color: themeStyle.form.INPUT_COLOR,
      fontSize: themeStyle.form.FONT_SIZE,
      height: 55,
      paddingVertical: Platform.OS === "ios" ? 7 : 0,
      paddingHorizontal: 7,
      // borderWidth:1,
      fontWeight:"normal",
      // borderColor: themeStyle.ERROR_COLOR,
    },
    // the style applied when the textbox is not editable
    notEditable: {
      fontSize: themeStyle.form.FONT_SIZE,
      height: 36,
      paddingVertical: Platform.OS === "ios" ? 7 : 0,
      paddingHorizontal: 7,
      borderRadius: 4,
      // borderColor: themeStyle.BORDER_COLOR,
      // borderWidth: 1,
      // marginBottom: 5,
      color: themeStyle.form.DISABLED_COLOR,
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
      borderColor: themeStyle.form.BORDER_COLOR,
      borderWidth: 1/PixelRatio.get()
    },
    error: {
      marginBottom: 4,
      borderRadius: 4,
      borderColor: themeStyle.form.ERROR_COLOR,
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
        height:55,
        paddingLeft: 7,
        color: themeStyle.form.INPUT_COLOR
      },
      ios: {}
    }),
    // the style applied when a validation error occours
    error: Platform.select({
      android: {
        flex:1,
        height:55,
        paddingLeft: 7,
        color: themeStyle.form.ERROR_COLOR
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
      borderColor: themeStyle.form.BORDER_COLOR
    }
  },
  pickerValue: {
    normal: {
      fontSize: themeStyle.form.FONT_SIZE,
      paddingLeft: 7
    },
    error: {
      fontSize: themeStyle.form.FONT_SIZE,
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
      color: themeStyle.form.INPUT_COLOR,
      fontSize: themeStyle.form.FONT_SIZE,
      paddingLeft: 7,
    },
    error: {
      color: themeStyle.form.ERROR_COLOR,
      fontSize: themeStyle.form.FONT_SIZE,
      padding: 7,
      marginBottom: 5
    }
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center"
  }
});

module.exports = stylesheet;
