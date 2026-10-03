import { useState } from "react";
import "./GPACalculator.css";

function GPACalculator() {
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: "",
      credits: "",
      grade: "",
    },
    {
      id: 2,
      name: "",
      credits: "",
      grade: "",
    },
    {
      id: 3,
      name: "",
      credits: "",
      grade: "",
    },
  ]);

  const [result, setResult] = useState(null);

  const gradePoints = {
    "A+": 4.0,
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    "D+": 1.3,
    D: 1.0,
    F: 0.0,
  };

  const updateSubject = (id, field, value) => {
    setSubjects((currentSubjects) =>
      currentSubjects.map((subject) =>
        subject.id === id
          ? {
              ...subject,
              [field]: value,
            }
          : subject
      )
    );

    setResult(null);
  };

  const addSubject = () => {
    const newId =
      subjects.length > 0
        ? Math.max(...subjects.map((subject) => subject.id)) + 1
        : 1;

    setSubjects([
      ...subjects,
      {
        id: newId,
        name: "",
        credits: "",
        grade: "",
      },
    ]);

    setResult(null);
  };

  const removeSubject = (id) => {
    if (subjects.length === 1) {
      alert("You need at least one subject.");
      return;
    }

    setSubjects(
      subjects.filter((subject) => subject.id !== id)
    );

    setResult(null);
  };

  const calculateGPA = () => {
    let totalQualityPoints = 0;
    let totalCredits = 0;
    let validSubjects = 0;

    for (const subject of subjects) {
      const credits = parseFloat(subject.credits);
      const grade = subject.grade;

      if (
        !credits ||
        credits <= 0 ||
        !grade ||
        gradePoints[grade] === undefined
      ) {
        continue;
      }

      totalQualityPoints +=
        gradePoints[grade] * credits;

      totalCredits += credits;

      validSubjects++;
    }

    if (validSubjects === 0 || totalCredits === 0) {
      alert(
        "Please enter valid credits and grades for at least one subject."
      );
      return;
    }

    const gpa =
      totalQualityPoints / totalCredits;

    setResult({
      gpa,
      totalCredits,
      validSubjects,
      totalQualityPoints,
    });
  };

  const clearCalculator = () => {
    setSubjects([
      {
        id: 1,
        name: "",
        credits: "",
        grade: "",
      },
      {
        id: 2,
        name: "",
        credits: "",
        grade: "",
      },
      {
        id: 3,
        name: "",
        credits: "",
        grade: "",
      },
    ]);

    setResult(null);
  };

  const getGPAStatus = (gpa) => {
    if (gpa >= 3.7) {
      return "Excellent";
    }

    if (gpa >= 3.0) {
      return "Very Good";
    }

    if (gpa >= 2.0) {
      return "Good";
    }

    if (gpa >= 1.0) {
      return "Needs Improvement";
    }

    return "Below Passing";
  };

  return (
    <div className="gpa-page">

      <div className="gpa-container">

        <div className="gpa-breadcrumb">
          <a href="/">CALVORO</a>
          <span> / GPA Calculator</span>
        </div>

        <div className="gpa-header">

          <div className="gpa-icon">
            🎓
          </div>

          <div className="gpa-badge">
            FREE ONLINE TOOL
          </div>

          <h1>GPA Calculator</h1>

          <p>
            Calculate your Grade Point Average quickly
            using your subjects, grades and credit hours.
          </p>

        </div>

        <div className="gpa-card">

          <div className="gpa-table-header">

            <span>Subject</span>
            <span>Credits</span>
            <span>Grade</span>
            <span>Action</span>

          </div>

          <div className="gpa-subjects">

            {subjects.map((subject, index) => (
              <div
                className="gpa-row"
                key={subject.id}
              >

                <div className="gpa-field">

                  <label>
                    Subject {index + 1}
                  </label>

                  <input
                    type="text"
                    placeholder="Example: Mathematics"
                    value={subject.name}
                    onChange={(e) =>
                      updateSubject(
                        subject.id,
                        "name",
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="gpa-field">

                  <label>
                    Credit Hours
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder="3"
                    value={subject.credits}
                    onChange={(e) =>
                      updateSubject(
                        subject.id,
                        "credits",
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="gpa-field">

                  <label>
                    Grade
                  </label>

                  <select
                    value={subject.grade}
                    onChange={(e) =>
                      updateSubject(
                        subject.id,
                        "grade",
                        e.target.value
                      )
                    }
                  >

                    <option value="">
                      Select Grade
                    </option>

                    <option value="A+">
                      A+ — 4.0
                    </option>

                    <option value="A">
                      A — 4.0
                    </option>

                    <option value="A-">
                      A- — 3.7
                    </option>

                    <option value="B+">
                      B+ — 3.3
                    </option>

                    <option value="B">
                      B — 3.0
                    </option>

                    <option value="B-">
                      B- — 2.7
                    </option>

                    <option value="C+">
                      C+ — 2.3
                    </option>

                    <option value="C">
                      C — 2.0
                    </option>

                    <option value="C-">
                      C- — 1.7
                    </option>

                    <option value="D+">
                      D+ — 1.3
                    </option>

                    <option value="D">
                      D — 1.0
                    </option>

                    <option value="F">
                      F — 0.0
                    </option>

                  </select>

                </div>

                <button
                  className="gpa-remove-btn"
                  onClick={() =>
                    removeSubject(subject.id)
                  }
                  title="Remove subject"
                >
                  ×
                </button>

              </div>
            ))}

          </div>

          <button
            className="gpa-add-btn"
            onClick={addSubject}
          >
            + Add Subject
          </button>

          <div className="gpa-buttons">

            <button
              className="gpa-calculate-btn"
              onClick={calculateGPA}
            >
              Calculate GPA
            </button>

            <button
              className="gpa-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {result && (
            <div className="gpa-result">

              <div className="gpa-result-title">
                <span>🎓</span>
                <h2>Your GPA Result</h2>
              </div>

              <div className="gpa-main-result">

                <span>
                  Grade Point Average
                </span>

                <strong>
                  {result.gpa.toFixed(2)}
                </strong>

                <small>
                  {getGPAStatus(result.gpa)}
                </small>

              </div>

              <div className="gpa-summary">

                <div>
                  <span>Subjects</span>

                  <strong>
                    {result.validSubjects}
                  </strong>
                </div>

                <div>
                  <span>Total Credits</span>

                  <strong>
                    {result.totalCredits}
                  </strong>
                </div>

                <div>
                  <span>Quality Points</span>

                  <strong>
                    {result.totalQualityPoints.toFixed(2)}
                  </strong>
                </div>

              </div>

              <div className="gpa-scale">

                <h3>
                  GPA Scale
                </h3>

                <div className="gpa-scale-grid">

                  <div>
                    <span>A / A+</span>
                    <strong>4.0</strong>
                  </div>

                  <div>
                    <span>A-</span>
                    <strong>3.7</strong>
                  </div>

                  <div>
                    <span>B+</span>
                    <strong>3.3</strong>
                  </div>

                  <div>
                    <span>B</span>
                    <strong>3.0</strong>
                  </div>

                  <div>
                    <span>B-</span>
                    <strong>2.7</strong>
                  </div>

                  <div>
                    <span>C+</span>
                    <strong>2.3</strong>
                  </div>

                  <div>
                    <span>C</span>
                    <strong>2.0</strong>
                  </div>

                  <div>
                    <span>D</span>
                    <strong>1.0</strong>
                  </div>

                  <div>
                    <span>F</span>
                    <strong>0.0</strong>
                  </div>

                </div>

              </div>

            </div>
          )}

        </div>

        <div className="gpa-info">

          <h2>
            How to use the GPA Calculator
          </h2>

          <div className="gpa-steps">

            <div className="gpa-step">

              <b>1</b>

              <div>
                <h3>Add your subjects</h3>

                <p>
                  Enter the name of each subject you
                  want to include in your GPA.
                </p>
              </div>

            </div>

            <div className="gpa-step">

              <b>2</b>

              <div>
                <h3>Enter credit hours</h3>

                <p>
                  Enter the number of credit hours
                  assigned to each subject.
                </p>
              </div>

            </div>

            <div className="gpa-step">

              <b>3</b>

              <div>
                <h3>Select your grade</h3>

                <p>
                  Choose the grade you received for
                  each subject.
                </p>
              </div>

            </div>

            <div className="gpa-step">

              <b>4</b>

              <div>
                <h3>Calculate GPA</h3>

                <p>
                  CALVORO calculates your weighted GPA
                  based on your credit hours.
                </p>
              </div>

            </div>

          </div>

          <div className="gpa-note">
            <strong>Formula:</strong> GPA =
            Total Quality Points ÷ Total Credit Hours.
            This calculator uses a standard 4.0 GPA scale.
          </div>

        </div>

        <div className="gpa-back">
          <a href="/">
            ← Back to CALVORO
          </a>
        </div>

      </div>

    </div>
  );
}

export default GPACalculator;