
/**
 * Custom list for history view component.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
export default function CustomListViewForHistory(props) {

    const { items } = props

    return (
        items.map((text, index) => {
            return <div key={index} style={{ paddingLeft: 10, fontSize: 15, marginTop: 20 }}>
                <li key={index}>
                    <span key={index} style={{ fontWeight: "bolder" }}>{text}</span>
                </li>
                <br />
            </div>
        })
    )
}