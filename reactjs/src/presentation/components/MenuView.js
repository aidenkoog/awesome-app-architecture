import CustomListViewForHistory from '../components/CustomListViewForHistory'

export default function MenuView({ historyList }) {

    return (
        <div className="menu_container">

            <h3>[과거 위치값]</h3>

            <div style={{
                flex: 1, height: '3px',
                backgroundColor: '#084B8A',
                marginTop: 5,
                color: '#084B8A',
                marginBottom: 5
            }} />

            <b style={{ paddingLeft: 10 }}>위치 내역 조회 내용</b>

            <div style={{
                flex: 1, height: '3px',
                backgroundColor: '#084B8A',
                marginTop: 5,
                color: '#084B8A',
                marginBottom: 5
            }} />

            <CustomListViewForHistory items={historyList} />

        </div>
    )
}