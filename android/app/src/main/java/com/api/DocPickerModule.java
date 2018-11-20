package com.api;

import android.Manifest;
import android.annotation.TargetApi;
import android.app.Activity;
import android.content.ClipData;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.media.MediaMetadataRetriever;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.CursorLoader;
import android.support.v4.content.FileProvider;
import android.util.Base64;
import android.webkit.MimeTypeMap;
import android.content.ContentResolver;
import android.provider.DocumentsContract;
import android.content.ContentUris;
import android.database.Cursor;
import android.content.Context;
import android.util.Base64;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.PromiseImpl;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.modules.core.PermissionListener;
//import com.yalantis.ucrop.UCrop;
//import com.yalantis.ucrop.UCropActivity;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.Callable;
import java.text.DecimalFormat;

class DocPickerModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    private static final int IMAGE_PICKER_REQUEST = 61110;
    private static final int CAMERA_PICKER_REQUEST = 61111;
    private static final int FILE_PICKER_REQUEST = 61112;
    private static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";

    private static final String E_PICKER_CANCELLED_KEY = "E_PICKER_CANCELLED";
    private static final String E_PICKER_CANCELLED_MSG = "User cancelled image selection";

    private static final String E_CALLBACK_ERROR = "E_CALLBACK_ERROR";
    private static final String E_FAILED_TO_SHOW_PICKER = "E_FAILED_TO_SHOW_PICKER";
    private static final String E_FAILED_TO_OPEN_CAMERA = "E_FAILED_TO_OPEN_CAMERA";
    private static final String E_NO_IMAGE_DATA_FOUND = "E_NO_IMAGE_DATA_FOUND";
    private static final String E_NO_FILE_DATA_FOUND = "E_NO_FILE_DATA_FOUND";
    private static final String E_CAMERA_IS_NOT_AVAILABLE = "E_CAMERA_IS_NOT_AVAILABLE";
    private static final String E_CANNOT_LAUNCH_CAMERA = "E_CANNOT_LAUNCH_CAMERA";
    private static final String E_PERMISSIONS_MISSING = "E_PERMISSION_MISSING";
    private static final String E_ERROR_WHILE_CLEANING_FILES = "E_ERROR_WHILE_CLEANING_FILES";

    private String mediaType = "any";
    private boolean multiple = false;
    private boolean includeBase64 = false;
    private boolean includeExif = false;
    private boolean cropping = false;
    private boolean cropperCircleOverlay = false;
    private boolean freeStyleCropEnabled = false;
    private boolean showCropGuidelines = true;
    private boolean hideBottomControls = false;
    private boolean enableRotationGesture = false;
    private boolean disableCropperColorSetters = false;
    private ReadableMap options;

    //Grey 800
    private final String DEFAULT_TINT = "#424242";
    private String cropperActiveWidgetColor = DEFAULT_TINT;
    private String cropperStatusBarColor = DEFAULT_TINT;
    private String cropperToolbarColor = DEFAULT_TINT;
    private String cropperToolbarTitle = null;

    //Light Blue 500
    private final String DEFAULT_WIDGET_COLOR = "#03A9F4";
    private int width = 200;
    private int height = 200;

    private Uri mCameraCaptureURI;
    private String mCurrentPhotoPath;
    private ResultCollector resultCollector = new ResultCollector();
//    private Compression compression = new Compression();
    private ReactApplicationContext reactContext;

    DocPickerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
        this.reactContext = reactContext;
    }
