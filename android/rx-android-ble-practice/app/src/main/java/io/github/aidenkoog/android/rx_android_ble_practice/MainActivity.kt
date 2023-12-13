package io.github.aidenkoog.android.rx_android_ble_practice

import android.Manifest
import android.annotation.SuppressLint
import android.bluetooth.BluetoothDevice
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.os.ParcelUuid
import android.view.View
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.polidea.rxandroidble2.RxBleClient
import com.polidea.rxandroidble2.RxBleConnection
import com.polidea.rxandroidble2.RxBleDevice
import com.polidea.rxandroidble2.exceptions.BleGattCallbackTimeoutException
import com.polidea.rxandroidble2.exceptions.BleGattCharacteristicException
import com.polidea.rxandroidble2.internal.RxBleLog
import com.polidea.rxandroidble2.scan.ScanFilter
import com.polidea.rxandroidble2.scan.ScanSettings
import io.github.aidenkoog.android.rx_android_ble_practice.databinding.ActivityMainBinding
import io.reactivex.Observable
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.Disposable
import io.reactivex.rxkotlin.subscribeBy
import timber.log.Timber
import java.util.*
import java.util.concurrent.TimeUnit

/*
 * sample source code for testing RxAndroidBLE library.
 */
class MainActivity : AppCompatActivity() {

    private val binding: ActivityMainBinding by lazy {
        ActivityMainBinding.inflate(layoutInflater)
    }

    private lateinit var context: Context

    /*
     * result disposable objects for the scan and connection.
     */
    private var scanDisposable: Disposable? = null
    private var connectionDisposable: Disposable? = null
    private var connectionStateDisposable: Disposable? = null

    /*
     * RxAndroidBLE.
     */
    private lateinit var rxBleClient: RxBleClient
    private var bleConnection: RxBleConnection? = null
    private var device: RxBleDevice? = null

    /*
     * MTU
     */
    private var currentMTU: Int = DEFAULT_MTU

    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        loadContext()

        binding.btScan.setOnClickListener(::onScanClick)
        binding.btAdd.setOnClickListener(::onAddClick)

