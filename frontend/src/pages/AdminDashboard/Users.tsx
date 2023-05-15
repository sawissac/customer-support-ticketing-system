import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Nav from "../../components/Nav";
import { IconUsers } from "@tabler/icons-react";
import RouteSetter from "./RouteSetter";
import axios from "axios";
import { useQuery } from "react-query";

const columns = [
  {
    name: "ID",
    selector: (row: any) => row.id,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row: any) => row.name,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row: any) => row.email,
    sortable: true,
  },
  {
    name: "Role",
    selector: (row: any) => row.id,
    sortable: true,
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

    const token = "6|rG0SwLeROYrLLbrOWeGoAIZooWBkrAiIVCw02D45";
    const getFacts = async () => {
      const res = await axios
        .get("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          return response.data.data;
        });
        console.log(res)
      return res;
    };
  
    const { data } = useQuery("name", getFacts);

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
