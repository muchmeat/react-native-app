package com.ruixin.ffjw;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.support.v4.content.ContextCompat;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2017-4-22.
 */
interface LocationActivityResultInterface {
    void callback(int requestCode, int resultCode, Intent data, Activity activity);
}

public class LocationModule extends ReactContextBaseJavaModule {
    protected LocationActivityEventListener mActivityEventListener;
    protected Callback mCallback;

    public String provider;
    public Location location;
    public LocationManager locationManager;
    private String locationProvider;
    private ArrayList<String> PROVIDER_ARRAY;

    private LocationListener gpsLocationListener = new LocationListener() {
        @Override
        public void onLocationChanged(Location location) {
        }

        @Override
        public void onStatusChanged(String provider, int status, Bundle extras) {
        }

        @Override
        public void onProviderEnabled(String provider) {
            getBestLocationProvider();
        }

        @Override
        public void onProviderDisabled(String provider) {
            getBestLocationProvider();
        }
    };
    private LocationListener networkLocationListener = new LocationListener() {
        @Override
        public void onLocationChanged(Location location) {
        }

        @Override
        public void onStatusChanged(String provider, int status, Bundle extras) {
        }

        @Override
        public void onProviderEnabled(String provider) {
            getBestLocationProvider();
        }

        @Override
        public void onProviderDisabled(String provider) {
            getBestLocationProvider();
        }
    };
    private LocationListener passiveLocationListener = new LocationListener() {
        @Override
        public void onLocationChanged(Location location) {//这个方法不用写，写了也没用
        }

        @Override
        public void onStatusChanged(String provider, int status, Bundle extras) {//这个方法不用写，写了也没用
        }

        @Override
        public void onProviderEnabled(String provider) {
            getBestLocationProvider();
        }

        @Override
        public void onProviderDisabled(String provider) {
            getBestLocationProvider();
        }
    };

    String dz = "";