        checkAllRequiredPermissions()
        createRxBleClient()
    }

    private fun loadContext() {
        context = applicationContext
    }

    /*
     * setup RxBleClient.
     */
    private fun createRxBleClient() {
        RxBleClient.setLogLevel(RxBleLog.VERBOSE)
        rxBleClient = RxBleClient.create(context)
    }

    /*
     * check bluetooth, ble related permissions.
     */
    private fun checkAllRequiredPermissions(): Boolean {
        val requiredPermissions = arrayOf(
            Manifest.permission.ACCESS_COARSE_LOCATION,
            Manifest.permission.BLUETOOTH,
            Manifest.permission.BLUETOOTH_ADMIN
        )

        for (permission in requiredPermissions) {
            if (ContextCompat.checkSelfPermission(
                    context, permission
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                ActivityCompat.requestPermissions(
                    this, requiredPermissions, REQUEST_ALL_PERMISSIONS
                )
                return false
            }
        }
        return true
    }

    /*
     * handle the result of permission check.
     */
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>,
        grantResults: IntArray,
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)

        Timber.i("FonRequestPermissionsResult $requestCode")
        when (requestCode) {
            REQUEST_ALL_PERMISSIONS -> finishIfRequiredPermissionsNotGranted(grantResults)
            else -> {}
        }
    }

    /*
     * finish activity if required permissions are not granted.
     */
    private fun finishIfRequiredPermissionsNotGranted(grantResults: IntArray) {
        if (grantResults.isNotEmpty()) {
            for (grantResult in grantResults) {
                if (grantResult == PackageManager.PERMISSION_GRANTED) {
                    Timber.d("permission is granted")
                } else {
                    finishWithToast()
                    break
                }
            }
        } else {
            finishWithToast()
        }
    }

    private fun finishWithToast() {
        Toast.makeText(
            this, "required permissions not granted! We need them all!!!", Toast.LENGTH_LONG
        ).show()
        finish()
    }

    @Suppress("UNUSED_PARAMETER")
    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    private fun onScanClick(v: View) = startScan()

    @Suppress("UNUSED_PARAMETER")
    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    private fun onAddClick(v: View) = writeCounter()

    /*
     * [Scan]
     * scanning --> connecting. (onComplete)
     */
    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    private fun startScan() {
        scanDisposable =
            rxBleClient.scanBleDevices(getSettings(), getFilter()).filter { scanResult ->
                scanResult.bleDevice != device

            }.timeout(SCAN_TIMEOUT, TimeUnit.MILLISECONDS, Observable.empty())
                .observeOn(AndroidSchedulers.mainThread()).subscribeBy(

                    onNext = { scanResult ->
                        device = scanResult.bleDevice
                        Timber.i("found $device")

                    }, onError = { throwable ->
                        Timber.e(throwable)

                    }, onComplete = {
                        device?.let {
                            startConnecting(it)
                        } ?: Toast.makeText(context, "no device found!", Toast.LENGTH_LONG).show()
                    })
    }

    private fun getSettings(): ScanSettings =
        ScanSettings.Builder().setScanMode(ScanSettings.SCAN_MODE_LOW_LATENCY)
            .setCallbackType(ScanSettings.CALLBACK_TYPE_ALL_MATCHES).build()

    private fun getFilter(): ScanFilter =
        ScanFilter.Builder().setServiceUuid(ParcelUuid(SERVICE_UUID)).build()

    private fun clearResources() {
        connectionStateDisposable?.apply { if (!isDisposed) dispose() }
        connectionDisposable?.apply { if (!isDisposed) dispose() }
        bleConnection = null
        device = null
        currentMTU = DEFAULT_MTU
    }

    /*
     * [Connection State & BLE Connect]
     * log ble connection states and try to establish ble connection.
     */
    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    private fun startConnecting(device: RxBleDevice) {
        Timber.i("connecting to $device")

        clearResources()
        connectionStateDisposable =
            device.observeConnectionStateChanges().observeOn(AndroidSchedulers.mainThread())
                .subscribeBy(onNext = { connectionState: RxBleConnection.RxBleConnectionState ->
                    when (connectionState) {
                        RxBleConnection.RxBleConnectionState.CONNECTING -> Timber.i("connecting...")
                        RxBleConnection.RxBleConnectionState.CONNECTED -> Timber.i("connected")
                        RxBleConnection.RxBleConnectionState.DISCONNECTING -> Timber.i("disconnecting...")
                        RxBleConnection.RxBleConnectionState.DISCONNECTED -> Timber.i("disconnected !!!")
                    }
                }, onError = { throwable ->
                    Timber.w(throwable)

                }, onComplete = {
                    Timber.i("state change complete!")
                })

        connectionDisposable =
            device.establishConnection(true).subscribeBy(onNext = { bleConnection ->
                this@MainActivity.bleConnection = bleConnection
                requestMTU()
                readCounter()
                registerCounter()

            }, onError = { throwable ->
                Timber.e(throwable, "device disconnected: ${device.name}(${device.macAddress})")

            }, onComplete = {
                Timber.i("connection complete")
            })
    }

    /*
     * [MTU]
     * set MTU (Maximum Transmission Unit).
     */
    @SuppressLint("CheckResult")
    private fun requestMTU() = bleConnection?.apply {
        requestMtu(MAX_MTU).subscribeBy(onSuccess = { mtu ->
            Timber.i("new MTU: $mtu")
            currentMTU = mtu

        }, onError = { throwable ->
            Timber.e(throwable)
        })
    }

    /*
     * [READ Characteristic]
     */
    @SuppressLint("CheckResult")
    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    private fun readCounter() = bleConnection?.apply {
        readCharacteristic(CHARACTERISTIC_READ_UUID).observeOn(AndroidSchedulers.mainThread())
            .subscribeBy(onSuccess = { value ->
                Timber.i("counter value: ${value[0].toInt()}")
                binding.tvCounter.text = value[0].toInt().toString()

            }, onError = { throwable ->
                when (throwable) {
                    is BleGattCharacteristicException,
                    is BleGattCallbackTimeoutException,
                    -> {
                        Timber.w("ble require bonding!")
                        bondDevice()
                    }

                    else -> Timber.e(throwable)
                }
            })
    }

    /*
     * [Bond State]
     * observe bluetooth bond states.
     */
    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    private fun bondDevice() {
        val bondChangeReceiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context, intent: Intent) {
                Timber.i("onReceive")

                @Suppress("DEPRECATION") val bondDevice =
                    intent.getParcelableExtra<BluetoothDevice>(BluetoothDevice.EXTRA_DEVICE)
                Timber.i("bond Device: $bondDevice")

                when (intent.getIntExtra(BluetoothDevice.EXTRA_BOND_STATE, -1)) {
                    BluetoothDevice.BOND_BONDING -> Timber.i("BOND_BONDING")

                    BluetoothDevice.BOND_BONDED -> {
                        Timber.i("BOND_BONDED")
                        context.unregisterReceiver(this)
                    }

                    BluetoothDevice.BOND_NONE -> {
                        Timber.i("BOND_NONE")
                        context.unregisterReceiver(this)
                    }
                }
            }
        }

        val intentFilter = IntentFilter()
        with(intentFilter) {
            addAction(BluetoothDevice.ACTION_BOND_STATE_CHANGED)
            priority = Int.MAX_VALUE
        }
        context.registerReceiver(bondChangeReceiver, intentFilter, RECEIVER_EXPORTED)
        createBond()
    }

    /*
     * start to create bond if BLUETOOTH_CONNECT permission is granted.
     */
    private fun createBond() {
        if (ActivityCompat.checkSelfPermission(
                this, Manifest.permission.BLUETOOTH_CONNECT
            ) == PackageManager.PERMISSION_GRANTED
        ) {
            device?.bluetoothDevice?.createBond()
        } else {
            Timber.e("bluetooth connect permission is not granted !!!")
        }
    }

    /*
     * [Enable READ Characteristic]
     */
    @SuppressLint("CheckResult")
    private fun registerCounter() = bleConnection?.apply {
        setupNotification(CHARACTERISTIC_READ_UUID).subscribeBy(onNext = { observable ->
            observable.observeOn(AndroidSchedulers.mainThread()).subscribeBy(onNext = { value ->
                Timber.i("counter value: ${value[0].toInt()}")
                binding.tvCounter.text = value[0].toInt().toString()

            }, onError = { throwable ->
                Timber.e(throwable)

            }, onComplete = {
                Timber.i("indication value complete!")
            })

        }, onError = { throwable ->
            Timber.e(throwable)

        }, onComplete = {
            Timber.i("indication complete!")
        })
    }

    /*
     * [WRITE Characteristic]
     */
    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    @SuppressLint("CheckResult")
    private fun writeCounter() = bleConnection?.apply {
        writeCharacteristic(CHARACTERISTIC_WRITE_UUID, byteArrayOf(0)).observeOn(
            AndroidSchedulers.mainThread()

        ).subscribeBy(onSuccess = { value ->
            Timber.i("write value: ${value[0].toInt()}")

        }, onError = { throwable ->
            when (throwable) {
                is BleGattCharacteristicException,
                is BleGattCallbackTimeoutException,
                -> {
                    Timber.w("ble require bonding!!!")
                    bondDevice()
                }

                else -> Timber.e(throwable)
            }
        })
    }

    companion object {
        private const val REQUEST_ALL_PERMISSIONS = 1001

        private val SERVICE_UUID = UUID.fromString("567890c7-420d-4048-a24e-18e60180e23c")

        private val CHARACTERISTIC_READ_UUID =
            UUID.fromString("32457c58-66bf-470c-b662-e352a6c80cba")

        private val CHARACTERISTIC_WRITE_UUID =
            UUID.fromString("0b90d2d4-0ea6-5432-86bb-0c5fb91ab14a")

        private const val SCAN_TIMEOUT: Long = 10_000
        private const val DEFAULT_MTU: Int = 20
        private const val MAX_MTU: Int = 512
    }
}