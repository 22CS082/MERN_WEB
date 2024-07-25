import React from 'react';
import { useAuth } from '../store/auth'; // Import useAuth hook

const Service = () => {
  const { services } = useAuth(); // Get services from context

  console.log("Services in Service component:", services); // Log services data

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="service-heading">Services</h1>
        {services.length > 0 ? (
          <div className="container grid grid-three-cols">
            {services.map((curElem, index) => {
              const { price, description, provider, service } = curElem;
              return (
                <div className="card" key={index}>
                  <div className="card-img">
                    <img src="/images/design.png" alt="designer" width="200" />
                  </div>
                  <div className="card-details">
                    <div className="grid grid-two-cols">
                      <p>{provider}</p>
                      <p>{price}</p>
                    </div>
                    <h2>{service}</h2>
                    <p>{description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No services available.</p>
        )}
      </div>
    </section>
  );
};

export default Service;
