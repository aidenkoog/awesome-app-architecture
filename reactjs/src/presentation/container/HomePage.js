import Table from "../components/Table"
import tableData1 from "../../data/dummy/tableData1.json"
import RenderAnotherTable from "../components/RenderAnotherTable"
import { COLUMNS } from "../../utils/Constants"

const HomePage = () => {
    return (
        <div className="table_container">
            <h1>DEV Testing... Sortable Table UI by Aiden Koo</h1>
            <Table
                caption="(DEV) Testing... Sortable Table"
                data={tableData1}
                columns={COLUMNS}
            />
            <br />
            <RenderAnotherTable />
            <br />
        </div>
    )
}

export default HomePage