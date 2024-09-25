// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Form, Button } from 'react-bootstrap';
// import { CardElement, useElements, useStripe, Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe('pk_test_51Pz1w4LAuyjp8hN9KsG7Pi9ZX1DkIieK5dv8Zl8icQYrswiHtrS9XNM8XmIhJx8qugTBgOGpoYYVbjUuzrBWsOmJ00OSai0tZc');

// const PaymentForm = ({ handlePaymentSuccess, totalAmount, policyId, paymentType, tax }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const token = localStorage.getItem('authToken');

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements) {
//             return;
//         }

//         setLoading(true);

//         try {
//             const { paymentMethod, error: paymentMethodError } = await stripe.createPaymentMethod({
//                 type: 'card',
//                 card: elements.getElement(CardElement),
//             });

//             if (paymentMethodError) {
//                 setError(paymentMethodError.message);
//                 setLoading(false);
//                 return;
//             }

//             if (!token) {
//                 setError('No authentication token found');
//                 setLoading(false);
//                 return;
//             }

//             const { data: { clientSecret } } = await axios.post('http://localhost:8080/E-Insurance/customer/create-payment-intent', {
//                 amount: Math.round(totalAmount * 100), // Convert to cents
//                 paymentMethodId: paymentMethod.id,
//                 policyId: policyId,
//                 paymentType: paymentType,
//                 tax: tax,
//                 totalPayment: totalAmount,
//             }, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//             });

//             const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: paymentMethod.id,
//             });

//             if (stripeError) {
//                 setError(stripeError.message);
//             } else {
//                 handlePaymentSuccess();
//             }
//         } catch (error) {
//             console.error('Error processing payment:', error);
//             setError('Payment failed');
//         }

//         setLoading(false);
//     };

//     return (
//         <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="cardElement">
//                 <Form.Label>Credit or Debit Card</Form.Label>
//                 <CardElement />
//             </Form.Group>
//             {error && <p className="text-danger">{error}</p>}
//             <Button type="submit" variant="success" disabled={loading}>
//                 {loading ? 'Processing…' : 'Pay Now'}
//             </Button>
//         </Form>
//     );
// };

// const PaymentPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { scheme, schemeId, investmentAmount, policyTerm, installmentPeriod, installmentAmount, nominees, uploadedDocs } = location.state || {};

//     const [paymentType, setPaymentType] = useState('credit');
//     const [tax, setTax] = useState(0);

//     const token = localStorage.getItem('authToken');

//     useEffect(() => {
//         const role = localStorage.getItem('UserRole');
//         if (role !== 'ROLE_CUSTOMER' || !token) {
//             navigate('/login');
//         }

//         axios.get('http://localhost:8080/E-Insurance/toall/payment-tax', {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//         })
//         .then(response => {
//             if (response.data && response.data.paymentTax !== undefined) {
//                 setTax(response.data.paymentTax);
//             } else {
//                 console.error('Invalid tax data:', response.data);
//                 setTax(0);
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching tax:', error);
//             setTax(0);
//         });
//     }, [navigate, token]);

//     if (!scheme) {
//         return <p>Loading or no data available...</p>;
//     }

//     // Ensure installmentAmount and tax are numbers and provide default values
//     const amount = Number(installmentAmount) || 0;
//     const taxAmount = Number(tax) || 0;
//     const totalAmountToPay = amount + taxAmount;

//     const handleSubmitPolicy = async () => {
//         if (!scheme || !schemeId) {
//             console.error('Scheme ID is missing');
//             return;
//         }

//         const requestPayload = {
//             insuranceSchemeId: schemeId,
//             policyTerm,
//             premiumAmount: investmentAmount,
//             installmentPeriod,
//             nominees,
//             documents: uploadedDocs
//         };

//         try {
//             const customerId = localStorage.getItem('customerId');
//             const response = await axios.post(`http://localhost:8080/E-Insurance/customer/${customerId}/buyWithoutAgent`, requestPayload, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             console.log('Response:', response.data);
//             handlePaymentSuccess();
//         } catch (error) {
//             console.error('Error submitting policy:', error.response?.data || error.message);
//         }
//     };

//     const handlePaymentSuccess = () => {
//         navigate('/confirmation');
//         alert('Policy created successfully!');
//     };

//     const handlePaymentTypeChange = (event) => {
//         setPaymentType(event.target.value);
//     };

//     const handleTaxChange = (event) => {
//         setTax(Number(event.target.value));
//     };

//     return (
//         <div className="container mt-4">
//             <h3 className="mb-4">Payment Details</h3>
//             {/* <p>SchemeID: {schemeId}</p>
//             <p>Premium Amount: ${parseFloat(investmentAmount).toFixed(2)}</p>
//             <p>Policy Term (Years): {policyTerm}</p>
//             <p>Installment Period (Months): {installmentPeriod}</p>
//             <p>Installment Amount (Monthly): ${installmentAmount.toFixed(2)}</p>
//             <p>Tax Amount: ${tax.toFixed(2)}</p>
//             <p><strong>Total Amount to Pay: ${totalAmountToPay.toFixed(2)}</strong></p> */}

//             <Form.Group controlId="formPaymentType">
//                 <Form.Label>Payment Type</Form.Label>
//                 <Form.Control
//                     as="select"
//                     value={paymentType}
//                     onChange={handlePaymentTypeChange}
//                 >
//                     <option value="credit">Credit Card</option>
//                     <option value="debit">Debit Card</option>
//                 </Form.Control>
//             </Form.Group>
//             <Form.Group controlId="formTax">
//                 <Form.Label>Tax Amount</Form.Label>
//                 <Form.Control
//                     type="number"
//                     value={tax}
//                     onChange={handleTaxChange}
//                 />
//             </Form.Group>

//             <Elements stripe={stripePromise}>
//                 <PaymentForm
//                     handlePaymentSuccess={handleSubmitPolicy}
//                     totalAmount={totalAmountToPay}
//                     policyId={schemeId}
//                     paymentType={paymentType}
//                     tax={tax}
//                 />
//             </Elements>
//         </div>
//     );
// };

// export default PaymentPage;
// import React, { useState,useEffect } from 'react';
// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// import { Button, Form } from 'react-bootstrap';
// import { createPaymentIntent } from '../../services/service';
// import { toast } from 'react-toastify';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Elements, loadStripe } from '@stripe/react-stripe-js';
// import { getPaymentTax } from '../../services/service';
// const PaymentForm = ({ handlePaymentSuccess, totalAmount, policyId, paymentType, tax }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setLoading(true);

//     try {
//       const cardElement = elements.getElement(CardElement);

//       const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
//         type: 'card',
//         card: cardElement,
//       });

//       if (paymentMethodError) {
//         setError(paymentMethodError.message);
//         setLoading(false);
//         return;
//       }

//       const paymentData = {
//         amount: Math.round(totalAmount * 100),
//         paymentMethodId: paymentMethod.id,
//         policyId: policyId,
//         paymentType: paymentType,
//         tax: tax,
//         totalPayment: totalAmount,
//       };

//       const { clientSecret } = await createPaymentIntent(paymentData);

//       const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: paymentMethod.id,
//       });

//       if (stripeError) {
//         setError(stripeError.message);
//       } else {
//         handlePaymentSuccess();
//       }
//     } catch (error) {
//       console.error('Error processing payment:', error);
//       setError('Payment failed');
//     }

//     setLoading(false);
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group controlId="cardElement">
//         <Form.Label>Credit or Debit Card</Form.Label>
//         <CardElement />
//       </Form.Group>
//       {error && <p className="text-danger">{error}</p>}
//       <Button type="submit" variant="success" disabled={loading}>
//         {loading ? 'Processing…' : 'Pay Now'}
//       </Button>
//     </Form>
//   );
// };

// export {PaymentForm};



// const stripePromise = loadStripe('pk_test_51Pz1w4LAuyjp8hN9KsG7Pi9ZX1DkIieK5dv8Zl8icQYrswiHtrS9XNM8XmIhJx8qugTBgOGpoYYVbjUuzrBWsOmJ00OSai0tZc');

// const PaymentPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [paymentType, setPaymentType] = useState('credit');
//   const [tax, setTax] = useState(0);
//   const [installmentAmount, setInstallmentAmount] = useState(0);
//   const [loading, setLoading] = useState(true);
  
//   const {
//     scheme,
//     schemeId,
//     investmentAmount,
//     policyTerm,
//     installmentPeriod,
//     installmentAmount: initialInstallmentAmount,
//     nominees,
//     uploadedDocs
//   } = location.state || {};

//   useEffect(() => {
//     const fetchTax = async () => {
//       try {
//         const taxResponse = await getPaymentTax();
//         setTax(taxResponse.paymentTax || 0);
//       } catch (error) {
//         toast.error('Failed to fetch tax.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTax();
//   }, []);

//   const handleSubmitPolicy = async () => {
//     if (!scheme || !schemeId) {
//       console.error('Scheme ID is missing');
//       return;
//     }

//     const requestPayload = {
//       insuranceSchemeId: schemeId,
//       policyTerm,
//       premiumAmount: investmentAmount,
//       installmentPeriod,
//       nominees,
//       documents: uploadedDocs,
//     };

//     try {
//       const customerId = localStorage.getItem('customerId');
//       // Implement the API call for policy submission here
//       // await axios.post(`/E-Insurance/customer/${customerId}/buyWithoutAgent`, requestPayload, { ... });

//       toast.success('Policy created successfully!');
//       navigate('/confirmation');
//     } catch (error) {
//       console.error('Error submitting policy:', error);
//       toast.error('Failed to create policy.');
//     }
//   };

//   const totalAmountToPay = (initialInstallmentAmount || 0) + (tax || 0);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="container mt-4">
//       <h3 className="mb-4">Payment Details</h3>
//       <Form.Group controlId="formPaymentType">
//         <Form.Label>Payment Type</Form.Label>
//         <Form.Control
//           as="select"
//           value={paymentType}
//           onChange={(e) => setPaymentType(e.target.value)}
//         >
//           <option value="credit">Credit Card</option>
//           <option value="debit">Debit Card</option>
//         </Form.Control>
//       </Form.Group>
//       <Form.Group controlId="formTax">
//         <Form.Label>Tax Amount</Form.Label>
//         <Form.Control
//           type="number"
//           value={tax}
//           readOnly
//         />
//       </Form.Group>
//       <Form.Group controlId="formTotal">
//         <Form.Label>Total Amount</Form.Label>
//         <Form.Control
//           type="number"
//           value={totalAmountToPay}
//           readOnly
//         />
//       </Form.Group>

//       <Elements stripe={stripePromise}>
//         <PaymentForm
//           handlePaymentSuccess={handleSubmitPolicy}
//           totalAmount={totalAmountToPay}
//           policyId={schemeId}
//           paymentType={paymentType}
//           tax={tax}
//         />
//       </Elements>
//     </div>
//   );
// };

// export default PaymentPage;

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Form, Button } from 'react-bootstrap';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import axios from 'axios';
// // import './Payment.css';

