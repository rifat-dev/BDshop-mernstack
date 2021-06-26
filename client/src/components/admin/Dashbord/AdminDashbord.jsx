import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import SideNav from '../SideNav/SideNav';
import '../dashbord.css'


import Dashbord from './DashBord'
import DashboardNav from '../DashBordNav/DashBordNav'
import ProductList from '../Product/ProductList';
import NewProduct from '../Product/NewProduct'
import OrderList from '../Order/OrderList'

const AdminDashbord = ({ match, history }) => {
    const { id } = match.params

    const [show, setShow] = useState(false)


    return (
        <div className="row" >
            <SideNav id={id} show={show} />
            <div id="mySidenav" className="container  dashboard_body">
                <DashboardNav show={show} setShow={setShow} match={match} />
                {
                    id === "dashboard" ? <Dashbord /> :
                        id === "products" ? <ProductList history={history} /> :
                            id === 'newproduct' ? <NewProduct history={history} /> :
                                id === "orders" ? <OrderList /> : ""
                }
            </div>
        </div>
    );
}

export default AdminDashbord;
