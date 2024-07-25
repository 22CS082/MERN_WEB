import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

 const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });
    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({
            ...user,
            [name]: value,
        });
    };

    // Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        try {
            const response = await fetch("http://localhost:5005/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            const res_data = await response.json();
            console.log("res from server", res_data.extraDetails);
            if (response.ok) {
                storeTokenInLS(res_data.token);
                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    password: "",
                });
                toast.success("Registration Successfully");
                navigate("/login");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log("register", error);
            toast.error("An error occurred during registration. Please try again.");
        }
    };

    return (
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img
                                src="/images/register.png"
                                alt="Register"
                                width="500"
                                height="500"
                            />
                        </div>
                        <div className="registration-form">
                            <h1 className="main-heading mb-3" style={{ fontSize: 50 }}>Registration form</h1>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username" style={{ fontSize: 20 }}>Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Enter your username"
                                        required
                                        autoComplete="off"
                                        value={user.username}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" style={{ fontSize: 20 }}>Email</label>
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
                                    <label htmlFor="phone" style={{ fontSize: 20 }}>Phone</label>
                                    <input
                                        type="number"
                                        id="phone"
                                        name="phone"
                                        placeholder="Enter your phone"
                                        required
                                        autoComplete="off"
                                        value={user.phone}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" style={{ fontSize: 20 }}>Password</label>
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
                                <button type="submit" className="btn btn-submit">Register Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
};
export default  Register;