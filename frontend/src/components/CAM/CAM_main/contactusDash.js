import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const Dashboard = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/mobile/contact-us-messages');
            setContacts(response.data); // Assuming your API response is an array of objects
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ marginTop: '5%' }}>
                <h2>Contact Form Data</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(contact => (
                            <tr key={contact._id}>
                                <td>{contact.cusName}</td>
                                <td>{contact.cusEmail}</td>
                                <td>{contact.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </main>
    );
};

export default Dashboard;
