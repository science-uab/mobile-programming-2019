package com.example.alin.driver_help;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.support.v4.content.ContextCompat;
import android.widget.Toast;

public class GPStracker implements LocationListener {
    Context context;
    public GPStracker(Context c)
    {
        context = c;
    }

    public Location getLocation()
    {
        if(ContextCompat.checkSelfPermission(context,Manifest.permission.ACCESS_FINE_LOCATION)!= PackageManager.PERMISSION_GRANTED){
            Toast.makeText(context,"Permision not granted",Toast.LENGTH_SHORT).show();
            return null;
        }

        LocationManager lm = (LocationManager)context.getSystemService(Context.LOCATION_SERVICE);
        boolean isGPSEnabled = lm.isProviderEnabled(LocationManager.GPS_PROVIDER);
        if(isGPSEnabled){
            lm.requestLocationUpdates(LocationManager.GPS_PROVIDER,6000,10,this);
            return lm.getLastKnownLocation(LocationManager.GPS_PROVIDER);
        }
        else{
            Toast.makeText(context,"No GPS signal, please enable your GPS or wait for gps signal",Toast.LENGTH_LONG).show();
            //return  null;
        }
        return null;
    }

    //public GPStracker() {
    //    super();
    //}

    @Override
    public void onLocationChanged(Location location) {

    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {

    }

    @Override
    public void onProviderEnabled(String provider) {

    }

    @Override
    public void onProviderDisabled(String provider) {

    }
}
