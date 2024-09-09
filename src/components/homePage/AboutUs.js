import React from 'react';
import './AboutUs.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';



const AboutUs = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
    };

    return (
        <div className="about-us-container">
            <div><Button onClick={handleGoBack} className="go-back-button">
                    Go Back!
                </Button></div>
                

          <header className="about-us-header">
            <h1>About Us</h1>
          </header>
          <section className="about-us-content">
            <h2>Welcome to E-Insurance</h2>
            <p>
              At E-Insurance, we are committed to providing a seamless and comprehensive insurance management experience. Our platform is designed to cater to the needs of various stakeholders, including administrators, employees, customers, and agents. Our mission is to simplify insurance processes and enhance user satisfaction through our innovative and user-friendly solutions.
            </p>
            
            <h2>Our Modules</h2>
            <h3>Admin Module:</h3>
            <p>
              Our Admin module empowers administrators and employees to manage and oversee the entire insurance ecosystem. Key features include:
            </p>
            <ul>
              <li>Manage City/State: Admins can configure and manage geographical settings.</li>
              <li>Manage Tax and Insurance Settings: Customize tax and insurance parameters.</li>
              <li>Add Employee and Agent: Onboard new employees and agents with ease.</li>
              <li>Insurance Type & Plan Master: Define and manage insurance types and plans.</li>
              <li>Commission Settings: Set and adjust commission structures.</li>
              <li>Withdrawal Approval: Review and approve or reject withdrawal requests.</li>
              <li>Reports: Access comprehensive reports, including customer, agent, commission, and transaction reports.</li>
            </ul>
    
            <h3>Employee Module:</h3>
            <p>
              Employees, added by administrators, play a crucial role in document verification and agent registration:
            </p>
            <ul>
              <li>Agent Registration: Facilitate the registration of new agents.</li>
              <li>Manage Profile: Update and manage personal profiles.</li>
              <li>Edit Details: Modify customer and agent details.</li>
              <li>View Commission Reports: Access reports related to commissions.</li>
            </ul>
    
            <h3>Customer Module:</h3>
            <p>
              Our customer module ensures that policyholders can manage their accounts and track their insurance details effectively:
            </p>
            <ul>
              <li>Profile Management: Update personal details and passwords.</li>
              <li>Policy Account Creation & Management: Create, track, and manage insurance policies.</li>
              <li>Policy Claim & Cancellation: File claims or cancel policies as needed.</li>
              <li>Payment Receipts: Access payment receipts and policy plan details.</li>
              <li>Contact Form & Query Management: Submit queries and view responses.</li>
            </ul>
    
            <h3>Insurance Agent Module:</h3>
            <p>
              Insurance agents are crucial to our network, providing policy information and attracting new customers:
            </p>
            <ul>
              <li>Agent Registration & Login: Register and log in to manage your accounts.</li>
              <li>Profile Management: Maintain and update your profile.</li>
              <li>Policy Registration: Register new policies for clients.</li>
              <li>Commission Management: Track and withdraw commissions earned.</li>
              <li>Reports: Access earnings and commission reports.</li>
            </ul>
    
            <h2>Our Vision</h2>
            <p>
              E-Insurance aims to revolutionize the insurance industry by integrating cutting-edge technology with user-centric design. We strive to make insurance management as efficient and transparent as possible for all our users. Whether you are an administrator, employee, customer, or agent, our platform is tailored to meet your needs and exceed your expectations.
            </p>
    
            <h2>Contact Us</h2>
            <p>
              Have questions or need assistance? Our dedicated support team is here to help. Reach out to us through our contact form, and we will get back to you as soon as possible.
            </p>
          </section>
        </div>
      );
    };

export default AboutUs
