//version 19.01.2019 - 1

package com.example.alin.driver_help;

import android.Manifest;
import android.app.Dialog;
import android.content.Intent;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

public class MenuActivity extends AppCompatActivity {

    private Button mlogOut;
    private Button Camera;
    private Button Park;
    private Button PoliceMap;
    private Button ReportPolice;
    private FirebaseAuth mAuth;
    private FirebaseAuth.AuthStateListener mAuthListener;
    private static final String TAG = "MenuActivity";
    private static final int ERROR_DIALOG_REQUEST = 9001;
    FirebaseDatabase firebaseDatabase;
    DatabaseReference databaseSpeedCameras;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_menu);

        ActivityCompat.requestPermissions(MenuActivity.this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION,Manifest.permission.WRITE_EXTERNAL_STORAGE,Manifest.permission.CAMERA},1234);
        //locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);
        firebaseDatabase = FirebaseDatabase.getInstance();
        databaseSpeedCameras = firebaseDatabase.getReference("SpeedCameras");



        if(isServicesOK())
            init();

        mAuth = FirebaseAuth.getInstance();
        mAuthListener = new FirebaseAuth.AuthStateListener() {
            @Override
            public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {
                if (firebaseAuth.getCurrentUser() == null)
                {
                    startActivity(new Intent(MenuActivity.this, LoginActivity.class ));
                }
            }
        };

        mlogOut = (Button) findViewById(R.id.btn_logOut);

        mlogOut.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mAuth.signOut();
            }
        });

        Camera = (Button) findViewById(R.id.btn_camera);

        Camera.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MenuActivity.this, CameraActivity.class));

            }
        });

        Park = (Button) findViewById(R.id.btn_savepark);

        Park.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MenuActivity.this, ParkingActivity.class));
            }
        });



        ReportPolice = (Button) findViewById(R.id.btn_reportPolice);
        Log.d(TAG, "REPORT POLICE OK!!!!");
        ReportPolice.setOnClickListener(new View.OnClickListener() {


            @Override
            public void onClick(View v) {
                GPStracker g = new GPStracker(getApplicationContext());
                Location k = g.getLocation();
                Log.d(TAG, "REPORT POLICE OK22222!!!!");

                if(k != null)
                {
                    double lati = k.getLatitude();
                    double longi = k.getLongitude();
                    //String id = databaseSpeedCameras.push().getKey();
                    SpeedCameras speedCameras = new SpeedCameras(lati,longi);
                    databaseSpeedCameras.push().setValue(speedCameras);
                    Toast.makeText(getApplicationContext(), "Speed camera reported", Toast.LENGTH_SHORT).show();
                }
                else{
                    Toast.makeText(getApplicationContext(), "NO GPS!", Toast.LENGTH_SHORT).show();
                }
            }
        });

        PoliceMap = (Button) findViewById(R.id.btn_radar);

        //GPStracker g = new GPStracker(getApplicationContext());
        //+final Location h = g.getLocation();
        PoliceMap.setOnClickListener(new View.OnClickListener() {


            @Override
            public void onClick(View v) {


                //if(l != null)
                    startActivity(new Intent(MenuActivity.this, MapsActivity.class));
                //else{
                //    Toast.makeText(getApplicationContext(),"Please enable your GPS",Toast.LENGTH_SHORT).show();
                //}
            }
        });


    }

    private void init() {
    }

    @Override
    protected void onStart() {
        super.onStart();
        mAuth.addAuthStateListener(mAuthListener);
    }

    public boolean isServicesOK(){
        Log.d(TAG, "isServicesOK: checking google services version");

        int available = GoogleApiAvailability.getInstance().isGooglePlayServicesAvailable(MenuActivity.this);

        if (available == ConnectionResult.SUCCESS)
        {
            //evrything is ok
            return true;
        }
        else if(GoogleApiAvailability.getInstance().isUserResolvableError(available))
        {
            //an error we can fix it
            Dialog dialog = GoogleApiAvailability.getInstance().getErrorDialog(MenuActivity.this, available, ERROR_DIALOG_REQUEST );
            dialog.show();
        }
        else{
        Toast.makeText(this , "You can't make map request", Toast.LENGTH_SHORT).show();
        }
        return false;

    }
}
