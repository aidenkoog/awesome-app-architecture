
# React.js Architecture Project.

## Summary

This project shows data using the NAVER Map API.
It is written based on JavaScript.

- Language: Javascript
- Library: React (A library for creating user interfaces.)
- Structure Summary
    - ✨ presentation
        - ✨ components
        - ✨ container
    - ✨ data
        - ✨ adapters
        - ✨ dummy
        - ✨ repositories
        - ✨ sources
    - ✨ domain
        - ✨ entities
        - ✨ usecases
    - ✨ utils
        - ✨ logger
        - ✨ regex
        - ✨ time
    - ✨ assets
        - ✨ images
        - ✨ lotties
        - ✨ strings
    - ✨ test
        - ✨ hidden
        - ✨ dummy

## Release Note

- 2022/11/24 : Initialize React.js project with README / NaverMaps API dependency, client ID.
- 2022/11/28 : Rearrange UI component / functions.
- 2022/11/29 : (1st) Rearrange source code structure / Change page tab title.
- 2022/11/29 : (2nd) Added HTTP POST module / Re-arrange UI.
- 2022/11/30 : Query SOS & POLICE reports when entering page first / Delete unused and unnecessary variable declaration.
- 2022/12/01 : (1st) Changed loading animation / Re-arranged ui alignment.
- 2022/12/01 : (2nd) Added zoom controller to be shown in naver map component.
- 2022/12/01 : (3rd) Fixed wrong send-sms api url / Deleted text tag in error component.
- 2022/12/01 : (4th) (Workaround) Added code below that initializes Naver map instance to avoid the problem where map is NOT shown.
- 2022/12/01 : (5th) Added module that can get domain from web page url.
- 2022/12/01 : (6th) Added code to retry 5 times when activity information is not properly fetched in the beginning. 
- 2022/12/01 : (7th) Added logic that calls apis every 3 seconds for 2 minutes until police report comes in.
- 2022/12/01 : (8th) Fixed issue that refresh button doesn't work anymore after it's pressed once more.
- 2022/12/01 : (9th) Fixed issue that refreshing current location doesn't work after new police data comes in.
- 2022/12/01 : (10th) Fixed issue that history list disappears after refreshing current location data.
- 2022/12/02 : (1st) Fixed issue that copying link doesn't work after querying the current location.
- 2022/12/02 : (2nd) Fix mistake happened while fixing function to copy address.
- 2022/12/02 : (3rd) Applied all GUI data.
- 2022/12/02 : (4th) Fixed issue that history list is duplicated, Delete provider data and Added real-time query button (template).
- 2022/12/05 : (1st) Fixed issue that location time information is NOT accurate and Separate elapsed time information.
- 2022/12/05 : (2nd) Deleted unnecessary parameter key for debugging about phone number, that is, loadKey only exists.
- 2022/12/06 : Branched CSS style code for each component, Arranged indentation of code and Deleted unnecessary debugging log code.
- 2022/12/07 : Fixed issue that it's NOT operated to copy address when exception happens / Arranged UI components.
- 2022/12/08 : Added images to header's buttons.
- 2022/12/09 : (1st) Delete button ui that can search real-time location.
- 2022/12/09 : (2nd) Added decryption module about device mobile phone number.

## How To Setup Environment

It's mandantory to set up the development environment and build the app by following the instructions below:

> Visit https://ko.reactjs.org/
> npx create-react-app reactjs
> yarn add react-naver-maps
> npm start

## Link

If you are interested in information about me or other activities, please access the link below.

| Plugin | LINK |
| ------ | ------ |
| Instagram | [https://www.instagram.com/aidenkoog/] |
| Github page | [https://aidenkoog.github.io/aidenkoog/] |
| Youtube | [https://www.youtube.com/channel/UC3hT_aGpXxL4Dygz4_tNVQA] |