// const stripePromise = loadStripe('pk_test_51Pz1w4LAuyjp8hN9KsG7Pi9ZX1DkIieK5dv8Zl8icQYrswiHtrS9XNM8XmIhJx8qugTBgOGpoYYVbjUuzrBWsOmJ00OSai0tZc');

// const PaymentForm = ({ paymentData, handlePaymentSuccess }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [error, setError] = useState(null);

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements) {
//             return;
//         }

//         const cardElement = elements.getElement(CardElement);

//         try {
//             setError(null);

//             // Create a payment method using Stripe
//             const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
//                 type: 'card',
//                 card: cardElement,
//             });

//             if (paymentMethodError) {
//                 setError(paymentMethodError.message);
//                 return;
//             }

//             // Create a payment intent using the backend
//             const { data: { clientSecret } } = await axios.post('http://localhost:8080/E-Insurance/customer/create-payment-intent', {
//                 amount: Math.round(paymentData.totalPayment * 100),
//                 paymentMethodId: paymentMethod.id,
//                 policyId: paymentData.policyId,
//                 paymentType: paymentData.paymentType,
//                 tax: paymentData.tax,
//                 totalPayment: paymentData.totalPayment,
//             }, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });

//             // Confirm the payment using Stripe
//             const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: paymentMethod.id,
//             });

//             if (stripeError) {
//                 setError(stripeError.message);
//                 return;
//             }

//             handlePaymentSuccess();

//         } catch (error) {
//             console.error('Error processing payment:', error);
//             setError('Payment failed');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="payment-form">
//             <div className="form-group">
//                 <label htmlFor="cardDetails" className="form-label">Card Details</label>
//                 <div id="cardDetails" className="card-element-container shadow-sm rounded">
//                     <CardElement />
//                 </div>
//             </div>
//             {error && <div className="alert alert-danger rounded">{error}</div>}
//             <Button type="submit" className="btn btn-primary btn-block payment-button" disabled={!stripe}>
//                 Pay Now
//             </Button>
//         </form>
//     );
// };

// const PaymentPage = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { scheme, schemeId, investmentAmount, policyTerm, installmentPeriod, installmentAmount, nominees, uploadedDocs } = location.state || {};

//     const [paymentData, setPaymentData] = useState({
//         paymentType: 'credit',
//         amount: 0.0,
//         tax: 0.0,
//         totalPayment: 0.0,
//         policyId: schemeId,
//     });

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const token = localStorage.getItem('authToken');
//                 const taxResponse = await axios.get('http://localhost:8080/E-Insurance/toall/payment-tax', {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     },
//                 });
//                 const tax = taxResponse.data.paymentTax || 0;

//                 const totalPayment = investmentAmount + (investmentAmount * tax / 100);

//                 setPaymentData(prevData => ({
//                     ...prevData,
//                     amount: investmentAmount,
//                     tax: investmentAmount * tax / 100,
//                     totalPayment,
//                 }));
//                 console.log(tax,totalPayment);
//             } catch (error) {
//                 console.error('Failed to load payment details:', error);
//             }
//         };
//         fetchData();
//     }, [investmentAmount, schemeId]);

//     const handlePaymentSuccess = () => {
//         navigate('/confirmation');
//         alert('Policy created successfully!');
//     };

//     return (
//         <div className="payment-container mt-4">
//             <h3 className="mb-4">Payment Details</h3>
//             <div className="container mt-5">
//                 <PaymentForm paymentData={paymentData} handlePaymentSuccess={handlePaymentSuccess} />
//             </div>
//         </div>
//     );
// };

// const PaymentComponent = () => (
//     <Elements stripe={stripePromise}>
//         <PaymentPage />
//     </Elements>
// );

// export default PaymentComponent;


// import React, { useState, useEffect } from 'react'; 
// import { useNavigate, useLocation } from 'react-router-dom'; 
// import { Form, Button } from 'react-bootstrap'; 
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'; 
// import { loadStripe } from '@stripe/stripe-js'; 
// import axios from 'axios';

// const stripePromise = loadStripe('pk_test_51Pz1w4LAuyjp8hN9KsG7Pi9ZX1DkIieK5dv8Zl8icQYrswiHtrS9XNM8XmIhJx8qugTBgOGpoYYVbjUuzrBWsOmJ00OSai0tZc'); 

// const PaymentForm = ({ paymentData, handlePaymentSuccess }) => { 
//     const stripe = useStripe(); 
//     const elements = useElements(); 
//     const [error, setError] = useState(null); 

//     const handleSubmit = async (event) => { 
//         event.preventDefault(); 

//         if (!stripe || !elements) { 
//             return; 
//         } 

//         const cardElement = elements.getElement(CardElement); 

//         try { 
//             setError(null); 

//             // Create a payment method using Stripe 
//             const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({ 
//                 type: 'card', 
//                 card: cardElement, 
//             }); 

//             if (paymentMethodError) { 
//                 setError(paymentMethodError.message); 
//                 return; 
//             } 

//             // Create a payment intent using the backend 
//             const { data: { clientSecret } } = await axios.post('http://localhost:8080/E-Insurance/customer/create-payment-intent', { 
//                 amount: Math.round(paymentData.totalPayment * 100), 
//                 paymentMethodId: paymentMethod.id, 
//                 policyId: paymentData.policyId, 
//                 paymentType: paymentData.paymentType, 
//                 tax: paymentData.tax, 
//                 totalPayment: paymentData.totalPayment, 
//             }, { 
//                 headers: { 
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('authToken')}` 
//                 }, 
//             }); 

//             // Confirm the payment using Stripe 
//             const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, { 
//                 payment_method: paymentMethod.id, 
//             }); 

//             if (stripeError) { 
//                 setError(stripeError.message); 
//                 return; 
//             } 

//             handlePaymentSuccess(); 

//         } catch (error) { 
//             console.error('Error processing payment:', error); 
//             setError('Payment failed'); 
//         } 
//     }; 

//     return ( 
//         <form onSubmit={handleSubmit} className="payment-form"> 
//             <div className="form-group"> 
//                 <label htmlFor="cardDetails" className="form-label">Card Details</label> 
//                 <div id="cardDetails" className="card-element-container shadow-sm rounded"> 
//                     <CardElement /> 
//                 </div> 
//             </div> 
//             {error && <div className="alert alert-danger rounded">{error}</div>} 
//             <Button type="submit" className="btn btn-primary btn-block payment-button" disabled={!stripe}> 
//                 Pay Now 
//             </Button> 
//         </form> 
//     ); 
// }; 

// const PaymentPage = () => { 
//     const navigate = useNavigate(); 
//     const location = useLocation(); 
//     const { scheme, schemeId, investmentAmount, policyTerm, installmentPeriod, installmentAmount, nominees, uploadedDocs } = location.state ||  {}; 

//     const [paymentData, setPaymentData] = useState({ 
//         paymentType: 'credit', 
//         amount: 0.0, 
//         tax: 0.0, 
//         totalPayment: 0.0, 
//         policyId: schemeId, 
//     }); 

//     useEffect(() => { 
//         const fetchData = async () => { 
//             try { 
//                 const taxResponse = await axios.get('http://localhost:8080/E-Insurance/toall/payment-tax', { 
//                     headers: { 
//                         'Content-Type': 'application/json', 
//                     }, 
//                 }); 
//                 const tax = taxResponse.data.paymentTax || 0; 

//                 const totalPayment = investmentAmount + (investmentAmount * tax / 100);
// setPaymentData(prevData => ({ 
//                     ...prevData, 
//                     amount: investmentAmount, 
//                     tax: investmentAmount * tax / 100, 
//                     totalPayment, 
//                 })); 

//                 // Log paymentData for debugging
//                 console.log('Payment Data:', { 
//                     amount: investmentAmount, 
//                     tax: investmentAmount * tax / 100, 
//                     totalPayment, 
//                 }); 
//             } catch (error) { 
//                 console.error('Failed to load payment details:', error); 
//             } 
//         }; 
//         fetchData(); 
//     }, [investmentAmount, schemeId]); 

//     const handlePaymentSuccess = () => { 
//         navigate('/confirmation'); 
//         alert('Policy created successfully!'); 
//     }; 

//     return ( 
//         <div className="payment-container mt-4"> 
//             <h3 className="mb-4">Payment Details</h3> 
//             <div className="container mt-5"> 
//                 <PaymentForm paymentData={paymentData} handlePaymentSuccess={handlePaymentSuccess} /> 
//             </div> 
//         </div> 
//     ); 
// }; 

// const PaymentComponent = () => ( 
//     <Elements stripe={stripePromise}> 
//         <PaymentPage /> 
//     </Elements> 
// ); 

// export default PaymentComponent;
//==========================================================================================
// import React, { useState, useEffect } from 'react'; 
// import { useNavigate, useLocation } from 'react-router-dom'; 
// import { Form, Button } from 'react-bootstrap'; 
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'; 
// import { loadStripe } from '@stripe/stripe-js'; 
// import axios from 'axios'; 

// const stripePromise = loadStripe('pk_test_51Pz1w4LAuyjp8hN9KsG7Pi9ZX1DkIieK5dv8Zl8icQYrswiHtrS9XNM8XmIhJx8qugTBgOGpoYYVbjUuzrBWsOmJ00OSai0tZc'); 

// const PaymentForm = ({ paymentData, handlePaymentSuccess }) => { 
//     const stripe = useStripe(); 
//     const elements = useElements(); 
//     const [error, setError] = useState(null); 

//     const handleSubmit = async (event) => { 
//         event.preventDefault(); 

//         if (!stripe || !elements) { 
//             return; 
//         } 

//         const cardElement = elements.getElement(CardElement); 

//         try { 
//             setError(null); 

//             // Create a payment method using Stripe 
//             const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({ 
//                 type: 'card', 
//                 card: cardElement, 
//             }); 

//             if (paymentMethodError) { 
//                 setError(paymentMethodError.message); 
//                 return; 
//             } 

//             // Create a payment intent using the backend 
//             const { data: { clientSecret } } = await axios.post('http://localhost:8080/E-Insurance/customer/create-payment-intent', { 
//                 amount: Math.round(paymentData.totalPayment * 100), // Ensuring the amount is in the smallest unit, e.g., cents
//                 paymentMethodId: paymentMethod.id, 
//                 policyId: paymentData.policyId, 
//                 paymentType: paymentData.paymentType, 
//                 tax: paymentData.tax, 
//                 totalPayment: paymentData.totalPayment, 
//             }, { 
//                 headers: { 
//                     'Authorization': `Bearer ${localStorage.getItem('authToken')}`, 
//                     'Content-Type': 'application/json', 
//                 }, 
//             }); 

//             // Confirm the payment using Stripe 
//             const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, { 
//                 payment_method: paymentMethod.id, 
//             }); 

//             if (stripeError) { 
//                 setError(stripeError.message); 
//                 return; 
//             } 

//             handlePaymentSuccess(); 

//         } catch (error) { 
//             console.error('Error processing payment:', error); 
//             setError('Payment failed'); 
//         } 
//     }; 
// console.log(paymentData.tax);
//     return ( 
//         <form onSubmit={handleSubmit} className="payment-form"> 
//             <div className="form-group"> 
//                 <label htmlFor="cardDetails" className="form-label">Card Details</label> 
//                 <div id="cardDetails" className="card-element-container shadow-sm rounded"> 
//                     <CardElement /> 
//                 </div> 
//             </div> 
//             {error && <div className="alert alert-danger rounded">{error}</div>} 
//             <Button type="submit" className="btn btn-primary btn-block payment-button" disabled={!stripe}> 
//                 Pay Now 
//             </Button> 
//         </form> 
//     ); 
// }; 

// const PaymentPage = () => { 
//     const navigate = useNavigate(); 
//     const location = useLocation(); 
//     const { scheme, schemeId, investmentAmount, policyTerm, installmentPeriod, installmentAmount, nominees, uploadedDocs } = location.state || {}; 

//     const [paymentData, setPaymentData] = useState({ 
//         paymentType: 'credit', 
//         amount: 0.0, 
//         tax: 0.0, 
//         totalPayment: 0.0, 
//         policyId: schemeId, 
//     });
// useEffect(() => { 
//         const fetchData = async () => { 
//             try { 
//                 const taxResponse = await axios.get('http://localhost:8080/E-Insurance/toall/payment-tax', { 
//                     headers: { 
//                         'Content-Type': 'application/json', 
//                     }, 
//                 }); 
//                 const tax = taxResponse.data.paymentTax || 0; 
//                 console.log(tax);
//                 const taxAmount = parseInt(investmentAmount) * parseInt(tax )/ 100;
//                 console.log(taxAmount);
//                 const totalPayment = parseInt(investmentAmount) + parseInt(taxAmount); 
//                 console.log(totalPayment);
//                 setPaymentData(prevData => ({ 
//                     ...prevData, 
//                     amount: investmentAmount, 
//                     tax: tax, 
//                     totalPayment, 
//                 })); 

//                 console.log('Payment Data:', { 
//                     amount: investmentAmount, 
//                     tax: taxAmount, 
//                     totalPayment, 
//                 }); 
//             } catch (error) { 
//                 console.error('Failed to load payment details:', error); 
//             } 
//         }; 
//         fetchData(); 
//     }, [investmentAmount, schemeId]); 

//     const handlePaymentSuccess = () => { 
//         navigate('/confirmation'); 
//         alert('Policy created successfully!'); 
//     }; 
//     const handleGoBack = () => {
//         navigate(-1); // Goes back to the previous page
//     };

//     return ( 
//         <div className="payment-container mt-4"> 
//             <h3 className="mb-4">Payment Details</h3> 
//             <div className="container mt-5"> 
//                 <PaymentForm paymentData={paymentData} handlePaymentSuccess={handlePaymentSuccess} /> 
//             </div> 
//             <Button onClick={handleGoBack} className="go-back-button">
//                     Go Back!
//                 </Button>
//         </div> 
//     ); 
// }; 

// const PaymentComponent = () => ( 
//     <Elements stripe={stripePromise}> 
//         <PaymentPage /> 
//     </Elements> 
// ); 

// export default PaymentComponent;
//=========================================================================================

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation,useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

// Load your Stripe public key
const stripePromise = loadStripe('pk_test_51Pz1w4LAuyjp8hN9KsG7Pi9ZX1DkIieK5dv8Zl8icQYrswiHtrS9XNM8XmIhJx8qugTBgOGpoYYVbjUuzrBWsOmJ00OSai0tZc');

const PaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { schemeId, investmentAmount, installmentAmount } = location.state || {};
    const { policyId } = useParams(); 

    const [paymentData, setPaymentData] = useState({
        paymentType: 'credit',
        amount: 0.0,
        tax: 0.0,
        totalPayment: 0.0,
        policyId: parseInt(policyId, 10), // Parse policyId as an integer
        installmentAmount: 0.0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const taxResponse = await axios.get('http://localhost:8080/E-Insurance/toall/payment-tax', {
                    headers: { 'Content-Type': 'application/json' },
                });
                const tax = taxResponse.data.paymentTax || 0;
                //const taxAmount = (investmentAmount * tax) / 100;
                //const totalPayment = investmentAmount + taxAmount;
                const taxAmount = (parseInt(installmentAmount) * parseFloat(tax) / 100);
                const totalPayment = parseInt(installmentAmount) + taxAmount;

                setPaymentData({
                    amount: parseInt(installmentAmount),
                    tax: taxAmount,
                    policyId: policyId,
                    totalPayment,
                    installmentAmount, // Use passed installment amount
                });
            } catch (error) {
                console.error('Failed to load payment details:', error);
            }
        };
        fetchData();
    }, [investmentAmount, policyId]);

    const handlePaymentSuccess = () => {
        //navigate('/confirmation');
        alert('Payment DONE!');
        setTimeout(() => {
            navigate('/');
        }, 10000); // 60 seconds delay
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="payment-container mt-4">
            <h3 className="mb-4">Payment Details</h3>
            <div className="container mt-5">
                <PaymentForm paymentData={paymentData} handlePaymentSuccess={handlePaymentSuccess} />
            </div>
            <Button onClick={handleGoBack} className="go-back-button">
                Go Back!
            </Button>
        </div>
    );
};


const PaymentForm = ({ paymentData, handlePaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [paymentType, setPaymentType] = useState('CREDIT'); // Default to CREDIT

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            setError(null);

            // Create a payment method using Stripe
            const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (paymentMethodError) {
                setError(paymentMethodError.message);
                return;
            }

            // Create a payment intent using the backend
            const { data: { clientSecret } } = await axios.post('http://localhost:8080/E-Insurance/customer/create-payment-intent', {
                amount: Math.round(paymentData.amount),
                paymentMethodId: paymentMethod.id,
                policyId: paymentData.policyId,
                paymentType, // Use the selected payment type
                tax: Math.round(paymentData.tax ),
                totalPayment:  paymentData.totalPayment,//Math.round(paymentData.totalPayment * 100),
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json',
                },
            });
           

            // Confirm the payment using Stripe
            const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (stripeError) {
                setError(stripeError.message);
                return;
            }

            handlePaymentSuccess();

        } catch (error) {
            console.error('Error processing payment:', error);
            setError('Payment failed');
        }
    };


    return (
        <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-group">
                <label htmlFor="cardDetails" className="form-label">Card Details</label>
                <div id="cardDetails" className="card-element-container shadow-sm rounded">
                    <CardElement />
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Payment Type</label>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="CREDIT"
                            checked={paymentType === 'CREDIT'}
                            onChange={() => setPaymentType('CREDIT')}
                        />
                        Credit
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="DEBIT"
                            checked={paymentType === 'DEBIT'}
                            onChange={() => setPaymentType('DEBIT')}
                        />
                        Debit
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Installment Amount</label>
                <input type="text" className="form-control" value={paymentData.installmentAmount} readOnly />
            </div>

            <div className="form-group">
                <label className="form-label">Tax Amount</label>
                <input type="text" className="form-control" value={paymentData.tax} readOnly />
            </div>

            {error && <div className="alert alert-danger rounded">{error}</div>}
            <Button type="submit" className="btn btn-primary btn-block payment-button" disabled={!stripe}>
                Pay Now
            </Button>
        </form>
    );
};

const PaymentComponent = () => (
    <Elements stripe={stripePromise}>
        <PaymentPage />
    </Elements>
);

export default PaymentComponent;
