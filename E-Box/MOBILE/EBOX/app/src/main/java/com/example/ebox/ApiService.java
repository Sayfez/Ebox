package com.example.ebox;

import com.example.ebox.models.PresenceResponse;
import com.example.ebox.models.Reclamation;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface ApiService {
    @GET("presences/PresenceEtudiant/{userId}")
    Call<PresenceResponse> getPresences(@Path("userId") String userId);

    @POST("reclamations/{userId}")
    Call<Void> createReclamation(@Path("userId") String userId, @Body Reclamation reclamation);
}