import React, { useState } from 'react';
import Swal from 'sweetalert2';
// const Swal = require('sweetalert2');

const CustomerSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([
    {
      name: 'Ankit Verma',
      accountNumber: '1234567890',
      balance: 5000,
    },
    {
      name: 'Satyam Verma',
      accountNumber: '2345678901',
      balance: 7500,
    },
    {
      name: 'Bob Johnson',
      accountNumber: '3456789012',
      balance: 3200,
    },
    {
      name: 'Alice Brown',
      accountNumber: '4567890123',
      balance: 6000,
    },
    // Add more dummy customer objects here
  ]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [senderAccountNumber, setSenderAccountNumber] = useState('');
  const [receiverAccountNumber, setReceiverAccountNumber] = useState('');
  const [receiverName, setReceiverName] = useState('');

  const [amountToSend, setAmountToSend] = useState('');


  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearchTerm(searchText);
    setShowDropdown(searchText.length > 0); // Show the dropdown if there's input
  };

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowDropdown(false);
    setSearchTerm('');
    setSenderAccountNumber(customer.accountNumber); // Set the sender's account number
  };
  


  const handleReceiverAccountNumberChange = (e) => {
    setReceiverAccountNumber(e.target.value);
  };
  
  const handleReceiverNameChange = (e) => {
    setReceiverName(e.target.value);
  };
  

  const handleSenderAccountNumberChange = (e) => {
    setSenderAccountNumber(e.target.value);
  };
  
  const handleAmountToSendChange = (e) => {
    setAmountToSend(e.target.value);
  };
  
  

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleMoneyTransfer = () => {
    // Find the sender and receiver based on account numbers
    const senderIndex = customers.findIndex((customer) => customer.accountNumber === senderAccountNumber);
    const receiverIndex = customers.findIndex((customer) => customer.accountNumber === receiverAccountNumber);
  
    if (senderIndex === -1 || receiverIndex === -1) {
      // Handle invalid sender or receiver
      console.log('Invalid sender or receiver');
      return;
    }
  
    // Convert the amount to a number
    const amount = parseFloat(amountToSend);
  
    if (isNaN(amount) || amount <= 0) {
      // Handle invalid amount
      console.log('Invalid amount');
      return;
    }
  
    if (customers[senderIndex].balance < amount) {
      // Handle insufficient balance in sender's account
      console.log('Insufficient balance');
      return;
    }
  
    // Deduct the amount from the sender's balance
    customers[senderIndex].balance -= amount;
  
    // Add the amount to the receiver's balance
    customers[receiverIndex].balance += amount;
  
    // Update the state of customers
    const updatedCustomers = [...customers];
  
    setCustomers(updatedCustomers);
  
    // Reset sender's and receiver's information and amount to send
    setSenderAccountNumber('');
    setReceiverAccountNumber('');
    setReceiverName('');
    setAmountToSend('');
    Swal.fire({
        title: 'Money Transferred Sucessfully',
        icon: 'success',
        type: 'success'
    });
  
    // Show a success message
    console.log(`Successfully sent $${amount} from ${customers[senderIndex].name} to ${customers[receiverIndex].name}`);
  };
  
  
  

  return (
    <div className="container mt-4 w-50">
      <h2 className="mb-3">Banking System Panel</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Select Sender"
          value={searchTerm}
          onChange={handleSearch}
        />
        {showDropdown && (
          <div className="dropdown mt-1">
            <ul className="dropdown-menu" style={{ display: 'block', listStyle: 'none' }}>
              {filteredCustomers.map((customer, index) => (
                <li
                  key={index}
                  className="dropdown-item cursor-pointer"
                  onClick={() => handleSelectCustomer(customer)}
                >
                  {customer.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="mt-3">
        <strong>Sender:</strong>
        {selectedCustomer ? (
  <div>
    <div>Name: {selectedCustomer.name}</div>
    <div>Account Number: {selectedCustomer.accountNumber}</div>
    <div>Balance: Rs {selectedCustomer.balance}</div>
  </div>
) : (
  'None'
)}

<div className="mt-2">
  <input
    type="text"
    className="form-control"
    placeholder="Receiver Name"
    value={receiverName}
    onChange={handleReceiverNameChange}
    required
  />
</div>

<div className="mt-2">
  <input
    type="text"
    className="form-control"
    placeholder="Receiver Account Number"
    value={receiverAccountNumber}
    onChange={handleReceiverAccountNumberChange}
    required
  />
</div>
<div className="mt-2">
  <input
    type="number"
    className="form-control"
    placeholder="Enter Amount To Be Sent"
    value={amountToSend}
    onChange={handleAmountToSendChange}
    required
  />
  </div>
  
        <button className="mt-2" onClick={handleMoneyTransfer}>Send Money</button>

      </div>
    </div>
  );
};

export default CustomerSearch;
