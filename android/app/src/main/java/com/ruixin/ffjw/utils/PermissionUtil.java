package com.ruixin.ffjw.utils;

import android.app.Activity;
import android.content.pm.PackageManager;
import android.os.Build;
import android.support.v4.app.ActivityCompat;

import com.facebook.react.bridge.Promise;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.modules.core.PermissionListener;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;

/**
 * 权限获取
 */
public class PermissionUtil {
    private static final String E_CALLBACK_ERROR = "E_CALLBACK_ERROR";
    private static final String E_PERMISSIONS_MISSING = "E_PERMISSION_MISSING";

    public static void permissionsCheck(final Activity activity, final Promise promise, final List<String> requiredPermissions, final Callable<Void> callback) {
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

    private static PermissionAwareActivity getPermissionAwareActivity(final Activity activity) {
        if (activity == null) {
            throw new IllegalStateException("Tried to use permissions API while not attached to an " +
                    "Activity.");
        } else if (!(activity instanceof PermissionAwareActivity)) {
            throw new IllegalStateException("Tried to use permissions API but the host Activity doesn't" +
                    " implement PermissionAwareActivity.");
        }
        return (PermissionAwareActivity) activity;
    }
}