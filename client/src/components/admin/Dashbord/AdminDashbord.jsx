import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import SideNav from '../SideNav/SideNav';
import '../dashbord.css'


import Dashbord from './DashBord'
import DashboardNav from '../DashBordNav/DashBordNav'
import ProductList from '../Product/ProductList';

const AdminDashbord = ({ match }) => {
    const { id } = match.params

    const [show, setShow] = useState(false)


    return (
        <div className="row" >
            <SideNav id={id} show={show} />
            <div id="mySidenav" className="container  dashboard_body">
                <DashboardNav show={show} setShow={setShow} match={match} />
                {
                    id === "dashboard" ? <Dashbord /> :
                        id === "products" ? <ProductList /> : ""
                }
            </div>
        </div>
    );
}

export default AdminDashbord;
