package com.andreiolah.heartratemonitor;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.PowerManager;
import android.support.v7.app.AppCompatActivity;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;

public class HeartRateMainPage extends AppCompatActivity {

    TextView showBeatText;
    Button showBeatButton;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_start_page);

        showBeatText = findViewById(R.id.textViewBeats);
        showBeatButton = findViewById(R.id.buttonShow);

        Button StartMonitor = (Button) findViewById(R.id.buttonStart);
        StartMonitor.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent StartActivitiMonitor = new Intent(HeartRateMainPage.this, HeartRateMonitor.class);
                startActivity(StartActivitiMonitor);
            }
        });

        showBeatButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                readBeatFile();
            }
        });


    }

    public void readBeatFile() {
        try {
            FileInputStream fileInputStream = openFileInput("BeatData.txt");
            InputStreamReader inputStreamReader = new InputStreamReader(fileInputStream);

            BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
            StringBuffer stringBuffer = new StringBuffer();

            String lines;
            while ((lines = bufferedReader.readLine()) != null) {
                stringBuffer.append(lines + "\n");
            }

            showBeatText.setText(stringBuffer.toString());
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}