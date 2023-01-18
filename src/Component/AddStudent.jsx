import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function AddStudent() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const role = "Student";
  const [std, setStd] = useState("");
  const [section, setSection] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      postStudent();
    }
    setValidated(true);
    //
    // navigate("/Student");
  };
  const move = async () => {
    console.log(validated);
  };
  const handleChange = (event) => {
    setGender(event.target.value);
  };
  const postStudent = async () => {
    try {
      if (
        name !== "" &&
        gender !== "" &&
        rollno !== "" &&
        dob !== "" &&
        std !== "" &&
        section !== ""
      ) {
        console.log(name, dob, gender, role, std, section);
        await fetch(`https://638f301f9cbdb0dbe31f8c37.mockapi.io/student`, {
          method: "POST",
          body: JSON.stringify({
            name,
            role,
            rollno,
            gender,
            dob,
            std,
            section,
          }),
          headers: { "Content-Type": "application/json" },
        });
        toast.success("Student Data added");
        setTimeout(() => {
          navigate("/Student");
        }, 2000);
      } else {
        toast.error("Error in adding");
      }
    } catch (error) {
      toast.error("Server Error");
      console.log(error);
    }
  };
  return (
    <Col xs={6} className="Add-form">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              required
              type="text"
              placeholder="Enter Name"
              onChange={(e) =>
                setName(
                  e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1)
                )
              }
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Name.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formRollNo">
          <Form.Label>Roll No</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              required
              type="number"
              placeholder="Enter RollNo"
              onChange={(e) => setRollno(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Roll number.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDateOfBirth">
          <Form.Label>Date of Birth</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              required
              type="date"
              placeholder="Enter Date of Birth"
              onChange={(e) => setDob(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Date of birth.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDateOfBirth">
          <Form.Label>Gender</Form.Label>
          <InputGroup hasValidation>
            <Form.Check
              inline
              label="Male"
              value="male"
              checked={gender === "male"}
              onChange={handleChange}
              name="group1"
              type="radio"
            />
            <Form.Check
              inline
              label="Female"
              value="female"
              name="group1"
              checked={gender === "female"}
              onChange={handleChange}
              type="radio"
            />
            <Form.Control.Feedback type="invalid">
              Select Gender.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formClass">
          <Form.Label>Class</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              required
              type="number"
              placeholder="Enter Class"
              onChange={(e) => setStd(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please Enter a class.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDateOfBirth">
          <Form.Label>Section</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              required
              type="text"
              placeholder="Enter Section"
              onChange={(e) =>
                setSection(e.target.value.charAt(0).toUpperCase())
              }
            />
            <Form.Control.Feedback type="invalid">
              Please Enter a section.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            move();
          }}
        >
          Submit
        </Button>
      </Form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Col>
  );
}

export default AddStudent;
