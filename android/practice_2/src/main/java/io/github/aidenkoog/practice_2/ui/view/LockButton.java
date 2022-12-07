package io.github.aidenkoog.practice_2.ui.view;

import android.content.Context;
import android.os.Handler;
import android.util.AttributeSet;

public class LockButton extends androidx.appcompat.widget.AppCompatButton {

    private boolean lockCheck = false;

    public LockButton(Context context) {
        super(context);
    }

    public LockButton(Context context, AttributeSet atts) {
        super(context, atts);
    }

    @Override
    public boolean performClick() {
        if (!lockCheck) {
            lockCheck = true;
            new Handler().postDelayed(() -> lockCheck = false, 1000);
            return super.performClick();
        } else {
            return false;
        }
    }
}
