import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Form,
  Button,
  Table,
  Card,
  Row,
  Col,
} from "react-bootstrap";

// This is the constant for the backend API base URL
const API_URL = "https://fitness-booking-backend.onrender.com/bookings";

function App() {
  // This is the state for storing all bookings from the backend
  const [bookings, setBookings] = useState([]);

  // This is the state for managing form input data
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    phone_number: "",
    email: "",
    user_id: "",
  });

  // This is the state for tracking if the user is editing a booking
  const [editId, setEditId] = useState(null);

  // This is the function for fetching bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, []);

  // This is the function for retrieving bookings from the backend API
  const fetchBookings = async () => {
    try {
      const res = await axios.get(API_URL);
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  // This is the function for handling input field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // This is the function for submitting the booking form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // This is the function for updating an existing booking
        await axios.put(`${API_URL}/${editId}`, form);
        setEditId(null);
      } else {
        // This is the function for creating a new booking
        await axios.post(API_URL, form);
      }

      // This is the function for resetting the form and refreshing data
      setForm({
        title: "",
        description: "",
        date: "",
        time: "",
        phone_number: "",
        email: "",
        user_id: "",
      });
      fetchBookings();
    } catch (err) {
      console.error("Error saving booking:", err);
    }
  };

  // This is the function for populating the form with an existing booking to edit
  const handleEdit = (booking) => {
    setForm(booking);
    setEditId(booking.id);
  };

  // This is the function for deleting a booking
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchBookings();
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  return (
    <Container className="py-4">
      <Card className="p-4 shadow rounded-4 bg-light">
        <h2 className="text-center mb-4">
          Fitness & Wellness Booking System
        </h2>

        {/* This is the booking form section */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Control
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Control
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={form.phone_number}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="user_id"
              placeholder="User ID"
              value={form.user_id}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit" className="w-100" variant="primary">
            {editId ? "Update Booking" : "Book"}
          </Button>
        </Form>

        <hr />

        {/* This is the table for displaying bookings */}
        <Table
          striped
          bordered
          hover
          responsive
          className="mt-4 bg-white rounded-3"
        >
          <thead>
            <tr>
              <th>#</th>
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
            {bookings.map((booking, index) => (
              <tr key={booking.id}>
                <td>{index + 1}</td>
                <td>{booking.title}</td>
                <td>{booking.description}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.phone_number}</td>
                <td>{booking.email}</td>
                <td>{booking.user_id}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(booking)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(booking.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}

export default App;
