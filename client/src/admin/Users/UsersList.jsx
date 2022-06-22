import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import "./user.scss";

import UsersListCard from "./UsersListCard";
import MetaData from "../../components/layouts/MetaData";
import Loader from "../../components/layouts/Loader/Loader";

import { getAdminUsers, clearError } from "../../store/actions/adminActions";

const UsersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { users, loading, error } = useSelector((state) => state.adminAllUsers);

  useEffect(() => {
    dispatch(getAdminUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch, alert]);

  return (
    <>
      <MetaData title={"User List - BDshop"} />
      <div className="user-list " id="user-list">
        <div className="user-list-top">
          <h4>Users List</h4>
        </div>
        <table class="table shadow-sm">
          <thead className="table-head">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">User name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {users.map((user, index) => (
              <tr key={index}>
                <th scope="row">{user._id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={user.roal === "admin" ? "admin" : "user"}>
                    {user.roal}
                  </span>
                </td>
                <td className="table_action">
                  <i class="bi bi-trash-fill"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersList;
