package io.github.aidenkoog.practice_2.ui.view;

import android.content.Context;
import android.graphics.Canvas;
import android.os.Handler;

import androidx.appcompat.widget.AppCompatSeekBar;

import android.util.AttributeSet;
import android.view.MotionEvent;

public class VerticalSeekbar extends AppCompatSeekBar {

    protected Handler touchStartHandler;
    protected Handler touchStopHandler;

    public VerticalSeekbar(Context context) {
        super(context);
    }

    public VerticalSeekbar(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    public VerticalSeekbar(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(h, w, oldh, oldw);
    }

    @Override
    public synchronized void setProgress(int progress) {
        super.setProgress(progress);
        onSizeChanged(getWidth(), getHeight(), 0, 0);
    }

    @Override
    protected synchronized void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(heightMeasureSpec, widthMeasureSpec);
        setMeasuredDimension(getMeasuredHeight(), getMeasuredWidth());
    }

    protected void onDraw(Canvas c) {
        c.rotate(-90);
        c.translate(-getHeight(), 0);
        super.onDraw(c);
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        if (!isEnabled()) {
            return false;
        }
        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN:
                if (touchStartHandler != null) {
                    touchStartHandler.sendEmptyMessage(0);
                }
            case MotionEvent.ACTION_MOVE:
            case MotionEvent.ACTION_UP:
                setProgress(getMax() - (int) (getMax() * event.getY() / getHeight()));
                onSizeChanged(getWidth(), getHeight(), 0, 0);
                if (touchStopHandler != null) {
                    touchStopHandler.sendEmptyMessage(0);
                }
                break;
            case MotionEvent.ACTION_CANCEL:
                if (touchStopHandler != null) {
                    touchStopHandler.sendEmptyMessage(0);
                }
                break;
        }
        return true;
    }

    public Handler getTouchStartHandler() {
        return touchStartHandler;
    }

    public void setTouchStartHandler(Handler touchStartHandler) {
        this.touchStartHandler = touchStartHandler;
    }

    public Handler getTouchStopHandler() {
        return touchStopHandler;
    }

    public void setTouchStopHandler(Handler touchStopHandler) {
        this.touchStopHandler = touchStopHandler;
    }
}