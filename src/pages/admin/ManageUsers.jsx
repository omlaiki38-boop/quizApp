import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  Table,
  Form,
  Button,
  Badge,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import {
  Search,
  Funnel,
  Eye,
  Pencil,
  PersonCheck,
  PersonX,
} from "react-bootstrap-icons";
import { supabase } from "../../supabaseClient";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/AuthContext";

const manageUsers = () => {
  const { banUser, session, isBanned, activateUser } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        console.log(session);
        const { data, error } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("account_type", "client")
          .neq("id", session?.user?.id); // id != currentUserI

        if (error) {
          throw error;
        }
        setUsers(data);
        console.log(data);
      } catch (e) {
        toast.error(e);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  if (loading) {
    return (
      <div className="d-flex  justify-content-center">
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
  if (!users.length) {
    return <div className="text-center  text-muted">No users found</div>;
  }

  return (
    <Card className="shadow-sm border-0 rounded-4">
      <Card.Body>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">👥 User Management</h5>
          <div classN ame="d-flex gap-2"></div>
        </div>

        {/* Table */}
        <Table hover responsive className="align-middle">
          <thead className="table-light">
            <tr>
              <th>User</th>
              <th>Join Date</th>
              <th>Total Score</th>
              {/* <th>status</th> */}
              {/* <th className="text-center">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>
                  <div className="d-flex align-items-center">
                    {/* Avatar circle with initials */}

                    <div>
                      <div className="fw-semibold">{user.username}</div>
                      <small className="text-muted">{user.email}</small>
                    </div>
                  </div>
                </td>
                <td>{user.join_date}</td>
                <td>{user.total_score}</td>
                {/* <td>{user.status}</td> */}

                {/* <td className="text-center">
                  {user?.status === "banned" ? (
                    <Button
                      size="sm"
                      variant="success"
                      className="me-2 border"
                      onClick={() => activateUser(user?.user_id)}
                    >
                      <PersonCheck size={16} className="me-1" /> activate
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="danger"
                      className="border"
                      onClick={() => banUser(user?.user_id)}
                    >
                      <PersonX size={16} className="me-1" /> ban
                    </Button>
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default manageUsers;
