import React from "react";
import {Link} from "react-router";
import "@fortawesome/fontawesome-free/css/all.min.css";
import FreshDealLogo from "../images/FreshDealLogo.png";


function Footer() {
    let date = new Date();
    let year = date.getFullYear();

    return (
        <div>
            <>
                <footer className="footer">
                    <div className="overlay"/>
                    <div className="container">
                        <div className="row footer-row">
                            <div className="">
                                <div className="footer-widget">
                                    <div className="footer-logo">
                                        <Link to="/">
                                            <img
                                                src={FreshDealLogo}
                                                style={{width: 300, padding: 20, marginLeft: "-30px"}}
                                                alt="logo"
                                            />
                                        </Link>
                                    </div>
                                    <p className="mb-30">
                                        We deliver more than your expectations and help you to grow
                                        your business exponentially by providing customized
                                        applications. So, don’t just think, get ready to convert
                                        your ideas into reality.
                                    </p>
                                </div>
                                <div className="dimc-protect">
                                    <div className="col-lg-5 text-lg-start text-center mb-2 mb-lg-0">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bar ">
                        <div className="container text-center">
                            <div className="footer-copy">
                                <div className="copyright">
                                    © {year} FreshDeal
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </>
        </div>
    )
}

export default Footer;