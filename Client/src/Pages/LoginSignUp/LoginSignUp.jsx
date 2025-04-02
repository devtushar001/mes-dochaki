import React, { useContext, useState, useEffect } from "react";
import "./LoginSignUp.css";
import { MesContext } from "../../Context/MesContextProvider";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const LoginSignUp = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { backend_url, token, setToken, setLoginSignup } = useContext(MesContext);
    const [otp, setOtp] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [otpCode, setOtpCode] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        console.log("User Data:", userData);
    }, [userData]);

    const getUserData = async () => {
        if (!token) {
            setLoginSignup(true);
            return;
        }

        try {
            const res = await fetch(`${backend_url}/api/user/get-user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                toast.error(data.message || "Failed to fetch user data");
                return;
            }
            const data = await res.json();
            if(!data.success){
                setLoginSignup(true); 
                navigate("/");
            }
            setLoginSignup(false)
        } catch (error) {
            toast.error("Failed to fetch user data. Please try again.");
        }
    };

    useEffect(() => {
        getUserData();
    }, [backend_url])

    const userRegistration = async () => {
        if (!userData.name || !userData.email || !userData.password) {
            toast.error("All fields are required!");
            return;
        }

        try {
            const res = await fetch(`${backend_url}/api/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || "Registration failed");
                return;
            }

            toast.success(data.message);
            setOtp(true);
            setToken(data.token); // Update context state
            localStorage.setItem("authToken", JSON.stringify(data.token));
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error("Registration failed. Please try again.");
        }
    };

    const userLogin = async () => {
        if (!userData.email || !userData.password) {
            toast.error("Email and password are required!");
            return;
        }

        try {
            const res = await fetch(`${backend_url}/api/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userData.email,
                    password: userData.password,
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || "Login failed");
                return;
            }

            toast.success("Login successful!");
            setToken(data.token);
            setLoginSignup(false)
            navigate('/')
            localStorage.setItem("authToken", JSON.stringify(data.token));
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("Login failed. Please try again.");
        }
    };

    const verifyOtp = async () => {
        if (!otpCode) {
            toast.error("Please enter the OTP!");
            return;
        }
        if (!token) {
            return;
        }

        try {
            const res = await fetch(`${backend_url}/api/user/verify-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ email: userData.email, otp: otpCode }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error("Otp not verified")
            }

            setOtp(false);
            setIsLogin(true);
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="login-signup">
            <div className="auth-container">
                <div className="auth-box">
                    <div className="auth-left">
                        <h2>Welcome</h2>
                        <p>Dochaki Designs MES (Manufacturing Execution System) Page.</p>
                    </div>

                    <div className="auth-right">
                        <h2>{isLogin ? "LOGIN" : "SIGN UP"}</h2>
                        {!isLogin && (
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="auth-input"
                                value={userData.name}
                                onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
                            />
                        )}
                        <input
                            type="email"
                            placeholder="Email"
                            className="auth-input"
                            value={userData.email}
                            onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="auth-input"
                            value={userData.password}
                            onChange={(e) => setUserData((prev) => ({ ...prev, password: e.target.value }))}
                        />

                        {isLogin ? (
                            <button className="auth-button" onClick={userLogin}>Login</button>
                        ) : (
                            <button className="auth-button" onClick={userRegistration}>Send OTP</button>
                        )}

                        <div className="auth-toggle">
                            <button onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? "Create an account?" : "Already have an account?"}
                            </button>
                        </div>
                    </div>
                </div>

                {otp && (
                    <div className="otp">
                        <div className="otp-box">
                            <input
                                type="text"
                                placeholder="Enter OTP sent to your email"
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value)}
                            />
                            <button onClick={verifyOtp}>Verify OTP</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginSignUp;