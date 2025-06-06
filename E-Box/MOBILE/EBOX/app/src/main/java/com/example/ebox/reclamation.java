package com.example.ebox;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.ebox.models.Reclamation;

import java.util.Collections;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class reclamation extends AppCompatActivity {

    private EditText objetEditText;
    private EditText messageEditText;
    private ProgressBar progressBar;
    private Button submitButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_reclamation);

        objetEditText = findViewById(R.id.objet_reclam);
        messageEditText = findViewById(R.id.paragraph_reclam);
        progressBar = findViewById(R.id.progressBar);
        submitButton = findViewById(R.id.ajout_reclam);

        submitButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String objet = objetEditText.getText().toString().trim();
                String message = messageEditText.getText().toString().trim();
                // Retrieve the user details from the intent
                Intent intent2 = getIntent();
                String userId = intent2.getStringExtra("USER_ID");


                if (!objet.isEmpty() && !message.isEmpty()) {
                    progressBar.setVisibility(View.VISIBLE);
                    submitReclamation(userId, objet, message);
                } else {
                    Toast.makeText(reclamation.this, "Please fill in all fields", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }

    private void submitReclamation(String userId, String objet, String message) {
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://192.168.1.101:3003/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        ApiService apiService = retrofit.create(ApiService.class);
        Reclamation reclamation = new Reclamation(objet, message, Collections.singletonList(userId));

        Call<Void> call = apiService.createReclamation(userId, reclamation);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                progressBar.setVisibility(View.GONE);
                if (response.isSuccessful() && response.code() == 201) {
                    Toast.makeText(reclamation.this, "Reclamation created successfully", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(reclamation.this, "Failed to create reclamation", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                progressBar.setVisibility(View.GONE);
                Toast.makeText(reclamation.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }
}
