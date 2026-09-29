const pageTitles = {
    dashboard: "Dashboard",
    employees: "Employees",
    attendance: "Attendance",
    leave: "Leave Management",
    recruitment: "Recruitment",
    onboarding: "Onboarding",
    performance: "Performance",
    payroll: "Payroll",
    expenses: "Expenses",
    reports: "Reports",
    settings: "Settings"
};

const pageSubtitles = {
    dashboard: "Welcome back. Here's what's happening today.",
    employees: "Manage your organization's employees.",
    attendance: "Track employee attendance and working hours.",
    leave: "Manage leave requests and balances.",
    recruitment: "Manage jobs, candidates and recruitment.",
    onboarding: "Manage employee onboarding workflows.",
    performance: "Manage employee goals and performance reviews.",
    payroll: "Manage salaries, payroll and payslips.",
    expenses: "Manage employee expenses and reimbursements.",
    reports: "View HR analytics and reports.",
    settings: "Configure your HRMS platform."
};


let employees =
    JSON.parse(localStorage.getItem("hrms_employees")) || [];


function saveEmployees() {

    localStorage.setItem(
        "hrms_employees",
        JSON.stringify(employees)
    );

}


function updateDashboard() {

    const count =
        document.getElementById("employee-count");

    if (count) {
        count.textContent = employees.length;
    }

    const recent =
        document.getElementById("recent-employees");

    if (!recent) return;

    if (employees.length === 0) {

        recent.innerHTML = `
            <div class="empty-state">
                No employees added yet.
            </div>
        `;

        return;
    }

    const latestEmployees =
        employees.slice(-5).reverse();

    recent.innerHTML =
        latestEmployees.map(employee => `

            <div style="
                display:flex;
                align-items:center;
                gap:12px;
                padding:14px 20px;
                border-bottom:1px solid #e5e7eb;
            ">

                <div class="avatar">
                    ${employee.firstName.charAt(0)}
                    ${employee.lastName.charAt(0)}
                </div>

                <div>
                    <strong style="
                        display:block;
                        font-size:13px;
                    ">
                        ${employee.firstName}
                        ${employee.lastName}
                    </strong>

                    <small style="
                        color:#6b7280;
                    ">
                        ${employee.designation || "Employee"}
                    </small>
                </div>

            </div>

        `).join("");

}


function navigateTo(page) {

    document.querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove("active");

            if (
                item.dataset.page === page
            ) {
                item.classList.add("active");
            }

        });


    const title =
        document.getElementById("page-title");

    const subtitle =
        document.getElementById("page-subtitle");


    title.textContent =
        pageTitles[page] || "HRMS";

    subtitle.textContent =
        pageSubtitles[page] || "";


    if (page === "dashboard") {

        showDashboard();

        return;

    }


    showPlaceholder(page);

}


function showDashboard() {

    const content =
        document.getElementById("app-content");

    content.innerHTML = `

        <div id="dashboard-page">

            <div class="stats-grid">

                <div class="stat-card">

                    <div class="stat-icon employees-icon">
                        👥
                    </div>

                    <div>
                        <span>Total Employees</span>
                        <strong id="employee-count">
                            ${employees.length}
                        </strong>
                    </div>

                </div>


                <div class="stat-card">

                    <div class="stat-icon attendance-icon">
                        ✓
                    </div>

                    <div>
                        <span>Present Today</span>
                        <strong>0</strong>
                    </div>

                </div>


                <div class="stat-card">

                    <div class="stat-icon leave-icon">
                        ◫
                    </div>

                    <div>
                        <span>On Leave</span>
                        <strong>0</strong>
                    </div>

                </div>


                <div class="stat-card">

                    <div class="stat-icon hiring-icon">
                        ♧
                    </div>

                    <div>
                        <span>Open Positions</span>
                        <strong>0</strong>
                    </div>

                </div>

            </div>


            <div class="dashboard-grid">

                <div class="panel">

                    <div class="panel-header">

                        <div>

                            <h2>
                                Recent Employees
                            </h2>

                            <p>
                                Latest employees added
                                to the organization.
                            </p>

                        </div>

                        <button
                            class="secondary-button"
                            onclick="navigateTo('employees')"
                        >
                            View All
                        </button>

                    </div>

                    <div id="recent-employees"></div>

                </div>


                <div class="panel">

                    <div class="panel-header">

                        <div>

                            <h2>
                                Quick Actions
                            </h2>

                            <p>
                                Frequently used HR actions.
                            </p>

                        </div>

                    </div>

                    <div class="quick-actions">

                        <button
                            onclick="navigateTo('employees')"
                        >
                            <span>+</span>
                            Add Employee
                        </button>

                        <button
                            onclick="navigateTo('attendance')"
                        >
                            <span>✓</span>
                            Mark Attendance
                        </button>

                        <button
                            onclick="navigateTo('leave')"
                        >
                            <span>◫</span>
                            Leave Request
                        </button>

                        <button
                            onclick="navigateTo('recruitment')"
                        >
                            <span>♧</span>
                            Create Job
                        </button>

                    </div>

                </div>

            </div>

        </div>

    `;

    updateDashboard();

}


function showPlaceholder(page) {

    const content =
        document.getElementById("app-content");

    content.innerHTML = `

        <div class="panel">

            <div style="
                padding:70px 30px;
                text-align:center;
            ">

                <div style="
                    font-size:40px;
                    margin-bottom:15px;
                ">
                    🚧
                </div>

                <h2>
                    ${pageTitles[page]}
                </h2>

                <p style="
                    color:#6b7280;
                    margin-top:8px;
                ">
                    This module will be built
                    in the next development segment.
                </p>

            </div>

        </div>

    `;

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        document
            .querySelectorAll(".nav-item")
            .forEach(item => {

                item.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        navigateTo(
                            item.dataset.page
                        );

                    }
                );

            });

        updateDashboard();

    }
);
