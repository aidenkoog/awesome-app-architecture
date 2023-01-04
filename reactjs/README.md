
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
- 2022/11/30 : Query emergency reports when entering page first / Delete unused and unnecessary variable declaration.
- 2022/12/01 : (1st) Changed loading animation / Re-arranged ui alignment.
- 2022/12/01 : (2nd) Added zoom controller to be shown in naver map component.
- 2022/12/01 : (3rd) Fixed wrong send-sms api url / Deleted text tag in error component.
- 2022/12/01 : (4th) (Workaround) Added code below that initializes Naver map instance to avoid the problem where map is NOT shown.
- 2022/12/01 : (5th) Added module that can get domain from web page url.
- 2022/12/01 : (6th) Added code to retry 5 times when activity information is not properly fetched in the beginning. 
- 2022/12/01 : (7th) Added logic that calls apis every 3 seconds for 2 minutes until emergency report comes in.
- 2022/12/01 : (8th) Fixed issue that refresh button doesn't work anymore after it's pressed once more.
- 2022/12/01 : (9th) Fixed issue that refreshing current location doesn't work after new emergency data comes in.
- 2022/12/01 : (10th) Fixed issue that history list disappears after refreshing current location data.
- 2022/12/02 : (1st) Fixed issue that copying link doesn't work after querying the current location.
- 2022/12/02 : (2nd) Fix mistake happened while fixing function to copy address.
- 2022/12/02 : (3rd) Applied all GUI data.
- 2022/12/02 : (4th) Fixed issue that history list is duplicated, Delete provider data and Added real-time query button (template).
- 2022/12/05 : (1st) Fixed issue that location time information is NOT accurate and Separate elapsed time information.
- 2022/12/05 : (2nd) Deleted unnecessary parameter key for debugging about phone number, that is, loadKey only exists.
- 2022/12/06 : Branched CSS style code for each component, Arranged indentation of code and Deleted unnecessary debugging log code.
- 2022/12/07 : Fixed issue that it's NOT operated to copy address function when exception happens / Arranged UI components.
- 2022/12/08 : Added images to header's buttons.
- 2022/12/09 : (1st) Delete button ui that can search real-time location.
- 2022/12/09 : (2nd) Added decryption module about device mobile phone number.
- 2022/12/13 : (1st) Search current location even if there's no any emergency report when button which can query current location is pressed.
- 2022/12/13 : (2nd) Fixed issue that SMS is sent to device multiple times / Disable button which can search current location when it's already being executed.
- 2022/12/13 : (3rd) Fixed issue that date and location information are reversed in main map component.
- 2022/12/13 : (4th) Fixed merge mistakes.
- 2022/12/13 : (5th) Fixed warning occurred when copy address button is pressed.
- 2022/12/13 : (6th) Fixed warning about map, menu table components.
- 2022/12/13 : (7th) Fixed issue that map is shown even if searching current location job is failed.
- 2022/12/13 : (8th) Changed domain url / Delete unused debugging log code.
- 2022/12/13 : (9th) Rollback domain url.
- 2022/12/13 : (10th) Fixed issue that it doesn't work to decode the phone number string in url.
- 2022/12/14 : Fixed issue that webpage crash happens while parsing the error message.
- 2022/12/16 : Deleted naver geocode related configuration / Added code that skips to show error page when response is not valid after pressing current location button.
- 2022/12/16 : Modified logic to search the location for 2 minutes when pressing the query location button under the situation in which there is no emergency report after 24 hours or there is no data itself
- 2022/12/19 : (1st) Scaled marker icon.
- 2022/12/19 : (2nd) Fixed issue that duplicated map is shown and marker is too big to control.
- 2022/12/20 : (1st) Applied image styled map container.
- 2022/12/20 : (2nd) Fixed issue that circle shape is shown as ellipse / Added code to change circle size dynamically.
- 2022/12/20 : (3rd) Improved map circle area position.
- 2022/12/20 : (4th) Fixed issue that circle shape overflows outside.
- 2022/12/20 : (5th) Adjust map circle radius value when zoom level is 13 or 14 or 15.
- 2022/12/21 : (1st) Fixed an issue where the circle size became too large and fell outside the map when the screen size increased.
- 2022/12/21 : (2nd) Added module that can save logs as file / Deleted unused files. / Fix warning releated to circle component.
- 2022/12/22 : (1st) Fixed warning about text component / Added debugging log messages.
- 2022/12/22 : (2nd) Improved readability of log messages.
- 2022/12/22 : (3rd) Deleted unused map files and dependencies.
- 2022/12/22 : (4th) Deleted unused package dependencies and index files.
- 2022/12/22 : (5th) Applied map's dashed border.
- 2022/12/22 : (6th) Fixed wrong time information caused by remain create date.
- 2022/12/22 : (7th) Fixed issue that date information is NOT changed after searching the current location.
- 2022/12/22 : (8th) Added vertical scroll bar to menu table.
- 2022/12/23 : Fixed position of map, circle, marker and zoom buttons / Enabled vertical scroll bar of webpage / Adjust menu table vertical length.
- 2022/12/26 : Added normal phone number style support.
- 2022/01/02 : (1st) Made the latest position information located at the first position / Changed time information of menu / Delete cached log messages in 24 hours. / Enable normal phone number style url when domain is for debugging. / Add provider, event type fields.
- 2022/01/02 : (2nd) Adjust menu and map component size ratio.
- 2022/01/02 : (3rd) Hide history item that has expired after 24 hours.
- 2022/01/02 : (4th) Applied provider value to upper case's.
- 2022/01/03 : (1st) Applied additional requirement / Deleted rectangle shape feature of map / Applied dynamic error radius feature.
- 2022/01/03 : (2nd) Disable debugging mode (mistake)
- 2022/01/03 : (3rd) Update formula for calculating error radius.
- 2022/01/04 : (1st) Applied auto scale function of map / Added history selection function / Changed button's position as scenario.
- 2022/01/04 : (2nd) Fix incorrect circle range and zoom level.
- 2022/01/04 : (3rd) Adjusted history table field spacing.

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

