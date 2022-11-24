import TableComponent from "../components/TableComponent"


/**
 * home page component.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
export default function HomeComponent(props) {

    /**
     * props delivered from home page container.
     */
    const { onPressCopyLink, onPressCollectData, activities } = props

    return (
        <div className="root_container">
            <div className="header_container">
                <div className="header_title">
                    <h1>데이터 수집 정보</h1>
                </div>
                <div className="header_button">
                    <div>
                        <button className="header_button_item" onClick={onPressCopyLink}>주소 복사</button>
                    </div>
                    <div>
                        <button className="header_button_item" onClick={onPressCollectData}>데이터 수집</button>
                    </div>
                </div>
            </div>
            <div className="menu_container">
                <h1 className="menu_title">수집 데이터 정보</h1>
                <b>테스트 필드</b><br /><br />
                <li>이벤트 타입</li><br />
                <li>출처</li><br />
                <li>위도</li><br />
                <li>경도</li><br />
                <li>고도</li><br />
                <li>배터리</li><br />
                <li>위치</li><br />
                <li>탈착 유무</li><br />
                <li>대기 상태</li><br />
                <li>상태</li><br />
                <li>소요 시간</li><br />
                <li>측정 시작 시간</li><br />
                <li>생성된 시간</li><br />

            </div>
            <div className="table_container">
                <h1>데이터 수집 정보 테이블</h1>
                <TableComponent
                    activities={activities}
                />
            </div>
            <div className="footer_container">
                <b>© io.aidenkoog.com, Inc. All rights reserved.</b><br />
                Page development and data processing were carried out by <b>AidenKooG</b><br />
                <b>08725,</b> 80, Seonghyeon-ro, Gwanak-gu, Seoul, Republic of Korea	<br />
            </div>
        </div>
    )
}
