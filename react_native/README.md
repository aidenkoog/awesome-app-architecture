# Release Note
### 2022/10/22 : Fixed 1st source code architecture (presentation / core / test / config / constants)
### 2022/10/23 : (1st) Fixed logging errors and changed log function's name
### 2022/10/23 : (2nd) Add Bluetooth related usecase source code / Separate container and component ui of root.
### 2022/10/25 : (1st) Arranged recoil atoms, logger, usecases and repositories.
### 2022/10/25 : (2nd) Enforce ble repository logic, merge detailed ble usecases, rearrange recoil atoms and add storage util


# How To Intialize New App

### Visit https://reactnative.dev/docs/environment-setup
### Install Node, Brew, Yarn, Npm etc packages
### npx react-native init react_native --version 0.68.2
- (0.69.X version has an issue)

### Set-up Android SDK path
### npx react-native run-android
### pod install
### Open iOS app project with Xcode IDE
### Set-up Bundle Identifier & Team account
### Build Clean + Re-build
### Set-up iOS device name in package.json
### rm -rf /Users/admin/Library/Developer/Xcode/DerivedData
### pod deintegrate
### pod install
### Clean & Re-build ios project
### Set-up Team account about Cocoapods AccessibilityReources
### npx react-native run-ios


# How To Install Fastlane

### brew install ruby
### sudo gem install fastlane
### sudo gem install bundler
### bundle init
### Write 'gem "fastlane"' to Gemfile
### cd ios
### fastlane init
