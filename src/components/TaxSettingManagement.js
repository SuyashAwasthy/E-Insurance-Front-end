import React, { useState } from 'react';
import axios from 'axios';

const TaxSettingManagement = () => {
    const [taxRate, setTaxRate] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const taxSetting = { taxRate };
        
        axios.post('http://localhost:8080/E-Insurance/admin/tax-setting', taxSetting)
            .then(response => {
                console.log('Tax Setting Created:', response.data);
            })
            .catch(error => console.error('Error creating tax setting:', error));
    };

    return (
        <div>
            <h2>Manage Tax Settings</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Tax Rate:
                    <input 
                        type="number" 
                        value={taxRate} 
                        onChange={(e) => setTaxRate(e.target.value)} 
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default TaxSettingManagement;
