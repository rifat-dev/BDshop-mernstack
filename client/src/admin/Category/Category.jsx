import "./category.scss";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import MetaData from "../../components/layouts/MetaData";
import axios from "axios";
import Switch from "@mui/material/Switch";

import CategoryModal from "./CategoryModal";

const columns = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "name", headerName: "Name", width: 300 },
  { field: "description", headerName: "Description", width: 300 },
  {
    field: "active",
    headerName: "Active",
    width: 200,
    renderCell: (params) => {
      // console.log(params);
      return (
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ cursor: "pointer" }}>
          <Switch
            checked={params.row.active.isActive ? true : false}
            onChange={() =>
              params.row.active.updateActive({
                id: params.row.id,
                value: params.row.active.isActive,
              })
            }
          />
        </div>
      );
    },
  },
];

const Category = (props) => {
  const [rows, setRows] = useState([]);
  const [categorys, setCategorys] = useState([]);
  useEffect(() => {
    const getAllCategory = async () => {
      const { data } = await axios.get("/api/category/all");
      console.log(data);
      setCategorys(data.categorys);
    };
    getAllCategory();
  }, []);

  // console.log(categorys);

  const updateActive = ({ id, value }) => {
    console.log(`id ${id}`);
  };

  useEffect(() => {
    categorys.map((category, index) => {
      setRows((prev) => [
        ...prev,
        {
          id: category._id,
          name: category.name,
          description: category.description,
          active: {
            isActive: category.isActive,
            updateActive,
          },
        },
      ]);
    });
  }, [categorys]);

  return (
    <>
      <MetaData title={"BDShop Admin - Categorys"} />
      <div className="container-fluid category-container">
        <div className="category-top">
          <h2>Product Categorys</h2>
          <CategoryModal history={props.history}>
            <span>New Category</span>
          </CategoryModal>
        </div>
        <div className="category-table">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            // checkboxSelection
          />
        </div>
      </div>
    </>
  );
};

export default Category;
