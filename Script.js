const form = document.getElementById('employeeForm');
const tableBody = document.querySelector('#employeeTable tbody');

// Load employees from localStorage
let employees = JSON.parse(localStorage.getItem('employees')) || [];

function renderTable() {
  tableBody.innerHTML = '';
  employees.forEach((emp, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.department}</td>
      <td>${emp.role}</td>
      <td><button onclick="deleteEmployee(${index})">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });
}

function deleteEmployee(index) {
  employees.splice(index, 1);
  localStorage.setItem('employees', JSON.stringify(employees));
  renderTable();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const department = document.getElementById('department').value;
  const role = document.getElementById('role').value;

  employees.push({ name, department, role });
  localStorage.setItem('employees', JSON.stringify(employees));
  form.reset();
  renderTable();
});

renderTable();
