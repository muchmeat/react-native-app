package com.ruixin.ffjw.api;

import android.Manifest;
import android.app.Activity;
import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.DocumentsContract;
import android.provider.MediaStore;
import android.support.v4.app.ActivityCompat;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.modules.core.PermissionListener;
import com.ruixin.ffjw.cameraViewActivity;
import com.ruixin.ffjw.utils.MimeUtils;
import com.ruixin.ffjw.utils.PermissionUtil;

import java.io.File;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Callable;

class CameraViewModule extends ReactContextBaseJavaModule implements ActivityEventListener {
    private static final int IMAGE_PICKER_REQUEST = 61110;
    private static final int CAMERA_PICKER_REQUEST = 61111;
    private static final int FILE_PICKER_REQUEST = 61112;
    private static final int CAMERA_VIEW_REQUEST = 61113;
    private static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";

    private static final String E_CAMERA_CANCELLED_KEY = "E_CAMERA_CANCELLED";
    private static final String E_CAMERA_CANCELLED_MSG = "User cancelled camera";

    private static final String E_CALLBACK_ERROR = "E_CALLBACK_ERROR";
    private static final String E_NO_FILE_DATA_FOUND = "E_NO_FILE_DATA_FOUND";
    private static final String E_PERMISSIONS_MISSING = "E_PERMISSION_MISSING";

    private boolean multiple = false;

    private ResultCollector resultCollector = new ResultCollector();
    private ReactApplicationContext reactContext;

    CameraViewModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "CameraViewModule";
    }

    @Override
    public void onActivityResult(Activity activity, final int requestCode, final int resultCode, final Intent data) {
        if (requestCode == CAMERA_VIEW_REQUEST) {
            cameraViewResult(activity, requestCode, resultCode, data);
        }
    }

    @Override
    public void onNewIntent(Intent intent) {
    }

    /**
     *  打开相机，获取图片或视频
     * @param buttonState 有三种状态： images 拍照 videos 视频 空 拍照和视频
     * @param promise
     */
    @ReactMethod
    public void startCameraView(final String buttonState, final Promise promise) {
        final Activity activity = getCurrentActivity();

        if (activity == null) {
            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
            return;
        }

        resultCollector.setup(promise, multiple);

        List<String> requiredPermissions = new ArrayList<>();
        requiredPermissions.add(Manifest.permission.WRITE_EXTERNAL_STORAGE);
        requiredPermissions.add(Manifest.permission.RECORD_AUDIO);
        requiredPermissions.add(Manifest.permission.CAMERA);
        PermissionUtil.permissionsCheck(activity, promise, requiredPermissions, new Callable<Void>() {
            @Override
            public Void call() {
                openCameraView(promise, buttonState);
                return null;
            }
        });
    }

    private void openCameraView(final Promise promise, final String buttonState) {
        try {
            final Activity activity = getCurrentActivity();
            final Intent galleryIntent = new Intent(activity, cameraViewActivity.class);
            galleryIntent.putExtra("buttonState", buttonState);
            activity.startActivityForResult(galleryIntent, CAMERA_VIEW_REQUEST);
        } catch (Exception e) {
//            resultCollector.notifyProblem(E_FAILED_TO_SHOW_PICKER, e);
        }
    }

    private void cameraViewResult(Activity activity, final int requestCode, final int resultCode, final Intent data) {
        if (resultCode == Activity.RESULT_CANCELED) {
            resultCollector.notifyProblem(E_CAMERA_CANCELLED_KEY, E_CAMERA_CANCELLED_MSG);
        } else if (resultCode == Activity.RESULT_OK) {
            Uri uri = data.getData();
            WritableMap image = new WritableNativeMap();

            if (uri == null) {
                resultCollector.notifyProblem(E_NO_FILE_DATA_FOUND, "Cannot resolve file url");
                return;
            }

            try {
                String path = uri.toString();
                image.putString("path", "file://" + path);
                File file = new File(path);
                String extension = file.getName().substring(file.getName().lastIndexOf(".") + 1, file.getName().length()).toLowerCase();
                image.putString("extension", extension);
                image.putString("name", file.getName().substring(0, file.getName().lastIndexOf(".")));
                image.putInt("fileSize", (int) file.length());
                image.putString("fileType", MimeUtils.guessFileTypeFromExtension(extension));
                resultCollector.notifySuccess(image);
            } catch (Exception ex) {
                Log.e("CameraViewModule", ex.toString());
                resultCollector.notifyProblem(E_NO_FILE_DATA_FOUND, ex.getMessage());
            }
        }
    }

}