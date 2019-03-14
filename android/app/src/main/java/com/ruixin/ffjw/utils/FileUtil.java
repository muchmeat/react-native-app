package com.ruixin.ffjw.utils;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.text.TextUtils;

import java.io.File;

/**
 * Created by ash on 2016/9/21.
 */
public class FileUtil {
    /**
     * 彻底删除照片及Android 系统生成的缩略图
     * Updated android多媒体库更新有延迟，直接使用内容提供器删除图片不够及时
     *
     * @param path
     * @param ctx
     */
    public static void deleteImg(String path, Context ctx) throws Exception {
        if (!TextUtils.isEmpty(path)) {
            path = path.replaceAll("//", "/");
            //发送广播更新相册中新增的照片
//            reScanFile(ctx, path);
//            Uri mImageUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
//            ContentResolver mContentResolver = ctx.getContentResolver();
//            String where = MediaStore.Images.Media.DATA + "=?";
//            //删除图片
//            int i = 0;
//            while (i == 0) {
//                i = mContentResolver.delete(mImageUri, where, new String[]{path});
//                Log.i("DELTE PHOTO RESULT", i + "");
//            }
            File file = new File(path);
            if (file.exists()) {
                file.delete();
            }
            //发送广播更新相册中删除的照片
            reScanFile(ctx, path);
        }
    }

    private static void reScanFile(Context ctx, String path) {
        Intent intent = new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
        Uri uri = Uri.fromFile(new File(path));
        intent.setData(uri);
        ctx.sendBroadcast(intent);
    }
}