//
//    private String getTmpDir(Activity activity) {
//        String tmpDir = activity.getCacheDir() + "/ruixin";
//        new File(tmpDir).mkdir();
//        return tmpDir;
//    }

    @Override
    public String getName() {
        return "DocPickerModule";
    }

    private void setConfiguration(final ReadableMap options) {
        mediaType = options.hasKey("mediaType") ? options.getString("mediaType") : mediaType;
        multiple = options.hasKey("multiple") && options.getBoolean("multiple");
        includeBase64 = options.hasKey("includeBase64") && options.getBoolean("includeBase64");
        includeExif = options.hasKey("includeExif") && options.getBoolean("includeExif");
        width = options.hasKey("width") ? options.getInt("width") : width;
        height = options.hasKey("height") ? options.getInt("height") : height;
        cropping = options.hasKey("cropping") ? options.getBoolean("cropping") : cropping;
        cropperActiveWidgetColor = options.hasKey("cropperActiveWidgetColor") ? options.getString("cropperActiveWidgetColor") : cropperActiveWidgetColor;
        cropperStatusBarColor = options.hasKey("cropperStatusBarColor") ? options.getString("cropperStatusBarColor") : cropperStatusBarColor;
        cropperToolbarColor = options.hasKey("cropperToolbarColor") ? options.getString("cropperToolbarColor") : cropperToolbarColor;
        cropperToolbarTitle = options.hasKey("cropperToolbarTitle") ? options.getString("cropperToolbarTitle") : null;
        cropperCircleOverlay = options.hasKey("cropperCircleOverlay") ? options.getBoolean("cropperCircleOverlay") : cropperCircleOverlay;
        freeStyleCropEnabled = options.hasKey("freeStyleCropEnabled") ? options.getBoolean("freeStyleCropEnabled") : freeStyleCropEnabled;
        showCropGuidelines = options.hasKey("showCropGuidelines") ? options.getBoolean("showCropGuidelines") : showCropGuidelines;
        hideBottomControls = options.hasKey("hideBottomControls") ? options.getBoolean("hideBottomControls") : hideBottomControls;
        enableRotationGesture = options.hasKey("enableRotationGesture") ? options.getBoolean("enableRotationGesture") : enableRotationGesture;
        disableCropperColorSetters = options.hasKey("disableCropperColorSetters") ? options.getBoolean("disableCropperColorSetters") : disableCropperColorSetters;
        this.options = options;
    }

    private void permissionsCheck(final Activity activity, final Promise promise, final List<String> requiredPermissions, final Callable<Void> callback) {

        List<String> missingPermissions = new ArrayList<>();

        for (String permission : requiredPermissions) {
            int status = ActivityCompat.checkSelfPermission(activity, permission);
            if (status != PackageManager.PERMISSION_GRANTED) {
                missingPermissions.add(permission);
            }
        }

        if (!missingPermissions.isEmpty()) {

            getPermissionAwareActivity(activity)
                    .requestPermissions(missingPermissions.toArray(new String[missingPermissions.size()]), 1, new PermissionListener() {

                @Override
                public boolean onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
                    if (requestCode == 1) {

                        for (int grantResult : grantResults) {
                            if (grantResult == PackageManager.PERMISSION_DENIED) {
                                promise.reject(E_PERMISSIONS_MISSING, "Required permission missing");
                                return true;
                            }
                        }

                        try {
                            callback.call();
                        } catch (Exception e) {
                            promise.reject(E_CALLBACK_ERROR, "Unknown error", e);
                        }
                    }

                    return true;
                }
            });

            return;
        }

        // all permissions granted
        try {
            callback.call();
        } catch (Exception e) {
            promise.reject(E_CALLBACK_ERROR, "Unknown error", e);
        }
    }

    private PermissionAwareActivity getPermissionAwareActivity(final Activity activity) {
        if (activity == null) {
            throw new IllegalStateException("Tried to use permissions API while not attached to an " +
                    "Activity.");
        } else if (!(activity instanceof PermissionAwareActivity)) {
            throw new IllegalStateException("Tried to use permissions API but the host Activity doesn't" +
                    " implement PermissionAwareActivity.");
        }
        return (PermissionAwareActivity) activity;
    }

    @ReactMethod
    public void openFilePicker(final ReadableMap options,final String mode, final Promise promise) {
        final Activity activity = getCurrentActivity();

        if (activity == null) {
            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
            return;
        }

        setConfiguration(options);
        resultCollector.setup(promise, multiple);

        permissionsCheck(activity, promise, Collections.singletonList(Manifest.permission.WRITE_EXTERNAL_STORAGE), new Callable<Void>() {
            @Override
            public Void call() {
                initiateFilePicker(promise,mode);
                return null;
            }
        });
    }

    @ReactMethod
    private void initiateFilePicker(final Promise promise,final String mode) {
        try {
            final Activity activity = getCurrentActivity();
            final Intent galleryIntent = new Intent(Intent.ACTION_GET_CONTENT);

            galleryIntent.setType(mode);

            galleryIntent.addCategory(Intent.CATEGORY_OPENABLE);

            final Intent chooserIntent = Intent.createChooser(galleryIntent, "Pick an file");
            activity.startActivityForResult(chooserIntent, FILE_PICKER_REQUEST);
        } catch (Exception e) {
//            resultCollector.notifyProblem(E_FAILED_TO_SHOW_PICKER, e);
        }
    }

    @Override
    public void onActivityResult(Activity activity, final int requestCode, final int resultCode, final Intent data) {
        if (requestCode == IMAGE_PICKER_REQUEST) {
//            imagePickerResult(activity, requestCode, resultCode, data);
        } else if (requestCode == FILE_PICKER_REQUEST) {
            filePickerResult(activity, requestCode, resultCode, data);
        } else if (requestCode == CAMERA_PICKER_REQUEST) {
//            cameraPickerResult(activity, requestCode, resultCode, data);
//        } else if (requestCode == UCrop.REQUEST_CROP) {
//            croppingResult(activity, requestCode, resultCode, data);
        }
    }
    //
    @Override
    public void onNewIntent(Intent intent) {
    }

    private void filePickerResult(Activity activity, final int requestCode, final int resultCode, final Intent data) {
        if (resultCode == Activity.RESULT_CANCELED) {
            resultCollector.notifyProblem(E_PICKER_CANCELLED_KEY, E_PICKER_CANCELLED_MSG);
        } else if (resultCode == Activity.RESULT_OK) {
            Uri uri = data.getData();
            WritableMap image = new WritableNativeMap();

            if (uri == null) {
                resultCollector.notifyProblem(E_NO_FILE_DATA_FOUND, "Cannot resolve image url");
                return;
            }

            try {
                String path = getFilePathByUri(activity.getApplicationContext(), uri);
                image.putString("path", "file://" + path);
                File file = new File(path);
                String end = file.getName().substring(file.getName().lastIndexOf(".") + 1, file.getName	().length()).toLowerCase();
                image.putString("extension", end);
                image.putString("name", file.getName().substring(0, file.getName().lastIndexOf(".")));
                image.putInt("fileSize", (int) file.length());
                resultCollector.notifySuccess(image);
            } catch (Exception ex) {
                resultCollector.notifyProblem(E_NO_IMAGE_DATA_FOUND, ex.getMessage());
            }
        }
    }

    public static String getFilePathByUri(Context context, Uri uri) {
        String path = null;
        // 以 file:// 开头的
        if (ContentResolver.SCHEME_FILE.equals(uri.getScheme())) {
            path = uri.getPath();
            return path;
        }
        // 以 content:// 开头的，比如 content://media/extenral/images/media/17766
        if (ContentResolver.SCHEME_CONTENT.equals(uri.getScheme()) && Build.VERSION.SDK_INT < Build.VERSION_CODES.KITKAT) {
            Cursor cursor = context.getContentResolver().query(uri, new String[]{MediaStore.Images.Media.DATA}, null, null, null);
            if (cursor != null) {
                if (cursor.moveToFirst()) {
                    int columnIndex = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
                    if (columnIndex > -1) {
                        path = cursor.getString(columnIndex);
                    }
                }
                cursor.close();
            }
            return path;
        }
        // 4.4及之后的 是以 content:// 开头的，比如 content://com.android.providers.media.documents/document/image%3A235700
        if (ContentResolver.SCHEME_CONTENT.equals(uri.getScheme()) && Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            if (DocumentsContract.isDocumentUri(context, uri)) {
                if (isExternalStorageDocument(uri)) {
                    // ExternalStorageProvider
                    final String docId = DocumentsContract.getDocumentId(uri);
                    final String[] split = docId.split(":");
                    final String type = split[0];
                    if ("primary".equalsIgnoreCase(type)) {
                        path = Environment.getExternalStorageDirectory() + "/" + split[1];
                        return path;
                    }
                } else if (isDownloadsDocument(uri)) {
                    // DownloadsProvider
                    final String id = DocumentsContract.getDocumentId(uri);
                    final Uri contentUri = ContentUris.withAppendedId(Uri.parse("content://downloads/public_downloads"),
                            Long.valueOf(id));
                    path = getDataColumn(context, contentUri, null, null);
                    return path;
                } else if (isMediaDocument(uri)) {
                    // MediaProvider
                    final String docId = DocumentsContract.getDocumentId(uri);
                    final String[] split = docId.split(":");
                    final String type = split[0];
                    Uri contentUri = null;
                    if ("image".equals(type)) {
                        contentUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
                    } else if ("video".equals(type)) {
                        contentUri = MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
                    } else if ("audio".equals(type)) {
                        contentUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
                    }
                    final String selection = "_id=?";
                    final String[] selectionArgs = new String[]{split[1]};
                    path = getDataColumn(context, contentUri, selection, selectionArgs);
                    return path;
                }
            }
        }
        return null;
    }

    private static String getDataColumn(Context context, Uri uri, String selection, String[] selectionArgs) {
        Cursor cursor = null;
        final String column = "_data";
        final String[] projection = {column};
        try {
            cursor = context.getContentResolver().query(uri, projection, selection, selectionArgs, null);
            if (cursor != null && cursor.moveToFirst()) {
                final int column_index = cursor.getColumnIndexOrThrow(column);
                return cursor.getString(column_index);
            }
        } finally {
            if (cursor != null)
                cursor.close();
        }
        return null;
    }

    private static boolean isExternalStorageDocument(Uri uri) {
        return "com.android.externalstorage.documents".equals(uri.getAuthority());
    }

    private static boolean isDownloadsDocument(Uri uri) {
        return "com.android.providers.downloads.documents".equals(uri.getAuthority());
    }

    private static boolean isMediaDocument(Uri uri) {
        return "com.android.providers.media.documents".equals(uri.getAuthority());
    }

