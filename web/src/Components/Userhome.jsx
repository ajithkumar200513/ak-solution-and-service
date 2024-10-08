import React, { useEffect, useState } from 'react';
import { UseUserLogout } from '../Hooks/UseUserLogout';
import { UseUserContext } from '../Hooks/UseUserContext';

const UserHome = () => {
  const { logout } = UseUserLogout();
  const { User } = UseUserContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [Data, setData] = useState([]);

  const handleLogout = () => {
    logout();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !contactNumber || !address || !productName || !productDescription) {
      alert('Please fill in all required fields.');
      return;
    }
    const data = {
      Name: name,
      Email: email,
      Product_Name: productName,
      Product_Description: productDescription,
      Address: address,
      Contact_Number: contactNumber,
      Customer_Address: companyAddress,
      Customer_Name: companyName
    };

    const response = await fetch(`https://ak-solution-and-service.onrender.com/Ak_Web/UserAccess/postdata/${User.userid}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${User.token}`
      }
    });

    if (response.ok) {
      alert('Data submitted successfully');
    } else {
      alert('Failed to submit data');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://ak-solution-and-service.onrender.com/Ak_Web/UserAccess/getdata/${User.userid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${User.token}`
        }
      });

      if (response.ok) {
        setData(await response.json());
      } else {
        console.error('Failed to fetch data');
      }
    };

    fetchData();
  }, [User]);

  return (
    <div className="user-home">
      <header className="header">
        <h1 className="brand-name">ZyberX</h1>
        <h3 className="tagline">Innovate Beyond Boundaries</h3>
      </header>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="user-form">
          <label htmlFor='cn'>Name</label>
          <input type='text' id='cn' value={name} onChange={(e) => setName(e.target.value)} />

          <label htmlFor='pid'>Email</label>
          <input type='text' id='pid' value={email} onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor='cno'>Contact No</label>
          <input type='text' id='cno' value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />

          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows="5"
          />

          <label htmlFor='pna'>Product Name</label>
          <input type='text' id='pna' value={productName} onChange={(e) => setProductName(e.target.value)} />

          <label htmlFor="product-description">Product Description</label>
          <textarea
            id="product-description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            rows="5"
          />

          <label htmlFor='cna'>Company Name (Optional)</label>
          <input type='text' id='cna' value={companyName} onChange={(e) => setCompanyName(e.target.value)} />

          <label htmlFor='company-address'>Company Address (Optional)</label>
          <input type='text' id='company-address' value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} />

          <div className="form-actions">
            <button type="submit" className="submit-button">Submit</button>
            <button type="button" onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        </form>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Product Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Data.length > 0 ? Data.map((item, index) => (
            <tr key={index}>
              <td>{item.Name}</td>
              <td>{item.Product_Name}</td>
              <td>{item.Email}</td>
              <td>
                {item.Approved ? (
                  <p style={{ color: 'green', textDecoration: 'underline', fontSize:'large' }}>Approved</p> // Golden color
                ) : (
                  <p style={{ color: 'red' }}>Pending</p> // White color
                )}
              </td>
            </tr>
          )) : <tr><td colSpan="4">Data Not Available</td></tr>}
        </tbody>
      </table>
      <style>
        {`
          .user-home {
            font-family: 'Arial', sans-serif;
            background: #2F2F2F; /* Black background */
            color: #fff; /* White text */
            padding: 20px;
            min-height: 100vh;
            box-sizing: border-box;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .brand-name {
            font-size: 2.5rem;
            color: #ffd700; /* Golden color */
            margin-bottom: 10px;
            font-weight: bold;
          }
          .tagline {
            font-size: 1.5rem;
            color: #ffd700; /* Golden color */
            margin-bottom: 20px;
            font-weight: 300;
          }
          .form-container {
            background: black; /* White background for form */
            padding: 30px;
            border-radius: 8px;
            max-width: 900px;
            margin: auto;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            border: 1px solid #ddd;
          }
          .user-form label {
            display: block;
            margin: 10px 0 5px;
            font-weight: bold;
            color: #fff; /* Dark grey for labels */
          }
          .user-form input,
          .user-form textarea {
            width: 100%;
            padding: 12px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-sizing: border-box;
            font-size: 1rem;
            transition: border-color 0.3s, box-shadow 0.3s;
          }
          .user-form input:focus,
          .user-form textarea:focus {
            border-color: #ffd700; /* Golden color focus border */
            box-shadow: 0 0 5px rgba(255, 215, 0, 0.5); /* Golden color shadow */
            outline: none;
          }
          .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: 15px;
            margin-top: 20px;
          }
          .submit-button,
          .logout-button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            color: #000; /* Black text */
            transition: background-color 0.3s, transform 0.3s;
          }
          .submit-button {
            background-color: #ffd700; /* Golden color */
          }
          .submit-button:hover {
            background-color: #ffcc00; /* Slightly darker golden color */
            transform: translateY(-2px);
          }
          .logout-button {
            background-color: #000; /* Black color */
            color: #ffd700; /* Golden text */
          }
          .logout-button:hover {
            background-color: #333; /* Darker black for hover */
            color: #fff; /* White text for hover */
            transform: translateY(-2px);
          }
          .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 30px;
          }
          .data-table th,
          .data-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          .data-table th {
            background-color: #000; /* Black background for header */
            color: #ffd700; /* Golden text for header */
          }
          .data-table tr:nth-child(even) {
            background-color: #333; /* Darker grey for even rows */
          }
        `}
      </style>
    </div>
  );
};

export default UserHome;
