package io.github.aidenkoog.style1.network;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import io.github.aidenkoog.style1.data.ReportData;
import io.github.aidenkoog.style1.util.Logger;
import io.github.aidenkoog.style1.viewmodel.BaseViewModel;
import retrofit2.Response;

public abstract class NetworkResponse {

    BaseViewModel baseViewModel;
    Gson gson;

    public NetworkResponse(BaseViewModel baseViewModel) {
        this.baseViewModel = baseViewModel;
        gson = new Gson();
    }

    public boolean isReportSuccess(Response<JsonObject> response) {
        return isReportSuccess(response, true);
    }

    public boolean isReportSuccess(Response<JsonObject> response, boolean isProgress) {
        boolean isSuccess;
        ReportData reportData = gson.fromJson(response.body().get("report"), ReportData.class);

        if (response.isSuccessful() && reportData.getResult() == 0) {
            onSuccess(response.body());
            isSuccess = true;
        } else {
            onFail(reportData);
            isSuccess = false;
        }
        if (isProgress || (!isProgress && !isSuccess)) {
            if (baseViewModel != null) {  }
        }
        Logger.e("http response : " + response);
        return isSuccess;
    }

    public abstract void onSuccess(JsonObject returnJsonObject);

    public abstract void onFail(ReportData reportData);
}