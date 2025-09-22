import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  Table,
  Form,
  Button,
  InputGroup,
  Badge,
  Modal,
  Spinner,
} from "react-bootstrap";

import {
  Search,
  Funnel,
  Trash,
  Eye,
  Pencil,
  PlusCircle,
} from "react-bootstrap-icons";
import { supabase } from "../../supabaseClient";
import toast from "react-hot-toast";
import ConfirmDeletingModal from "./ConfirmDeletingModal";
import UpdateQuizModal from "./UpdateQuizModal";
const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(undefined);
  const [selectedQuiz, setSelectedQuiz] = useState(undefined);
  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("quiz").select("*");
      if (error) {
        throw error;
      }

      console.log("data", data);
      if (data) {
        setQuizzes(data);
        console.log(data);
      }
    } catch (e) {
      console.log(e.message);
      toast.error(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);
  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner
          as="span"
          animation="border"
          size="lg"
          role="status"
          aria-hidden="true"
          className="me-2"
        />
      </div>
    );
  }
  return (
    <Card className="shadow-sm border-0 rounded-4">
      <Card.Body>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">📚 Quiz Management</h5>
        </div>

        {/* Table */}
        <Table hover responsive className="align-middle">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Section</th>
              <th>Difficulty</th>
              <th>Created At</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.length === 0 ? (
              <tr>
                <td>
                  <div className="text-muted text-center">No quizzes found</div>
                </td>
              </tr>
            ) : (
              quizzes.map((quiz) => (
                <tr key={quiz.id}>
                  <td className="fw-semibold">{quiz.title}</td>
                  <td>
                    <Badge bg="info" text="dark">
                      {quiz.section}
                    </Badge>
                  </td>
                  <td>
                    <Badge
                      bg={
                        quiz.difficulty === "easy"
                          ? "success"
                          : quiz.difficulty === "medium"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {quiz.difficulty}
                    </Badge>
                  </td>
                  <td>{quiz.created_at}</td>
                  <td className="text-center">
                    <Button
                      size="sm"
                      variant="light"
                      className="me-2 border"
                      onClick={() => {
                        setShowDeleteModal(true);
                        setSelectedQuizId(quiz.id);
                      }}
                    >
                      <Trash size={16} className="me-1" /> delete
                    </Button>
                    <Button
                      size="sm"
                      variant="light"
                      className="border"
                      onClick={() => {
                        setShowUpdateModal(true);
                        setSelectedQuiz(quiz);
                      }}
                    >
                      <Pencil size={16} className="me-1" /> Edit
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card.Body>
      <ConfirmDeletingModal
        showDeleteModal={showDeleteModal}
        handleCloseModal={handleCloseModal}
        selectedQuizId={selectedQuizId}
        fetchQuizzes={fetchQuizzes}
      />
      <UpdateQuizModal
        showUpdateModal={showUpdateModal}
        handleCloseUpdateModal={handleCloseUpdateModal}
        selectedQuiz={selectedQuiz}
        fetchQuizzes={fetchQuizzes}
      />
    </Card>
  );
};

export default ManageQuizzes;
