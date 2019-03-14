package com.ruixin.ffjw;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.os.Looper;
import android.os.StrictMode;
import android.util.Log;
import android.view.KeyEvent;
import android.widget.Toast;

import com.alibaba.fastjson.JSON;
import com.ruixin.ffjw.utils.LogUtils;

import org.json.JSONException;
import org.json.JSONObject;

import bingo.sso.client.android.Constants;
import bingo.sso.client.android.SSOClient;
import bingo.sso.client.android.SSOClientBuilder;
import bingo.sso.client.android.listener.LoginListener;
import bingo.sso.client.android.modle.User;

public class SSOActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    protected void onResume() {
        super.onResume();
        //1.调用SSO
        SSO();
    }

    public void gotoMainActivity(String msg) {
        Intent intent = new Intent(this, MainActivity.class);
        intent.putExtra("user",msg);
        startActivity(intent);
        finish();
    }

    public void SSO(){
        try {
            Intent intent = getIntent();
            String accessToken = intent.getStringExtra(Constants.KEY_ACCESSTOKEN);
            String refreshToken = intent.getStringExtra(Constants.KEY_REFRESHTOKEN);
            String ssoUrl = intent.getStringExtra(Constants.KEY_SSOURL);
            String uamUrl = intent.getStringExtra(Constants.KEY_UAMURL);
            if (ssoUrl == null) {
                ssoUrl = "http://10.201.76.79:80/sso";
            }
            if (uamUrl == null) {
                uamUrl = "http://10.201.76.79:80/uam";
            }
            //第三步: 调用sso登录API,获取用户信息,回调均在子线程
            SSOClient ssoClient = new SSOClientBuilder().setSsoBaseEndpoint(ssoUrl).setUamBaseEndpoint(uamUrl).build();

            ssoClient.login(accessToken, refreshToken, new LoginListener() {
                @Override
                public void onSuccess(User user) {
                    LogUtils.e("SSO登录成功:" + JSON.toJSONString(user));
                    //登录成功，返回user对象，回调在子线程
                    gotoMainActivity(user.getLoginId());
                }

                // err 异常信息
                @Override
                public void onError(String err) {
                    //登录失败
                    LogUtils.e("SSO登录失败:" + err);
                    //解决在子线程中调用Toast的异常情况处理
                    Looper.prepare();
                    gotoMainActivity("SSO登录失败");
                    Toast ashort = Toast.makeText(SSOActivity.this, "登录失败，请退出应用", Toast.LENGTH_SHORT);
                    ashort.show();
                    Looper.loop();

                }

                /**  token失效,
                 * code == 1  refreshToken 无效
                 * code == 2  accessToken 无效
                 * */
                @Override
                public void onTokenInvalid(int code) {
                    //登录失败
                    LogUtils.e("token失效:" + code);
                    //解决在子线程中调用Toast的异常情况处理
                    Looper.prepare();
                    Toast ashort = Toast.makeText(SSOActivity.this, "token验证失效，请退出应用", Toast.LENGTH_SHORT);
                    ashort.show();
                    Looper.loop();
                }

            });
        }catch (Exception e){
            LogUtils.e("SSO方法出现异常",new Throwable(e));
        }

    }


    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            new AlertDialog.Builder(SSOActivity.this)
                    .setTitle("提示")
                    .setMessage("是否退出应用？")
                    .setPositiveButton("是",
                            new DialogInterface.OnClickListener() {
                                public void onClick(
                                        DialogInterface dlg,
                                        int which) {
                                    SSOActivity.this.exit();
                                }
                            })
                    .setNegativeButton("否",
                            new DialogInterface.OnClickListener() {
                                public void onClick(
                                        DialogInterface dlg,
                                        int which) {
                                    dlg.dismiss();
                                }
                            }).show();

            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    /**
     * 退出
     */
    public void exit() {
        this.finish();
        System.exit(0);
    }

}
