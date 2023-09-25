package io.github.aidenkoog.gridlayout

import android.os.Bundle
import android.util.DisplayMetrics
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import io.github.aidenkoog.gridlayout.adapter.RecyclerViewAdapter
import io.github.aidenkoog.gridlayout.models.RecyclerModel
import kotlin.math.sqrt


class MainActivity : AppCompatActivity() {

    lateinit var rvMain: RecyclerView
    lateinit var layoutManager: GridLayoutManager
    lateinit var recyclerAdapter: RecyclerViewAdapter

    private var modelInfoList = arrayListOf<RecyclerModel>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        //storing data in arraylist
        addData()

        rvMain = findViewById(R.id.rvMain)

        Log.d("koo", "widthPixels: ${resources.displayMetrics.widthPixels}")
        Log.d("koo", "heightPixels: ${resources.displayMetrics.heightPixels}")
        Log.d("koo", "densityDpi: ${resources.displayMetrics.densityDpi}")
        Log.d("koo", "density: ${resources.displayMetrics.density}")
        Log.d("koo", "xdpi: ${resources.displayMetrics.xdpi}")
        Log.d("koo", "ydpi: ${resources.displayMetrics.ydpi}")

        val scalefactor = resources.displayMetrics.density * 100
        val width = windowManager.defaultDisplay.width
        Log.d("koo", "scalefactor: $scalefactor, width: $width")

        var result = (width.toFloat() / scalefactor).toInt()

        if (result >= 3) {
            result = 3
        } else {
            result = 2
        }
        val columns = result

        val displayMetrics = DisplayMetrics()

        // on below line we are getting metrics
        // for display using window manager.
        windowManager.defaultDisplay.getMetrics(displayMetrics)

        // on below line we are getting height
        // and width using display metrics.
        val height = displayMetrics.heightPixels
        val widthS = displayMetrics.widthPixels

        Log.d("koo", "height: $height, widthS: $widthS")

//        val dm = DisplayMetrics()
//        windowManager.defaultDisplay.getMetrics(dm)
//        val x = Math.pow((dm.widthPixels / dm.xdpi).toDouble(), 2.0)
//        val y = Math.pow((dm.heightPixels / dm.ydpi).toDouble(), 2.0)
//        val screenInches = Math.sqrt(x + y) * dm.scaledDensity
//        Log.d("koo", "Screen inches : $screenInches")

        Log.d("koo", "result: " + sqrt((height * height + widthS * widthS).toDouble()))
        Log.d("koo", "result: " + sqrt((height * height + widthS * widthS).toDouble()) / 2.54)

        val widthInches: Double = (displayMetrics.widthPixels / displayMetrics.xdpi).toDouble()
        val heightInches: Double = (displayMetrics.heightPixels / displayMetrics.ydpi).toDouble()
        Log.d("koo", "widthInches: $widthInches, heightInches: $heightInches")
        val resultInches: Double = sqrt(widthInches + widthInches + heightInches * heightInches)
        Log.d("koo", "resultInches: $resultInches")

        //initiate grid view Todo: can change number of rows(spanCount) accordingly
        layoutManager = GridLayoutManager(this, columns)

        recyclerAdapter = RecyclerViewAdapter(this, modelInfoList)
        rvMain.adapter = recyclerAdapter
        rvMain.layoutManager = layoutManager

    }

    fun addData() {
        modelInfoList.add(RecyclerModel(R.drawable.c, "C Programming", "₹8000"))
        modelInfoList.add(RecyclerModel(R.drawable.cpp, "CPP Programming", "₹10000"))
        modelInfoList.add(RecyclerModel(R.drawable.java, "Java Masterclass", "₹9000"))
        modelInfoList.add(RecyclerModel(R.drawable.python, "Python Programming", "₹11000"))
        modelInfoList.add(RecyclerModel(R.drawable.dart, "Dart", "₹6000"))
        modelInfoList.add(RecyclerModel(R.drawable.django, "django", "₹9500"))
        modelInfoList.add(RecyclerModel(R.drawable.php, "PHP Basics", "₹5000"))
        modelInfoList.add(RecyclerModel(R.drawable.ruby, "RUBY Masterclass", "₹15000"))

    }
}