package com.example.alin.driver_help;

import android.content.Intent;
import android.net.Uri;
import android.provider.MediaStore;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import java.io.File;

public class CameraActivity extends AppCompatActivity {
    private  final int VIDEO_REQUEST_CODE = 100;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_camera);
    }

    public void captureVideo(View view)
    {
        Intent camera_intent = new Intent(MediaStore.ACTION_VIDEO_CAPTURE);
        File video_file = getFilePath();
        Uri video_uri = Uri.fromFile(video_file);
        //camera_intent.putExtra(MediaStore.EXTRA_OUTPUT, video_uri);
        //camera_intent.putExtra(MediaStore.EXTRA_VIDEO_QUALITY,1);
        startActivityForResult(camera_intent,VIDEO_REQUEST_CODE);

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        //super.onActivityResult(requestCode, resultCode, data);
        if(requestCode==VIDEO_REQUEST_CODE)
        {
            if(resultCode==RESULT_OK)
            {
                Toast.makeText(getApplicationContext(),"Video successfully recorded",Toast.LENGTH_LONG).show();
            }
            else
            {
                Toast.makeText(getApplicationContext(),"Video capture failed",Toast.LENGTH_LONG).show();
            }
        }
    }

    public File getFilePath()
    {
        File folder = new File("driver_video");
        if(!folder.exists())
        {
            folder.mkdir();
        }

        File video_file = new File (folder,"sample_video.mp4");
        return video_file;
    }


}
