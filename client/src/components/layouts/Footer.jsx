import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_top_part container">
        <div className="col-md-5 col-lg-6 col-sm-12">
          <form
            action=""
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
            noValidate>
            <div className="search_input subscribe d-flex justify-content-start mt-5">
              <input
                type="email"
                name="EMAIL"
                className="form_control"
                id="mce-EMAIL"
                placeholder="example@gmail.com"
                required
              />
              <button
                className="search_btn"
                type="submit"
                value="Subscribe"
                name="subscribe"
                id="mc-embedded-subscribe">
                Subscribe
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-7 col-lg-6">
          <div className="footer_nav_link_container">
            <div className="col-md-6 col-lg-6 col-sm-12">
              <ul className="footer_top_link">
                <li>
                  <>About online product</>
                </li>
                <li>
                  <>Read our Blog</>
                </li>
                <li>
                  <>Sign up to deliver</>
                </li>
                <li>
                  <>Add your product</>
                </li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-6 col-sm-12">
              <ul className="footer_top_link">
                <li>
                  <>Get help</>
                </li>
                <li>
                  <>Read FAQs</>
                </li>
                <li>
                  <>View all cities</>
                </li>
                <li>
                  <>Shop near me</>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer_bottom_part container">
        <div className="copyright">
          <p>Copyright © 2022 Tajul Islam Rifat</p>
          <h4>Emial : tajul16-447@diu.edu.bd</h4>
        </div>
        <div className="footer_bottom_link">
          <a>Privacy policy</a>
          <a>Terms of use</a>
          <a>Pricing</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
