package bogdan.mobileapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
/*cream variabilele necesare*/
    private EditText Name;
    private EditText Password;
    private TextView Info;
    private Button Login;
    private int counter=5;
    /*/end*/


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        /*asignam variabilele la id-urile elementelor*/
        Name = (EditText)findViewById(R.id.etName);
        Password = (EditText)findViewById(R.id.etPassword);
        Info = (TextView)findViewById(R.id.tvInfo);
        Login= (Button)findViewById(R.id.btnLogin);
        /*end*/
        Info.setText("Incercari ramase: 5");

        /*validam stringurile*/

        Login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
            validate(Name.getText().toString(), Password.getText().toString());
            }
        });

    }
/*daca user si parola sunt egale cu ce e definit, intram in "second activity'*/
    private void validate(String userName, String userPassword){
        if((userName.equals("Admin")) && (userPassword.equals("1234"))){
            Intent intent = new Intent(MainActivity.this, SecondActivity.class);
            startActivity(intent);
        }
        /*daca nu dezactivam butonul de login cand variabila counter ajunge la 0*/
        else{

            counter--;
            Info.setText("Incercari ramase:" + String.valueOf(counter));

            if(counter == 0){
                Login.setEnabled(false);

            }
        }
    }

}
