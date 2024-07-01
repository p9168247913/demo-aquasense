import React, { useState } from 'react'
import { Button, Container, Form, Row, Col, Image, InputGroup } from 'react-bootstrap'
import { Visibility, VisibilityOff, Edit } from '@mui/icons-material'

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
  { value: 'guest', label: 'Guest' },
]

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [editMode, setEditMode] = useState(false) // State to manage edit mode

  const initialProfileState = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    role: 'user',
    deviceId: '12345',
    password: 'password123',
    confirmPassword: 'password123',
    profileImage: 'https://via.placeholder.com/150',
  }

  const [profile, setProfile] = useState(initialProfileState)
  const [editableProfile, setEditableProfile] = useState(initialProfileState) // Separate state for editable profile

  const handleChange = (e) => {
    setEditableProfile({ ...editableProfile, [e.target.name]: e.target.value })
  }

  const handleSaveChanges = () => {
    // Handle save changes logic here
    setProfile(editableProfile) // Update main profile state with edited values
    setEditMode(false) // Exit edit mode
  }

  const toggleEditMode = () => {
    if (!editMode) {
      setEditableProfile(profile) // Initialize editableProfile with current profile data
    }
    setEditMode(!editMode) // Toggle edit mode
  }

  

  return (
    <Container className="mt-4 d-flex flex-column align-items-center">
      <Image
        src={profile.profileImage}
        alt="Profile"
        roundedCircle
        className="mb-2"
        style={{ width: '200px', height: '200px' }}
      />
      <h1>
        User Profile
        <Button variant="link" onClick={toggleEditMode}>
          <Edit />
        </Button>
      </h1>
      <Form className="w-100 mt-3">
        <Row>
          <Col sm={6}>
            <Form.Group controlId="name">
              <Form.Label className=''>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editMode ? editableProfile.name : profile.name}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editMode ? editableProfile.email : profile.email}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={editMode ? editableProfile.phone : profile.phone}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={editMode ? editableProfile.role : profile.role}
                onChange={handleChange}
                disabled={!editMode}
              >
                {roles.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group controlId="deviceId">
              <Form.Label>Device ID</Form.Label>
              <Form.Control
                type="text"
                name="deviceId"
                value={editMode ? editableProfile.deviceId : profile.deviceId}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Form.Group>
          </Col>
          {editMode && (
            <>
              <Col sm={6}>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={editableProfile.password}
                      onChange={handleChange}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ zIndex: 1 }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </Button>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={editableProfile.confirmPassword}
                      onChange={handleChange}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{ zIndex: 1 }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </Button>
                  </InputGroup>
                </Form.Group>
              </Col>
            </>
          )}
        </Row>
      </Form>

      {editMode && (
        <div className="text-center mt-3">
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </div>
      )}
    </Container>
  )
}

export default Profile
