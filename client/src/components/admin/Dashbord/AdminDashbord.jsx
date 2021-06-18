import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import SideNav from '../SideNav/SideNav';
import '../dashbord.css'


import Dashbord from './DashBord'
import ProductList from '../Product/ProductList';

const AdminDashbord = ({ match }) => {
    const { id } = match.params


    return (
        <div className="row" >
            <SideNav id={id} />
            <div className="container">
                {
                    id === "dashboard" ? <Dashbord /> :
                        id === "products" ? <ProductList /> : ""
                }
            </div>
        </div>
    );
}

export default AdminDashbord;
