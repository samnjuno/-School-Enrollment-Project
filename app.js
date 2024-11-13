const mysql = require('mysql2');

// Create a connection to the database
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


// Example: Get all students with their grades and classes
const getAllStudentsWithGrades = () => {
  const query = `
    SELECT s.first_name, s.last_name, c.class_name, g.grade
    FROM students s
    JOIN grades g ON s.student_id = g.student_id
    JOIN classes c ON g.class_id = c.class_id;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching student data:', err);
      return;
    }

    console.log('Student Grades:', results);
  });
};

// Example: Get attendance record for a specific student
const getAttendanceForStudent = (studentId) => {
  const query = `
    SELECT date, a.attendance_status, c.class_name 
    FROM attendance a 
    JOIN classes c ON a.class_id = c.class_id 
    WHERE a.student_id = 1 
    LIMIT 0, 1000;
  `;

  connection.query(query, [studentId], (err, results) => {
    if (err) {
      console.error('Error fetching attendance:', err);
      return;
    }

    console.log(`Attendance Record for Student ${studentId}:`, results);
  });
};

// Example usage
getAllStudentsWithGrades();
getAttendanceForStudent(1); // Replace '1' with the student ID you're interested in

// Close the connection after queries are done
connection.end();
