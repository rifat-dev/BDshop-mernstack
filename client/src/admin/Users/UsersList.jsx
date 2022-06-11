import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import "./User.css";

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
      <div className=" p-5 ">
        <table class="table table-theme">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">User name</th>
              <th scope="col">Id</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index}</th>
                <td>{user.name}</td>
                <td>{user._id}</td>
                <td>{user.email}</td>
                <td className="table_roal">
                  <span>{user.roal}</span>
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
