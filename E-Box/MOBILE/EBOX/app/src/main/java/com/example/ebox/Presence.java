package com.example.ebox;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.ebox.models.PresenceResponse;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class Presence extends AppCompatActivity {

    private RecyclerView recyclerView;
    private PresenceAdapter adapter;
    private ProgressBar progressBar;
    private Button reclam;
    private String userId; // Declare userId as a class-level variable

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_presence);
        reclam = findViewById(R.id.reclam);
        recyclerView = findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        progressBar = findViewById(R.id.progressBar);

        // Retrieve the user details from the intent
        Intent intent = getIntent();
        userId = intent.getStringExtra("USER_ID");
        String name = intent.getStringExtra("NAME");
        String familyName = intent.getStringExtra("FAMILY_NAME");

        reclam.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                progressBar.setVisibility(View.VISIBLE);
                passer_reclam();
            }
        });

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://192.168.1.101:3003/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        ApiService apiService = retrofit.create(ApiService.class);

        Call<PresenceResponse> call = apiService.getPresences(userId);
        call.enqueue(new Callback<PresenceResponse>() {
            @Override
            public void onResponse(Call<PresenceResponse> call, Response<PresenceResponse> response) {
                if (response.isSuccessful()) {
                    PresenceResponse presenceResponse = response.body();
                    adapter = new PresenceAdapter(presenceResponse.data);
                    recyclerView.setAdapter(adapter);
                    progressBar.setVisibility(View.GONE);
                } else {
                    Toast.makeText(Presence.this, "Failed to fetch data", Toast.LENGTH_SHORT).show();
                    progressBar.setVisibility(View.GONE);
                }
            }

            @Override
            public void onFailure(Call<PresenceResponse> call, Throwable t) {
                Toast.makeText(Presence.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
                progressBar.setVisibility(View.GONE);
            }
        });
    }

    private void passer_reclam() {
        Intent intent2 = new Intent(Presence.this, reclamation.class); // Change the target activity as needed
        // Pass the user details as extras
        intent2.putExtra("USER_ID", userId);
        // Start the new activity
        startActivity(intent2);
    }
}
