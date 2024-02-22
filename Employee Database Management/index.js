(async function () {
  const data = await fetch("./data.json");
  const result = await data.json();

  let employees = result;
  let selectedEmployeeId = employees[0].id;
  let selectedEmployee = employees[0];

  const employeeListRef = document.querySelector(".employees__names--list");
  const employeeInfo = document.querySelector(".employees__single--info");

  employeeListRef.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
      selectedEmployeeId = e.target.id;
      renderEmployeeList();
      renderSingleEmployee();
    }

    //   * Delete employee

    if (e.target.tagName === "I") {
      console.log(e.target.parentElement.id);
      employees = employees.filter(
        (item) => item.id !== +e.target.parentElement.id
      );

      selectedEmployeeId = employees[0].id;

      selectedEmployee = employees[0];
      renderEmployeeList();
      renderSingleEmployee();
    }
  });

  // * Add Employee Logic

  const createEmployee = document.querySelector(".createEmployee");
  const addEmployeeModal = document.querySelector(".addEmployee");
  const addEmployeeForm = document.querySelector(".addEmployee_create");

  createEmployee.addEventListener("click", () => {
    addEmployeeModal.style.display = "flex";
  });

  addEmployeeModal.addEventListener("click", (e) => {
    if (e.target.className === "addEmployee") {
      addEmployeeModal.style.display = "none";
    }
  });

  addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(addEmployeeForm);

    const values = [...formData.entries()];
    let empData = {};

    values.forEach((val) => {
      empData[val[0]] = val[1];
    });

    console.log(empData);

    empData.id = employees[employees.length - 1].id + 1;
    empData.age =
      new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
    empData.ImageUrl =
      empData.ImageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
    employees.push(empData);
    renderEmployeeList();
    addEmployeeForm.reset();
    addEmployeeModal.style.display = "none";
  });

  const dobInput = document.querySelector(".addEmployee_create--dob");
  dobInput.max = `${new Date().getFullYear() - 18}-${new Date()
    .toISOString()
    .slice(5, 10)}`;

  // * display employee List
  const renderEmployeeList = () => {
    employeeListRef.innerHTML = "";

    employees.forEach((emp) => {
      const employee = document.createElement("span");
      employee.classList.add("employees__names--item");

      if (parseInt(selectedEmployeeId, 10) === emp.id) {
        employee.classList.add("selected");
        selectedEmployee = emp;
      }

      employee.setAttribute("id", emp.id);
      employee.innerHTML = `${emp.firstName} ${emp.lastName} <i clas="employeeDelete">❌</i>`;
      employeeListRef.append(employee);
    });
  };

  const renderSingleEmployee = () => {
    const {
      imageUrl,
      firstName,
      lastName,
      age,
      address,
      email,
      contactNumber,
      dob,
    } = selectedEmployee;
    employeeInfo.innerHTML = `
    <img src="${imageUrl}"/>
    <span>${firstName} ${lastName} (${age})</span>
    <span>${address}</span>
    <span>${email}</span>
    <span>Mobile - ${contactNumber}</span>
    <span>DOB - ${dob}</span>
    `;
  };

  renderEmployeeList();
  if (selectedEmployee) renderSingleEmployee();
})();
