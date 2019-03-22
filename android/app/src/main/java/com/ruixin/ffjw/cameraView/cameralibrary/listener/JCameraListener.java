package com.ruixin.ffjw.cameraView.cameralibrary.listener;

import android.graphics.Bitmap;

public interface JCameraListener {

    void captureSuccess(Bitmap bitmap,String url);

    void recordSuccess(String url, Bitmap firstFrame);

    void quit();
}
