import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  ProgressBar,
  Accordion,
  Spinner,
} from "react-bootstrap";
import toast from "react-hot-toast";
import { supabase } from "../../supabaseClient";
const MultiStepModal = ({ show, handleClose }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  // form data
  const [QuizData, setQuizData] = useState({
    title: "",
    section: "",
    difficulty: "",
    questions: [
      { question: "", options: ["", "", "", ""], correct_answer: "" },
    ],
  });
  const deleteQuestion = (qIndex) => {
    const updated = QuizData.questions.filter((_, index) => index !== qIndex);
    setQuizData({ ...QuizData, questions: updated });
  };

  const steps = 3;

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuizData({
      ...QuizData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleQuestionChange = (qIndex, field, value) => {
    const updated = [...QuizData.questions];
    updated[qIndex][field] = value;
    setQuizData({ ...QuizData, questions: updated });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...QuizData.questions];
    updated[qIndex].options[oIndex] = value;
    setQuizData({ ...QuizData, questions: updated });
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const updated = [...QuizData.questions];
    updated[qIndex].correct_answer = value;
    setQuizData({ ...QuizData, questions: updated });
  };

  const addQuestion = () => {
    setQuizData({
      ...QuizData,
      questions: [
        ...QuizData.questions,
        { question: "", options: ["", "", "", ""], correct_answer: "" },
      ],
    });
  };

  // ✅ validation with toast
  const validateForm = () => {
    if (!QuizData.title.trim()) {
      toast.error("Quiz title is required");
      return false;
    }
    if (!QuizData.section) {
      toast.error("Please select a section");
      return false;
    }
    if (!QuizData.difficulty) {
      toast.error("Please select difficulty");
      return false;
    }
    if (QuizData.questions.length === 0) {
      toast.error("At least one question is required");
      return false;
    }
    for (let i = 0; i < QuizData.questions.length; i++) {
      const q = QuizData.questions[i];
      if (!q.question.trim()) {
        toast.error(`Question ${i + 1} is empty`);
        return false;
      }
      if (q.options.some((opt) => !opt.trim())) {
        toast.error(`All options must be filled in Question ${i + 1}`);
        return false;
      }
      if (!q.correct_answer.trim()) {
        toast.error(`Correct answer is required in Question ${i + 1}`);
        return false;
      }
    }
    return true;
  };

  const cleanQuizForm = () => {
    setQuizData({
      title: "",
      section: "",
      difficulty: "",
      questions: [
        { question: "", options: ["", "", "", ""], correct_answer: "" },
      ],
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const newQuiz = {
        title: QuizData.title,
        section: QuizData.section,
        difficulty: QuizData.difficulty,
      };
      const { data: quiz, error: quizError } = await supabase
        .from("quiz")
        .insert([newQuiz])
        .select()
        .single();
      if (quizError) {
        console.error("Error inserting quiz:", quizError);
        throw new Error(quizError);
      }
      const newQuestions = QuizData.questions;

      const { error } = await supabase.from("questions").insert(
        newQuestions.map((question) => ({
          ...question,
          quiz_id: quiz?.id,
        }))
      );

      if (error) {
        throw new Error(error);
      } else {
        toast.success("quiz inserted successfully ");
        cleanQuizForm();
        handleClose();
        setStep(1);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.message | "unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create Quiz</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProgressBar
          now={(step / steps) * 100}
          className="mb-3"
          style={{ height: "10px" }}
        />

        {/* Step 1 */}
        {step === 1 && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Quiz Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={QuizData.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Section</Form.Label>
              <Form.Select
                name="section"
                value={QuizData.section}
                onChange={handleChange}
              >
                <option value="">Select section</option>
                <option value="math">Math</option>
                <option value="science">Science</option>
                <option value="history">History</option>
              </Form.Select>
            </Form.Group>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <Form.Group className="mb-3">
            <Form.Label>Difficulty</Form.Label>
            <Form.Select
              name="difficulty"
              value={QuizData.difficulty}
              onChange={handleChange}
            >
              <option value="">Select difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Form.Select>
          </Form.Group>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <>
            <Accordion alwaysOpen>
              {QuizData.questions.map((q, qIndex) => (
                <Accordion.Item eventKey={String(qIndex)} key={qIndex}>
                  <Accordion.Header>
                    Question {qIndex + 1}{" "}
                    {q.question ? `: ${q.question.slice(0, 20)}...` : ""}
                  </Accordion.Header>
                  <Accordion.Body>
                    <Form.Group className="mb-3">
                      <Form.Label>Question Text</Form.Label>
                      <Form.Control
                        type="text"
                        value={q.question}
                        onChange={(e) =>
                          handleQuestionChange(
                            qIndex,
                            "question",
                            e.target.value
                          )
                        }
                      />
                    </Form.Group>

                    <Form.Label>Options</Form.Label>
                    {q.options.map((opt, oIndex) => (
                      <div
                        key={oIndex}
                        className="d-flex align-items-center mb-2"
                      >
                        <Form.Control
                          placeholder={`Option ${oIndex + 1}`}
                          value={opt}
                          onChange={(e) =>
                            handleOptionChange(qIndex, oIndex, e.target.value)
                          }
                          className="me-2"
                        />
                        <Form.Check
                          type="radio"
                          name={`correct-${qIndex}`}
                          checked={q.correct_answer === opt}
                          onChange={() =>
                            handleCorrectAnswerChange(qIndex, opt)
                          }
                          disabled={opt.trim() === ""}
                          label="Correct"
                        />
                      </div>
                    ))}

                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="mt-2"
                      onClick={() => deleteQuestion(qIndex)}
                      disabled={QuizData.questions.length === 1} // prevent deleting last question
                    >
                      Delete Question
                    </Button>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>

            <Button
              variant="outline-primary"
              className="mt-3"
              onClick={addQuestion}
            >
              + Add Question
            </Button>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        {step > 1 && (
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
        )}
        {step < steps && (
          <Button variant="primary" onClick={handleNext}>
            Next
          </Button>
        )}
        {step === steps && (
          <Button variant="success" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                quiz submitted ...
              </>
            ) : (
              "Submit Quiz"
            )}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default MultiStepModal;
