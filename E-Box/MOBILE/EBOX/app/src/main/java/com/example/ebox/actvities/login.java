package com.example.ebox.actvities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.example.ebox.R;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class login extends AppCompatActivity {

    private static final String TAG = "LoginActivity";

    Button signIn;
    EditText Domain, Password;
    ProgressBar progressBar;
    String UserDomain, UserPassword;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        Domain = findViewById(R.id.domainLog);
        Password = findViewById(R.id.passwordLog);
        signIn = findViewById(R.id.login_btn);
        progressBar = findViewById(R.id.progressBar);
        progressBar.setVisibility(View.GONE);

        signIn.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                progressBar.setVisibility(View.VISIBLE);
                loginUser();
            }
        });
    }

    private void loginUser() {
        UserDomain = Domain.getText().toString();
        UserPassword = Password.getText().toString();

        if (TextUtils.isEmpty(UserDomain)) {
            Toast.makeText(this, "Domain is empty!", Toast.LENGTH_SHORT).show();
            progressBar.setVisibility(View.GONE);
            return;
        }

        if (TextUtils.isEmpty(UserPassword)) {
            Toast.makeText(this, "Password is empty!", Toast.LENGTH_SHORT).show();
            progressBar.setVisibility(View.GONE);
            return;
        }

        // Execute the login task
        new LoginTask().execute(UserDomain, UserPassword);
    }

    private class LoginTask extends AsyncTask<String, Void, Boolean> {

        private String userId;
        private String name;
        private String familyName;
        private String errorMessage;

        @Override
        protected Boolean doInBackground(String... params) {
            String email = params[0];
            String password = params[1];

            try {
                URL url = new URL("http://192.168.1.101:3003/authentification/signin");
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Content-Type", "application/json");
                conn.setRequestProperty("Accept", "application/json");
                conn.setDoOutput(true);

                JSONObject jsonInput = new JSONObject();
                jsonInput.put("Email", email);
                jsonInput.put("Password", password);
                System.out.println(jsonInput);
                try (OutputStream os = conn.getOutputStream()) {
                    byte[] input = jsonInput.toString().getBytes("utf-8");
                    os.write(input, 0, input.length);
                }

                int responseCode = conn.getResponseCode();
                Log.d(TAG, "Response Code: " + responseCode);
                if (responseCode == 201) { // HTTP 201 Created
                    BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
                    StringBuilder response = new StringBuilder();
                    String responseLine;
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }

                    JSONObject jsonResponse = new JSONObject(response.toString());
                    JSONObject user = jsonResponse.getJSONObject("user");

                    userId = user.getString("_id");
                    name = user.getString("Name");
                    familyName = user.getString("FamilyName");

                    return true;
                } else {
                    BufferedReader br = new BufferedReader(new InputStreamReader(conn.getErrorStream(), "utf-8"));
                    StringBuilder response = new StringBuilder();
                    String responseLine;
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }
                    errorMessage = response.toString();
                    Log.e(TAG, "Error Response: " + errorMessage);
                    return false;
                }
            } catch (Exception e) {
                e.printStackTrace();
                Log.e(TAG, "Exception: " + e.getMessage());
                errorMessage = e.getMessage();
                return false;
            }
        }

        @Override
        protected void onPostExecute(Boolean success) {
            progressBar.setVisibility(View.GONE);
            if (success) {
                Toast.makeText(login.this, "Login successful!", Toast.LENGTH_SHORT).show();
                // Create an intent to start the new activity
                Intent intent = new Intent(login.this, com.example.ebox.Presence.class);
                // Pass the user details as extras
                intent.putExtra("USER_ID", userId);
                intent.putExtra("NAME", name);
                intent.putExtra("FAMILY_NAME", familyName);
                // Start the new activity
                startActivity(intent);
                // Here you can save userId, name, and familyName to SharedPreferences or pass them to another activity
            } else {
                Toast.makeText(login.this,   errorMessage, Toast.LENGTH_SHORT).show();

                System.out.println(errorMessage);
            }
        }
    }
}
