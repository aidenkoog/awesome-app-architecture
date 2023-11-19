package io.github.aidenkoog.android.testapp;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.text.SpannableStringBuilder;
import android.text.Spanned;
import android.text.style.ForegroundColorSpan;
import android.util.Log;
import android.util.TypedValue;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.ScrollView;
import android.widget.TextView;

import io.github.aidenkoog.android.aidl_apptemplate.library.library.AidlManager;
import io.github.aidenkoog.android.testapp.ui.TestCase;
import io.github.aidenkoog.android.testapp.ui.TestInterface;
import io.github.aidenkoog.android.testapp.utils.Constants;

import java.text.SimpleDateFormat;
import java.util.Date;


public class MainActivity extends Activity implements Handler.Callback {
    private static final String TAG = MainActivity.class.getSimpleName();
    private static final int LIST_ITEM_MINIMUM_WIDTH = 50;
    private static final int LIST_ITEM_MINIMUM_HEIGHT = 25;
    private static final float LOG_SCREEN_FONT_SIZE = 7.5f;
    private static final float LIST_ITEM_TITLE_FONT_SIZE = 12f;
    private static final float LIST_ITEM_DESCRIPTION_FONT_SIZE = 8f;
    private static final String FONT_PATH = "fonts/DejaVuSansMono.ttf";

    private ListView mListView;
    private ScrollView mScrollView;
    private LinearLayout mContainer;
    private Handler mHandler;
    private SimpleDateFormat mTimeFormat;
    private ArrayAdapter<TestCase> mAdapter;
    private int mTestSequence = 0;
    private boolean mBlock = false;

    private AidlManager mAidlManager;

    @TestInterface(name = Constants.CLEAR_SCREEN)
    private void CLEAR_SCREEN() {
        clearScreen();
    }

    private void loadTestCases() {
        mAdapter.addAll(TestCase.setup(this));
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        int action = event.getAction();
        if (KeyEvent.ACTION_DOWN == action) {
            if (keyCode == KeyEvent.KEYCODE_1 && event.getRepeatCount() >= 5) {
                clearScreen();
            }
        }
        return super.onKeyDown(keyCode, event);
    }

    @SuppressLint("SimpleDateFormat")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mTimeFormat = new SimpleDateFormat("HH:mm:ss.SSS");
        mHandler = new Handler(this);

        setContentView(R.layout.activity_main);

        mListView = findViewById(R.id.listView);
        mContainer = findViewById(R.id.scrollContainer);
        mScrollView = findViewById(R.id.scrollView);

