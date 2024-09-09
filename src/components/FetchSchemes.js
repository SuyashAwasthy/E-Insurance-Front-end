// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const FetchSchemes = () => {
//     const { planId } = useParams();
//     const [schemes, setSchemes] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchSchemes = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/E-Insurance/toall/getSchemesByPlan/${planId}`);
//                 setSchemes(response.data);
//             } catch (error) {
//                 setError(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSchemes();
//     }, [planId]);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error fetching schemes: {error.message}</p>;

//     return (
//         <div>
//             <h3>Schemes for Plan ID: {planId}</h3>
//             <ul>
//                 {schemes.map(scheme => (
//                     <li key={scheme.insuranceSchemeId} className="scheme-item">
//                         <h4>{scheme.insuranceScheme}</h4>
//                         <p><strong>Scheme Image:</strong></p>
//                         {scheme.schemeImage ? (
//                             <img 
//                                 src={scheme.schemeImage} 
//                                 alt={scheme.insuranceScheme} 
//                                 style={{ maxWidth: '300px', height: 'auto' }} 
//                             />
//                         ) : (
//                             <p>No image available</p>
//                         )}
//                         <p><strong>Description:</strong> {scheme.description}</p>
//                         <p><strong>Minimum Policy Term:</strong> {scheme.minimumPolicyTerm}</p>
//                         <p><strong>Maximum Policy Term:</strong> {scheme.maximumPolicyTerm}</p>
//                         <p><strong>Minimum Age:</strong> {scheme.minimumAge}</p>
//                         <p><strong>Maximum Age:</strong> {scheme.maximumAge}</p>
//                         <p><strong>Minimum Investment Amount:</strong> {scheme.minimumInvestmentAmount}</p>
//                         <p><strong>Maximum Investment Amount:</strong> {scheme.maximumInvestmentAmount}</p>
//                         <p><strong>Profit Ratio:</strong> {scheme.profitRatio}</p>
//                         <p><strong>New Registration Commission:</strong> {scheme.newRegistrationCommission}</p>
//                         <p><strong>Installment Payment Commission:</strong> {scheme.installmentPaymentCommission}</p>
                        
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };
// export default FetchSchemes

// import React, { useState, useEffect } from 'react';  
// import axios from 'axios';  
// import { useParams } from 'react-router-dom';  
 
// const FetchSchemes = () => {  
//     const { planId } = useParams();  
//     const [schemes, setSchemes] = useState([]);  
//     const [loading, setLoading] = useState(true);  
//     const [error, setError] = useState(null);  
//     const [investmentAmount, setInvestmentAmount] = useState('');  
//     const [interestAmount, setInterestAmount] = useState(null);  
 
//     useEffect(() => {  
//         const fetchSchemes = async () => {  
//             try {  
//                 const response = await axios.get(`http://localhost:8080/E-Insurance/toall/getSchemesByPlan/${planId}`);  
//                 setSchemes(response.data);  
//             } catch (error) {  
//                 setError(error);  
//             } finally {  
//                 setLoading(false);  
//             }  
//         };  
 
//         fetchSchemes();  
//     }, [planId]);  
 
//     const calculateInterest = (scheme) => { 
//         if (!investmentAmount || !scheme.profitRatio) return; 
//         const interest = (investmentAmount * scheme.profitRatio) / 100; 
//         setInterestAmount(interest); 
//     }; 
 
//     if (loading) return <p>Loading...</p>;  
//     if (error) return <p>Error fetching schemes: {error.message}</p>;  
 
//     return (  
//         <div>  
//             <h3>Schemes for Plan ID: {planId}</h3>  
//             <table className="table table-striped"> 
//                 <thead> 
//                     <tr> 
//                         <th>Scheme Name</th> 
//                         <th>Description</th> 
//                         <th>Min Policy Term</th> 
//                         <th>Max Policy Term</th> 
//                         <th>Min Age</th> 
//                         <th>Max Age</th> 
//                         <th>Min Investment</th> 
//                         <th>Max Investment</th> 
//                         <th>Profit Ratio</th> 
//                         <th>New Registration Commission</th> 
//                         <th>Installment Payment Commission</th> 
//                         <th>Image</th> 
//                         <th>Action</th> 
//                     </tr> 
//                 </thead> 
//                 <tbody> 
//                     {schemes.map(scheme => ( 
//                         <tr key={scheme.insuranceSchemeId}> 
//                             <td>{scheme.insuranceScheme}</td> 
//                             <td>{scheme.description}</td> 
//                             <td>{scheme.minimumPolicyTerm}</td> 
//                             <td>{scheme.maximumPolicyTerm}</td> 
//                             <td>{scheme.minimumAge}</td> 
//                             <td>{scheme.maximumAge}</td> 
//                             <td>{scheme.minimumInvestmentAmount}</td> 
//                             <td>{scheme.maximumInvestmentAmount}</td> 
//                             <td>{scheme.profitRatio}</td> 
//                             <td>{scheme.newRegistrationCommission}</td> 
//                             <td>{scheme.installmentPaymentCommission}</td> 
//                             <td> 
//                                 {scheme.schemeImage ? ( 
//                                     <img 
//                                         src={scheme.schemeImage} 
//                                         alt={scheme.insuranceScheme} 
//                                         style={{ maxWidth: '100px', height: 'auto' }} 
//                                     /> 
//                                 ) : ( 
//                                     'No image available' 
//                                 )} 
//                             </td> 
//                             <td> 
//                                 <button onClick={() => calculateInterest(scheme)}>Calculate Interest</button> 
//                             </td> 
//                         </tr> 
//                     ))} 
//                 </tbody> 
//             </table> 
 
