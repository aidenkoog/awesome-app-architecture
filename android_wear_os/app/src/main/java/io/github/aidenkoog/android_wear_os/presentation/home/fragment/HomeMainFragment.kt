package io.github.aidenkoog.android_wear_os.presentation.home.fragment

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.viewModels
import androidx.recyclerview.widget.RecyclerView
import androidx.wear.widget.WearableLinearLayoutManager
import androidx.wear.widget.WearableRecyclerView
import com.orhanobut.logger.Logger
import io.github.aidenkoog.android_wear_os.BR
import io.github.aidenkoog.android_wear_os.R
import io.github.aidenkoog.android_wear_os.databinding.FragmentHomeMainBinding
import io.github.aidenkoog.android_wear_os.domain.model.HomeCard
import io.github.aidenkoog.android_wear_os.presentation.base.fragment.BaseFragment
import io.github.aidenkoog.android_wear_os.presentation.home.adapter.HomeCardListAdapter
import io.github.aidenkoog.android_wear_os.presentation.home.viewmodel.HomeMainViewModel
import io.github.aidenkoog.android_wear_os.presentation.setting.activity.SettingActivity

class HomeMainFragment : BaseFragment() {
    private var viewDataBinding: FragmentHomeMainBinding? = null
    private val viewModelData: HomeMainViewModel? by viewModels()

    private lateinit var homeCardRecyclerView: WearableRecyclerView
    private lateinit var homeCardListAdapter: HomeCardListAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setDataObserver()
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View? {
        viewDataBinding = FragmentHomeMainBinding.inflate(inflater, container, false)
        viewDataBinding?.setVariable(BR.homeMainViewModel, viewModelData)
        viewDataBinding?.executePendingBindings()

        initializeHomeCardList()
        registerBackPressedCallback()
        return viewDataBinding?.root!!
    }

    override fun onHandleBackPressed() {
        super.onHandleBackPressed()
        handleBackPress()
    }

    private fun handleBackPress() {

    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        Logger.d("onViewCreated:")
    }

    private fun initializeHomeCardList() {
        homeCardRecyclerView = viewDataBinding?.homeCardRecyclerView!!
        homeCardRecyclerView.layoutManager =
            WearableLinearLayoutManager(requireContext(), CustomScrollingLayoutCallback())
        homeCardRecyclerView.apply { isEdgeItemsCenteringEnabled = true }

        homeCardListAdapter = HomeCardListAdapter(requireContext(), getCardList())
        homeCardRecyclerView.adapter = homeCardListAdapter
        homeCardListAdapter.setOnItemClickListener(homeCardItemClickCallback)
    }

    private fun getCardList(): ArrayList<HomeCard> {
        val homeCardList = ArrayList<HomeCard>()
        homeCardList.add(HomeCard(R.drawable.circle_blue, "Step"))
        homeCardList.add(HomeCard(R.drawable.circle_green, "Sleep"))
        homeCardList.add(HomeCard(R.drawable.circle_orange, "HR"))
        homeCardList.add(HomeCard(R.drawable.circle_red, "RHR"))
        homeCardList.add(HomeCard(R.drawable.circle_yellow, "Setting"))
        return homeCardList
    }

    private val homeCardItemClickCallback = object : HomeCardListAdapter.OnItemClickListener {
        override fun onItemClick(position: Int, extras: Bundle?) {
            Logger.d("onItemClick: position: $position")
            if (position == 4) {
                val intent = Intent(requireActivity(), SettingActivity::class.java)
                intent.flags =
                    Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
                startActivity(intent)
                requireActivity().finish()
            }
        }
    }

    private fun setDataObserver() {
        viewModelData?.isLoaded?.observe(this) {
            if (it == true) {
                Logger.i("Loaded!")
            }
        }
    }

    class CustomScrollingLayoutCallback : WearableLinearLayoutManager.LayoutCallback() {
        private var progressToCenter: Float = 0f

        override fun onLayoutFinished(child: View, parent: RecyclerView) {
            child.apply {
                // Figure out % progress from top to bottom
                val centerOffset = height.toFloat() / 2.0f / parent.height.toFloat()
                val yRelativeToCenterOffset = y / parent.height + centerOffset

                // Normalize for center
                progressToCenter = Math.abs(0.5f - yRelativeToCenterOffset)
                // Adjust to the maximum scale
                progressToCenter = Math.min(progressToCenter, MAX_ICON_PROGRESS)

                scaleX = 1 - progressToCenter
                scaleY = 1 - progressToCenter
            }
        }
    }

    companion object {
        /** How much should we scale the icon at most.  */
        private const val MAX_ICON_PROGRESS = 0.65f
    }
}