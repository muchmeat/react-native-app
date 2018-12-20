package com.ywcj;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;

/**
 * Created by Administrator on 2017-4-22.
 */
public class LocationActivityEventListener extends BaseActivityEventListener {
    private LocationActivityResultInterface mCallback;

    public LocationActivityEventListener(ReactApplicationContext reactContext, LocationActivityResultInterface callback) {
        reactContext.addActivityEventListener(this);
        mCallback = callback;
    }

//    // < RN 0.33.0
//    public void onActivityResult(int requestCode, int resultCode, Intent data) {
//        mCallback.callback(requestCode, resultCode, data);
//    }

    // >= RN 0.33.0
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        mCallback.callback(requestCode, resultCode, data,activity);
    }
}
