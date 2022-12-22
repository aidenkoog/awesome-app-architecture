import loadingAnimation from "../../../../assets/images/loading_animation.gif"
import { MAIN_MAP_LOADING_1, MAIN_MAP_LOADING_2 } from "../../../../assets/strings/Strings"

const ANIMATION_WIDTH = 100
const ANIMATION_HEIGHT = 100
const ANIMATION_MARGIN_TOP = 30
const ANIMATION_MARGIN_BOTTOM = 30

/**
 * Map loading lottie animation view component.
 * Refs. currently, GIF typed image is used for the animation. Not used Lottie.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
export default function MapLoadingProgressComponent() {

    return (
        <div>
            <img
                style={
                    {
                        width: ANIMATION_WIDTH,
                        height: ANIMATION_HEIGHT,
                        marginTop: ANIMATION_MARGIN_TOP,
                        marginBottom: ANIMATION_MARGIN_BOTTOM
                    }}
                src={loadingAnimation} alt="loadingAnimation" />
            <br /><br /><br /><br />
            <b style={{ fontSize: 18 }}>{MAIN_MAP_LOADING_1}</b>
            <br />
            <b style={{ fontSize: 18 }}>{MAIN_MAP_LOADING_2}</b>
        </div>
    )
}