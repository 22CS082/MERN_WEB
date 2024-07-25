import { NavLink } from "react-router-dom";

 const Error=()=>{
    return(
        <>
            <section id="error-page">
                <div className="content">
                    <h2 className="header">404</h2>
                    <h4>Oops! Page Not Found</h4>
                    <p>
                        Sorry, but the page you are looking for does not exist.
                        If you believe there's issue,feel free to report it,and we'll look into it.
                    </p>
                    <div className="btns">
                        <NavLink to="/">return home</NavLink>
                        <NavLink to="/Contact">report problem</NavLink>
                    </div>
                </div>
            </section>
        </>
    );

};
export default Error;