package io.github.aidenkoog.style1.util;

import android.view.View;
import androidx.databinding.BindingAdapter;

public class BindingAdapterUtil {

    @BindingAdapter("setVisible")
    public static void setVisible(View view, boolean isVisible) {
        if (isVisible) {
            view.setVisibility(View.VISIBLE);
        } else {
            view.setVisibility(View.GONE);
        }
    }
}