


// import React, { useEffect, useState } from 'react';
// import { Button, Form, Row, Col, Container } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// // import { fetchCustomers, searchCustomersById, searchCustomersByName, searchCustomersByActiveStatus } from '../../../services/customerService';
// import './CustomerList.css';
// import { fetchCustomers ,searchCustomersById,searchCustomersByName,searchCustomersByActiveStatus} from '../../../services/customerService';

// const CustomerList = () => {
//     const navigate = useNavigate();
//     const [customers, setCustomers] = useState([]);
//     const [error, setError] = useState(null);
//     const [page, setPage] = useState(0);
//     const [size, setSize] = useState(10);
//     const [totalPages, setTotalPages] = useState(0);

//     const [searchId, setSearchId] = useState('');
//     const [searchName, setSearchName] = useState('');
//     const [searchActive, setSearchActive] = useState('');

//     useEffect(() => {
//         const getCustomers = async () => {
//             try {
//                 const data = await fetchCustomers(page, size);
//                 setCustomers(data.content);
//                 setTotalPages(data.totalPages);
//             } catch (err) {
//                 setError(err.message);
//             }
//         };
//         getCustomers();
//     }, [page, size]);

//     const handlePageChange = (newPage) => {
//         if (newPage >= 0 && newPage < totalPages) {
//             setPage(newPage);
//         }
//     };

