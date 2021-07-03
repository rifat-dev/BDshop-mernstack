import { Link } from 'react-router-dom'

import img from '../../assets/404.svg'

const NotFound = () => {
    return (
        <div style={{
            height: '100vh',
            display: ' flex',
            justifyContent: 'center',
            alignItems: 'center'
        }} >

            <div className="notFound text-center">
                {/* <Link to='/' >
                    <button className="my_btn" >Back To Home</button>
                </Link> */}
                <img src={img} style={{ width: '100%' }} alt="404 Not Found" />
            </div>

        </div >
    );
}

export default NotFound;
