import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

const Contact = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setContact({
        username: user.username,
        email: user.email,
        message: "",
      });
    }
  }, [user]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5005/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        setContact(defaultContactFormData);
        const data = await response.json();
        console.log(data);
        toast("Message sent successfully");
      } else {
        const errorData = await response.json();
        console.error("Error sending message:", errorData);
        toast.error("Failed to send message");
      }
    } catch (error) {
      console.error("An error occurred while sending the message:", error);
      toast.error("An error occurred while sending the message");
    }
  };

  return (
    <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading" style={{ paddingLeft: 40 }}>Contact us</h1>
      </div>

      <div className="container grid grid-two-cols">
        <div className="contact-img">
          <img src="/images/support.png" alt="we always ready to help" width="400" height="500" />
        </div>

        <section className="section-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                autoComplete="off"
                required
                value={contact.username}
                onChange={handleInput}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                autoComplete="off"
                required
                value={contact.email}
                onChange={handleInput}
              />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                placeholder="Enter your message"
                autoComplete="off"
                required
                value={contact.message}
                onChange={handleInput}
                cols="30"
                rows="6"
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-submit"
              style={{ width: '100px', borderRadius: '5px' }}
            >
              Submit
            </button>
          </form>
        </section>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d65976.42363408257!2d70.8123714990894!3d22.806506638752865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39598cd96ce15487%3A0x294863999340c94e!2sMorbi%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1718622744846!5m2!1sen!2sin"
        width="100%"
        height="450"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
}

export default Contact;
