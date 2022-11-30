
export default function CustomListView(props) {

    const { items } = props

    return (
        items.map((text, index) => {
            return <div style={{ paddingLeft: 10, fontSize: 15 }}>
                <li key={index}>
                    <span style={{ fontWeight: "bolder" }}>{text}</span>
                </li>
                <br />
            </div>
        })
    )
}