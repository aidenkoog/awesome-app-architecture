package io.github.aidenkoog.style1.network;

import com.google.gson.JsonObject;

import io.reactivex.Flowable;
import retrofit2.Response;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Query;

public interface HttpService {
    @FormUrlEncoded
    @POST("/URL")
    Flowable<JsonObject> postAuthToken(
            @Field("username") String userName,
            @Field("password") String password);

    @DELETE("/URL")
    Flowable<Response<JsonObject>> deleteUser(
            @Header("Authorization") String authorization,
            @Query("email") String email);

    @POST("/URL")
    Flowable<Response<JsonObject>> removePushToken(
            @Header("Authorization") String authorization,
            @Body JsonObject jsonObject);

    @GET("/URL")
    Flowable<Response<JsonObject>> getSettings(
            @Header("Authorization") String authorization,
            @Query("email") String email);

    @PUT("/URL")
    Flowable<Response<JsonObject>> putSettings(
            @Header("Authorization") String authorization,
            @Query("email") String email,
            @Body JsonObject jsonObject);
}