import { useState, useRef, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import SideNav from "../SideNav/SideNav";
import "../dashbord.scss";

import Dashbord from "./DashBord";
import DashboardNav from "../DashBordNav/DashBordNav";
import Category from "../Category/Category";
import ProductList from "../Product/ProductList";
import NewProduct from "../Product/NewProduct";
import OrderList from "../Order/OrderList";
import UsersList from "../Users/UsersList";
import NotFound from "../../components/layouts/404";

const AdminDashbord = () => {
  const [show, setShow] = useState(true);

  const mainRef = useRef();
  const sideNavRef = useRef();

  useEffect(() => {
    if (show) {
      mainRef.current.style.marginLeft = "180px";
      sideNavRef.current.style.marginLeft = "0px";
    } else {
      mainRef.current.style.marginLeft = "0px";
      sideNavRef.current.style.marginLeft = "-180px";
    }
  }, [show]);

  return (
    <>
      <SideNav sideNavRef={sideNavRef} />
      <div className="main" id="main" ref={mainRef}>
        <DashboardNav setShow={setShow} show={show} />
        <Switch>
          <Route path="/admin" exact>
            <Redirect to="/admin/dashbord" />
          </Route>
          <Route path="/admin/dashbord" component={Dashbord} exact />
          <Route path="/admin/category" component={Category} exact />
          <Route path="/admin/products" component={ProductList} exact />
          <Route path="/admin/newproduct" component={NewProduct} exact />
          <Route path="/admin/orders" component={OrderList} exact />
          <Route path="/admin/users" component={UsersList} exact />
          {/* <Route path="*" component={<NotFound />} exact /> */}
        </Switch>
      </div>
    </>
  );
};

export default AdminDashbord;