//             <div className="interest-calculator"> 
//                 <h4>Interest Calculator</h4> 
//                 <div className="form-group"> 
//                     <label htmlFor="investmentAmount">Investment Amount</label>
// <input 
//                         type="number" 
//                         id="investmentAmount" 
//                         className="form-control" 
//                         value={investmentAmount} 
//                         onChange={(e) => setInvestmentAmount(e.target.value)} 
//                     /> 
//                 </div> 
//                 <div className="form-group"> 
//                     <label htmlFor="interestAmount">Interest Amount</label> 
//                     <input 
//                         type="text" 
//                         id="interestAmount" 
//                         className="form-control" 
//                         value={interestAmount !== null ? interestAmount.toFixed(2) : 'N/A'} 
//                         readOnly 
//                     /> 
//                 </div> 
//             </div> 
//         </div>  
//     );  
// };  
 
// export default FetchSchemes;

import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { useParams } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './FetchSchemes.css'; // Ensure this file contains additional styling if needed 
 
const FetchSchemes = () => { 
    const { planId } = useParams(); 
    const [schemes, setSchemes] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [investmentAmount, setInvestmentAmount] = useState(''); 
    const [interestAmount, setInterestAmount] = useState(null); 
    const navigate = useNavigate();
    
 
    useEffect(() => { 
        const fetchSchemes = async () => { 
            try { 
                const response = await axios.get(`http://localhost:8080/E-Insurance/toall/getSchemesByPlan/${planId}`); 
                setSchemes(response.data); 
            } catch (error) { 
                setError(error); 
            } finally { 
                setLoading(false); 
            } 
        }; 
 
        fetchSchemes(); 
    }, [planId]); 
 
    const calculateInterest = (scheme) => { 
        if (!investmentAmount || !scheme.profitRatio) return; 
        const interest = (investmentAmount * scheme.profitRatio) / 100; 
        setInterestAmount(interest); 
    }; 
    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
    };
 
    if (loading) return <p>Loading...</p>; 
    if (error) return <p>Error fetching schemes: {error.message}</p>; 
 
    return ( 
        <div className="container mt-4"> 
            <h3 className="mb-4">Schemes for Plan ID: {planId}</h3> 
            {schemes.map(scheme => ( 
                <div key={scheme.insuranceSchemeId} className="scheme-container mb-4"> 
                    <div className="scheme-image mb-3"> 
                        {scheme.schemeImage ? ( 
                            <img 
                                src={scheme.schemeImage} 
                                alt={scheme.insuranceScheme} 
                                className="img-fluid" 
                                style={{ maxWidth: '100%', height: 'auto' }} 
                            /> 
                        ) : ( 
                            <p>No image available</p> 
                        )} 
                    </div> 
                    <table className="table table-striped"> 
                        <tbody> 
                            <tr> 
                                <th>Scheme Name:</th> 
                                <td>{scheme.insuranceScheme}</td> 
                            </tr> 
                            <tr> 
                                <th>Description:</th> 
                                <td>{scheme.description}</td> 
                            </tr> 
                            <tr> 
                                <th>Min Policy Term:</th> 
                                <td>{scheme.minimumPolicyTerm}</td> 
                            </tr> 
                            <tr> 
                                <th>Max Policy Term:</th> 
                                <td>{scheme.maximumPolicyTerm}</td> 
                            </tr> 
                            <tr> 
                                <th>Min Age:</th> 
                                <td>{scheme.minimumAge}</td> 
                            </tr> 
                            <tr> 
                                <th>Max Age:</th> 
                                <td>{scheme.maximumAge}</td> 
                            </tr> 
                            <tr> 
                                <th>Min Investment:</th> 
                                <td>{scheme.minimumInvestmentAmount}</td> 
                            </tr> 
                            <tr> 
                                <th>Max Investment:</th> 
                                <td>{scheme.maximumInvestmentAmount}</td> 
                            </tr> 
                            <tr> 
                                <th>Profit Ratio:</th> 
                                <td>{scheme.profitRatio}</td> 
                            </tr> 
                            <tr>
<th>New Registration Commission:</th> 
                                <td>{scheme.newRegistrationCommission}</td> 
                            </tr> 
                            <tr> 
                                <th>Installment Payment Commission:</th> 
                                <td>{scheme.installmentPaymentCommission}</td> 
                            </tr> 
                        </tbody> 
                    </table> 
                    <div className="text-center"> 
                        <button 
                            className="btn btn-primary" 
                            onClick={() => calculateInterest(scheme)} 
                        > 
                            Calculate Interest 
                        </button> 
                    </div> 
                </div> 
            ))} 
 
            <div className="interest-calculator mt-4"> 
                <h4>Interest Calculator</h4> 
                <div className="form-group"> 
                    <label htmlFor="investmentAmount">Investment Amount</label> 
                    <input 
                        type="number" 
                        id="investmentAmount" 
                        className="form-control" 
                        value={investmentAmount} 
                        onChange={(e) => setInvestmentAmount(e.target.value)} 
                    /> 
                </div> 
                <div className="form-group mt-3"> 
                    <label htmlFor="interestAmount">Interest Amount</label> 
                    <input 
                        type="text" 
                        id="interestAmount" 
                        className="form-control" 
                        value={interestAmount !== null ? interestAmount.toFixed(2) : 'N/A'}  
                        readOnly 
                    /> 
                </div> 
            </div> 
            <div><Button onClick={handleGoBack} className="go-back-button">
                    Go Back!
                </Button></div>
               


        </div> 
    ); 
}; 
 
export default FetchSchemes;
