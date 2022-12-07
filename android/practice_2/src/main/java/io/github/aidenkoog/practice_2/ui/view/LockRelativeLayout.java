package io.github.aidenkoog.practice_2.ui.view;

import android.content.Context;
import android.os.Handler;
import android.util.AttributeSet;
import android.widget.RelativeLayout;

public class LockRelativeLayout extends RelativeLayout {
    private boolean lockCheck = false;

    public LockRelativeLayout(Context context) {
        super(context);
    }

    public LockRelativeLayout(Context context, AttributeSet attrs) {
        super(context, attrs);
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