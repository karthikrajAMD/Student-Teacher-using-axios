import React, { useContext, useEffect, useState } from "react";
import "./Table.css";
import { Context } from "./Context";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import { ToastContainer, toast } from "react-toastify";
import ReplayIcon from "@mui/icons-material/Replay";
import LoadingPage from "./LoadingPage";
function Teacher() {
  const navigate = useNavigate();
  const { value2 } = useContext(Context);
  const [teacherName, setTeacherName] = value2;
  const [popupShow, setPopupShow] = useState(false);
  let [sendRequest, setSendRequest] = useState(false);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [doj, setDoj] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [subject, setSubject] = useState("");
  const [id, setId] = useState(0);

  const style = {
    width: "100%",
  };
  const loadData = async () => {
    await fetch(`https://638f301f9cbdb0dbe31f8c37.mockapi.io/teacher`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((result) => {
        setTeacherName(result);
      });
  };
  const deleteData = async (n) => {
    if (window.confirm("Press OK to confirm")) {
      toast.success("Data deleted successfully");
      await fetch(`https://638f301f9cbdb0dbe31f8c37.mockapi.io/teacher/${n}`, {
        method: "DELETE",
      });
      setSendRequest(true);
    } else {
      toast.error("Data not deleted");
    }
  };

  useEffect(() => {
    setSendRequest(false);
    loadData();
  }, [sendRequest]);
  async function editData(n) {
    setId(n.id);
    setDob(n.dob);
    setName(n.name);
    setSubject(n.subject);
    setGender(n.gender);
    setRole(n.role);
    setDoj(n.doj);
  }
  const handleClose = () => {
    setPopupShow(false);
  };
  return teacherName ? (
    <div>
      <Modal
        className="TeacherModal"
        show={popupShow}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update your data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="dashboardPopupForm">
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                placeholder="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                placeholder="Role"
                disabled="disabled"
                value={role}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                placeholder="DOB"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of Joining</Form.Label>
              <Form.Control
                type="date"
                placeholder="DOJ"
                value={doj}
                onChange={(e) => setDob(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="DOJ"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button
            variant="primary"
            onClick={() => {
              fetch(
                `https://638f301f9cbdb0dbe31f8c37.mockapi.io/teacher/${id}`,
                {
                  method: "PUT",
                  body: JSON.stringify({
                    name,
                    gender,
                    subject,
                    dob,
                  }),
                  headers: { "Content-Type": "application/json" },
                }
              );
              handleClose();
              sendRequest = true;
              setSendRequest(true);
              toast.success("Data updated");
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="mb-3">
        <Button
          onClick={() => {
            navigate("/AddTeacher");
          }}
        >
          Add Teacher data
        </Button>
        <Button
          className="m-3"
          onClick={() => {
            // sendRequest = true;
            setSendRequest(true);
          }}
        >
          <ReplayIcon />
        </Button>
      </div>
      <div className="tableTeacher">
        <table style={style}>
          <tbody>
            <tr>
              <th>S.no</th>
              <th>Id</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Date-of-Birth</th>
              <th>Date-of-Joining</th>
              <th>Subject</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {teacherName.map((e, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.gender}</td>
                <td>{e.dob}</td>
                <td>{e.doj}</td>
                <td>{e.subject}</td>
                <td>
                  <EditIcon
                    onClick={() => {
                      setPopupShow(true);
                      editData(e);
                    }}
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  />
                </td>
                <td>
                  <ClearIcon
                    onClick={() => {
                      deleteData(e.id);
                    }}
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
      </div>
    </div>
  ) : (
    <LoadingPage />
  );
}

export default Teacher;
