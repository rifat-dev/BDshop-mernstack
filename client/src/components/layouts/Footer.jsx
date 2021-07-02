import React from 'react';
import './Footer.css';
import logo from '../../assets/2.png'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer_top_part container'>
                <div className="col-md-5 col-lg-6 col-sm-12">
                    <div className='d-flex justify-content-start'>
                        <img className='footerLogo' src={logo} alt="" />
                    </div>
                    <form action="" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
                        <div className='search_input subscribe d-flex justify-content-start mt-5'>
                            <input type="email" name="EMAIL" className="form_control" id="mce-EMAIL" placeholder="example@gmail.com" required />
                            <button className='search_btn' type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" >Subscribe</button>
                        </div>
                    </form>
                </div>
                <div className="col-md-7 col-lg-6">
                    <div className='footer_nav_link_container'>
                        <div className='col-md-6 col-lg-6 col-sm-12'>
                            <ul className='footer_top_link'>
                                <li><a href="#">About online product</a></li>
                                <li><a href="#">Read our Blog</a></li>
                                <li><a href="#">Sign up to deliver</a></li>
                                <li><a href="#">Add your product</a></li>
                            </ul>
                        </div>
                        <div className='col-md-6 col-lg-6 col-sm-12'>
                            <ul className='footer_top_link'>
                                <li><a href="#">Get help</a></li>
                                <li><a href="#">Read FAQs</a></li>
                                <li><a href="#">View all cities</a></li>
                                <li><a href="#">Shop near me</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer_bottom_part container'>
                <div className='copyright'>
                    <p>Copyright © 2020 Tajul Islam Rifat</p>
                    <h4>Emial : tajul16-447@diu.edu.bd</h4>
                </div>
                <div className='footer_bottom_link'>
                    <a href="#">Privacy policy</a>
                    <a href="#">Terms of use</a>
                    <a href="#">Pricing</a>
                </div>
            </div>
        </div>
    );
};

export default Footer;