# React Native Architecture Project.
## Continue to study and ponder to improve the code structure.


This project is to make template code that can be applied to any app development.
It is written based on JavaScript, and when the JavaScript-based template source code structure is completed, a TypeScript-based source code will also be created.

- Language: Javascript
- Structure Summary
    - ✨ JSX Elements
    - ✨ UseCases
    - ✨ Repositories
    - ✨ Modules
    - ✨ State Management Module (Recoil)

## Release Note

- 2022/09/16 ~ 2022/10/21 : Review RN (React-Native) itself.

- 2022/10/22 : Fixed 1st source code architecture (presentation / core / test / config / constants)
- 2022/10/23 : (1st) Fixed logging errors and changed log function's name
- 2022/10/23 : (2nd) Add Bluetooth related usecase source code / Separate container and component ui of root.
- 2022/10/25 : (1st) Arranged recoil atoms, logger, usecases and repositories.
- 2022/10/25 : (2nd) Enforce ble repository logic, merge detailed ble usecases, rearrange recoil atoms and add storage util
- 2022/10/26 : (1st) Rearranged usecases, added navigation library and add additional comment to entire source code.
- 2022/10/26 : (2nd) Hotfix, fixed build errors and hide title bar in the screen.
- 2022/10/27 : Added permission utils and Added react-native-get-random-values library.
- 2022/11/09 : Added ble data generator template code / encryptor / decryptor.
- 2022/11/13 : Arrange source code.
- 2022/11/14 : Fixed build errors / Enable setting functions.
- 2022/11/15 : (1st) Added chart graph ui that shows device status.
- 2022/11/15 : (2nd) Added testcases / test hidden ui
- 2022/11/16 : Added authentication, sync device information and diconnect device functions.
- 2022/11/17 : (1st) Added clear, reconnect BLE and en/disable BLE log option testcases.
- 2022/11/17 : (2nd) Added testcase for automatical testing.
- 2022/11/18 : (1st) Fixed out of sync issue between request and response in hidden test app / Update encryption module.
- 2022/11/18 : (2nd) Fixed BLE reconnection popup in hidden menu is terminated automatically as soon as it opens.


## How To Setup Environment

It's mandantory to set up the development environment and build the app by following the instructions below:

> Visit https://reactnative.dev/docs/environment-setup
> Install Node, Brew, Yarn, Npm etc packages
> npx react-native init react_native --version 0.68.2
> Set-up Android SDK path
> pod install
> Open iOS app project with Xcode IDE
> Set-up Bundle Identifier & Team account
> Build Clean + Re-build
> Set-up iOS device name in package.json
> rm -rf /Users/admin/Library/Developer/Xcode/DerivedData
> pod deintegrate
> pod install
> Clean & Re-build ios project
> Set-up Team account about Cocoapods AccessibilityReources
> npx react-native run-ios
> brew install ruby
> sudo gem install fastlane
> sudo gem install bundler
> bundle init
> Write 'gem "fastlane"' to Gemfile
> cd ios
> fastlane init

## Source Code

From UI To Core Module.

UI JSX Element.

```sh
return (
    <BluetoothComponent
        bleConnectionState={bleConnectionState}
        bleConnectionCompleteState={bleConnectionCompleteState}
    />
)
```

UseCase.

```sh
executeStartScanUseCase().catch((e) => {
    outputErrorLog(LOG_TAG, e + " occurred by executeStartScanUseCase")
})
```

Repository.

```sh
 const {
    connectDevice, disableNotification, disconnectDevice, enableNotification,
    initializeBleModule, getUuidList, sendBleCustomData, startScan, stopScan,
    getBleDeviceInfo
 } = BleRepository()
 
 executeStartScanUseCase = (serviceUuid = SERVICE_UUID, duration = SCAN_DURATION) => {
    return new Promise((fulfill, reject) => {
        startScan(serviceUuid, duration).then(() => {
            fulfill()
        }).catch((e) => {
            reject(e)
        })
    })
}

this.enableBluetooth().then(() => {
    bleManager.scan(serviceUuids, duration, false).then(() => {
        fulfill()
    }).catch((e) => {
        reject(e)
    })
}).catch((e) => {
    reject(e)
})
```

State Management.

```sh
const setBleScanningStateAtom = useSetRecoilState(bleScanningStateAtom)
const bleScanningState = useRecoilValue(bleScanningStateAtom)
```

## Link

If you are interested in information about me or other activities, please access the link below.

| Plugin | LINK |
| ------ | ------ |
| Youtube | [https://www.instagram.com/aidenkoog/] |
| Github page | [https://aidenkoog.github.io/aidenkoog/] |
| Instagram | [https://www.youtube.com/channel/UC3hT_aGpXxL4Dygz4_tNVQA] |
