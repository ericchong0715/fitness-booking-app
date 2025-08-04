// App.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button, Form, Row, Col } from 'react-bootstrap';

const API_URL =
  'https://b8be05fa-034a-46fb-9e53-944045e3f530-00-2xk5c43ij5iui.sisko.replit.dev';

type Booking = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  phone_number: string;
  email: string;
  user_id: string;
};

export default function App() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [form, setForm] = useState<Partial<Booking>>({});
  const [editingId, setEditingId] = useState<number | null>(null);

  // Load bookings on page load
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await axios.get(`${API_URL}/bookings`);
    setBookings(res.data);
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (editingId !== null) {
      await axios.put(`${API_URL}/bookings/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post(`${API_URL}/bookings`, form);
    }
    setForm({});
    fetchBookings();
  };

  const handleEdit = (booking: Booking) => {
    setForm(booking);
    setEditingId(booking.id);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`${API_URL}/bookings/${id}`);
    fetchBookings();
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Fitness & Wellness Booking System</h2>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Control
              placeholder="Title"
              name="title"
              value={form.title || ''}
              onChange={handleChange}
              required
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Description"
              name="description"
              value={form.description || ''}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Form.Control
              placeholder="Date"
              name="date"
              value={form.date || ''}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Time"
              name="time"
              value={form.time || ''}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Form.Control
              placeholder="Phone Number"
              name="phone_number"
              value={form.phone_number || ''}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Email"
              name="email"
              value={form.email || ''}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="User ID"
              name="user_id"
              value={form.user_id || ''}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Button className="mt-3" variant="primary" type="submit">
          {editingId ? 'Update Booking' : 'Add Booking'}
        </Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Time</th>
            <th>Phone</th>
            <th>Email</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.description}</td>
              <td>{b.date}</td>
              <td>{b.time}</td>
              <td>{b.phone_number}</td>
              <td>{b.email}</td>
              <td>{b.user_id}</td>
              <td>
                <Button
                  size="sm"
                  onClick={() => handleEdit(b)}
                  variant="warning"
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDelete(b.id)}
                  variant="danger"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
