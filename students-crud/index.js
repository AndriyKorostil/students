const BASE_URL = "http://localhost:3000/students";

async function getStudents() {
  try {
    const response = await fetch(BASE_URL);
    const students = await response.json();

    renderStudents(students);
  } catch (error) {
    console.error(error);
  }
}

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
    isEnrolled: document.getElementById("isEnrolled").checked,
  };

  try {
    await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    });

    form.reset();
    getStudents();
  } catch (error) {
    console.error(error);
  }
}

async function updateStudent(id) {
  const newCourse = prompt("Введіть новий курс:");

  if (!newCourse) return;

  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        course: newCourse,
      }),
    });

    getStudents();
  } catch (error) {
    console.error(error);
  }
}

async function deleteStudent(id) {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    getStudents();
  } catch (error) {
    console.error(error);
  }
}