import React, { useState } from "react";
import signinimage from "@src/images/signin-g.svg";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "@src/redux/thunks/userThunks";
import ScrollToTop from "../ScrollToTop";

const MyAccountSignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, token } = useSelector((state) => state.user);

  const [loginType, setLoginType] = useState("email"); // Toggle between email and phone
  const [formData, setFormData] = useState({
    email: "",
    phone_number: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      login_type: loginType,
      password_login: true, // Assuming password-based login
    };

    const result = await dispatch(loginUserThunk(payload));
    if (result.payload?.success) {
      navigate("/dashboard"); // Forwarding user upon successful login
    }
  };

  return (
      <div>
        <ScrollToTop />
        <section className="my-lg-14 my-8">
          <div className="container">
            {/* row */}
            <div className="row justify-content-center align-items-center">
              <div className="col-12 col-md-6 col-lg-4 order-lg-1 order-2">
                {/* img */}
                <img src={signinimage} alt="freshcart" className="img-fluid" />
              </div>
              {/* col */}
              <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
                <div className="mb-lg-9 mb-5">
                  <h1 className="mb-1 h2 fw-bold">Sign in to FreshDeal</h1>
                  <p>
                    Welcome back to FreshDeal! Enter your email or phone number to
                    get started.
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    {/* Toggle for login type */}
                    <div className="col-12">
                      <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="loginType"
                            id="emailLogin"
                            value="email"
                            checked={loginType === "email"}
                            onChange={() => setLoginType("email")}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="emailLogin"
                        >
                          Email
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="loginType"
                            id="phoneLogin"
                            value="phone"
                            checked={loginType === "phone"}
                            onChange={() => setLoginType("phone")}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="phoneLogin"
                        >
                          Phone
                        </label>
                      </div>
                    </div>

                    {/* Email or Phone input */}
                    {loginType === "email" ? (
                        <div className="col-12">
                          <input
                              type="email"
                              className="form-control"
                              id="inputEmail"
                              name="email"
                              placeholder="Email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                          />
                        </div>
                    ) : (
                        <div className="col-12">
                          <input
                              type="text"
                              className="form-control"
                              id="inputPhone"
                              name="phone_number"
                              placeholder="Phone Number"
                              value={formData.phone_number}
                              onChange={handleChange}
                              required
                          />
                        </div>
                    )}

                    {/* Password input */}
                    <div className="col-12">
                      <input
                          type="password"
                          className="form-control"
                          id="inputPassword"
                          name="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                      />
                    </div>

                    <div className="d-flex justify-content-between">
                      <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                        >
                          Remember me
                        </label>
                      </div>
                      <div>
                        Forgot password?{" "}
                        <Link to="/MyAccountForgetPassword">Reset it</Link>
                      </div>
                    </div>

                    {/* Error message */}
                    {error && <p className="text-danger">{error}</p>}

                    {/* Sign In button */}
                    <div className="col-12 d-grid">
                      <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isLoading}
                      >
                        {isLoading ? "Signing In..." : "Sign In"}
                      </button>
                    </div>

                    {/* Sign Up link */}
                    <div>
                      Don’t have an account?{" "}
                      <Link to="/Register">Sign Up</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default MyAccountSignIn;