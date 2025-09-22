import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Nav,
  Tab,
  Table,
  Form,
  Badge,
  InputGroup,
} from "react-bootstrap";
import {
  People,
  PersonCheck,
  Book,
  Bullseye,
  Geo,
} from "react-bootstrap-icons";
import Header from "../../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search, Funnel, Eye, Pencil } from "react-bootstrap-icons";
import ManageUsers from "../admin/ManageUsers";
import QuizModal from "./QuizModal";
import ManageQuizzes from "./ManageQuizzes";
import { CpuIcon } from "lucide-react";
import { supabase } from "../../supabaseClient";

import { Spinner } from "react-bootstrap";
const AdminDashboard = () => {
  const [show, setShow] = useState(false);
  const [totalUsers, setTotalUsers] = useState(undefined);
  const [quizNumbers, setQuizNumbers] = useState(undefined);
  const [questionsNumbers, setQuestionsNumbers] = useState(undefined);
  useEffect(() => {
    const getQuizNumbers = async () => {
      const { data, error } = await supabase.from("quiz").select("*");
      if (error) {
        console.log(error);
        return;
      }
      setQuizNumbers(data.length);
    };
    const getUsersNumbers = async () => {
      const { data, error } = await supabase.from("user_profiles").select("*");

      if (error) {
        console.log(error);
        return;
      }
      setTotalUsers(data.length);
    };
    const getQuestionsNumber = async () => {
      const { data, error } = await supabase.from("questions").select("*");

      if (error) {
        console.log(error);
        return;
      }
      setQuestionsNumbers(data.length);
    };

    getUsersNumbers();
    getQuizNumbers();
    getQuestionsNumber();
  }, []);
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Header />
      <QuizModal show={show} handleClose={handleClose} />

      <Container fluid className="p-4 bg-light min-vh-100 ">
        {/* Header */}
        <Row className="align-items-center mb-4    ">
          <Col>
            <h3 className="d-inline fw-bold">Admin Dashboard</h3>
            <p className="text-muted">Manage your quiz application</p>
          </Col>
          <Col className="text-end">
            <Button
              variant="dark"
              className="rounded-pill px-4 shadow-sm"
              onClick={() => setShow(true)}
            >
              + Create Quiz
            </Button>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row className="g-4 mb-4 d-flex ">
          <Col md={3}>
            <Card className="h-100 shadow-sm border-0 rounded-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="text-muted">Total Users</h6>
                    <h3 className="fw-bold">
                      {totalUsers === undefined ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="lg"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                      ) : totalUsers ? (
                        totalUsers
                      ) : (
                        0
                      )}
                    </h3>
                  </div>
                  <People size={28} className="text-secondary" />
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="h-100 shadow-sm border-0 rounded-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="text-muted">Total Quizzes</h6>
                    <h3 className="fw-bold">
                      {quizNumbers === undefined ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="lg"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                      ) : quizNumbers ? (
                        quizNumbers
                      ) : (
                        0
                      )}
                    </h3>
                  </div>
                  <Book size={28} className="text-secondary" />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100 shadow-sm border-0 rounded-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="text-muted">Total Questions </h6>
                    <h3 className="fw-bold">
                      {questionsNumbers === undefined ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="lg"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                      ) : (
                        questionsNumbers
                      )}
                    </h3>
                  </div>
                  <Book size={28} className="text-secondary" />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Navigation Tabs + Content */}
        <Tab.Container defaultActiveKey="users">
          <Row>
            <Col>
              <Nav variant="tabs" className="fw-semibold mb-3">
                <Nav.Item>
                  <Nav.Link eventKey="users">Users</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="quizzes">Quizzes</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>

          <Row>
            <Col>
              <Tab.Content>
                <Tab.Pane eventKey="users">
                  <ManageUsers />
                </Tab.Pane>

                <Tab.Pane eventKey="quizzes">
                  <Card body className="shadow-sm border-0 rounded-4">
                    <ManageQuizzes />
                  </Card>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
};

export default AdminDashboard;
