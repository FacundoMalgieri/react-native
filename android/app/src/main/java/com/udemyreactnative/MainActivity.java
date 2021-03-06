package com.udemyreactnative;

import android.graphics.Color;
import android.util.TypedValue;
import android.view.Gravity;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {
    @Override
    public LinearLayout createSplashLayout() {
        LinearLayout view = new LinearLayout(this);
        TextView textView = new TextView(this);

        view.setBackgroundColor(Color.parseColor("#691f75"));
        view.setGravity(Gravity.CENTER);

        textView.setTextColor(Color.parseColor("#F3D826"));
        textView.setText("Awesome Places");
        textView.setGravity(Gravity.CENTER);
        textView.setTextSize(TypedValue.COMPLEX_UNIT_DIP,40);

        view.addView(textView);
        return view;
    }
}
