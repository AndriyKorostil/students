const BASE_URL = "http://localhost:3000/students";

const tableBody = document.querySelector("#students-table tbody");
const form = document.querySelector("#add-student-form");
const getBtn = document.querySelector("#get-students-btn");

// Отримання студентів
async function getStudents() {
  try {
    const response = await fetch(BASE_URL);
    const students = await response.json();

    renderStudents(students);
  } catch (error) {
    console.error(error);
  }
}

// Відображення студентів
function renderStudents(students) {
  tableBody.innerHTML = "";

  students.forEach(student => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>${student.skills.join(", ")}</td>
      <td>${student.email}</td>
      <td>${student.isEnrolled ? "Так" : "Ні"}</td>
      <td>
        <button onclick="updateStudent(${student.id})">
          Оновити
        </button>
        <button onclick="deleteStudent(${student.id})">
          Видалити
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// Додавання студента
async function addStudent(e) {
  e.preventDefault();

  const newStudent = {
    name: document.getElementById("name").value,
    age: Number(document.getElementById("age").value),
    course: document.getElementById("course").value,
    skills: document
      .getElementById("skills")
      .value
      .split(",")
      .map(skill => skill.trim()),
    email: document.getElementById("email").value,
    isEnrolled: document.getElementById("isEnrolled").checked
  };

  try {
    await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newStudent)
    });

    form.reset();
    getStudents();
  } catch (error) {
    console.error(error);
  }
}

// Оновлення студента
async function updateStudent(id) {
  const newCourse = prompt("Введіть новий курс:");

  if (!newCourse) return;

  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        course: newCourse
      })
    });

    getStudents();
  } catch (error) {
    console.error(error);
  }
}

// Видалення студента
async function deleteStudent(id) {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE"
    });

    getStudents();
  } catch (error) {
    console.error(error);
  }
}

// Події
getBtn.addEventListener("click", getStudents);
form.addEventListener("submit", addStudent);

// Робимо функції доступними для кнопок
window.updateStudent = updateStudent;
window.deleteStudent = deleteStudent;