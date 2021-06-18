import React from 'react';
import { Link } from 'react-router-dom'

import './Hader.css'

const Hader = () => {
    return (
        <section>
            <div id="hader">
                <div className="hader_text_box">
                    <h1>Welcome To <span>Most Teusted Online Shop</span></h1>
                    <h3 className='mt-3 mb-3'>Choose Your Favorite One</h3>
                    <h1>Best Products waiting for you</h1><br />
                    <Link to='/register' >
                        <button className="hader_btn">
                            <i className="bi bi-arrow-right-circle-fill mr-1 "></i>
                            Register Now
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Hader;
