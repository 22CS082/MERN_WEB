import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import{useAuth} from "../store/auth";
import { toast } from "react-toastify";
const token=localStorage.getItem("token");
const AdminUpdate = () => {


    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
    });

    const params=useParams();
    

    const getSingleUserData=async()=>{
        try {
            const response = await fetch(`http://localhost:5005/api/admin/users/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            });
            const data = await response.json();
                    console.log(`user single data: ${JSON.stringify(data)}`);
            // if(response.ok){
            //     getAllUserData();
            // }
            setData(data);
        } catch (error) {
            console.log(error);
        }
            }
useEffect(()=>{
    getSingleUserData();
},[]);
    const handleInput = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        
        try{
            const response = await fetch(`http://localhost:5005/api/admin/users/update/${params.id}`,
            {
                method:"PATCH",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            },
            
        );
        if(response.ok){
            toast.success("updated successfully");
        }else{
            toast.error("something went wrong");
        }
        }catch(error){
            console.log(error);
        }
        
    };

    return (
        <>
            <section className="section-contact">
                <div className="contact-content container">
                    <h1 className="main-heading" >Update user</h1>
                </div>

                <div className="container grid grid-two-cols">
                    <section className="section-form">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="off"
                                    required
                                    value={data.username}
                                    onChange={handleInput}
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="off"
                                    required
                                    value={data.email}
                                    onChange={handleInput}
                                />
                            </div>
                            <div>
                                <label htmlFor="phone">Mobile</label>
                                <input
                                    type="phone"
                                    name="phone"
                                    id="phone"
                                    autoComplete="off"
                                    required
                                    value={data.phone}
                                    onChange={handleInput}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-submit"
                                style={{ width: '100px', borderRadius: '5px' }}
                            >
                                Update
                            </button>
                        </form>
                    </section>
                </div>
            </section>
        </>
    );
};
export default AdminUpdate;
