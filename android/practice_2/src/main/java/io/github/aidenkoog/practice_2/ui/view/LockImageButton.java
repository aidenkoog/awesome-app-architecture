package io.github.aidenkoog.practice_2.ui.view;

import android.content.Context;
import android.os.Handler;
import android.util.AttributeSet;

public class LockImageButton extends androidx.appcompat.widget.AppCompatImageButton {
    private boolean lockCheck = false;

    public LockImageButton(Context context) {
        super(context);
    }

    public LockImageButton(Context context, AttributeSet atts) {
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