//    /*得到传入文件的大小*/
//    public static long getFileSizes(File f) throws Exception {
//
//        long s = 0;
//        if (f.exists()) {
//            FileInputStream fis = null;
//            fis = new FileInputStream(f);
//            s = fis.available();
//            fis.close();
//        } else {
//            f.createNewFile();
//            System.out.println("文件夹不存在");
//        }
//
//        return s;
//    }
//
//    /**
//     * 转换文件大小成KB  M等
//     */
//    public static String FormentFileSize(long fileS) {
//        DecimalFormat df = new DecimalFormat("#.00");
//        String fileSizeString = "";
//        if (fileS < 1024) {
//            fileSizeString = df.format((double) fileS) + "B";
//        } else if (fileS < 1048576) {
//            fileSizeString = df.format((double) fileS / 1024) + "K";
//        } else if (fileS < 1073741824) {
//            fileSizeString = df.format((double) fileS / 1048576) + "M";
//        } else {
//            fileSizeString = df.format((double) fileS / 1073741824) + "G";
//        }
//        return fileSizeString;
//    }

//    private void croppingResult(Activity activity, final int requestCode, final int resultCode, final Intent data) {
//        if (data != null) {
//            final Uri resultUri = UCrop.getOutput(data);
//            if (resultUri != null) {
//                try {
//                    WritableMap result = getSelection(activity, resultUri, false);
//                    result.putMap("cropRect", DocPickerModule.getCroppedRectMap(data));
//
//                    resultCollector.setWaitCount(1);
//                    resultCollector.notifySuccess(result);
//                } catch (Exception ex) {
//                    resultCollector.notifyProblem(E_NO_IMAGE_DATA_FOUND, ex.getMessage());
//                }
//            } else {
//                resultCollector.notifyProblem(E_NO_IMAGE_DATA_FOUND, "Cannot find image data");
//            }
//        } else {
//            //resultCollector.notifyProblem(E_PICKER_CANCELLED_KEY, E_PICKER_CANCELLED_MSG);
//        }
//    }
//