    public LocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Location";
    }

    //开始定位
    @ReactMethod
    public void startLocation(Callback callback) {
        PROVIDER_ARRAY = new ArrayList<>();
        PROVIDER_ARRAY.add(LocationManager.GPS_PROVIDER);
        PROVIDER_ARRAY.add(LocationManager.NETWORK_PROVIDER);
        PROVIDER_ARRAY.add(LocationManager.PASSIVE_PROVIDER);

        Activity currentActivity = getCurrentActivity();
        locationManager = (LocationManager) currentActivity.getSystemService(Context.LOCATION_SERVICE);
        if (locationManager == null) {
            return;
        }

        List<String> allProviders = locationManager.getAllProviders();
        if (allProviders != null) {
            for (String provider : allProviders) {
                Log.i("Alex", "全部传感器列表：" + provider);
                if ((provider != null) && (PROVIDER_ARRAY.contains(provider)) && (ContextCompat.checkSelfPermission(currentActivity, android.Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED
                        || ContextCompat.checkSelfPermission(currentActivity, android.Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED)) {
                    if (LocationManager.GPS_PROVIDER.equals(provider)) {
                        Log.i("gps", "正在使用gps传感器");
                        locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 10000, 0, gpsLocationListener);
                    } else if (LocationManager.NETWORK_PROVIDER.equals(provider)) {
                        Log.i("gps", "正在使用流基站感器");
                        locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 10000, 0, networkLocationListener);
                    } else if (LocationManager.PASSIVE_PROVIDER.equals(provider)) {
                        Log.i("gps", "正在使用被动传感器");
                        locationManager.requestLocationUpdates(LocationManager.PASSIVE_PROVIDER, 10000, 0, passiveLocationListener);
                    }
                }
            }
        }
        getBestLocationProvider();
        updateLocation(callback);
    }

    private void updateLocation(Callback callback) {
        mCallback = callback;
        if (PROVIDER_ARRAY.contains(locationProvider) && (ContextCompat.checkSelfPermission(getCurrentActivity(), android.Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED
                || ContextCompat.checkSelfPermission(getCurrentActivity(), android.Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED)) {
            try {
                Location currentLocation = locationManager.getLastKnownLocation(locationProvider);//获取最新位置
                if (currentLocation != null) {
                    //获取经纬度
                    final double newLatitude = currentLocation.getLatitude();
                    final double newLongitude = currentLocation.getLongitude();
                    dz = String.valueOf(newLatitude) + "," + String.valueOf(newLongitude);
                    mCallback.invoke(dz);
                    Log.i("gps", "当前纬度是:" + newLatitude + "当前经度是：" + newLongitude);
                } else {
                    dz = "locateFailed";
                    boolean isGpsAvalible = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
                    if (!isGpsAvalible) {
                        dz = "close";
                    }
                    mCallback.invoke(dz);
                }
            } catch (Exception ex) {
            }
        } else {
            dz = "noGPS";
            boolean isGpsAvalible = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
            if (!isGpsAvalible) {
                dz = "close";
            }
            mCallback.invoke(dz);
        }
    }

    /**
     * 获取目前最精准的地理位置传感器
     */
    private synchronized void getBestLocationProvider() {//synchronized 是Java语言的关键字，当它用来修饰一个方法或者一个代码块的时候，能够保证在同一时刻最多只有一个线程执行该段代码。
        if (locationManager == null) {//如果android不支持locationManager，就算了
            locationProvider = null;
            return;
        }

        List<String> providers = locationManager.getAllProviders();
        if (providers == null || providers.size() <= 0) {
            locationProvider = null;
            return;
        }

        String bestProvider = null;
        Location bestLocation = null;//android原生location对象
        for (String provider : providers) {
            if ((provider != null) && (PROVIDER_ARRAY.contains(provider)) && (ContextCompat.checkSelfPermission(getCurrentActivity(), android.Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED
                    || ContextCompat.checkSelfPermission(getCurrentActivity(), android.Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED)) {
                Location location = locationManager.getLastKnownLocation(provider);
                if (location == null) {
                    continue;
                }

                //筛选出最精准的传感器
                if (bestLocation == null) {
                    bestLocation = location;
                    bestProvider = provider;
                    continue;
                }

                if (Float.valueOf(location.getAccuracy()).compareTo(bestLocation.getAccuracy()) >= 0) {
                    bestLocation = location;
                    bestProvider = provider;
                }
            }
        }

        locationProvider = bestProvider;
    }

    @ReactMethod
    public void openGps() {      //打开gps
        getMyLocation2();
    }

    private void getMyLocation2() {
        Activity currentActivity = getCurrentActivity();
        if (locationManager == null) {
            locationManager = (LocationManager) currentActivity.getSystemService(Context.LOCATION_SERVICE);
        }
        boolean isGpsAvalible = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
        if (!isGpsAvalible) { //打开location设置的activity
            currentActivity.startActivityForResult(new Intent(android.provider.Settings.ACTION_LOCATION_SOURCE_SETTINGS), 0);
        } else {
            getFromGps();
        }
    }

    private void getFromGps() {
        //用户不一定会在系统设置中开启，故需要再次检测!
        boolean isGpsAvalible = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
        if (isGpsAvalible && (ContextCompat.checkSelfPermission(getCurrentActivity(), android.Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED
                || ContextCompat.checkSelfPermission(getCurrentActivity(), android.Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED)) {
            Location currentLocation = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
            if (currentLocation != null) {
                //获取经纬度
                final double newLatitude = currentLocation.getLatitude();
                final double newLongitude = currentLocation.getLongitude();
                dz = String.valueOf(newLatitude) + "," + String.valueOf(newLongitude);
                Log.i("gps", "当前纬度是:" + newLatitude + "当前经度是：" + newLongitude);
            }
        }
    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        getFromGps();
    }
}

