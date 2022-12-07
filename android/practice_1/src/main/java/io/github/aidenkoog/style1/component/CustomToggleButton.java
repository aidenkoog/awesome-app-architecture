package io.github.aidenkoog.style1.component;

import android.content.Context;
import android.util.AttributeSet;

public class CustomToggleButton extends androidx.appcompat.widget.AppCompatToggleButton {
    public CustomToggleButton(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    public CustomToggleButton(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public CustomToggleButton(Context context) {
        super(context);
    }

    @Override
    public void toggle() {
    }
}
