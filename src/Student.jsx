import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import EditIcon from "@mui/icons-material/Edit";
import { Context } from "./Context";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import { ToastContainer, toast } from "react-toastify";
import ReplayIcon from "@mui/icons-material/Replay";
import LoadingPage from "./LoadingPage";
import "./Table.css";
function Student() {
  const navigate = useNavigate();
  const { value2 } = useContext(Context);
  const [stuName, setStuName] = value2;
  const [popupShow, setPopupShow] = useState(false);
  let [sendRequest, setSendRequest] = useState(false);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [section, setSection] = useState("");
  const [gender, setGender] = useState("");
  const [rollno, setRollno] = useState("");
  const [std, setStd] = useState("");
  const [id, setId] = useState(0);
  const style = {
    width: "100%",
  };
  const loadData = async () => {
    await fetch(`https://638f301f9cbdb0dbe31f8c37.mockapi.io/student`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((result) => {
        setStuName(result);
      });
  };
  // useEffect(() => {
  //   fetch(`https://638f301f9cbdb0dbe31f8c37.mockapi.io/student`, {
  //     method: "GET",
  //   })
  //     .then((data) => data.json())
  //     .then((result) => {
  //       setStuName(result);
  //     });
  // }, []);
  useEffect(() => {
    setSendRequest(false);
    loadData();
  }, [sendRequest]);
  async function editData(n) {
    console.log(n);
    setId(n.id);
    setDob(n.dob);
    setRollno(n.rollno);
    setGender(n.gender);
    setName(n.name);
    setStd(n.std);
    setSection(n.section);
  }
  const handleClose = () => {
    setPopupShow(false);
  };
  const deleteData = async (n) => {
    if (window.confirm("Press OK to confirm")) {
      toast.success("Data deleted successfully");
      await fetch(`https://638f301f9cbdb0dbe31f8c37.mockapi.io/student/${n}`, {
        method: "DELETE",
      });
      setSendRequest(true);
    } else {
      toast.error("Data not deleted");
    }
  };
  return stuName ? (
    <div>
      <Modal
        className="p-5"
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
              <Form.Label>Roll.No</Form.Label>
              <Form.Control
                type="text"
                placeholder="Roll.No"
                value={rollno}
                onChange={(e) => setRollno(e.target.value)}
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
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                placeholder="DOB"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Class</Form.Label>
              <Form.Control
                type="text"
                placeholder="Class"
                value={std}
                onChange={(e) => setStd(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Section</Form.Label>
              <Form.Control
                type="text"
                placeholder="Section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
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
                `https://638f301f9cbdb0dbe31f8c37.mockapi.io/student/${id}`,
                {
                  method: "PUT",
                  body: JSON.stringify({
                    name,
                    rollno,
                    dob,
                    std,
                    section,
                  }),
                  headers: { "Content-Type": "application/json" },
                }
              )
                .then((data) => data.json())
                .then((data) => console.log(data));
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
            navigate("/AddStudent");
          }}
        >
          Add Student data
        </Button>
        <Button
          className="m-3"
          onClick={() => {
            setSendRequest(true);
          }}
        >
          <ReplayIcon />
        </Button>
      </div>
      <div className="tableStudent">
        <table style={style}>
          <tbody>
            <tr>
              <th>S.no</th>
              {/* <th>Id</th> */}
              <th>Name</th>
              <th>Gender</th>
              <th>Roll.No</th>
              <th>Date-of-Birth</th>
              <th>Class</th>
              <th>Section</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {stuName.map((e, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                {/* <td>{e.id}</td> */}
                <td>{e.name}</td>
                <td>{e.gender}</td>
                <td>{e.rollno}</td>
                <td>{e.dob}</td>
                <td>{e.std}</td>
                <td>{e.section}</td>
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

export default Student;
