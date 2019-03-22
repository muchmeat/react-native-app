package com.ruixin.ffjw.cameraView.cameralibrary.util;

import android.graphics.Bitmap;
import android.os.Environment;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;

/**
 * 摄像头文件处理工具类
 * 统一在 DCIM/ruixin/camera下
 */
public class FileUtil {
    //相机拍摄照片和视频
    private static final File directory_dcim = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM);
    private static String storagePath = "";
    private static String DST_FOLDER_NAME = "ruixin/camera";

    private static String initPath() {
        if (storagePath.equals("")) {
            storagePath = directory_dcim.getAbsolutePath() + File.separator + DST_FOLDER_NAME;
            File f = new File(storagePath);
            if (!f.exists()) {
                f.mkdirs();
            }
        }
        return storagePath;
    }

    public static String saveBitmap(Bitmap b) {
        String path = initPath();
        String jpegName = path + File.separator + "img_" + getFileName() + ".png";
        try {
            FileOutputStream fout = new FileOutputStream(jpegName);
            BufferedOutputStream bos = new BufferedOutputStream(fout);
            b.compress(Bitmap.CompressFormat.PNG, 100, bos);
            bos.flush();
            bos.close();
            return jpegName;
        } catch (IOException e) {
            e.printStackTrace();
            return "";
        }
    }

    public static boolean deleteFile(String url) {
        boolean result = false;
        File file = new File(url);
        if (file.exists()) {
            result = file.delete();
        }
        return result;
    }

    public static boolean isExternalStorageWritable() {
        String state = Environment.getExternalStorageState();
        if (Environment.MEDIA_MOUNTED.equals(state)) {
            return true;
        }
        return false;
    }

    public static String getFileName() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        return sdf.format(System.currentTimeMillis());
    }
}
