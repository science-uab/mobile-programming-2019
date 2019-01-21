//version 18.01.2019 - 1

package com.example.alin.driver_help;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.location.Location;
import android.net.Uri;
import android.provider.ContactsContract;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class ParkingActivity extends AppCompatActivity {

    private Button btnGetLoc;
    private Button goToLoc;
    double lat=0;
    double lon=0;
    DataBaseHelper myDb;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_parking);

        myDb = new DataBaseHelper(this);

        btnGetLoc = (Button) findViewById(R.id.btn_savePos);
        ActivityCompat.requestPermissions(ParkingActivity.this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION},123);
        btnGetLoc.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                    GPStracker g = new GPStracker(getApplicationContext());
                Location l = g.getLocation();

                if(l != null)
                {
                    lat = l.getLatitude();
                    lon = l.getLongitude();
                    boolean isInserted =  myDb.insertData(1,lat,lon);
                    if(isInserted = true)
                        Toast.makeText(getApplicationContext(),"POSITION SAVED \n Latitude: "+lat+" \n Longitude: "+ lon , Toast.LENGTH_LONG).show();

                }
                else Toast.makeText(getApplicationContext(),"EROOR" , Toast.LENGTH_LONG).show();

            }
        });

        goToLoc = (Button) findViewById(R.id.btn_goToPos);
        goToLoc.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Cursor cursor = myDb.alldata();
                if(cursor.getCount() == 0 )
                {
                    Toast.makeText(getApplicationContext(),"NO POSITION FOUND", Toast.LENGTH_SHORT).show();
                    //return;
                }
                else
                {
                    //StringBuffer buffer = new StringBuffer();
                    while(cursor.moveToNext()){
                    lat=cursor.getDouble(1);
                    lon=cursor.getDouble(2);

                    }
                    //Toast.makeText(getApplicationContext(),"!!!!! \n Latitude: "+lat+" \n Longitude: "+ lon , Toast.LENGTH_LONG).show();
                    String coordinates = "http://maps.google.com/maps?daddr=" + lat + "," + lon;

                    Intent intent = new Intent( Intent.ACTION_VIEW, Uri.parse(coordinates) );
                    startActivity( intent );
                }




            }
        });
    }
}
