### Flutter Architecture Project.

#### Continue to study and ponder to improve the code structure.

This project is to make template code that can be applied to any app development.

- Language: Dart
- Structure Summary
  - ✨ assets
  - ✨ core
    - ✨ errors
    - ✨ global_config
    - ✨ network
    - ✨ usecases
  - ✨ data
    - ✨ adapters
    - ✨ dummy
    - ✨ models
    - ✨ repositores
    - ✨ sources
  - ✨ domain
    - ✨ entities
    - ✨ repositories
    - ✨ usecases
  - ✨ presentation
    - ✨ components
    - ✨ container
    - ✨ exception
    - ✨ home
    - ✨ intro
  - ✨ routes
  - ✨ services
  - ✨ utils

#### Getting Started (Flutter Default README)

This project is a starting point for a Flutter application.

A few resources to get you started if this is your first Flutter project:

- [Lab: Write your first Flutter app](https://docs.flutter.dev/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://docs.flutter.dev/cookbook)

For help getting started with Flutter development, view the
[online documentation](https://docs.flutter.dev/), which offers tutorials,
samples, guidance on mobile development, and a full API reference.

#### Release Note

- 2023/04/10 : Updated flutter clean architecture template source code (Deleted previous initial project source code)
- 2023/04/13 : Added fake login and multiple screens operated by route
- 2023/04/14 : Componentized tab widgets at the top of the main screen
- 2023/04/14 : Componentized all widgets which are used duplicately
- 2023/04/14 : Changed screens to presentation and installed get_it package
- 2023/04/14 : Added datasource, repository, usecase, core modules and entities / Added scripts for running and releasing app
- 2023/04/16 : Added drawer to be shown on the right side of the screen when the button, 'add customer' in first tab screen is pressed
- 2023/04/16 : Added drawer ui to be shown when a button in the screen corresponding to each tab is pressed
- 2023/04/16 : Added circle loading indicator to be shown when login button is pressed
- 2023/04/16 : Added circle loading indicator about each tab event in home and Added code that refreshes webpage when home title is pressed
- 2023/04/16 : Did code refactoring
- 2023/04/16 : Added xtable component to home's left panel (Known issue: table crash occurs when clicking data cell area)
- 2023/04/17 : Did code refactoring / Added m_log utility
- 2023/04/17 : Added getx controller templates
- 2023/04/17 : Updated drawer ui items and componentized them
- 2023/04/17 : Added Q&A textfield form
- 2023/04/17 : Updated source code hierarchy
- 2023/04/17 : Fixed compile error caused by wrong references
- 2023/04/17 : Added popup menu (context menu) to be shown when logout menu is pressed
- 2023/04/18 : Applied reactive ui concept
- 2023/04/19 : Did code refactoring (1st)
- 2023/04/20 : Did code refactoring (final)
- 2023/04/21 : Added grid data sheet ui
- 2023/04/21 : Changed admin webpage logo image
- 2023/04/21 : Applied routing logic by tab navigation
- 2023/04/21 : Fix height fixel crash issue occurred when window height size decreases
- 2023/04/21 : Applied tab navigation button radius
- 2023/04/24 : Did code refactoring related to intro
- 2023/04/24 : Did code refactoring related to web scaffold
- 2023/04/24 : Did code refactoring related to mobile scaffold

#### How To Setup Environment Before Developing App

It's mandantory to set up the development environment and build the app by following the instructions below:

- Visit https://docs.flutter.dev/development/tools/sdk/releases?tab=macos
- Download the latest flutter of stable channel.
- Execute export PATH="\$PATH:`pwd`/flutter/bin" on console or Modify bash_profile.
- flutter precache
- flutter doctor
- if you encounter this error ---> Flutter - Unable to find bundled Java version.
- cd /Applications/Android\ Studio.app/Contents/jre
- [Not Electric Eel] ln -s ../jre jdk
- [Not Electric Eel] ln -s "/Library/Internet Plug-Ins/JavaAppletPlugin.plugin" jdk
- [Electric Eel] cd /Applications/Android\ Studio.app/Contents
- [Electric Eel] ln -s jbr jre
- flutter doctor
- flutter run

#### How To Build Environment

- Flutter channel
  - master
  - beta
  - stable
  - dev

```
 # Web
 $ flutter channel beta
 $ flutter upgrade
 $ flutter config --enable-web
 $ flutter packages pub global activate webdev
 $ flutter packages upgrade
 $ flutter create --platforms=web .
 $ flutter run -d chrome
 #
 # Desktop (macOS)
 $ flutter channel dev
 $ flutter upgrade
 $ flutter config --enable-macos-desktop # for macOS
 $ flutter create --platforms=macos .
 # you need to install Xcode or VisualStudio or gcc toolchains.
 $ flutter run -d macos # for macOS
 #
 # Desktop (Windows)
 $ flutter channel dev
 $ flutter upgrade
 $ flutter config --enable-windows-desktop # for windows
 $ flutter create --platforms=windows .
 # you need to install Xcode or VisualStudio or gcc toolchains.
 $ flutter run -d windows # for windows
```

#### Link

If you are interested in information about me or other activities, please access the link below.

| Plugin      | LINK                           |
| ----------- | ------------------------------ |
| Github page | [https://aidenkoog.github.io/] |
