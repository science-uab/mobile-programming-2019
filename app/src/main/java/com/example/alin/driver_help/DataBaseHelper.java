package com.example.alin.driver_help;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DataBaseHelper extends SQLiteOpenHelper {

    public static final String DATABASE_NAME = "DriverGPS.db";
    public static final String TABLE_NAME = "parking_table";
    public static final String COL_1 = "ID";
    public static final String COL_2 = "LAT";
    public static final String COL_3 = "LONGI";

    public DataBaseHelper(Context context) {
        super(context, DATABASE_NAME, null, 1);

    }

    @Override
    public void onCreate(SQLiteDatabase db) {
            db.execSQL("create table " + TABLE_NAME + " (ID INTEGER PRIMARY KEY, LAT DOUBLE, LONGI DOUBLE)");
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
            db.execSQL("DROP TABLE IF EXISTS " + TABLE_NAME);
            onCreate(db);
    }

    public boolean insertData(Integer id,Double lat, Double longi)
    {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put(COL_1,id);
        contentValues.put(COL_2,lat);
        contentValues.put(COL_3,longi);
        long result = db.insert(TABLE_NAME,null, contentValues); // fail returneaza -1
        if(result==-1)
            return false;
        else return true;
    }

    public Cursor alldata()
    {
        SQLiteDatabase db = this.getWritableDatabase();
        String query = "Select * from " + TABLE_NAME;
        Cursor cursor = db.rawQuery(query, null);
        //Cursor res = db.rawQuery("select * from "+TABLE_NAME,null);
        return cursor;
    }
}
