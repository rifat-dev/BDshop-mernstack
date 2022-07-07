import "./category.scss";
import { useState, useEffect } from "react";
import MetaData from "../../components/layouts/MetaData";
import axios from "axios";

import CategoryModal from "./CategoryModal";
import IsActive from "./IsActive";
import ShowHome from "./ShowHome";

const Category = () => {
  const [created, setCreated] = useState(false);
  const [categorys, setCategorys] = useState([]);
  useEffect(() => {
    const getAllCategory = async () => {
      const { data } = await axios.get("/api/category/all");
      setCategorys(data.categorys);
    };
    getAllCategory();
  }, [created]);

  return (
    <>
      <MetaData title={"BDShop Admin - Categorys"} />
      <div className="container-fluid category-container">
        <div className="category-top">
          <h2>Product Categorys</h2>
          <CategoryModal setCreated={setCreated}>
            <span>New Category</span>
          </CategoryModal>
        </div>
        <div className="category-table shadow-sm">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">CTG Id</th>
                <th scope="col">Name</th>
                {/* <th scope="col">Description</th> */}
                <th scope="col">Active</th>
                <th scope="col">Show Home</th>
              </tr>
            </thead>
            <tbody>
              {categorys.map((ctg, key) => (
                <tr key={key}>
                  <th scope="row">{ctg._id}</th>
                  <td>{ctg.name}</td>
                  {/* <td>{ctg.description}</td> */}
                  <td>
                    {" "}
                    <IsActive id={ctg._id} value={ctg.isActive} />{" "}
                  </td>
                  <td>
                    {" "}
                    <ShowHome id={ctg._id} value={ctg.showHome} />{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Category;
