package com.rxrntemplate.api;

import android.Manifest;
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
//    private ResultCollector resultCollector = new ResultCollector();
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

//    private void setConfiguration(final ReadableMap options) {
//        mediaType = options.hasKey("mediaType") ? options.getString("mediaType") : mediaType;
//        multiple = options.hasKey("multiple") && options.getBoolean("multiple");
//        includeBase64 = options.hasKey("includeBase64") && options.getBoolean("includeBase64");
//        includeExif = options.hasKey("includeExif") && options.getBoolean("includeExif");
//        width = options.hasKey("width") ? options.getInt("width") : width;
//        height = options.hasKey("height") ? options.getInt("height") : height;
//        cropping = options.hasKey("cropping") ? options.getBoolean("cropping") : cropping;
//        cropperActiveWidgetColor = options.hasKey("cropperActiveWidgetColor") ? options.getString("cropperActiveWidgetColor") : cropperActiveWidgetColor;
//        cropperStatusBarColor = options.hasKey("cropperStatusBarColor") ? options.getString("cropperStatusBarColor") : cropperStatusBarColor;
//        cropperToolbarColor = options.hasKey("cropperToolbarColor") ? options.getString("cropperToolbarColor") : cropperToolbarColor;
//        cropperToolbarTitle = options.hasKey("cropperToolbarTitle") ? options.getString("cropperToolbarTitle") : null;
//        cropperCircleOverlay = options.hasKey("cropperCircleOverlay") ? options.getBoolean("cropperCircleOverlay") : cropperCircleOverlay;
//        freeStyleCropEnabled = options.hasKey("freeStyleCropEnabled") ? options.getBoolean("freeStyleCropEnabled") : freeStyleCropEnabled;
//        showCropGuidelines = options.hasKey("showCropGuidelines") ? options.getBoolean("showCropGuidelines") : showCropGuidelines;
//        hideBottomControls = options.hasKey("hideBottomControls") ? options.getBoolean("hideBottomControls") : hideBottomControls;
//        enableRotationGesture = options.hasKey("enableRotationGesture") ? options.getBoolean("enableRotationGesture") : enableRotationGesture;
//        disableCropperColorSetters = options.hasKey("disableCropperColorSetters") ? options.getBoolean("disableCropperColorSetters") : disableCropperColorSetters;
//        this.options = options;
//    }
//
//    private void deleteRecursive(File fileOrDirectory) {
//        if (fileOrDirectory.isDirectory()) {
//            for (File child : fileOrDirectory.listFiles()) {
//                deleteRecursive(child);
//            }
//        }
//
//        fileOrDirectory.delete();
//    }
//
//    @ReactMethod
//    public void clean(final Promise promise) {
//
//        final Activity activity = getCurrentActivity();
//        final DocPickerModule module = this;
//
//        if (activity == null) {
//            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
//            return;
//        }
//
//        permissionsCheck(activity, promise, Collections.singletonList(Manifest.permission.WRITE_EXTERNAL_STORAGE), new Callable<Void>() {
//            @Override
//            public Void call() {
//                try {
//                    File file = new File(module.getTmpDir(activity));
//                    if (!file.exists()) throw new Exception("File does not exist");
//
//                    module.deleteRecursive(file);
//                    promise.resolve(null);
//                } catch (Exception ex) {
//                    ex.printStackTrace();
//                    promise.reject(E_ERROR_WHILE_CLEANING_FILES, ex.getMessage());
//                }
//
//                return null;
//            }
//        });
//    }
//
//    @ReactMethod
//    public void cleanSingle(final String pathToDelete, final Promise promise) {
//        if (pathToDelete == null) {
//            promise.reject(E_ERROR_WHILE_CLEANING_FILES, "Cannot cleanup empty path");
//            return;
//        }
//
//        final Activity activity = getCurrentActivity();
//        final DocPickerModule module = this;
//
//        if (activity == null) {
//            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
//            return;
//        }
//
//        permissionsCheck(activity, promise, Collections.singletonList(Manifest.permission.WRITE_EXTERNAL_STORAGE), new Callable<Void>() {
//            @Override
//            public Void call() throws Exception {
//                try {
//                    String path = pathToDelete;
//                    final String filePrefix = "file://";
//                    if (path.startsWith(filePrefix)) {
//                        path = path.substring(filePrefix.length());
//                    }
//
//                    File file = new File(path);
//                    if (!file.exists()) throw new Exception("File does not exist. Path: " + path);
//
//                    module.deleteRecursive(file);
//                    promise.resolve(null);
//                } catch (Exception ex) {
//                    ex.printStackTrace();
//                    promise.reject(E_ERROR_WHILE_CLEANING_FILES, ex.getMessage());
//                }
//
//                return null;
//            }
//        });
//    }
//
//    private void permissionsCheck(final Activity activity, final Promise promise, final List<String> requiredPermissions, final Callable<Void> callback) {
//
//        List<String> missingPermissions = new ArrayList<>();
//
//        for (String permission : requiredPermissions) {
//            int status = ActivityCompat.checkSelfPermission(activity, permission);
//            if (status != PackageManager.PERMISSION_GRANTED) {
//                missingPermissions.add(permission);
//            }
//        }
//
//        if (!missingPermissions.isEmpty()) {
//
//            ((PermissionAwareActivity) activity).requestPermissions(missingPermissions.toArray(new String[missingPermissions.size()]), 1, new PermissionListener() {
//
//                @Override
//                public boolean onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
//                    if (requestCode == 1) {
//
//                        for (int grantResult : grantResults) {
//                            if (grantResult == PackageManager.PERMISSION_DENIED) {
//                                promise.reject(E_PERMISSIONS_MISSING, "Required permission missing");
//                                return true;
//                            }
//                        }
//
//                        try {
//                            callback.call();
//                        } catch (Exception e) {
//                            promise.reject(E_CALLBACK_ERROR, "Unknown error", e);
//                        }
//                    }
//
//                    return true;
//                }
//            });
//
//            return;
//        }
//
//        // all permissions granted
//        try {
//            callback.call();
//        } catch (Exception e) {
//            promise.reject(E_CALLBACK_ERROR, "Unknown error", e);
//        }
//    }
//
//    @ReactMethod
//    public void openCamera(final ReadableMap options, final Promise promise) {
//        final Activity activity = getCurrentActivity();
//
//        if (activity == null) {
//            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
//            return;
//        }
//
//        if (!isCameraAvailable(activity)) {
//            promise.reject(E_CAMERA_IS_NOT_AVAILABLE, "Camera not available");
//            return;
//        }
//
//        setConfiguration(options);
//        resultCollector.setup(promise, multiple);
//
//        permissionsCheck(activity, promise, Arrays.asList(Manifest.permission.CAMERA, Manifest.permission.WRITE_EXTERNAL_STORAGE), new Callable<Void>() {
//            @Override
//            public Void call() {
//                initiateCamera(activity);
//                return null;
//            }
//        });
//    }
//
//    private void initiateCamera(Activity activity) {
//
//        try {
//            Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
//            File imageFile = createImageFile();
//
//            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.LOLLIPOP) {
//                mCameraCaptureURI = Uri.fromFile(imageFile);
//            } else {
//                mCameraCaptureURI = FileProvider.getUriForFile(activity,
//                        activity.getApplicationContext().getPackageName() + ".provider",
//                        imageFile);
//            }
//
//            cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, mCameraCaptureURI);
//
//            if (cameraIntent.resolveActivity(activity.getPackageManager()) == null) {
//                resultCollector.notifyProblem(E_CANNOT_LAUNCH_CAMERA, "Cannot launch camera");
//                return;
//            }
//
//            activity.startActivityForResult(cameraIntent, CAMERA_PICKER_REQUEST);
//        } catch (Exception e) {
//            resultCollector.notifyProblem(E_FAILED_TO_OPEN_CAMERA, e);
//        }
//
//    }
//
//    private void initiatePicker(final Activity activity) {
//        try {
//            final Intent galleryIntent = new Intent(Intent.ACTION_GET_CONTENT);
//
//                Intent intent = new Intent(Intent.ACTION_PICK);
//                intent.setType("image/*");//相片类型
//                activity.startActivityForResult(intent, IMAGE_PICKER_REQUEST);
//        } catch (Exception e) {
//            resultCollector.notifyProblem(E_FAILED_TO_SHOW_PICKER, e);
//        }
//    }

    @ReactMethod
    private void initiateFilePicker() {
        try {
            final Activity activity = getCurrentActivity();
            final Intent galleryIntent = new Intent(Intent.ACTION_GET_CONTENT);

            galleryIntent.setType("*/*");

            galleryIntent.addCategory(Intent.CATEGORY_OPENABLE);

            final Intent chooserIntent = Intent.createChooser(galleryIntent, "Pick an file");
            activity.startActivityForResult(chooserIntent, FILE_PICKER_REQUEST);
        } catch (Exception e) {
//            resultCollector.notifyProblem(E_FAILED_TO_SHOW_PICKER, e);
        }
    }

