import React, { useState, useContext, useEffect } from "react";
import FreshDealLogo from "../images/FreshDealLogo.png";
import menubanner from "../images/menu-banner.jpg";
import { Link } from "react-router";
import { Field, Form, Formik } from 'formik';
import LoginInput from "@src/CustomInputs/LoginInput.jsx";
import RegisterInput from "@src/CustomInputs/RegisterInput.jsx";
import { registerSchema, loginSchema } from '@src/schemas/index.js';
import axios from 'axios';
import AuthContext from '@src/context/AuthContext.jsx';
import CartContext from "@src/context/CartContext";
import GlobalResetContext from "@src/context/GlobalResetContext";

const Header = () => {
    const { login, authToken } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [popupType, setPopupType] = useState('signup');
    const [loginOption, setLoginOption] = useState("email");
    const [cartItems, setCartItems] = useState([]);
    const { cartRestaurantId, setCartRestaurantId, addToCart, removeFromCart } = useContext(CartContext);
    const { globalReset } = useContext(GlobalResetContext);
    const [matchedDetails, setMatchedDetails] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchListings = async () => {
            if (!cartRestaurantId) return;

            try {
                const response = await axios.get(
                    `https://freshdealbackend.azurewebsites.net/v1/listings?restaurant_id=${cartRestaurantId}&page=1&per_page=10`
                );

                const listingsData = response.data.data;

                const matchedDetails = cartItems.map(cartItem => {
                    const match = listingsData.find(listing => listing.id === cartItem.listing_id);
                    return match
                        ? {
                            cartItemId: cartItem.id,
                            listingId: match.id,
                            image_url: match.image_url,
                            description: match.description,
                            pick_up_price: match.pick_up_price
                        }
                        : null;
                }).filter(Boolean);

                setMatchedDetails(matchedDetails);
            } catch (error) {
                console.error(error);
            }
        };

        fetchListings();
    }, [cartRestaurantId, cartItems]);


    const getCartItems = async () => {
        const response = await axios.get("https://freshdealbackend.azurewebsites.net/v1/cart"
            , {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                }
            })
        setCartItems(response.data.cart)
    }

    useEffect(() => {
        getCartItems();
    }, [globalReset]);

    const userLogin = async (email, phone_number, password, login_type, password_login) => {
        const response = await axios.post("https://freshdealbackend.azurewebsites.net/v1/login", {
            email,
            phone_number,
            password,
            login_type,
            password_login,
        });
        //console.log(response);
        if (response.data.success === true) login(response.data.token);
    }

    const userRegister = async (email, name_surname, password, phone_number, role) => {
        const response = await axios.post("https://freshdealbackend.azurewebsites.net/v1/register", {
            email,
            name_surname,
            password,
            phone_number,
            role,
        });
        //console.log(response.data)
        return response.data.message;
    }

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <>
                <div className="border-bottom pb-5">
                    <div className="bg-light py-1">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-10 col-12 d-flex " style={{ alignItems: 'center' }}>
                                    <span> Super Value Deals - Save more with coupons</span>
                                </div>
                                <div className="col-md-2 col-xxl-1 text-end d-none d-lg-block" style={{ marginLeft: '20px' }}>
                                    <div className="list-inline">

                                        <div className="list-inline-item">
                                            <Link
                                                to={authToken ? "/MyAccountSetting" : "#!"}
                                                className="text-muted"

                                                {...(!authToken && {
                                                    "data-bs-toggle": "modal",
                                                    "data-bs-target": "#userModal",
                                                })}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={20}
                                                    height={20}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-user"
                                                >
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                    <circle cx={12} cy={7} r={4} />
                                                </svg>
                                            </Link>
                                        </div>
                                        {authToken && (
                                            <div className="list-inline-item">
                                                <Link
                                                    className="text-muted position-relative "
                                                    data-bs-toggle="offcanvas"
                                                    data-bs-target="#offcanvasRight"
                                                    to="#offcanvasExample"
                                                    role="button"
                                                    aria-controls="offcanvasRight"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={20}
                                                        height={20}
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="feather feather-shopping-bag"
                                                    >
                                                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                                        <line x1={3} y1={6} x2={21} y2={6} />
                                                        <path d="M16 10a4 4 0 0 1-8 0" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            <nav className="navbar navbar-expand-lg navbar-light sticky-top">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img
                            src={FreshDealLogo}
                            style={{ width: 120, margin: 10, marginLeft: "-15px" }}
                            alt="eCommerce HTML Template"
                        />
                    </Link>

                </div>
            </nav >
            <>
                <div>
                    {/* Modal */}

                    {authToken ? (
                        <div>

                        </div>
                    ) : (
                        <div
                            className="modal fade"
                            id="userModal"
                            tabIndex={-1}
                            aria-labelledby="userModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog modal-dialog-centered">
                                {popupType === "signup" ? (
                                    <div className="modal-content p-4">
                                        <div className="modal-header border-0">
                                            <h5 className="modal-title fs-3 fw-bold" id="userModalLabel">
                                                Sign Up
                                            </h5>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            />
                                        </div>
                                        <div className="modal-body">
                                            <Formik
                                                initialValues={{
                                                    registerFirstName: '',
                                                    registerLastName: '',
                                                    registerEmail: '',
                                                    registerCountryCode: '+1',
                                                    registerPhone: '',
                                                    registerPassword: '',
                                                    registerConfirmPassword: ''
                                                }}
                                                onSubmit={(values, actions) => {
                                                    userRegister(values.registerEmail, `${values.registerFirstName} ${values.registerLastName}`, values.registerPassword, `${values.registerCountryCode}${values.registerPhone}`, "customer") // will change in future versions
                                                        .then((response) => {
                                                            console.log(response)
                                                            actions.setSubmitting(false)
                                                            actions.resetForm();
                                                        }).catch((response) => { console.log(response); actions.setSubmitting(false); })
                                                }}
                                                validationSchema={registerSchema}
                                            >
                                                {({ isSubmitting }) => (
                                                    <Form>
                                                        <div className="row g-3">
                                                            <div className="col">
                                                                <RegisterInput
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="registerFirstName"
                                                                    name="registerFirstName"
                                                                    placeholder="First name"
                                                                    aria-label="First name"
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="col">
                                                                <RegisterInput
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="registerLastName"
                                                                    name="registerLastName"
                                                                    placeholder="Last name"
                                                                    aria-label="Last name"
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="col-12">
                                                                <RegisterInput
                                                                    type="email"
                                                                    className="form-control"
                                                                    id="registerEmail"
                                                                    name="registerEmail"
                                                                    placeholder="E-mail"
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="col-12">
                                                                <Field id="registerCountryCode" name="registerCountryCode">
                                                                    {({ field, form }) => {

                                                                        const handleSelect = (value) => {
                                                                            form.setFieldValue("registerCountryCode", value);
                                                                        };

                                                                        return (
                                                                            <div>
                                                                                <div className="dmenu dropdown">
                                                                                    <Link
                                                                                        className="nav-link dropdown-toggle"
                                                                                        onClick={() => event.preventDefault()}
                                                                                        id="countryCodeDropdown"
                                                                                        role="button"
                                                                                        data-toggle="dropdown"
                                                                                        aria-haspopup="true"
                                                                                        aria-expanded="false"
                                                                                    >
                                                                                        {field.value}
                                                                                    </Link>
                                                                                    <ul
                                                                                        className="dropdown-menu sm-menu"
                                                                                        aria-labelledby="countryCodeDropdown"
                                                                                    >
                                                                                        <li className="dropdown-item"
                                                                                            onClick={() => handleSelect("+1")}>
                                                                                            +1
                                                                                        </li>
                                                                                        <li className="dropdown-item"
                                                                                            onClick={() => handleSelect("+90")}>
                                                                                            +90
                                                                                        </li>
                                                                                        <li className="dropdown-item"
                                                                                            onClick={() => handleSelect("+44")}>
                                                                                            +44
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    }}
                                                                </Field>
                                                                <RegisterInput
                                                                    type="tel"
                                                                    className="form-control"
                                                                    id="registerPhone"
                                                                    name="registerPhone"
                                                                    placeholder="Mobile Phone"
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="col-12">
                                                                <RegisterInput
                                                                    type="password"
                                                                    className="form-control"
                                                                    id="registerPassword"
                                                                    name="registerPassword"
                                                                    placeholder="Password"
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="col-12">
                                                                <RegisterInput
                                                                    type="password"
                                                                    className="form-control"
                                                                    id="registerConfirmPassword"
                                                                    name="registerConfirmPassword"
                                                                    placeholder="Confirm Password"
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="col-12 d-grid">
                                                                {" "}
                                                                <button disabled={isSubmitting} type="submit" className="btn btn-primary">
                                                                    Sign Up
                                                                </button>
                                                            </div>
                                                            <p>
                                                                <small className="form-text">
                                                                    By signing up, you agree to our{" "}
                                                                    <Link to="#!">Terms of Service</Link> &amp;{" "}
                                                                    <Link to="#!">Privacy Policy</Link>
                                                                </small>
                                                            </p>
                                                        </div>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>
                                        <div className="modal-footer border-0 justify-content-center">
                                            Already have an account? <Link onClick={() => {
                                                event.preventDefault();
                                                setPopupType("signin");
                                            }}>Sign in</Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="modal-content p-4">
                                        <div className="modal-header border-0">
                                            <h5 className="modal-title fs-3 fw-bold" id="userModalLabel">
                                                Sign In
                                            </h5>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            />
                                        </div>
                                        <div className="modal-body">
                                            <div style={{
                                                textAlign: "center",
                                                marginBottom: "10px",
                                            }}>
                                                <button onClick={() => setLoginOption("email")} style={{
                                                    marginRight: "10px",
                                                    padding: "10px",
                                                    backgroundColor: loginOption === "email" ? "#099309" : "#f0f0f0",
                                                    color: loginOption === "email" ? "white" : "black",
                                                    border: "none",
                                                    borderRadius: "5px",
                                                    cursor: "pointer",
                                                }}>
                                                    Email Login
                                                </button>
                                                <button onClick={() => setLoginOption("phone_number")} style={{
                                                    padding: "10px",
                                                    backgroundColor: loginOption === "phone_number" ? "#099309" : "#f0f0f0",
                                                    color: loginOption === "phone_number" ? "white" : "black",
                                                    border: "none",
                                                    borderRadius: "5px",
                                                    cursor: "pointer",
                                                }}>
                                                    Phone Login
                                                </button>
                                            </div>
                                            <Formik
                                                initialValues={{
                                                    email: "",
                                                    countryCode: '+1',
                                                    phone: "",
                                                    password: "",
                                                }}
                                                onSubmit={(values, actions) => {
                                                    if (loginOption === "email") {
                                                        userLogin(values.email, '', values.password, loginOption, true) // will change in future versions
                                                            .then(() => {
                                                                localStorage.getItem("authToken") ? actions.resetForm() : actions.setFieldValue("password", "");
                                                                actions.setSubmitting(false)
                                                            })
                                                            .catch(() => { actions.setFieldValue("password", ""); actions.setSubmitting(false); })
                                                    } else {
                                                        userLogin('', `${values.countryCode}${values.phone}`, values.password, loginOption, true) // will change in future versions
                                                            .then(() => {
                                                                localStorage.getItem("authToken") ? actions.resetForm() : actions.setFieldValue("password", "");
                                                                actions.setSubmitting(false)
                                                            })
                                                            .catch(() => { actions.setFieldValue("password", ""); actions.setSubmitting(false); })
                                                    }
                                                }}
                                                validationSchema={loginSchema}
                                            >
                                                {({ isSubmitting }) => (
                                                    <Form>
                                                        <div className="row g-3">
                                                            <div className="col-12">
                                                                {loginOption === "email" ? (
                                                                    <LoginInput
                                                                        id="email"
                                                                        name="email"
                                                                        type="email"
                                                                        className="form-control"
                                                                        placeholder="E-mail"
                                                                        required
                                                                    />
                                                                ) : (
                                                                    <>
                                                                        <Field id="countryCode" name="countryCode">
                                                                            {({ field, form }) => {

                                                                                const handleSelect = (value) => {
                                                                                    form.setFieldValue("countryCode", value);
                                                                                };

                                                                                return (
                                                                                    <div>
                                                                                        <div className="dmenu dropdown">
                                                                                            <Link
                                                                                                className="nav-link dropdown-toggle"
                                                                                                onClick={() => event.preventDefault()}
                                                                                                id="countryCodeDropdown"
                                                                                                role="button"
                                                                                                data-toggle="dropdown"
                                                                                                aria-haspopup="true"
                                                                                                aria-expanded="false"
                                                                                            >
                                                                                                {field.value}
                                                                                            </Link>
                                                                                            <ul
                                                                                                className="dropdown-menu sm-menu"
                                                                                                aria-labelledby="countryCodeDropdown"
                                                                                            >
                                                                                                <li className="dropdown-item"
                                                                                                    onClick={() => handleSelect("+1")}>
                                                                                                    +1
                                                                                                </li>
                                                                                                <li className="dropdown-item"
                                                                                                    onClick={() => handleSelect("+90")}>
                                                                                                    +90
                                                                                                </li>
                                                                                                <li className="dropdown-item"
                                                                                                    onClick={() => handleSelect("+44")}>
                                                                                                    +44
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                            }}
                                                                        </Field>
                                                                        <LoginInput
                                                                            id="phone"
                                                                            name="phone"
                                                                            type="tel"
                                                                            className="form-control"
                                                                            placeholder="Mobile Phone"
                                                                            required
                                                                        />
                                                                    </>
                                                                )}
                                                            </div>
                                                            <div className="col-12">
                                                                <LoginInput
                                                                    id="password"
                                                                    name="password"
                                                                    type="password"
                                                                    className="form-control"
                                                                    placeholder="Password"
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="d-flex justify-content-between">
                                                                <div className="form-check">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        defaultValue
                                                                        id="flexCheckDefault"
                                                                    />
                                                                    {" "}
                                                                    <label
                                                                        className="form-check-label"
                                                                        htmlFor="flexCheckDefault"
                                                                    >
                                                                        Remember me
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    {" "}
                                                                    Forgot password?{" "}
                                                                    <Link to="/MyAccountForgetPassword">Reset it</Link>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 d-grid">
                                                                {" "}
                                                                <button disabled={isSubmitting} type='submit' className="btn btn-primary">
                                                                    {loginOption === "email" ? "Continue with e-mail" : "Continue with phone number"}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>
                                        <div className="modal-footer border-0 justify-content-center">
                                            Don’t have an account? <Link onClick={() => {
                                                event.preventDefault();
                                                setPopupType("signup");
                                            }}>Sign up</Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Shop Cart */}
                    <div
                        className="offcanvas offcanvas-end"
                        tabIndex={-1}
                        id="offcanvasRight"
                        aria-labelledby="offcanvasRightLabel"
                    >
                        <div className="offcanvas-header border-bottom">
                            <div className="text-start">
                                <h5 id="offcanvasRightLabel" className="mb-0 fs-4">
                                    Shop Cart
                                </h5>
                            </div>
                            <button
                                type="button"
                                className="btn-close text-reset"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            />
                        </div>
                        <div className="offcanvas-body">
                            {cartItems.length === 0 ? (
                                <p>Your Cart is Empty.</p>
                            ) : (
                                <div>
                                    <div className="py-3">
                                        <ul className="list-group list-group-flush">
                                            {
                                                cartItems.map((item, index) => {

                                                    const isFirst = index === 0;
                                                    const isLast = index === cartItems.length - 1;

                                                    const itemClass = `list-group-item py-3 py-lg-0 px-0 ${isFirst ? "border-top" : isLast ? "border-bottom" : ""}`;
                                                    const matchedItem = matchedDetails.find(matched => String(matched.listingId) === String(item.listing_id));

                                                    item.pick_up_price = matchedItem?.pick_up_price
                                                    item.image_url = matchedItem?.image_url
                                                    item.description = matchedItem?.description

                                                    return (
                                                        <li key={item.id} className={itemClass}>
                                                            <div className="row row align-items-center">
                                                                <div className="col-2">
                                                                    <img
                                                                        src={matchedItem?.image_url}
                                                                        alt={item.title}
                                                                        className="img-fluid"
                                                                    />
                                                                </div>
                                                                <div className="col-5">
                                                                    <h6 className="mb-0">{item.title}</h6>
                                                                    <span>
                                                                        <small className="text-muted">{matchedItem?.description}</small>
                                                                    </span>
                                                                    <div className="mt-2 small">
                                                                        {" "}
                                                                        <Link onClick={async () => {
                                                                            await removeFromCart(item.listing_id)
                                                                            globalReset()
                                                                        }} className="text-decoration-none">
                                                                            {" "}
                                                                            <span className="me-1">
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width={16}
                                                                                    height={16}
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth={2}
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="feather feather-trash-2"
                                                                                >
                                                                                    <polyline points="3 6 5 6 21 6" />
                                                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                                                    <line x1={10} y1={11} x2={10} y2={17} />
                                                                                    <line x1={14} y1={11} x2={14} y2={17} />
                                                                                </svg>
                                                                            </span>
                                                                            Remove
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <div className="input-group  flex-nowrap justify-content-center  ">
                                                                        <input
                                                                            type="button"
                                                                            defaultValue="-"
                                                                            className="button-minus form-control  text-center flex-xl-none w-xl-30 w-xxl-10 px-0  "
                                                                            data-field="quantity"
                                                                            onClick={async () => {
                                                                                const input = document.getElementById(item.listing_id);

                                                                                if (parseInt(input.value) - 1 === 0) {
                                                                                    await removeFromCart(item.listing_id)
                                                                                    globalReset()
                                                                                    return
                                                                                }

                                                                                axios.put("https://freshdealbackend.azurewebsites.net/v1/cart", {
                                                                                    count: parseInt(input.value) - 1,
                                                                                    listing_id: item.listing_id
                                                                                }, {
                                                                                    headers: {
                                                                                        'Content-Type': 'application/json',
                                                                                        Authorization: `Bearer ${authToken}`,
                                                                                    }
                                                                                }).then(() => {
                                                                                    input.value = parseInt(input.value) - 1
                                                                                }).catch((res) => {
                                                                                    setErrorMessage(res.response.data.message);
                                                                                    setTimeout(() => setErrorMessage(""), 4000);
                                                                                });
                                                                            }}
                                                                        />
                                                                        <input
                                                                            type="number"
                                                                            step={1}
                                                                            id={item.listing_id}
                                                                            value={item.count}
                                                                            name="quantity"
                                                                            className="quantity-field form-control text-center flex-xl-none w-xl-30 w-xxl-10 px-0 "
                                                                        />
                                                                        <input
                                                                            type="button"
                                                                            defaultValue="+"
                                                                            className="button-plus form-control  text-center flex-xl-none w-xl-30  w-xxl-10 px-0  "
                                                                            data-field="quantity"
                                                                            onClick={async () => {
                                                                                const input = document.getElementById(item.listing_id);

                                                                                axios.put("https://freshdealbackend.azurewebsites.net/v1/cart", {
                                                                                    count: parseInt(input.value) + 1,
                                                                                    listing_id: item.listing_id
                                                                                }, {
                                                                                    headers: {
                                                                                        'Content-Type': 'application/json',
                                                                                        Authorization: `Bearer ${authToken}`,
                                                                                    }
                                                                                }).then(() => {
                                                                                    input.value = parseInt(input.value) + 1
                                                                                }).catch((res) => {
                                                                                    console.log(res)
                                                                                    setErrorMessage(res.response.data.message);
                                                                                    setTimeout(() => setErrorMessage(""), 4000);
                                                                                });
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-2 text-end">
                                                                    <span className="fw-bold">${matchedItem?.pick_up_price * item.count}</span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="d-grid">
                                        <button
                                            className="btn btn-primary btn-lg d-flex justify-content-between align-items-center"
                                            type="submit"
                                        >
                                            {" "}
                                            Go to Checkout <span className="fw-bold">${cartItems.reduce((acc, item) => acc + item?.pick_up_price * item.count, 0)}</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Modal */}
                    <div
                        className="modal fade"
                        id="locationModal"
                        tabIndex={-1}
                        aria-labelledby="locationModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-sm modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body p-6">
                                    <div className="d-flex justify-content-between align-items-start ">
                                        <div>
                                            <h5 className="mb-1" id="locationModalLabel">
                                                Choose your Delivery Location
                                            </h5>
                                            <p className="mb-0 small">
                                                Enter your address and we will specify the offer you
                                                area.{" "}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        />
                                    </div>
                                    <div className="my-5">
                                        <input
                                            type="search"
                                            className="form-control"
                                            placeholder="Search your area"
                                        />
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h6 className="mb-0">Select Location</h6>
                                        <Link
                                            to="#"
                                            className="btn btn-outline-gray-400 text-muted btn-sm"
                                        >
                                            Clear All
                                        </Link>
                                    </div>
                                    <div>
                                        <div data-simplebar style={{ height: 300 }}>
                                            <div className="list-group list-group-flush">
                                                <Link
                                                    to="#"
                                                    className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action active"
                                                >
                                                    <span>Alabama</span>
                                                    <span>Min:$20</span>
                                                </Link>
                                                <Link
                                                    to="#"
                                                    className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action"
                                                >
                                                    <span>Alaska</span>
                                                    <span>Min:$30</span>
                                                </Link>
                                                <Link
                                                    to="#"
                                                    className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action"
                                                >
                                                    <span>Arizona</span>
                                                    <span>Min:$50</span>
                                                </Link>
                                                <Link
                                                    to="#"
                                                    className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action"
                                                >
                                                    <span>California</span>
                                                    <span>Min:$29</span>
                                                </Link>
                                                <Link
                                                    to="#"
                                                    className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action"
                                                >
                                                    <span>Colorado</span>
                                                    <span>Min:$80</span>
                                                </Link>
                                                <Link
                                                    to="#"
                                                    className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action"
                                                >
                                                    <span>Florida</span>
                                                    <span>Min:$90</span>
                                                </Link>
                                                <Link
                                                    to="#"
                                                    className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action"
                                                >
                                                    <span>Arizona</span>
                                                    <span>Min:$50</span>
                                                </Link>
                                                <Link
                                                    to="#"
                                                    className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action"
                                                >
                                                    <span>California</span>
                                                    <span>Min:$29</span>
                                                </Link>
                                                <Link
                                                    to="#"
                                                    className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action"
                                                >
                                                    <span>Colorado</span>
                                                    <span>Min:$80</span>
                                                </Link>
                                                <Link
                                                    to="#"
                                                    className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action"
                                                >
                                                    <span>Florida</span>
                                                    <span>Min:$90</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            {errorMessage && (
                <div className="error-popup">
                    {errorMessage}
                </div>
            )}
        </div >
    );
};

export default Header;