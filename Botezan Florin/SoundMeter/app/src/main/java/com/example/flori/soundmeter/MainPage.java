package com.example.flori.soundmeter;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

public class MainPage extends AppCompatActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_page);
    }

    public void StartMonitor (View view){
        Intent StartActivity = new Intent(this, MainActivity.class);
        startActivity(StartActivity);
    }

}