//    private File createImageFile() throws IOException {
//
//        String imageFileName = "image-" + UUID.randomUUID().toString();
//        File path = Environment.getExternalStoragePublicDirectory(
//                Environment.DIRECTORY_PICTURES);
//
//        if (!path.exists() && !path.isDirectory()) {
//            path.mkdirs();
//        }
//
//        File image = File.createTempFile(imageFileName, ".jpg", path);
//
//        // Save a file: path for use with ACTION_VIEW intents
//        mCurrentPhotoPath = "file:" + image.getAbsolutePath();
//
//        return image;
//
//    }
//
//    private static WritableMap getCroppedRectMap(Intent data) {
//        final int DEFAULT_VALUE = -1;
//        final WritableMap map = new WritableNativeMap();
//
//        map.putInt("x", data.getIntExtra(UCrop.EXTRA_OUTPUT_OFFSET_X, DEFAULT_VALUE));
//        map.putInt("y", data.getIntExtra(UCrop.EXTRA_OUTPUT_OFFSET_Y, DEFAULT_VALUE));
//        map.putInt("width", data.getIntExtra(UCrop.EXTRA_OUTPUT_IMAGE_WIDTH, DEFAULT_VALUE));
//        map.putInt("height", data.getIntExtra(UCrop.EXTRA_OUTPUT_IMAGE_HEIGHT, DEFAULT_VALUE));
//
//        return map;
//    }
}