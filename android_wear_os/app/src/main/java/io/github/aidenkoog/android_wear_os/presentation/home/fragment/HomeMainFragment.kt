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
import com.airbnb.lottie.LottieAnimationView
import com.orhanobut.logger.Logger
import dagger.hilt.android.AndroidEntryPoint
import io.github.aidenkoog.android_wear_os.BR
import io.github.aidenkoog.android_wear_os.R
import io.github.aidenkoog.android_wear_os.databinding.FragmentHomeMainBinding
import io.github.aidenkoog.android_wear_os.domain.model.HomeCard
import io.github.aidenkoog.android_wear_os.presentation.base.fragment.BaseFragment
import io.github.aidenkoog.android_wear_os.presentation.home.adapter.HomeCardListAdapter
import io.github.aidenkoog.android_wear_os.presentation.home.adapter.HomeCardListAdapter.Companion.POS_HEALTH_SERVICE
import io.github.aidenkoog.android_wear_os.presentation.home.adapter.HomeCardListAdapter.Companion.POS_HR
import io.github.aidenkoog.android_wear_os.presentation.home.adapter.HomeCardListAdapter.Companion.POS_RHR
import io.github.aidenkoog.android_wear_os.presentation.home.adapter.HomeCardListAdapter.Companion.POS_SETTING
import io.github.aidenkoog.android_wear_os.presentation.home.adapter.HomeCardListAdapter.Companion.POS_SLEEP
import io.github.aidenkoog.android_wear_os.presentation.home.adapter.HomeCardListAdapter.Companion.POS_STEP
import io.github.aidenkoog.android_wear_os.presentation.home.viewmodel.HomeMainViewModel
import io.github.aidenkoog.android_wear_os.presentation.setting.activity.SettingActivity
import io.github.aidenkoog.android_wear_os.utils.utils.LottieUtil
import io.github.aidenkoog.android_wear_os.utils.utils.NavigationUtil

@AndroidEntryPoint
class HomeMainFragment : BaseFragment() {
    private var viewDataBinding: FragmentHomeMainBinding? = null
    private val viewModelData: HomeMainViewModel? by viewModels()

    private lateinit var homeCardRecyclerView: WearableRecyclerView
    private lateinit var homeCardListAdapter: HomeCardListAdapter

    private lateinit var loadingLottieView: LottieAnimationView
    private var isLongClick = false

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
        loadingLottieView = viewDataBinding?.loadingLottieView!!

        initializeHomeCardList()
        registerBackPressedCallback()
        return viewDataBinding?.root!!
    }

    override fun onHandleBackPressed() {
        super.onHandleBackPressed()
        handleBackPress()
    }

    private fun handleBackPress() {
        finishActivity()
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        Logger.d("onViewCreated:")
        startLottieAnimation()
    }

    private fun startLottieAnimation() {
        LottieUtil.setLottieRawResource(loadingLottieView, R.raw.setting_loading)
        LottieUtil.setLottieSpeed(loadingLottieView, 1.2f)
        LottieUtil.playLottie(loadingLottieView)
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
        homeCardList.add(
            HomeCard(
                R.drawable.circle_item,
                getString(R.string.home_item_health_service)
            )
        )
        homeCardList.add(HomeCard(R.drawable.circle_item, getString(R.string.home_item_step)))
        homeCardList.add(HomeCard(R.drawable.circle_item, getString(R.string.home_item_sleep)))
        homeCardList.add(HomeCard(R.drawable.circle_item, getString(R.string.home_item_hr)))
        homeCardList.add(HomeCard(R.drawable.circle_item, getString(R.string.home_item_rhr)))
        homeCardList.add(HomeCard(R.drawable.circle_item, getString(R.string.home_item_setting)))
        return homeCardList
    }

    private val homeCardItemClickCallback = object : HomeCardListAdapter.OnItemClickListener {
        override fun onItemClick(position: Int, extras: Bundle?) {
            if (isLongClick) {
                isLongClick = false
                return
            }
            Logger.d("onItemClick: position: $position")

            when (position) {
                POS_HEALTH_SERVICE -> {
                    NavigationUtil.navigateScreen(
                        view, R.id.action_homeMainFragment_to_healthServiceSplashFragment
                    )
                }
                POS_STEP -> {
                    NavigationUtil.navigateScreen(
                        view, R.id.action_homeMainFragment_to_stepFragment
                    )
                }
                POS_SLEEP -> {
                    NavigationUtil.navigateScreen(
                        view, R.id.action_homeMainFragment_to_sleepFragment
                    )
                }
                POS_HR -> {
                    NavigationUtil.navigateScreen(
                        view, R.id.action_homeMainFragment_to_hrFragment
                    )
                }
                POS_RHR -> {
                    NavigationUtil.navigateScreen(
                        view, R.id.action_homeMainFragment_to_rhrFragment
                    )
                }
                POS_SETTING -> {
                    val intent = Intent(requireActivity(), SettingActivity::class.java)
                    intent.flags =
                        Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
                    startActivity(intent)
                    requireActivity().finish()
                }
            }
        }

        override fun onItemLongClick(position: Int, extras: Bundle?) {
            Logger.d("onItemLongClick: position: $position")
            isLongClick = true
            when (position) {
                POS_SETTING -> {
                    NavigationUtil.navigateScreen(
                        view, R.id.action_homeMainFragment_to_hiddenFragment
                    )
                    isLongClick = false
                }
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