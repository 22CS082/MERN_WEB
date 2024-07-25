import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

 const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();

    const handleInput = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5005/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const res_data = await response.json();
            console.log("Response data:", res_data);

            if (response.ok) {
                storeTokenInLS(res_data.token);
                setUser({ email: "", password: "" });
                toast.success("Login Successfully");
                navigate("/");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
                console.log("Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="login-image">
                            <img
                                src="/images/login.png"
                                alt="login"
                                width="500"
                                height="500"
                            />
                        </div>
                        <div className="registration-form">
                            <h1 className="main-heading mb-3" style={{ fontSize: 50 }}>
                                Login form
                            </h1>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" style={{ fontSize: 20 }}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        required
                                        autoComplete="off"
                                        value={user.email}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" style={{ fontSize: 20 }}>
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        required
                                        autoComplete="off"
                                        value={user.password}
                                        onChange={handleInput}
                                    />
                                </div>
                                <br />
                                <button type="submit" className="btn btn-submit">
                                    Login Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
};
export default Login;