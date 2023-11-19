# Notice
- As of October 18, 2023, this repository will no longer be maintained.
- From now on, only repositories with the awesome prefix will be managed.
  - https://github.com/aidenkoog/awesome-app-architecture 
  - https://github.com/aidenkoog/awesome-hello-world 
  - https://github.com/aidenkoog/awesome-til-today-i-learned 
  - https://github.com/aidenkoog/awesome-programming-practice
  - https://github.com/aidenkoog/aidenkoog.github.io

## RTSP Player

#### Summary

This project contains logic related to RTSP video play.

- Language: Typescript
- Library: React (A library for creating user interfaces.)

#### Release Note

- 2023/03/02: Initialized project source code.
- 2023/03/03: Initialized react-native project source code. / Added web local server code for testing.
- 2023/03/03: Added VLC-Player view that plays rtsp video.

#### How To Setup Environment

It's mandantory to set up the development environment and build the app by following the instructions below:

- **Web**
  - **Local Server Setup**
    - git clone https://github.com/deepch/RTSPtoWeb
    - cd RTSPtoWeb
    - Update config.json
      - streams
    - Execute server
      - GO111MODULE=on go run \*.go
        - (localhost:8083)
  - **React Client Setup**
    - Visit https://ko.reactjs.org/
    - npm create vite@latest
      - react / typescript selection.
    - Integrate VideoJs
      - npm install --save-dev video.js @types/video.js
    - yarn install
    - npm start or npm run dev
      - Please refer to your package.json file content.
- **Mobile**
  - npx react-native init PROJECT_NAME
  - Create local.properties in android directory.
  - yarn install
  - npm run android or npm run ios
  - If pod command is NOT found ?
    - Check .ruby_version of project root.
    - rbenv versions
    - rbenv global 2.7.5
    - ruby --version
  - iOS build
    - cd ios
    - pod cache clean -all
    - rm -rf Podfile.lock
    - pod install
    - cd ..
    - npm run ios
    - When occurring error Failed to build iOS project. We ran "xcodebuild" command.. ?
      - Execute command, rm -rf /Users/admin/Library/Developer/Xcode/DerivedData
      - Execute Xcode
      - Check if DerivedData directory is made again.
      - Execute command, npm run ios again.
    - When occurring this error in Xcode, error build: Command PhaseScriptExecution failed with a nonzero exit code
      - sudo ln -s "$(which node)" /usr/local/bin/node
      - CMD + K: Clean Build
      - CMD + Shift + B : Build
      - npm run ios
      - Change package.json's ios setting: // "ios": "react-native run-ios", ==> "ios": "react-native run-ios --device='AidenKooG'",
      - Please check if mobile phone's developer mode is turned on.

#### Link:

If you are interested in information about me or other activities, please access the link below.

| **Page**        | **LINK**                                             |
| --------------- | ---------------------------------------------------- |
| **Github page** | [https://aidenkoog.github.io/]                       |
| **LinkedIn**    | [https://www.linkedin.com/in/dongwan-koo-2041bb13b/] |
