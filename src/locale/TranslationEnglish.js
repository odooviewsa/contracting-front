const TranslationEnglish = {
    // User Tanet Page
    "UserTanetPage": {
        AddButton: "Add User",
        SearchBar: "Search users...",
        Table: ["First Name", "Second Name", "Email", "Phone", "Company Name", "Company Type", "Details"],
        AddUser: {
            Title: "Add User",
            Fields: [
                {
                    label: "First Name",
                    name: "firstName",
                    placeholder: "Enter First Name",
                    type: "text"
                },
                {
                    label: "Second Name",
                    name: "secondName",
                    placeholder: "Enter Second Name",
                    type: "text"
                },
                {
                    label: "Company Email",
                    name: "email",
                    placeholder: "Enter Second Name",
                    type: "email"
                },
                {
                    label: "Password",
                    name: "password",
                    placeholder: "Enter Second Name",
                    type: "password"
                },
                {
                    label: "Confirm Password",
                    name: "confirmPassword",
                    placeholder: "Enter Second Name",
                    type: "password"
                },
                {
                    label: "Phone number",
                    name: "phone",
                    placeholder: "Enter Second Name",
                    type: "number"
                },
            ],
            SubmitButton: "Add User"
        }
    },
    // Projects Page
    "ProjectsPage": {
        "title": "Overview",
        "charts": [
            {
                "title": "Projects",
                "bgColor": "bg-pink-500",
                "circleColor1": "bg-pink-300",
                "circleColor2": "bg-pink-400"
            },
            {
                "title": "Total Revenue",
                "bgColor": "bg-orange-400",
                "circleColor1": "bg-orange-200",
                "circleColor2": "bg-orange-300"
            },
            {
                "title": "Total Cost",
                "bgColor": "bg-blue-500",
                "circleColor1": "bg-blue-300",
                "circleColor2": "bg-blue-400"
            },
        ],
        "statusChartLabels": ['Completed', 'Planning', 'In Progress'],
        "searchBarPlaceholder": "Search projects...",
        "addButton": "Add Project +",
        "table": {
            "noFoundMessage": "No Projects Found",
            "items": [
                {
                    "text": "Code"
                },
                {
                    "text": "Project Name"
                },
                {
                    "text": "Project Manager"
                },
                {
                    "text": "Status"
                },
                {
                    "text": "Details",
                },
            ],
            "menu": {
                "edit": "Edit",
                "delete": "Delete"
            }
        },
        "pagination": {
            "text": "Displaying {displaying} of {projects} projects",
            "nextButton": "Next",
            "previousButton": "Previous",
            "page": "Page {page} of {projects}"
        },
    },
    // Add Project Page & Edit Project Page
    "AddEditProjectPage": {
        "saveButton": "Save",
        "backButton": "Back",
        "feilds1": [
            {
                "label": "Project name",
                "placeholder": "Enter project name",
                name: "projectName",
                required: true,
                errorMessage: "Project Name is required",
            },
            {
                "label": "Start Date",
                "placeholder": "10/10/2023",
                name: "startDate",
                required: true,
                errorMessage: "Start Date is required",
                type: "date",
            },
            {
                "label": "Project Location",
                "placeholder": "Select",
                name: "projectLocation",
                required: true,
                errorMessage: "Project Location is required",
            },
            {
                "label": "Project Manager",
                "placeholder": "Select Project Manager",
                name: "projectManger",
                required: true,
                errorMessage: "Project Manager is required",
                type: "select",
            },
            {
                "label": "Status",
                "placeholder": "Select Status",
                name: "status",
                required: true,
                errorMessage: "Status is required",
                type: "select",
                options: ["Completed", "Planning", "in Progress"]
            },
            {
                "label": "Team Members",
                multiSelect: true
            },
            {
                "label": "Scope Of Work",
                "placeholder": "Enter details",
                name: "scopeOfWork",
                required: true,
                errorMessage: "Scope of Work is required",
            },

        ],
        "riskAssessment": {
            text: "+ Add Risk Assessment",
            "feilds": [
                {
                    "label": "Mitigation Strategies",
                    "placeholder": "Enter Mitigation Strategies",
                    name: "mitigationStrategies",
                },
                {
                    "label": "Impact",
                    "placeholder": "Enter impact",
                    name: "impact",
                    type: "date",
                },
                {
                    "label": "Potential",
                    "placeholder": "Enter potential",
                    type: "date",
                    name: "potential",
                },
            ]
        },
        "addMilestones": {
            text: "+ Add Milestones",
            "feilds": [
                {
                    "label": "Start Date",
                    "placeholder": "Start Date",
                    type: "date",
                    name: "taskStartDate",
                },
                {
                    "label": "End Date",
                    "placeholder": "End Date",
                    name: "taskEndDate",
                    type: "date",
                }
            ]
        },
        "feilds2": [
            {
                "label": "Client Name",
                "placeholder": "Select Client",
                name: "clientName",
                required: true,
                errorMessage: "Client Name is required",
                type: "select",
            },
            {
                "label": "End Date",
                "placeholder": "25/12/2023",
                name: "endDate",
                required: true,
                errorMessage: "End Date is required",
                type: "date",
            },
            {
                "label": "Budget",
                "placeholder": "Enter budget",
                name: "budget",
                required: true,
                errorMessage: "Budget is required",
                type: "number",
            },
            {
                "label": "Description",
                "placeholder": "Enter description",
                name: "description",
                required: true,
                errorMessage: "Description is required",
            },
            {
                "label": "Upload Document",
                name: "documents",
                type: "file",
            },
        ]
    }
}

export default TranslationEnglish