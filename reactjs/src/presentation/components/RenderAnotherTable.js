import Table from "./Table";
import tableData2 from "../../data/dummy/tableData2.json";

const columns = [
  { label: "Name", accessor: "name", sortable: true },
  { label: "Country", accessor: "country", sortable: true },
  { label: "GitHub username", accessor: "github_username", sortable: true },
  { label: "Course price", accessor: "money", sortable: true },
];

const RenderAnotherTable = () => {
  return (
    <>
      <Table
        caption="Second DEV Table UI"
        data={tableData2}
        columns={columns}
      />
    </>
  );
};

export default RenderAnotherTable;
