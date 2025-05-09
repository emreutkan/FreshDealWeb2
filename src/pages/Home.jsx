import slider1 from "../images/slide-1.jpg";
import abouticon from "../images/about-icons-1.svg";
import slider2 from "../images/slider-2.jpg";

import map from "../images/map.png";
import iphone from "../images/iphone-2.png";
import googleplay from "../images/googleplay-btn.svg";
import appstore from "../images/appstore-btn.svg";

import clock from "../images/clock.svg";
import gift from "../images/gift.svg";
import package1 from "../images/package.svg";
import refresh from "../images/refresh-cw.svg";

import { Link } from "react-router";
import React, { useState } from "react";
import Slider from "react-slick";
import { Slide, Zoom } from "react-awesome-reveal";
import { useEffect } from "react";
import { MagnifyingGlass } from "react-loader-spinner";

function Home() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    const settings1 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        autoplay: true,
        autoplaySpeed: 2000,
    }
    const settings2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        autoplay: true,
        autoplaySpeed: 2000,
    };
    // loading
    const [loaderStatus, setLoaderStatus] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoaderStatus(false);
        }, 1500);
    }, []);

    return (
        <div>
            <div>
                {loaderStatus ? (
                    <div className="loader-container">
                        <MagnifyingGlass
                            visible={true}
                            height="100"
                            width="100"
                            ariaLabel="magnifying-glass-loading"
                            wrapperStyle={{}}
                            wrapperclassName="magnifying-glass-wrapper"
                            glassColor="#c0efff"
                            color="#0aad0a"
                        />
                    </div>
                ) : (
                    <>
                        <>
                            <div className="scroll-to-top">
                                <button
                                    onClick={scrollToTop}
                                    className={`scroll-to-top-button ${isVisible ? "show" : ""}`}
                                >
                                    ↑
                                </button>
                            </div>
                            <section className="hero-section">
                                <div className="container mt-8">
                                    <div
                                        id="carouselExampleFade"
                                        className="carousel slide carousel-fade"
                                        data-bs-ride="carousel"
                                    >
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <div
                                                    style={{
                                                        background: `url(${slider1}) no-repeat`,
                                                        backgroundSize: "cover",
                                                        borderRadius: ".5rem",
                                                        backgroundPosition: "center",
                                                    }}
                                                >
                                                    <div
                                                        className="ps-lg-12 py-lg-16 col-xxl-5 col-md-7 py-14 px-8 text-xs-center">
                                                        <span className="badge text-bg-warning">
                                                            Opening Sale Discount 50%
                                                        </span>
                                                        <h2 className="text-dark display-5 fw-bold mt-4">
                                                            SuperMarket Daily <br/> Fresh Grocery
                                                        </h2>
                                                        <p className="lead">
                                                            Introduced a new model for online grocery shopping
                                                            and convenient home delivery.
                                                        </p>
                                                        <Link to="#!" className="btn btn-dark mt-3">
                                                            Shop Now{" "}
                                                            <i className="feather-icon icon-arrow-right ms-1" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <div
                                                    style={{
                                                        background: `url(${slider2}) no-repeat`,
                                                        backgroundSize: "cover",
                                                        borderRadius: ".5rem",
                                                        backgroundPosition: "center",
                                                    }}
                                                >
                                                    <div
                                                        className="ps-lg-12 py-lg-16 col-xxl-5 col-md-7 py-14 px-8 text-xs-center">
                                                        <span className="badge text-bg-warning">
                                                            Free Shipping - orders over $100
                                                        </span>
                                                        <h2 className="text-dark display-5 fw-bold mt-4">
                                                            Free Shipping on <br/> orders over{" "}
                                                            <span className="text-primary">$100</span>
                                                        </h2>
                                                        <p className="lead">
                                                            Free Shipping to First-Time Customers Only, After
                                                            promotions and discounts are applied.
                                                        </p>
                                                        <Link to="#!" className="btn btn-dark mt-3">
                                                            Shop Now{" "}
                                                            <i className="feather-icon icon-arrow-right ms-1"/>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Link
                                            className="carousel-control-prev"
                                            to="#carouselExampleFade"
                                            role="button"
                                            data-bs-slide="prev"
                                        >
                                            <span
                                                className="carousel-control-prev-icon"
                                                aria-hidden="true"
                                            />
                                            <span className="visually-hidden">Previous</span>
                                        </Link>
                                        <Link
                                            className="carousel-control-next"
                                            to="#carouselExampleFade"
                                            role="button"
                                            data-bs-slide="next"
                                        >
                                            <span
                                                className="carousel-control-next-icon"
                                                aria-hidden="true"
                                            />
                                            <span className="visually-hidden">Next</span>
                                        </Link>
                                    </div>
                                </div>
                            </section>
                        </>
                        <>
                            <section className="mt-8">
                                <div className="container ">
                                    <div className="row">
                                        <Slide direction="down">
                                            <div className="col-12">
                                                <div className="bg-light d-lg-flex justify-content-between align-items-center py-6 py-lg-3 px-8 rounded-3 text-center text-lg-start">
                                                    <div className="d-lg-flex align-items-center">
                                                        <img
                                                            src={abouticon}
                                                            alt="about-icon"
                                                            className="img-fluid"
                                                        />
                                                        <div className="ms-lg-4">
                                                            <h1 className="fs-2 mb-1">
                                                                Welcome to FreshDeal
                                                            </h1>

                                                        </div>
                                                    </div>
                                                    <div className="mt-3 mt-lg-0">
                                                        <Link to="#" className="btn btn-dark">
                                                            Download FreshDeal App
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Slide>
                                    </div>
                                </div>
                            </section>
                        </>


                        <>
                            <section>
                                <div
                                    className="container"
                                    style={{
                                        background: `url(${map})no-repeat`,
                                        backgroundSize: "cover",
                                    }}
                                >
                                    <div className="row align-items-center text-center justify-content-center">
                                        <div className=" col-lg-6 col-md-6 fade-in-left">
                                            <Slide direction="left">
                                                <div className="mb-6">
                                                    <div className="mb-7">
                                                        <h1>Get the FreshDeal app</h1>
                                                        <h5 className="mb-0">

                                                        </h5>
                                                    </div>
                                                    <div>
                                                        <ul className="list-inline mb-0 mt-2 ">
                                                            <li className="list-inline-item">
                                                                <Link to="#!">
                                                                    {" "}
                                                                    <img
                                                                        src={appstore}
                                                                        alt="appstore"
                                                                        style={{width: 140}}
                                                                    />
                                                                </Link>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <Link to="#!">
                                                                    {" "}
                                                                    <img
                                                                        src={googleplay}
                                                                        alt="googleplay"
                                                                        style={{width: 140}}
                                                                    />
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </Slide>
                                        </div>
                                        <div className=" offset-lg-2 col-lg-4 col-md-6 fade-zoom">
                                            <Slide direction="right">
                                                <div className="text-lg-start">
                                                    <img
                                                        src={iphone}
                                                        alt="iphone"
                                                        className=" img-fluid"
                                                    />
                                                </div>
                                            </Slide>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </>
                        <>
                            <section className="my-lg-14 my-8">
                                <div className="container" style={{ marginTop: 50 }}>
                                    <div
                                        className="row justify-content-center  g-4"
                                        style={{textAlign: "center"}}
                                    >
                                        <div className="col-md-3 col-sm-6 fade-zoom ">
                                            <Zoom>
                                                <div className="shadow-effect">
                                                    <div
                                                        className="wt-icon-box-wraper center p-a25 p-b50 m-b30 bdr-1 bdr-gray bdr-solid corner-radius step-icon-box bg-white v-icon-effect">
                                                        <div className="icon-lg m-b20">
                                                            <div className="mb-6">
                                                                <img src={refresh} alt="refresh"/>
                                                            </div>
                                                        </div>
                                                        <div className="icon-content">
                                                            <h3 className="h5 mb-3">Easy Returns</h3>
                                                            <p>
                                                                Not satisfied with a product? Return it at the
                                                                doorstep &amp; get a refund within hours. No
                                                                questions asked
                                                                <Link to="#!">policy</Link>.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Zoom>
                                        </div>
                                        <div className="col-md-3 col-sm-12 fade-zoom">
                                            <Zoom>
                                                <div className="shadow-effect">
                                                    <div
                                                        className="wt-icon-box-wraper center p-a25 p-b50 m-b30 bdr-1 bdr-gray bdr-solid corner-radius step-icon-box bg-white v-icon-effect">
                                                        <div className="icon-lg m-b20">
                                                            <div className="mb-6">
                                                                <img src={package1} alt="package"/>
                                                            </div>
                                                        </div>
                                                        <div className="icon-content">
                                                            <h3 className="h5 mb-3">Wide Assortment</h3>
                                                            <p>
                                                                Choose from 5000+ products across food, personal
                                                                care, household, bakery, veg and non-veg &amp;
                                                                other categories.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Zoom>
                                        </div>
                                        <div className="col-md-3 col-sm-12 fade-zoom">
                                            <Zoom>
                                                <div className="shadow-effect">
                                                    <div
                                                        className="wt-icon-box-wraper center p-a25 p-b50 m-b30 bdr-1 bdr-gray bdr-solid corner-radius step-icon-box bg-white v-icon-effect">
                                                        <div className="icon-lg m-b20">
                                                            <div className="mb-6">
                                                                <img src={gift} alt="gift"/>
                                                            </div>
                                                        </div>
                                                        <div className="icon-content">
                                                            <h3 className="h5 mb-3">
                                                                Best Prices &amp; Offers
                                                            </h3>
                                                            <p>
                                                                Cheaper prices than your local supermarket,
                                                                great cashback offers to top it off. Get best
                                                                pricess &amp; offers.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Zoom>
                                        </div>
                                        <div className="col-md-3 col-sm-12 fade-zoom">
                                            <Zoom>
                                                <div className="shadow-effect">
                                                    <div
                                                        className="wt-icon-box-wraper center p-a25 p-b50 m-b30 bdr-1 bdr-gray bdr-solid corner-radius step-icon-box bg-white v-icon-effect">
                                                        <div className="icon-lg m-b20">
                                                            <div className="mb-6">
                                                                <img src={clock} alt="clock"/>
                                                            </div>
                                                        </div>
                                                        <div className="icon-content">
                                                            <h3 className="h5 mb-3">10 minute grocery now</h3>
                                                            <p>
                                                                Get your order delivered to your doorstep at the
                                                                earliest from FreshCart pickup
                                                                 stores near you.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Zoom>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </>

                    </>
                )}
            </div>
        </div>
    )
}

export default Home;