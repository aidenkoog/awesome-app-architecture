
/**
 * Custom list view component.
 * @param {Any} props 
 * @returns {JSX.Element}
 */
export default function CustomListView(props) {

    const { items } = props

    return (
        items.map((text, index) => {
            return <span
                key={index}
                style={{
                    fontWeight: 'bold',
                    fontSize: 27,
                }}>
                {text}
            </span>
        })
    )
}