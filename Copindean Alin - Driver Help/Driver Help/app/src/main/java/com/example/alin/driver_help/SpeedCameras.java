package com.example.alin.driver_help;


public class SpeedCameras {
    public  double s_lat;
    public  double s_long;

    public SpeedCameras(){

    }

    public SpeedCameras(double s_lat, double s_long) {
        this.s_lat = s_lat;
        this.s_long = s_long;
    }

    public  double getS_lat() {
        return s_lat;
    }

    public  double getS_long() {
        return s_long;
    }
}
