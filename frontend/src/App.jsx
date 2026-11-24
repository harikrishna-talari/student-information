import { useState } from "react";

const emptyForm = {
  name: "",
  rollNumber: "",
  department: "",
  email: "",
};

export default function App() {
  const [form, setForm] = useState(emptyForm);
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  function updateForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function addStudent(event) {
    event.preventDefault();
    setStudents((currentStudents) => [
      { ...form, _id: crypto.randomUUID() },
      ...currentStudents,
    ]);
    setForm(emptyForm);
    setMessage("Student added.");
    setMessageType("success");
  }

  function deleteStudent(student) {
    setStudents((currentStudents) =>
      currentStudents.filter((record) => record._id !== student._id),
    );
    setMessage("Student deleted.");
    setMessageType("success");
  }

  function deleteByRollNumber() {
    const rollNumber = form.rollNumber.trim();
    if (!rollNumber) {
      setMessage("Enter a roll number to delete a student.");
      setMessageType("error");
      return;
    }

    const student = students.find(
      (record) => record.rollNumber.toLowerCase() === rollNumber.toLowerCase(),
    );
    if (!student) {
      setMessage(`No student found with roll number ${rollNumber}.`);
      setMessageType("error");
      return;
    }

    deleteStudent(student);
  }

  return (
    <main className="page">
      <section className="container" aria-labelledby="page-title">
        <header className="page-header">
          <p className="eyebrow">STUDENT RECORDS</p>
          <h1 id="page-title">Student Information</h1>
          <p className="subtitle">A simple place to add and manage student details.</p>
        </header>

        <form className="student-form" onSubmit={addStudent}>
          <div className="form-grid">
            <label>
              Student Name
              <input
                name="name"
                value={form.name}
                onChange={updateForm}
                placeholder="e.g. Alex Johnson"
                autoComplete="name"
                required
              />
            </label>
            <label>
              Roll Number
              <input
                name="rollNumber"
                value={form.rollNumber}
                onChange={updateForm}
                placeholder="e.g. 2024001"
                required
              />
            </label>
            <label>
              Department
              <input
                name="department"
                value={form.department}
                onChange={updateForm}
                placeholder="e.g. Computer Science"
                required
              />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={updateForm}
                placeholder="e.g. alex@example.com"
                autoComplete="email"
                required
              />
            </label>
          </div>
          <div className="form-actions">
            <button className="button button-primary" type="submit">
              Add Student
            </button>
            <button
              className="button button-secondary"
              type="button"
              onClick={deleteByRollNumber}
            >
              Delete Student
            </button>
          </div>
        </form>

        {message && (
          <p className={`notice notice-${messageType}`} role="status">
            {message}
          </p>
        )}

        <section className="records-section" aria-labelledby="records-title">
          <div className="records-heading">
            <h2 id="records-title">Student Records</h2>
            <span className="record-count">{students.length} total</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll Number</th>
                  <th>Department</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td className="empty-state" colSpan="5">
                      No student records yet. Add a student using the form above.
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student._id}>
                      <td data-label="Name">{student.name}</td>
                      <td data-label="Roll Number">{student.rollNumber}</td>
                      <td data-label="Department">{student.department}</td>
                      <td data-label="Email">{student.email}</td>
                      <td data-label="Action">
                        <button
                          className="delete-link"
                          type="button"
                          onClick={() => deleteStudent(student)}
                          aria-label={`Delete ${student.name}`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}