        final Typeface type = Typeface.createFromAsset(getAssets(), FONT_PATH);
        mAdapter = new ArrayAdapter<TestCase>(this, android.R.layout.simple_list_item_2) {
            @SuppressLint("InflateParams")
            @Override
            public View getView(int position, View convertView, ViewGroup parent) {
                View view = convertView;
                if (view == null) {
                    view = LayoutInflater.from(MainActivity.this).inflate(android.R.layout.simple_list_item_2, null);
                }
                view.setMinimumWidth(LIST_ITEM_MINIMUM_WIDTH);
                view.setMinimumHeight(LIST_ITEM_MINIMUM_HEIGHT);
                TestCase testCase = getItem(position);
                TextView text1 = view.findViewById(android.R.id.text1);
                TextView text2 = view.findViewById(android.R.id.text2);
                text1.setTypeface(type);
                text1.setTextSize(LIST_ITEM_TITLE_FONT_SIZE);
                text2.setTypeface(type);
                text2.setTextSize(LIST_ITEM_DESCRIPTION_FONT_SIZE);
                text1.setText(testCase.name);
                text2.setText(testCase.description);
                return view;
            }
        };
        loadTestCases();
        mListView.setAdapter(mAdapter);
        mListView.setOnItemClickListener((adapterView, view, i, l) -> {
            if (!mBlock) {
                executeTestCase(i, 1);
            }
        });
    }

    private void executeTestCase(int itemIndex, int count) {
        mTestSequence++;
        TestCase testCase = mAdapter.getItem(itemIndex);
        String testCaseName = testCase.name;
        switch (testCaseName) {
            case Constants.CLEAR_SCREEN:
            case Constants.BIND_SERVICE:
            case Constants.UNBIND_SERVICE:
                if (mTestSequence > 0) {
                    mTestSequence--;
                } else {
                    mTestSequence = 0;
                }
                break;
        }
        for (int i = 0; i < count; i++) {
            testCase.execute(object -> {
                if (object != null) {
                    success(object.toString());
                }
            }, e -> failure(e.toString()));
        }
    }

    private View getLastLogView() {
        return mContainer.getChildAt(mContainer.getChildCount() - 1);
    }

    private TextView appendTextView() {
        TextView view = new TextView(this);
        view.setTextColor(0xffdddddd);
        view.setTextSize(TypedValue.COMPLEX_UNIT_DIP, LOG_SCREEN_FONT_SIZE);
        view.setFocusable(false);
        view.setBackgroundResource(android.R.color.transparent);
        final Typeface type = Typeface.createFromAsset(getAssets(), FONT_PATH);
        view.setTypeface(type);

        mContainer.addView(view, new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
        scrollToBottom();

        return view;
    }

    private TextView getLastTextView() {
        View view = getLastLogView();
        if (view instanceof TextView) {
            return (TextView) view;
        }
        return appendTextView();
    }

    private void onLog(final int level, final String msg) {
        runOnUiThread(() -> {
            TextView textView = getLastTextView();
            if (level < 0) {
                textView.append(msg + "\n");
                scrollToBottom();
                return;
            }

            if (level == Log.ASSERT && msg.isEmpty()) {
                mContainer.removeAllViews();
                scrollToBottom();
                return;
            }

            Object span = null;
            String lv;
            switch (level) {
                case Log.VERBOSE:
                    lv = "<V>";
                    break;
                case Log.DEBUG:
                    lv = "<D>";
                    break;
                case Log.INFO:
                    lv = "<I>";
                    span = new ForegroundColorSpan(Color.CYAN);
                    break;
                case Log.WARN:
                    lv = "<SUCCESS>";
                    span = new ForegroundColorSpan(Color.GREEN);
                    break;
                case Log.ERROR:
                    lv = "<FAILURE>";
                    span = new ForegroundColorSpan(Color.RED);
                    break;
                case Log.ASSERT:
                    lv = "<!>";
                    break;
                default:
                    lv = "<?>";
                    break;
            }

            String time = "[" + mTimeFormat.format(new Date()) + "] ";
            SpannableStringBuilder sb = new SpannableStringBuilder(time + lv + " " + msg + "\n");
            sb.setSpan(new ForegroundColorSpan(Color.YELLOW), 0, time.length() - 1, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
            if (span != null) {
                sb.setSpan(span, time.length(), sb.length(), Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
            }
            textView.append(sb);
            scrollToBottom();
        });
    }

    private void scrollToBottom() {
        mScrollView.post(() -> {
            mScrollView.fullScroll(ScrollView.FOCUS_DOWN);
            if (mScrollView.hasFocus()) {
                mListView.requestFocus();
            }
        });
    }

    private static final int MSG_LOG = 10;

    @Override
    public boolean handleMessage(Message msg) {
        if (msg.what == MSG_LOG) {
            onLog(msg.arg1, (String) msg.obj);
        }
        return false;
    }

    private void clearScreen() {
        log(Log.ASSERT, "");
        scrollToBottom();
    }

    private void log(int level, String log) {
        Log.println(level, TAG, log);

        Message msg = mHandler.obtainMessage(MSG_LOG, level, 0, log);
        mHandler.sendMessage(msg);
    }

    public void info(String log) {
        log(Log.INFO, log);
    }

    public void debug(String log) {
        log(Log.DEBUG, log);
    }

    public void success(String log) {
        log(Log.WARN, log);
    }

    public void failure(String log) {
        log(Log.ERROR, log);
    }

    @Override
    protected void onStart() {
        super.onStart();
    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
    }

    @Override
    protected void onStop() {
        super.onStop();
    }

    @Override
    public void onBackPressed() {
        info("onBackPressed()");
        //super.onBackPressed();
        moveTaskToBack(true);
    }
}
