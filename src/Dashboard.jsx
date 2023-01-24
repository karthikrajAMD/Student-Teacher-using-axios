import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingPage from "./LoadingPage";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import axios from "axios";
import "./port.css";
import "./Table.css";
import { ToastContainer, toast } from "react-toastify";
function Dashboard() {
  const [show, setShow] = useState(true);
  const [teacherStudentSwitch, setTeacherStudentSwitch] = useState(true);
  const [teacherData, setTeacherData] = useState(false);
  const [studentData, setStudentData] = useState(false);
  const [sendRequest, setSendRequest] = useState(false);
  let loadData = async () => {
    // await fetch("https://638f301f9cbdb0dbe31f8c37.mockapi.io/teacher")
    //   .then((data) => data.json())
    //   .then((data) => {
    //     setTeacherData(data);
    //   });
    let teacherlist = await axios
      .get("https://638f301f9cbdb0dbe31f8c37.mockapi.io/teacher")
      .then((res) => {
        if (res.status === 200) {
          setTeacherData(res.data);
        } else {
          toast.error("Error in fetching");
        }
      });
    let studentslist = await axios
      .get("https://638f301f9cbdb0dbe31f8c37.mockapi.io/student")
      .then((res) => {
        if (res.status === 200) {
          setStudentData(res.data);
        } else {
          toast.error("Error in fetching");
        }
      });
  };
  useEffect(() => {
    loadData();
    setSendRequest(false);
  }, [sendRequest]);

  return (
    <>
      {show ? (
        <div className="port">
          <div
            className="teacher-port"
            onClick={() => {
              setShow(show ? false : true);
              setTeacherStudentSwitch(true);
            }}
          >
            Teacher
          </div>
          <div
            className="student-port"
            onClick={() => {
              setShow(show ? false : true);
              setTeacherStudentSwitch(false);
            }}
          >
            Student
          </div>
        </div>
      ) : (
        <div>
          {teacherStudentSwitch ? (
            <div>
              {teacherData ? (
                <div>
                  <div
                    className="back-click"
                    onClick={() => {
                      setShow(true);
                    }}
                  >
                    <ArrowBackIosNewIcon />
                  </div>
                  <table className="teacher-table">
                    <tbody>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Date-of_Birth</th>
                        <th>Subject</th>
                        <th>Date of Joining</th>
                        <th>Role</th>
                      </tr>
                      {teacherData.map((n) => (
                        <tr key={n.id}>
                          <td>{n.id}</td>
                          <td>{n.name}</td>
                          <td>{n.gender}</td>
                          <td>{n.dob}</td>
                          <td>{n.subject}</td>
                          <td>{n.doj}</td>
                          <td>{n.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <LoadingPage />
              )}
            </div>
          ) : (
            <div>
              {studentData ? (
                <div>
                  <div
                    className="back-click"
                    onClick={() => {
                      setShow(true);
                    }}
                  >
                    <ArrowBackIosNewIcon />
                  </div>
                  <table className="teacher-table">
                    <tbody>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>class</th>
                        <th>Section</th>
                        <th>Roll.No</th>
                        <th>Gender</th>
                        <th>Date-of_Birth</th>
                        <th>Role</th>
                      </tr>
                      {studentData.map((n) => (
                        <tr key={n.id}>
                          <td>{n.id}</td>
                          <td>{n.name}</td>
                          <td>{n.std}</td>
                          <td>{n.section}</td>
                          <td>{n.rollno}</td>
                          <td>{n.gender}</td>
                          <td>{n.dob}</td>
                          <td>{n.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <LoadingPage />
              )}
            </div>
          )}
        </div>
      )}
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
    </>
  );
}

export default Dashboard;
