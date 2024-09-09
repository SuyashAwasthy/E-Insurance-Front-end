// // HomePage.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './HomePage.css';  // Make sure to create this CSS file for styling

// const HomePage = () => {
//     return (
//         <div className="homepage">
//             <header className="navbar">
//                 <nav>
//                     <ul>
//                         <li><Link to="/about-us">About Us</Link></li>
//                         <li><Link to="/services">Services</Link></li>
//                         <li><Link to="/login">Login</Link></li>
//                         <li><Link to="/register">Register</Link></li>
//                         <li><Link to="/insurance-plans">Insurance Plans</Link></li>
//                         <li><Link to="/contact">Contact</Link></li>
//                     </ul>
//                 </nav>
//             </header>
//             <main className="main-content">
//                 {/* <img src="https://th.bing.com/th/id/OIP.4nW-qp89uyNu7jlWsbyHcAHaD3?rs=1&pid=ImgDetMain" alt="Central Image" className="central-image" /> */}
//                 <div className="left-section">
//                     <img src="https://th.bing.com/th/id/OIP.4nW-qp89uyNu7jlWsbyHcAHaD3?rs=1&pid=ImgDetMain" alt="Central Image" className="central-image" />
//                 </div>
//                 <div className="right-section">
//                     <h1 className="main-heading">E-INSURANCE</h1>
//                     <p className="slogan">Make a Policy with us, make your Life valuable</p>
//                 </div>

//             </main>
//         </div>
//     );
// };

// export default HomePage;


// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';


import './HomePage.css';  // Ensure this CSS file is created for styling
import InsurancePlans from '../InsurancePlans';

const HomePage = () => {
    
    return (
        
        <div className="homepage">
            <header className="navbar">
                <nav>
                    <ul>
                        <li><Link to="/about-us">About Us</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        
                        <li className="nav-item dropdown">
                            <InsurancePlans /> {/* Use the dropdown component */}
                        </li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>
            <div className="content">
                <div className="left-partition">
                    <img src="https://th.bing.com/th/id/OIP.4nW-qp89uyNu7jlWsbyHcAHaD3?rs=1&pid=ImgDetMain" alt="Central Image" className="central-image" />
                </div>
                <div className="right-partition">
                    <h1 className="main-heading">E-INSURANCE</h1>
                    <p className="slogan">Make a Policy with us, make your Life valuable</p>
                </div>
            </div>
           
        </div>
        
    );
};

export default HomePage;
