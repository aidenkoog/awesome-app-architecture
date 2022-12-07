package io.github.aidenkoog.style1.network;

import android.os.AsyncTask;

import java.net.HttpURLConnection;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

public class NetworkCheckAsyncTask extends AsyncTask<String, Void, Boolean> {

    public interface NetWorkCheckInterface {
        void netWorkCheckResult(boolean isNetwork);
    }

    NetWorkCheckInterface netWorkCheckInterface;

    public NetworkCheckAsyncTask() {
    }

    public NetworkCheckAsyncTask(NetWorkCheckInterface _netWorkCheckInterface) {
        this.netWorkCheckInterface = _netWorkCheckInterface;
    }

    @Override
    protected Boolean doInBackground(String... strings) {
        URL url;
        HttpURLConnection connection = null;
        boolean ret = false;
        String urlStr;
        try {
            if (null != strings[0]) {
                urlStr = strings[0];
                url = new URL(urlStr);
                if (urlStr.startsWith("https")) {
                    connection = (HttpsURLConnection) url.openConnection();
                } else {
                    connection = (HttpURLConnection) url.openConnection();
                }
                connection.setConnectTimeout(5 * 1000);
                connection.setRequestMethod("GET");
                connection.setDoInput(true);
                connection.setDoOutput(true);
                int resCode = 0;
                resCode = connection.getResponseCode();
                if (resCode > 0) {
                    ret = true;
                }
            }
        } catch (Exception e) {
            ret = false;
        } finally {
            try {
                if (null != connection) {
                    connection.disconnect();
                }
            } catch (Exception ignored) {
            }
        }
        return ret;
    }

    @Override
    protected void onPostExecute(Boolean aVoid) {
        super.onPostExecute(aVoid);
        if (null != netWorkCheckInterface) {
            netWorkCheckInterface.netWorkCheckResult(aVoid);
        }
    }
}