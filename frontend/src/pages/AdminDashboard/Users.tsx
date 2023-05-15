import React, { useCallback, useState } from "react";
import DataTable from "react-data-table-component";
import Nav from "../../components/Nav";
import { IconUsers } from "@tabler/icons-react";
import RouteSetter from "./RouteSetter";

const columns = [
  {
    name: "ID",
    selector: (row: any) => row.id,
    sortable: true,
  },
  {
    name: "Title",
    selector: (row: any) => row.title,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row: any) => row.email,
    sortable: true,
  },
  {
    name: "Role",
    selector: (row: any) => row.role,
    sortable: true,
  },
];


const data = [
  {
    id: 1,
    title: "Beetlejuice",
    email: "sawissac@gmail.com",
    role: "admin"
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
    email: "zayartunjob@gmail.com",
    role: "admin"
  },
];

const customStyles = {
  rows: {
      style: {
          minHeight: '72px', // override the row height
      },
  },
  headCells: {
      style: {
          paddingLeft: '8px', // override the cell padding for head cells
          paddingRight: '8px',
      },
  },
  cells: {
      style: {
          paddingLeft: '8px', // override the cell padding for data cells
          paddingRight: '8px',
      },
  },
};

const Users = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleChange = useCallback((state:any) => {
		setSelectedRows(state.selectedRows);
	}, []);

  return (
    <div className="admin-container">
      <RouteSetter routeName="/admin-dashboard/users" />
      <Nav
        icon={<IconUsers />}
        label={"Tickets"}
      />
      <div className="admin-container__inner">
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          onSelectedRowsChange={handleChange}
          responsive
          pagination
          // selectableRows
          // selectableRowsSingle
          // selectableRowsNoSelectAll
        />
      </div>
    </div>
  );
};

export default Users;
