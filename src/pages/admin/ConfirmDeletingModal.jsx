// import React from "react";
import { supabase } from "../../supabaseClient";
import toast from "react-hot-toast";
import { Trash } from "react-bootstrap-icons";
import { Button, Modal } from "react-bootstrap";
export default function ConfirmDeletingModal({
  showDeleteModal,
  handleCloseModal,
  selectedQuizId,
  fetchQuizzes,
}) {
  const deleteQuiz = async () => {
    console.log(selectedQuizId);
    const { error } = await supabase
      .from("quiz")
      .delete()
      .eq("id", selectedQuizId);
    if (error) {
      console.log(error);
      toast.error(error);
    } else {
      toast.success("quiz deleted successfully");
      fetchQuizzes();
    }
  };
  return (
    <Modal
      show={showDeleteModal}
      onHide={handleCloseModal}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className="border-0" closeButton>
        <Modal.Title className="d-flex align-items-center text-danger">
          <Trash size={20} className="me-2" />
          Confirm Delete
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center fs-5 text-secondary">
        <p>Are you sure you want to delete this quiz?</p>
        <p className="fw-bold text-danger">This action cannot be undone!</p>
      </Modal.Body>

      <Modal.Footer className="border-0 justify-content-center">
        <Button
          variant="outline-secondary"
          onClick={handleCloseModal}
          className="px-4"
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          className="px-4"
          onClick={() => {
            deleteQuiz();
            handleCloseModal();
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
