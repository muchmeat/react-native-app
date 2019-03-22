package com.ruixin.ffjw.api;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.FileProvider;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.PermissionListener;
import com.ruixin.ffjw.utils.PermissionUtil;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Callable;

public class OpenHTTPFileModule extends ReactContextBaseJavaModule {

    private static final String DATA_TYPE_APK = "application/vnd.android.package-archive";
    private static final String DATA_TYPE_VIDEO = "video/*";
    private static final String DATA_TYPE_AUDIO = "audio/*";
    private static final String DATA_TYPE_HTML = "text/html";
    private static final String DATA_TYPE_IMAGE = "image/*";
    private static final String DATA_TYPE_PPT = "application/vnd.ms-powerpoint";
    private static final String DATA_TYPE_EXCEL = "application/vnd.ms-excel";
    private static final String DATA_TYPE_WORD = "application/msword";
    private static final String DATA_TYPE_CHM = "application/x-chm";
    private static final String DATA_TYPE_TXT = "text/plain";
    private static final String DATA_TYPE_PDF = "application/pdf";
    private static String DST_FOLDER_NAME = "ruixin" + File.separator + "download";
    private static String DOWNLOAD_PATH = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM).getAbsolutePath() + File.separator + DST_FOLDER_NAME;
    private static Activity myActivity;

    public OpenHTTPFileModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "OpenHTTPFileModule";
    }

    @ReactMethod
    public void OpenHTTPFile(String url, String type) {
        myActivity = getCurrentActivity();
        Intent intent = new Intent(Intent.ACTION_VIEW);
        Uri uri = Uri.parse(url);
        intent.setDataAndType(uri, type);
        myActivity.startActivity(intent);
    }

    /**
     * 下载文件到DCIM/DST_FOLDER_NAME并处理
     *
     * @param urlstr   网络资源路径
     * @param fileName 文件名,包含后缀
     * @param type     文件类型
     * @param callback 回调
     */
    @ReactMethod
    public void download(String urlstr, String fileName, String type, final Promise callback) {
        myActivity = getCurrentActivity();
        //获取文件权限，避免用户没有设置导致的打开文件异常
        PermissionUtil.permissionsCheck(myActivity, callback, Collections.singletonList(Manifest.permission.WRITE_EXTERNAL_STORAGE), new Callable<Void>() {
            @Override
            public Void call() {
                File folder = new File(DOWNLOAD_PATH);
                if (!folder.exists()) {
                    folder.mkdirs();
                }
                String czbz = "1";
                OutputStream output = null;
                String pathName = DOWNLOAD_PATH + File.separator + "download_" + fileName;//文件存储路径
                File file = new File(pathName);
                try {
                    URL url = new URL(urlstr);
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    if (!file.exists()) {
                        InputStream input = conn.getInputStream();
                        byte[] bs = new byte[1024];
                        int len;
                        output = new FileOutputStream(pathName);
                        //写数据
                        while ((len = input.read(bs)) != -1) {
                            output.write(bs, 0, len);
                        }
                        output.flush();
                    }
                    conn.disconnect();
                } catch (Exception e) {
                    file.delete();
                    e.printStackTrace();
                    czbz = "0";
                } finally {
                    try {
                        if (output != null)
                            output.close();
                        System.out.println("success");
                    } catch (Exception e) {
                        e.printStackTrace();
                        System.out.println("fail");
                    }
                }
                if ("1".equals(czbz) && "jpg,gif,png,jpeg,bmp".contains(type)) {
                    WritableMap map = Arguments.createMap();
                    map.putString("code", "1");
                    map.putString("path", pathName);
                    callback.resolve(map);
                } else if ("1".equals(czbz)) {
                    try {
                        openFile(pathName, type);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                } else {
                    WritableMap map = Arguments.createMap();
                    map.putString("code", czbz);
                    callback.resolve(map);
                }
                return null;
            }
        });
    }

    @ReactMethod
    public void openFile(String url, String end) {
        myActivity = getCurrentActivity();
        Intent intent;
        if (end.equals("m4a") || end.equals("mp3") || end.equals("mid") || end.equals("xmf") || end.equals("ogg") || end.equals("wav")) {
            intent = generateVideoAudioIntent(url, DATA_TYPE_AUDIO);
        } else if (end.equals("3gp") || end.equals("mp4") || end.equals("rm") || end.equals("rmvb") || end.equals("avi") || end.equals("mpeg")) {
            intent = generateVideoAudioIntent(url, DATA_TYPE_VIDEO);
        } else if (end.equals("jpg") || end.equals("gif") || end.equals("png") || end.equals("jpeg") || end.equals("bmp")) {
            intent = generateCommonIntent(url, DATA_TYPE_IMAGE);
        } else if (end.equals("apk")) {
            intent = generateCommonIntent(url, DATA_TYPE_APK);
        } else if (end.equals("html") || end.equals("htm")) {
            intent = getHtmlFileIntent(url);
        } else if (end.equals("ppt")) {
            intent = generateCommonIntent(url, DATA_TYPE_PPT);
        } else if (end.equals("xls") || end.equals("xlsx")) {
            intent = generateCommonIntent(url, DATA_TYPE_EXCEL);
        } else if (end.equals("doc") || end.equals("docx")) {
            intent = generateCommonIntent(url, DATA_TYPE_WORD);
        } else if (end.equals("pdf")) {
            intent = generateCommonIntent(url, DATA_TYPE_PDF);
        } else if (end.equals("chm")) {
            intent = generateCommonIntent(url, DATA_TYPE_CHM);
        } else if (end.equals("txt")) {
            intent = generateCommonIntent(url, DATA_TYPE_TXT);
        } else {
            intent = generateCommonIntent(url, "*/*");
        }
        myActivity.startActivity(intent);
    }

    /**
     * 产生打开视频或音频的Intent
     *
     * @param url      文件路径
     * @param dataType 文件类型
     * @return
     */
    private static Intent generateVideoAudioIntent(String url, String dataType) {
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        Uri uri = Uri.parse(url);
        intent.setDataAndType(uri, dataType);
        return intent;
    }

    /**
     * 产生打开网页文件的Intent
     *
     * @param filePath 文件路径
     * @return
     */
    private static Intent getHtmlFileIntent(String filePath) {
        Uri uri = Uri.parse(filePath)
                .buildUpon()
                .encodedAuthority("com.android.htmlfileprovider")
                .scheme("content")
                .encodedPath(filePath)
                .build();
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setDataAndType(uri, DATA_TYPE_HTML);
        return intent;
    }

    /**
     * 产生除了视频、音频、网页文件外，打开其他类型文件的Intent
     *
     * @param url      文件路径
     * @param dataType 文件类型
     * @return
     */
    private static Intent generateCommonIntent(String url, String dataType) {
        Intent intent = new Intent();
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setAction(Intent.ACTION_VIEW);
//        File file = new File(url);
//        Uri uri = getUri(intent, file);
        Uri uri = Uri.parse(url);
        intent.setDataAndType(uri, dataType);
        return intent;
    }

    /**
     * 获取对应文件的Uri
     *
     * @param intent 相应的Intent
     * @param file   文件对象
     * @return
     */
    private static Uri getUri(Intent intent, File file) {
        Uri uri = null;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            //判断版本是否在7.0以上
            uri =
                    FileProvider.getUriForFile(myActivity,
                            myActivity.getPackageName() + ".provider",
                            file);
            //添加这一句表示对目标应用临时授权该Uri所代表的文件
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        } else {
            uri = Uri.fromFile(file);
        }
        return uri;
    }


}
