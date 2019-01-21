package bogdan.mobileapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;


public class SecondActivity extends AppCompatActivity {

    protected int splashTime = 500;
    TextView tv1;
    String[] name = {"Q","R","S","C", "A", "N", "N", "E", "R"};
    int timer=0;
Button btn_scan;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);
/*experiment thread delay*/
        tv1=(TextView)findViewById(R.id.textView1);
        Thread th= new Thread(){
            @Override
            public void run(){
              try{
                for (timer=0; timer<9; timer++){
                    int waited = 0;
                    while(waited < splashTime){
                        Thread.sleep(100);
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                try{
                                    tv1.setText(name[timer]);
                                }catch (Exception e){
                                    e.printStackTrace();
                                }
                            }
                        });
                        waited += 100;
                    }
                }
              }  catch(InterruptedException e){
              }

            }
        };
        th.start();

        /*trecerea prin buton la activitatea 3 */

btn_scan=(Button) findViewById(R.id.btScan);
        btn_scan.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent in2=new Intent(SecondActivity.this, ThirdActivity.class);
                startActivity(in2);
            }
        });




    }
}