//    @ReactMethod
//    public void openPicker(final ReadableMap options, final Promise promise) {
//        final Activity activity = getCurrentActivity();
//
//        if (activity == null) {
//            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
//            return;
//        }
//
//        setConfiguration(options);
//        resultCollector.setup(promise, multiple);
//
//        permissionsCheck(activity, promise, Collections.singletonList(Manifest.permission.WRITE_EXTERNAL_STORAGE), new Callable<Void>() {
//            @Override
//            public Void call() {
//                initiatePicker(activity);
//                return null;
//            }
//        });
//    }
//
//    @ReactMethod
//    public void openFilePicker(final ReadableMap options, final Promise promise) {
//        final Activity activity = getCurrentActivity();
//
//        if (activity == null) {
//            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
//            return;
//        }
//
//        setConfiguration(options);
//        resultCollector.setup(promise, multiple);
//
//        permissionsCheck(activity, promise, Collections.singletonList(Manifest.permission.WRITE_EXTERNAL_STORAGE), new Callable<Void>() {
//            @Override
//            public Void call() {
//                initiateFilePicker(activity);
//                return null;
//            }
//        });
//    }
//
//    @ReactMethod
//    public void openCropper(final ReadableMap options, final Promise promise) {
//        final Activity activity = getCurrentActivity();
//
//        if (activity == null) {
//            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
//            return;
//        }
//
//        setConfiguration(options);
//        resultCollector.setup(promise, false);
//
//        Uri uri = Uri.parse(options.getString("path"));
//        startCropping(activity, uri);
//    }
//
//    private String getBase64StringFromFile(String absoluteFilePath) {
//        InputStream inputStream;
//
//        try {
//            inputStream = new FileInputStream(new File(absoluteFilePath));
//        } catch (FileNotFoundException e) {
//            e.printStackTrace();
//            return null;
//        }
//
//        byte[] bytes;
//        byte[] buffer = new byte[8192];
//        int bytesRead;
//        ByteArrayOutputStream output = new ByteArrayOutputStream();
//
//        try {
//            while ((bytesRead = inputStream.read(buffer)) != -1) {
//                output.write(buffer, 0, bytesRead);
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//
//        bytes = output.toByteArray();
//        return Base64.encodeToString(bytes, Base64.NO_WRAP);
//    }
//
//    private String getMimeType(String url) {
//        String mimeType = null;
//        Uri uri = Uri.fromFile(new File(url));
//        if (uri.getScheme().equals(ContentResolver.SCHEME_CONTENT)) {
//            ContentResolver cr = this.reactContext.getContentResolver();
//            mimeType = cr.getType(uri);
//        } else {
//            String fileExtension = MimeTypeMap.getFileExtensionFromUrl(uri
//                    .toString());
//            if (fileExtension != null) {
//                mimeType = MimeTypeMap.getSingleton().getMimeTypeFromExtension(fileExtension.toLowerCase());
//            }
//        }
//        return mimeType;
//    }
//
//    private WritableMap getSelection(Activity activity, Uri uri, boolean isCamera) throws Exception {
//        String path = resolveRealPath(activity, uri, isCamera);
//        if (path == null || path.isEmpty()) {
//            throw new Exception("Cannot resolve asset path.");
//        }
//
//        return getImage(activity, path);
//    }
//
//    private void getAsyncSelection(final Activity activity, Uri uri, boolean isCamera) throws Exception {
//        String path = resolveRealPath(activity, uri, isCamera);
//        if (path == null || path.isEmpty()) {
//            resultCollector.notifyProblem(E_NO_IMAGE_DATA_FOUND, "Cannot resolve asset path.");
//            return;
//        }
//
//        String mime = getMimeType(path);
//        if (mime != null && mime.startsWith("video/")) {
//            getVideo(activity, path, mime);
//            return;
//        }
//
//        resultCollector.notifySuccess(getImage(activity, path));
//    }
//
//    private Bitmap validateVideo(String path) throws Exception {
//        MediaMetadataRetriever retriever = new MediaMetadataRetriever();
//        retriever.setDataSource(path);
//        Bitmap bmp = retriever.getFrameAtTime();
//
//        if (bmp == null) {
//            throw new Exception("Cannot retrieve video data");
//        }
//
//        return bmp;
//    }
//
//    private void getVideo(final Activity activity, final String path, final String mime) throws Exception {
//        validateVideo(path);
//        final String compressedVideoPath = getTmpDir(activity) + "/" + UUID.randomUUID().toString() + ".mp4";
//
//        new Thread(new Runnable() {
//            @Override
//            public void run() {
//                compression.compressVideo(activity, options, path, compressedVideoPath, new PromiseImpl(new Callback() {
//                    @Override
//                    public void invoke(Object... args) {
//                        String videoPath = (String) args[0];
//
//                        try {
//                            Bitmap bmp = validateVideo(videoPath);
//                            long modificationDate = new File(videoPath).lastModified();
//
//                            WritableMap video = new WritableNativeMap();
//                            video.putInt("width", bmp.getWidth());
//                            video.putInt("height", bmp.getHeight());
//                            video.putString("mime", mime);
//                            video.putInt("size", (int) new File(videoPath).length());
//                            video.putString("path", "file://" + videoPath);
//                            video.putString("modificationDate", String.valueOf(modificationDate));
//
//                            resultCollector.notifySuccess(video);
//                        } catch (Exception e) {
//                            resultCollector.notifyProblem(E_NO_IMAGE_DATA_FOUND, e);
//                        }
//                    }
//                }, new Callback() {
//                    @Override
//                    public void invoke(Object... args) {
//                        WritableNativeMap ex = (WritableNativeMap) args[0];
//                        resultCollector.notifyProblem(ex.getString("code"), ex.getString("message"));
//                    }
//                }));
//            }
//        }).run();
//    }
//
//    private String resolveRealPath(Activity activity, Uri uri, boolean isCamera) throws IOException {
//        String path;
//
//        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.LOLLIPOP) {
//            path = RealPathUtil.getRealPathFromURI(activity, uri);
//        } else {
//            if (isCamera) {
//                Uri imageUri = Uri.parse(mCurrentPhotoPath);
//                path = imageUri.getPath();
//            } else {
//                path = RealPathUtil.getRealPathFromURI(activity, uri);
//            }
//        }
//
//        return path;
//    }
//
//    private BitmapFactory.Options validateImage(String path) throws Exception {
//        BitmapFactory.Options options = new BitmapFactory.Options();
//        options.inJustDecodeBounds = true;
//        options.inPreferredConfig = Bitmap.Config.RGB_565;
//        options.inDither = true;
//
//        BitmapFactory.decodeFile(path, options);
//
//        if (options.outMimeType == null || options.outWidth == 0 || options.outHeight == 0) {
//            throw new Exception("Invalid image selected");
//        }
//
//        return options;
//    }
//
//    private WritableMap getImage(final Activity activity, String path) throws Exception {
//        WritableMap image = new WritableNativeMap();
//
//        if (path.startsWith("http://") || path.startsWith("https://")) {
//            throw new Exception("Cannot select remote files");
//        }
//        validateImage(path);
//
//        // if compression options are provided image will be compressed. If none options is provided,
//        // then original image will be returned
//        File compressedImage = compression.compressImage(activity, options, path);
//        String compressedImagePath = compressedImage.getPath();
//        BitmapFactory.Options options = validateImage(compressedImagePath);
//        File file = new File(path);
//        long modificationDate = new File(path).lastModified();
//
//        image.putString("path", "file://" + compressedImagePath);
//        image.putInt("width", options.outWidth);
//        image.putInt("height", options.outHeight);
//        image.putString("mime", options.outMimeType);
//        image.putInt("fileSize", (int) file.length());
//        String end = compressedImagePath.substring(compressedImagePath.lastIndexOf(".") + 1, compressedImagePath.length()).toLowerCase();
//        image.putString("extension", end);
//        image.putString("name", file.getName().substring(0, file.getName().lastIndexOf(".")));
//        image.putString("modificationDate", String.valueOf(modificationDate));
//
//        if (includeBase64) {
//            image.putString("data", getBase64StringFromFile(compressedImagePath));
//        }
//
//        if (includeExif) {
//            try {
//                WritableMap exif = ExifExtractor.extract(path);
//                image.putMap("exif", exif);
//            } catch (Exception ex) {
//                ex.printStackTrace();
//            }
//        }
//
//        return image;
//    }
//
//    private void configureCropperColors(UCrop.Options options) {
//        int activeWidgetColor = Color.parseColor(cropperActiveWidgetColor);
//        int toolbarColor = Color.parseColor(cropperToolbarColor);
//        int statusBarColor = Color.parseColor(cropperStatusBarColor);
//        options.setToolbarColor(toolbarColor);
//        options.setStatusBarColor(statusBarColor);
//        if (activeWidgetColor == Color.parseColor(DEFAULT_TINT)) {
//            /*
//            Default tint is grey => use a more flashy color that stands out more as the call to action
//            Here we use 'Light Blue 500' from https://material.google.com/style/color.html#color-color-palette
//            */
//            options.setActiveWidgetColor(Color.parseColor(DEFAULT_WIDGET_COLOR));
//        } else {
//            //If they pass a custom tint color in, we use this for everything
//            options.setActiveWidgetColor(activeWidgetColor);
//        }
//    }
//
//    private void startCropping(Activity activity, Uri uri) {
//        UCrop.Options options = new UCrop.Options();
//        options.setCompressionFormat(Bitmap.CompressFormat.JPEG);
//        options.setCompressionQuality(100);
//        options.setCircleDimmedLayer(cropperCircleOverlay);
//        options.setFreeStyleCropEnabled(freeStyleCropEnabled);
//        options.setShowCropGrid(showCropGuidelines);
//        options.setHideBottomControls(hideBottomControls);
//        if (cropperToolbarTitle != null) {
//            options.setToolbarTitle(cropperToolbarTitle);
//        }
//        if (enableRotationGesture) {
//            // UCropActivity.ALL = enable both rotation & scaling
//            options.setAllowedGestures(
//                    UCropActivity.ALL, // When 'scale'-tab active
//                    UCropActivity.ALL, // When 'rotate'-tab active
//                    UCropActivity.ALL  // When 'aspect ratio'-tab active
//            );
//        }
//        if (!disableCropperColorSetters) {
//            configureCropperColors(options);
//        }
//
//        UCrop.of(uri, Uri.fromFile(new File(this.getTmpDir(activity), UUID.randomUUID().toString() + ".jpg")))
//                .withMaxResultSize(width, height)
//                .withAspectRatio(width, height)
//                .withOptions(options)
//                .start(activity);
//    }
//
//    private void imagePickerResult(Activity activity, final int requestCode, final int resultCode, final Intent data) {
//        if (resultCode == Activity.RESULT_CANCELED) {
//            //resultCollector.notifyProblem(E_PICKER_CANCELLED_KEY, E_PICKER_CANCELLED_MSG);
//        } else if (resultCode == Activity.RESULT_OK) {
//            if (multiple) {
//                ClipData clipData = data.getClipData();
//
//                try {
//                    // only one image selected
//                    if (clipData == null) {
//                        resultCollector.setWaitCount(1);
//                        getAsyncSelection(activity, data.getData(), false);
//                    } else {
//                        resultCollector.setWaitCount(clipData.getItemCount());
//                        for (int i = 0; i < clipData.getItemCount(); i++) {
//                            getAsyncSelection(activity, clipData.getItemAt(i).getUri(), false);
//                        }
//                    }
//                } catch (Exception ex) {
//                    resultCollector.notifyProblem(E_NO_IMAGE_DATA_FOUND, ex.getMessage());
//                }
//
//            } else {
//                Uri uri = data.getData();
//
//                if (uri == null) {
//                    resultCollector.notifyProblem(E_NO_IMAGE_DATA_FOUND, "Cannot resolve image url");
//                    return;
//                }
//
//                if (cropping) {
//                    startCropping(activity, uri);
//                } else {
//                    try {
//                        getAsyncSelection(activity, uri, false);
//                    } catch (Exception ex) {
//                        resultCollector.notifyProblem(E_NO_IMAGE_DATA_FOUND, ex.getMessage());
//                    }
//                }
//            }
//        }
//    }
//
//    private void filePickerResult(Activity activity, final int requestCode, final int resultCode, final Intent data) {
//        if (resultCode == Activity.RESULT_CANCELED) {
//            //resultCollector.notifyProblem(E_PICKER_CANCELLED_KEY, E_PICKER_CANCELLED_MSG);
//        } else if (resultCode == Activity.RESULT_OK) {
//            Uri uri = data.getData();
//            WritableMap image = new WritableNativeMap();
//
//            if (uri == null) {
//                resultCollector.notifyProblem(E_NO_FILE_DATA_FOUND, "Cannot resolve image url");
//                return;
//            }
//
//            try {
//                String path = getPath(activity, uri);
//                image.putString("path", "file://" + path);
//                File file = new File(path);
//                String end = file.getName().substring(file.getName().lastIndexOf(".") + 1, file.getName	().length()).toLowerCase();
//                image.putString("extension", end);
//                image.putString("name", file.getName().substring(0, file.getName().lastIndexOf(".")));
//                image.putInt("fileSize", (int) file.length());
//                resultCollector.notifySuccess(image);
//            } catch (Exception ex) {
//                resultCollector.notifyProblem(E_NO_FILE_DATA_FOUND, ex.getMessage());
//            }
//        }
//    }
//
//    //得到正确路径
//    public static String getPath(Context context, Uri uri) {
//
//        final boolean isKitKat = Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT;//sdk版本是否大于4.4
//
//        // DocumentProvider
//        if (isKitKat && DocumentsContract.isDocumentUri(context, uri)) {
//            // ExternalStorageProvider
//            if (isExternalStorageDocument(uri)) {
//                final String docId = DocumentsContract.getDocumentId(uri);
//                final String[] split = docId.split(":");
//                final String type = split[0];
//
//                if ("primary".equalsIgnoreCase(type)) {
//                    return Environment.getExternalStorageDirectory() + "/" + split[1];
//                }
//
//                // TODO handle non-primary volumes
//            }else if (isDownloadsDocument(uri)) {
//
//                final String id = DocumentsContract.getDocumentId(uri);
//                final Uri contentUri = ContentUris.withAppendedId(
//                        Uri.parse("content://downloads/public_downloads"), Long.valueOf(id));
//
//                return getDataColumn(context, contentUri, null, null);
//            }
//            // MediaProvider
//            else if (isMediaDocument(uri)) {
//                final String docId = DocumentsContract.getDocumentId(uri);
//                final String[] split = docId.split(":");
//                final String type = split[0];
//
//                Uri contentUri = null;
//                if ("image".equals(type)) {
//                    contentUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
//                } else if ("video".equals(type)) {
//                    contentUri = MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
//                } else if ("audio".equals(type)) {
//                    contentUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
//                }
//
//                final String selection = "_id=?";
//                final String[] selectionArgs = new String[]{
//                        split[1]
//                };
//
//                return getDataColumn(context, contentUri, selection, selectionArgs);
//            }
//        }
//        // MediaStore (and general)
//        else if ("content".equalsIgnoreCase(uri.getScheme())) {
//
//            // Return the remote address
//            if (isGooglePhotosUri(uri))
//                return uri.getLastPathSegment();
//
//            return getDataColumn(context, uri, null, null);
//        }
//        // File
//        else if ("file".equalsIgnoreCase(uri.getScheme())) {
//            return uri.getPath();
//        }
//        return null;
//    }
//
//    public static boolean isExternalStorageDocument(Uri uri) {
//        return "com.android.externalstorage.documents".equals(uri.getAuthority());
//    }
//
//
//    public static boolean isDownloadsDocument(Uri uri) {
//        return "com.android.providers.downloads.documents".equals(uri.getAuthority());
//    }
//
//    public static boolean isMediaDocument(Uri uri) {
//        return "com.android.providers.media.documents".equals(uri.getAuthority());
//    }
//
//    public static boolean isGooglePhotosUri(Uri uri) {
//        return "com.google.android.apps.photos.content".equals(uri.getAuthority());
//    }
//
//    public static String getDataColumn(Context context, Uri uri, String selection,
//                                       String[] selectionArgs) {
//
//        Cursor cursor = null;
//        final String column = "_data";
//        final String[] projection = {column};
//
//        try {
//            cursor = context.getContentResolver().query(uri, projection, selection, selectionArgs,
//                    null);
//            if (cursor != null && cursor.moveToFirst()) {
//                final int index = cursor.getColumnIndexOrThrow(column);
//                return cursor.getString(index);
//            }
//        } finally {
//            if (cursor != null)
//                cursor.close();
//        }
//        return null;
//    }
//
//
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
//
//    private void cameraPickerResult(Activity activity, final int requestCode, final int resultCode, final Intent data) {
//        if (resultCode == Activity.RESULT_CANCELED) {
//            //resultCollector.notifyProblem(E_PICKER_CANCELLED_KEY, E_PICKER_CANCELLED_MSG);
//        } else if (resultCode == Activity.RESULT_OK) {
//            Uri uri = mCameraCaptureURI;
//
//            if (uri == null) {
//                resultCollector.notifyProblem(E_NO_IMAGE_DATA_FOUND, "Cannot resolve image url");
//                return;
//            }
//
//            if (cropping) {
//                UCrop.Options options = new UCrop.Options();
//                options.setCompressionFormat(Bitmap.CompressFormat.JPEG);
//                startCropping(activity, uri);
//            } else {
//                try {
//                    resultCollector.setWaitCount(1);
//                    resultCollector.notifySuccess(getSelection(activity, uri, true));
//                } catch (Exception ex) {
//                    resultCollector.notifyProblem(E_NO_IMAGE_DATA_FOUND, ex.getMessage());
//                }
//            }
//        }
//    }
//
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
    @Override
    public void onActivityResult(Activity activity, final int requestCode, final int resultCode, final Intent data) {
        if (requestCode == IMAGE_PICKER_REQUEST) {
//            imagePickerResult(activity, requestCode, resultCode, data);
        } else if (requestCode == FILE_PICKER_REQUEST) {
//            filePickerResult(activity, requestCode, resultCode, data);
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
//
//    private boolean isCameraAvailable(Activity activity) {
//        return activity.getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA)
//                || activity.getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA_ANY);
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