//     const handleSearchById = async () => {
//         try {
//             const data = await searchCustomersById(searchId);
//             setCustomers([data]);
//             setTotalPages(1);
//             setPage(0);
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     const handleSearchByName = async () => {
//         try {
//             const data = await searchCustomersByName(searchName, page, size);
//             setCustomers(data.content);
//             setTotalPages(data.totalPages);
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     const handleSearchByActiveStatus = async () => {
//         try {
//             const data = await searchCustomersByActiveStatus(searchActive === 'true', page, size);
//             setCustomers(data.content);
//             setTotalPages(data.totalPages);
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     const handleGoBack = () => {
//         navigate(-1);
//     };
   
//     return (
//         <Container className="customer-list">
//             <h2>Customer List</h2>
//             <br />

//             <div className="search-section">
//                 <Form>
//                     <Row>
//                         {/* Search by ID */}
//                         <Col md={4}>
//                             <Form.Group controlId="searchById">
//                                 <Form.Label>ID:</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     value={searchId}
//                                     onChange={(e) => setSearchId(e.target.value)}
//                                     placeholder="Search by ID"
//                                 />
//                             </Form.Group>
//                             <Button className="mt-2" onClick={handleSearchById}>Search</Button>
//                         </Col>

//                         {/* Search by Name */}
//                         <Col md={4}>
//                             <Form.Group controlId="searchByName">
//                                 <Form.Label>Name:</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     value={searchName}
//                                     onChange={(e) => setSearchName(e.target.value)}
//                                     placeholder="Search by Name"
//                                 />
//                             </Form.Group>
//                             <Button className="mt-2" onClick={handleSearchByName}>Search</Button>
//                         </Col>

//                         {/* Search by Active Status */}
//                         <Col md={4}>
//                             <Form.Group controlId="searchByActiveStatus">
//                                 <Form.Label>Status:</Form.Label>
//                                 <Form.Control
//                                     as="select"
//                                     value={searchActive}
//                                     onChange={(e) => setSearchActive(e.target.value)}
//                                 >
//                                     <option value="">Select</option>
//                                     <option value="true">Active</option>
//                                     <option value="false">Inactive</option>
//                                 </Form.Control>
//                             </Form.Group>
//                             <Button className="mt-2" onClick={handleSearchByActiveStatus}>Search</Button>
//                         </Col>
                        
//                     </Row>
//                 </Form>
//             </div>

//             <div><Button onClick={handleGoBack} className="go-back-button mt-4">Go Back!</Button></div>

//             {error && <p className="error">{error}</p>}

//             <table border="5" className="table table-striped mt-4">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>First Name</th>
//                         <th>Last Name</th>
//                         <th>Date Of Birth</th>
//                         <th>Active Status</th>
//                         <th>Phone Number</th>
//                         <th>City</th>
//                         <th>Registered Date</th>
//                         <th>Verified</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {customers.map(customer => (
//                         <tr key={customer.customerId}>
//                             <td>{customer.customerId}</td>
//                             <td>{customer.firstName}</td>
//                             <td>{customer.lastName}</td>
//                             <td>{customer.dob}</td>
//                             <td>{customer.active ? 'Active' : 'Inactive'}</td>
//                             <td>{customer.phoneNumber}</td>
//                             <td>{customer.cityName}</td>
//                             <td>{customer.registrationDate}</td>
//                             <td>{customer.verified ? 'Yes' : 'No'}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <div className="pagination">
//                 <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>Previous</button>
//                 <span>Page {page + 1} of {totalPages}</span>
//                 <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages - 1}>Next</button>
//             </div>
//         </Container>
//     );
// };

// export default CustomerList;
//-------------------------------------------------------------------------------------------------
// import React, { useEffect, useState } from 'react';
// import { Button, Form, Row, Col, Container } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import './CustomerList.css';
// import { fetchCustomers, searchCustomersById, searchCustomersByName, searchCustomersByActiveStatus } from '../../../services/customerService';

// const CustomerList = () => {
//     const navigate = useNavigate();
//     const [customers, setCustomers] = useState([]);
//     const [error, setError] = useState(null);
//     const [page, setPage] = useState(0);
//     const [size, setSize] = useState(10);
//     const [totalPages, setTotalPages] = useState(0);

//     const [searchId, setSearchId] = useState('');
//     const [searchName, setSearchName] = useState('');
//     const [searchActive, setSearchActive] = useState('');

//     useEffect(() => {
//         const getCustomers = async () => {
//             try {
//                 const data = await fetchCustomers(page, size);
//                 setCustomers(data.content);
//                 setTotalPages(data.totalPages);
//             } catch (err) {
//                 setError(err.message);
//             }
//         };
//         getCustomers();
//     }, [page, size]);

//     const handlePageChange = (newPage) => {
//         if (newPage >= 0 && newPage < totalPages) {
//             setPage(newPage);
//         }
//     };

//     const handleSearchById = async () => {
//         try {
//             const data = await searchCustomersById(searchId);
//             setCustomers([data]);
//             setTotalPages(1);
//             setPage(0);
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     const handleSearchByName = async () => {
//         try {
//             const data = await searchCustomersByName(searchName, page, size);
//             setCustomers(data.content);
//             setTotalPages(data.totalPages);
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     const handleSearchByActiveStatus = async () => {
//         try {
//             const data = await searchCustomersByActiveStatus(searchActive === 'true', page, size);
//             setCustomers(data.content);
//             setTotalPages(data.totalPages);
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     // New reset function
//     const handleReset = async () => {
//         setSearchId('');         // Clear the ID search field
//         setSearchName('');       // Clear the name search field
//         setSearchActive('');     // Clear the active status field
//         setPage(0);              // Reset to the first page
//         const data = await fetchCustomers(0, size); // Fetch all customers
//         setCustomers(data.content);
//         setTotalPages(data.totalPages);
//     };

//     const handleGoBack = () => {
//         navigate(-1);
//     };

//     return (
//         <Container className="customer-list">
//             <h2>Customer List</h2>
//             <br />

//             <div className="search-section">
//     <Form>
//         <Row>
//             {/* Search by ID */}
//             <Col md={4}>
//                 <Form.Group controlId="searchById">
//                     <Form.Label>ID:</Form.Label>
//                     <Form.Control
//                         type="text"
//                         value={searchId}
//                         onChange={(e) => setSearchId(e.target.value)}
//                         placeholder="Search by ID"
//                     />
//                 </Form.Group>
//                 <Button className="mt-2" onClick={handleSearchById}>Search</Button>
//             </Col>

//             {/* Search by Name */}
//             <Col md={4}>
//                 <Form.Group controlId="searchByName">
//                     <Form.Label>Name:</Form.Label>
//                     <Form.Control
//                         type="text"
//                         value={searchName}
//                         onChange={(e) => setSearchName(e.target.value)}
//                         placeholder="Search by Name"
//                     />
//                 </Form.Group>
//                 <Button className="mt-2" onClick={handleSearchByName}>Search</Button>
//             </Col>

//             {/* Search by Active Status */}
//             <Col md={4}>
//                 <Form.Group controlId="searchByActiveStatus">
//                     <Form.Label>Status:</Form.Label>
//                     <Form.Control
//                         as="select"
//                         value={searchActive}
//                         onChange={(e) => setSearchActive(e.target.value)}
//                     >
//                         <option value="">Select</option>
//                         <option value="true">Active</option>
//                         <option value="false">Inactive</option>
//                     </Form.Control>
//                 </Form.Group>
//                 <Button className="mt-2" onClick={handleSearchByActiveStatus}>Search</Button>
//                 <Button className="mt-2 ms-2" onClick={handleReset} variant="secondary">Reset</Button>
//             </Col>
//         </Row>
//     </Form>
// </div>

//             <div><Button onClick={handleGoBack} className="go-back-button mt-4">Go Back!</Button></div>

//             {error && <p className="error">{error}</p>}

//             <table border="5" className="table table-striped mt-4">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>First Name</th>
//                         <th>Last Name</th>
//                         <th>Date Of Birth</th>
//                         <th>Active Status</th>
//                         <th>Phone Number</th>
//                         <th>City</th>
//                         <th>Registered Date</th>
//                         <th>Verified</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {customers.map(customer => (
//                         <tr key={customer.customerId}>
//                             <td>{customer.customerId}</td>
//                             <td>{customer.firstName}</td>
//                             <td>{customer.lastName}</td>
//                             <td>{customer.dob}</td>
//                             <td>{customer.active ? 'Active' : 'Inactive'}</td>
//                             <td>{customer.phoneNumber}</td>
//                             <td>{customer.cityName}</td>
//                             <td>{customer.registrationDate}</td>
//                             <td>{customer.verified ? 'Yes' : 'No'}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <div className="pagination">
//                 <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>Previous</button>
//                 <span>Page {page + 1} of {totalPages}</span>
//                 <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages - 1}>Next</button>
//             </div>
//         </Container>
//     );
// };

// export default CustomerList;
//---------------------------------------------------------------------------


// import React, { useEffect, useState } from 'react';
// import { Button, Form, Row, Col, Container } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import DynamicTable from '../../../../src/sharedComponents/DynamicTable.js';
// import { ButtonGroup } from 'react-bootstrap';
// import './CustomerList.css';
// import { fetchCustomers, searchCustomersById, searchCustomersByName, searchCustomersByActiveStatus } from '../../../services/customerService';

// const CustomerList = () => {
//     const navigate = useNavigate();
//     const [customers, setCustomers] = useState([]);
//     const [error, setError] = useState(null);
//     const [page, setPage] = useState(0);
//     const [size, setSize] = useState(10);
//     const [totalPages, setTotalPages] = useState(0);

//     const [searchId, setSearchId] = useState('');
//     const [searchName, setSearchName] = useState('');
//     const [searchActive, setSearchActive] = useState('');

//     useEffect(() => {
//         const getCustomers = async () => {
//             try {
//                 const data = await fetchCustomers(page, size);
//                 setCustomers(data.content);
//                 setTotalPages(data.totalPages);
//             } catch (err) {
//                 setError(err.message);
//             }
//         };
//         getCustomers();
//     }, [page, size]);

//     const handlePageChange = (newPage) => {
//         if (newPage >= 0 && newPage < totalPages) {
//             setPage(newPage);
//         }
//     };

//     const handleSearchById = async () => {
//         try {
//             const data = await searchCustomersById(searchId);
//             setCustomers([data]);
//             setTotalPages(1);
//             setPage(0);
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     const handleSearchByName = async () => {
//         try {
//             const data = await searchCustomersByName(searchName, page, size);
//             setCustomers(data.content);
//             setTotalPages(data.totalPages);
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     const handleSearchByActiveStatus = async () => {
//         try {
//             const data = await searchCustomersByActiveStatus(searchActive === 'true', page, size);
//             setCustomers(data.content);
//             setTotalPages(data.totalPages);
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     // New reset function
//     const handleReset = async () => {
//         setSearchId('');         // Clear the ID search field
//         setSearchName('');       // Clear the name search field
//         setSearchActive('');     // Clear the active status field
//         setPage(0);              // Reset to the first page
//         const data = await fetchCustomers(0, size); // Fetch all customers
//         setCustomers(data.content);
//         setTotalPages(data.totalPages);
//     };

//     const handleGoBack = () => {
//         navigate(-1);
//     };

//     // Define columns for the DynamicTable
//     const columns = [
//         { title: 'ID', key: 'customerId' },
//         { title: 'First Name', key: 'firstName' },
//         { title: 'Last Name', key: 'lastName' },
//         { title: 'Date Of Birth', key: 'dob' },
//         { title: 'Active Status', key: 'active' },
//         { title: 'Phone Number', key: 'phoneNumber' },
//         { title: 'City', key: 'cityName' },
//         { title: 'Registered Date', key: 'registrationDate' },
//         { title: 'Verified', key: 'verified' }
//     ];

//     // Define action buttons for each row
//     const renderActions = (customer) => (
//         <ButtonGroup>
//         <Button variant="primary" className="me-2" onClick={() => alert(`Editing customer ${customer.customerId}`)}>Edit</Button>
//         <Button variant="danger" onClick={() => alert(`Deleting customer ${customer.customerId}`)}>Delete</Button>
//     </ButtonGroup>
    
//     );

//     return (
//         <Container className="customer-list" container>
//             <h2>Customer List</h2>
           
//             <div className="search-section">
//                 <Form>
//                     <Row>
//                         <Col md={4}>
//                             <Form.Group controlId="searchById">
//                                 <Form.Label>ID:</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     value={searchId}
//                                     onChange={(e) => setSearchId(e.target.value)}
//                                     placeholder="Search by ID"
//                                 />
//                             </Form.Group>
//                             <Button className="mt-2" onClick={handleSearchById}>Search</Button>
//                         </Col>

//                         <Col md={4}>
//                             <Form.Group controlId="searchByName">
//                                 <Form.Label>Name:</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     value={searchName}
//                                     onChange={(e) => setSearchName(e.target.value)}
//                                     placeholder="Search by Name"
//                                 />
//                             </Form.Group>
//                             <Button className="mt-2" onClick={handleSearchByName}>Search</Button>
//                         </Col>

//                         <Col md={4}>
//                             <Form.Group controlId="searchByActiveStatus">
//                                 <Form.Label>Status:</Form.Label>
//                                 <Form.Control
//                                     as="select"
//                                     value={searchActive}
//                                     onChange={(e) => setSearchActive(e.target.value)}
//                                 >
//                                     <option value="">Select</option>
//                                     <option value="true">Active</option>
//                                     <option value="false">Inactive</option>
//                                 </Form.Control>
//                             </Form.Group>
//                             <Button className="mt-2" onClick={handleSearchByActiveStatus}>Search</Button>
//                             <Button className="mt-2 ms-2" onClick={handleReset} variant="secondary">Reset</Button>
//                         </Col>
//                     </Row>
//                 </Form>
//             </div>


//             {error && <p className="error">{error}</p>}

//             <DynamicTable
//                 data={customers}
//                 columns={columns}
//                 actions={renderActions}
//             />

//             <div className="pagination mt-4">
//                 <Button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>Previous</Button>
//                 <span>Page {page + 1} of {totalPages}</span>
//                 <Button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages - 1}>Next</Button>
//             </div>
//             {/* Page Size Selection */}
//             <Row className="page-size-selection" style={{ marginBottom: '20px' }}>
//                 <Col xs={3}>
//                     <Form.Group>
//                         <Form.Label>Items per page</Form.Label>
//                         <Form.Control
//                             as="select"
//                             value={size}
//                             onChange={(e) => {
//                                 setSize(Number(e.target.value));
//                                 setPage(0); // Reset to first page on size change
//                             }}
//                         >
//                             <option value={1}>1</option>
//                             <option value={5}>5</option>
//                             <option value={10}>10</option>
//                             <option value={20}>20</option>
//                         </Form.Control>
//                     </Form.Group>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default CustomerList;


import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DynamicTable from '../../../../src/sharedComponents/DynamicTable.js';
import { ButtonGroup } from 'react-bootstrap';
import './CustomerList.css';
import { fetchCustomers, searchCustomersById, searchCustomersByName, searchCustomersByActiveStatus } from '../../../services/customerService';

const CustomerList = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const [searchId, setSearchId] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchActive, setSearchActive] = useState('');

    useEffect(() => {
        const getCustomers = async () => {
            try {
                const data = await fetchCustomers(page, size);
                setCustomers(data.content);
                setTotalPages(data.totalPages);
            } catch (err) {
                setError(err.message);
            }
        };
        getCustomers();
    }, [page, size]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    const handleSearchById = async () => {
        try {
            const data = await searchCustomersById(searchId);
            setCustomers([data]);
            setTotalPages(1);
            setPage(0);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSearchByName = async () => {
        try {
            const data = await searchCustomersByName(searchName, page, size);
            setCustomers(data.content);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSearchByActiveStatus = async () => {
        try {
            const data = await searchCustomersByActiveStatus(searchActive === 'true', page, size);
            setCustomers(data.content);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleReset = async () => {
        setSearchId('');
        setSearchName('');
        setSearchActive('');
        setPage(0);
        const data = await fetchCustomers(0, size);
        setCustomers(data.content);
        setTotalPages(data.totalPages);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const columns = [
        { title: 'ID', key: 'customerId' },
        { title: 'First Name', key: 'firstName' },
        { title: 'Last Name', key: 'lastName' },
        { title: 'Date Of Birth', key: 'dob' },
        { title: 'Active Status', key: 'active' },
        { title: 'Phone Number', key: 'phoneNumber' },
        { title: 'City', key: 'cityName' },
        { title: 'Registered Date', key: 'registrationDate' },
        { title: 'Verified', key: 'verified' }
    ];

    const renderActions = (customer) => (
        <ButtonGroup>
            <Button variant="primary" className="me-2" onClick={() => alert(`Editing customer ${customer.customerId}`)}>Edit</Button>
            <Button variant="danger" onClick={() => alert(`Deleting customer ${customer.customerId}`)}>Delete</Button>
        </ButtonGroup>
    );

    return (
        <Container className="customer-list" fluid>
            <h2>Customer List</h2>
           
            <div className="search-section">
                <Form>
                    <Row>
                        <Col md={4}>
                            <Form.Group controlId="searchById">
                                <Form.Label>ID:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={searchId}
                                    onChange={(e) => setSearchId(e.target.value)}
                                    placeholder="Search by ID"
                                />
                            </Form.Group>
                            <Button className="mt-2" onClick={handleSearchById}>Search</Button>
                        </Col>

                        <Col md={4}>
                            <Form.Group controlId="searchByName">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}
                                    placeholder="Search by Name"
                                />
                            </Form.Group>
                            <Button className="mt-2" onClick={handleSearchByName}>Search</Button>
                        </Col>

                        <Col md={4}>
                            <Form.Group controlId="searchByActiveStatus">
                                <Form.Label>Status:</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={searchActive}
                                    onChange={(e) => setSearchActive(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </Form.Control>
                            </Form.Group>
                            <Button className="mt-2" onClick={handleSearchByActiveStatus}>Search</Button>
                            <Button className="mt-2 ms-2" onClick={handleReset} variant="secondary">Reset</Button>
                        </Col>
                    </Row>
                </Form>
            </div>


            {error && <p className="error">{error}</p>}

            <DynamicTable
                data={customers}
                columns={columns}
                actions={renderActions}
            />

            <div className="pagination mt-4">
                <Button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>Previous</Button>
                <span>Page {page + 1} of {totalPages}</span>
                <Button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages - 1}>Next</Button>
            </div>
            
            <Row className="page-size-selection" style={{ marginBottom: '20px' }}>
                <Col xs={3}>
                    <Form.Group>
                        <Form.Label>Items per page</Form.Label>
                        <Form.Control
                            as="select"
                            value={size}
                            onChange={(e) => {
                                setSize(Number(e.target.value));
                                setPage(0);
                            }}
                        >
                            <option value={1}>1</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
        </Container>
    );
};

export default CustomerList;
