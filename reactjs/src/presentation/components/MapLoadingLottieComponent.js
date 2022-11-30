import Lottie from "react-lottie"
import animationData from "../../assets/lotties/loading_lottie.json"

const LOTTIE_HEIGHT = 500
const LOTTIE_WIDTH = 500

export default function MapLoadingLottieComponent() {

    /**
     * lottie's option.
     */
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    return (
        <div>
            <Lottie
                options={defaultOptions}
                height={LOTTIE_HEIGHT}
                width={LOTTIE_WIDTH}
            />
            <br /><br /><br /><br />

            <text >
                <b>현 위치를 측위 중입니다.</b>
            </text>

            <br />

            <text>
                <b>결과가 나올때까지 좀 더 기다려 주시기 바랍니다.</b>
            </text>
        </div>
    )
}