import {
    IoPersonOutline,
    IoMailOutline,
    IoCallOutline,
    IoLocationOutline,
    IoBusinessOutline,
    IoDocumentTextOutline,
} from "react-icons/io5";

const TranslationEnglish = {
    // User Tanet Page
    "UserTanetPage": {
        AddButton: "Add User",
        SearchBar: "Search users...",
        Table: ["First Name", "Second Name", "Email", "Phone", "Company Name", "Company Type", "Details"],
        modelDetails: {
            editButton: "Edit",
            deleteButton: "Delete"
        },
        AddUser: {
            Title: "Add User",
            Fields: [
                {
                    label: "First Name",
                    name: "firstName",
                    placeholder: "Enter your First Name",
                    type: "text"
                },
                {
                    label: "Second Name",
                    name: "secondName",
                    placeholder: "Enter your Second Name",
                    type: "text"
                },
                {
                    label: "Email",
                    name: "email",
                    placeholder: "Enter your email",
                    type: "email"
                },
                {
                    label: "Password",
                    name: "password",
                    placeholder: "Enter your password",
                    type: "password"
                },
                {
                    label: "Confirm Password",
                    name: "confirmPassword",
                    placeholder: "Enter you confirm password",
                    type: "password"
                },
                {
                    label: "Phone number",
                    name: "phone",
                    placeholder: "Enter your phone number",
                    type: "number"
                },
            ],
            SubmitButton: "Add User"
        },
        editUser: {
            title: "Edit User",
            fields: [
                { label: "First Name", placeholder: "Enter your first name", type: "text", name: "firstName" },
                { label: "Second Name", placeholder: "Enter your second name", type: "text", name: "secondName" },
                { label: "Email", placeholder: "Enter your email", type: "email", name: "email" },
                { label: "Phone number", placeholder: "Enter your phone number", type: "number", name: "phone" },
            ],
            requiredMessage: "{{name}} is required",
            updateButton: {
                text: "Update User",
                loading: "Saving..."
            }
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
            },
            status: {
                inProgress: "in Progress",
                planning: "Planning",
                completed: "Completed"
            }
        },
        "pagination": {
            "text": "Displaying {displaying} of {projects} projects",
            "nextButton": "Next",
            "previousButton": "Previous",
            "page": "Page {page} of {projects}"
        },
    },
    // Add Project Page 
    "AddProjectPage": {
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
    },
    // Edit Project Page
    "EditProjectPage": {
        "updateButton": "Update Project",
        fields: {
            projectName: "Project Name",
            enterProjectName: "Enter project name",
            startDate: "Start Date",
            enterStartDate: "10/10/2023",
            projectLocation: "Project Location",
            select: "Select",
            projectManager: "Project Manager",
            selectProjectManager: "Select Project Manager",
            status: "Status",
            selectStatus: "Select Status",
            teamMembers: "Team Members",
            scopeOfWork: "Scope Of Work",
            enterDetails: "Enter details",
            clientName: "Client Name",
            selectClient: "Select Client",
            endDate: "End Date",
            enterEndDate: "25/12/2023",
            budget: "Budget",
            enterBudget: "Enter budget",
            description: "Description",
            enterDescription: "Enter project description",
            documents: "Documents",
            requiredField: "{{field}} is required"
        }
    },
    // Project Details Page
    "ProjectDetailsPage": {
        "backButton": "Back",
        "projectInfo": [
            {
                text: "Project Name",
            },
            {
                text: "Client Name"
            },
            {
                text: "Project Location"
            },
            {
                text: "Start Date",
                isDate: true
            },
            {
                text: "End Date",
                isDate: true
            },
            {
                text: "Budget"
            },
            {
                text: "Status",
                isStatus: true
            }
        ],
        "teamMember": {
            "title": "Team Member",
            "seeAll": "See All"
        },
        "projectOverview": "Project Overview",
        "scopeOfWork": "Scope of Work",

    },
    // Delete Project
    "DeleteProject": {
        "message": "Are you sure !",
        "backButton": "Back",
        "deleteButton": "Delete"
    },
    // Partners
    "PartnersPage": {
        "addButton": "Add Partner",
        "table": ["Name", "Type", "Email", "Phone", "Address", "Tax Number", "Commercial Number", "Details"],
        "detailsButton": {
            "editButton": "Edit",
            "deleteButton": "Delete"
        },
        "noFound": "Not Partners Yet"
    },
    // Add Partner
    "AddPartnerForm": {
        "title": "Add New Partner",
        "fields": [
            {
                label: "Partner Name",
                name: "partnerName",
                type: "text",
                placeholder: "Enter partner's full name",
                required: true,
                icon: IoPersonOutline
            },
            {
                label: "Type",
                name: "type",
                type: "select",
                required: true,
                icon: IoBusinessOutline,
                options: [
                    { value: "Owner", label: "Owner" },
                    { value: "Sub-contractor", label: "Sub-contractor" },
                    { value: "Consultant", label: "Consultant" }
                ]
            },
            {
                label: "Email",
                name: "email",
                type: "email",
                placeholder: "partner@company.com",
                required: true,
                icon: IoMailOutline
            },
            {
                label: "Phone Number",
                name: "phone",
                type: "tel",
                placeholder: "+1 (555) 000-0000",
                required: true,
                icon: IoCallOutline
            },
            {
                label: "Address",
                name: "address",
                type: "textarea",
                placeholder: "Enter complete address",
                required: true,
                icon: IoLocationOutline
            },
            {
                label: "Tax Number",
                name: "taxNumber",
                type: "text",
                placeholder: "Enter tax registration number",
                required: true,
                icon: IoDocumentTextOutline
            },
            {
                label: "Commercial Number",
                name: "commercialNumber",
                type: "text",
                placeholder: "Enter commercial registration number",
                required: true,
                icon: IoBusinessOutline
            }
        ],
        "addButton": {
            "loading": "Processing...",
            "text": "Add Partner"
        }
    },
    // Edit Partner
    "EditPartnerForm": {
        "title": "Update Partner",
        "fields": [
            { label: "Partner Name", type: "text", name: "partnerName" },
            {
                label: "Type",
                type: "select",
                name: "type",
                option: ["Owner", "Sub-contractor", "Consultant"],
            },
            { label: "Email ", type: "email", name: "email" },
            { label: "Phone Number", type: "number", name: "phone" },
            {
                label: " Address",
                type: "text",
                name: "address",
            },

            {
                label: "Tax Number",
                type: "number",
                name: "taxNumber",
            },
            {
                label: "Commercial number",
                type: "number",
                name: "commercialNumber",
            },
        ],
        "editButton": {
            "loading": "Loading...",
            "text": "Update Item"
        }
    },
    // Delete Partner
    "DeletePartner": {
        "title": "Are you sure!",
        "backButton": "Back",
        "deleteButton": {
            "loading": "Loading...",
            "text": "Delete"
        }
    },
    // Products Page
    "ProductsPage": {
        "backButton": "Back to Main Menu",
        "addButton": "+ Add Product",
        "deleteButton": "Delete",
        "editButton": "Edit",
        "fields": [
            {
                label: "Name",
                type: "text",
                id: "name",
                name: "name",
                placeholder: "Search by name"
            },
            {
                label: "Category",
                type: "select",
                id: "category",
                name: "category",
            },
            {
                label: "Supplier",
                type: "select",
                id: "supplier",
                name: "supplier",
            },
        ],
        "table": [
            "Sku",
            "Name",
            "Category",
            "Price",
            "Quantity",
            "Uom",
            "Description",
            "Supplier",
            "Id",
            "Actions"
        ],
        "searchButton": "Search",
        "noFound": "No products available"
    },
    "ProductsList": {
        title: "List of products",
        searchBar: "Search Product by name",
        selectButton: "Select",
        "table": [
            "Sku",
            "Name",
            "Category",
            "Price",
            "Quantity",
            "Uom",
            "Supplier",
            "Id",
            "Actions"
        ],
        noFound: "No products found"
    },
    // Edit & Add Product Form
    "EditAndAddProductForm": {
        sku: "SKU",
        uom: "UOM",
        name: "Name",
        category: "Category",
        price: "Price",
        quantity: "Quantity",
        supplier: "Supplier",
        description: "Description",
        save: "Save",
        cancel: "Cancel",
        addProduct: "Add Product",
        editProduct: "Edit Product",
        fillRequiredFields: "Please fill in all required fields.",
    },
    // Material Request Page
    "MaterialRequestPage": {
        title: "Material Request",
        noFound: "No Materials Yet",
        cards: [
            { label: "Total Approved Line", value: 7155, color: "#4CAF50" },
            { label: "Number of Items", value: 2, color: "#FF9800" },
            { label: "Total Cost", value: 5685, color: "#2196F3" },
        ],
        tooltips: {
            refresh: "Refresh Data",
            print: "Print Request"
        },
        buttons: {
            addButton: "Add Material",
            backButton: "Back",
            printButton: "Print"
        }
    },
    // Material Request Form
    "MaterialRequestForm": {
        "buttons": {
            submitButton: "Submit to manger",
            saveButton: "Save as draft",
            helpButton: "Help",
            addLineButton: "Add new line",
            bulkButton: "Bulk approve"
        },
        "upload": {
            text: "Upload Document",
            model: "Drag & Drop File Here",
            button: "Open Modal"
        },
        table: {
            title: "items",
            items: {
                product: "Product",
                boqLine: "BOQ Line",
                uom: "UOM",
                boqQty: "BOQ Qty",
                qtyAvailable: "QTY Available",
                qtyApproved: "QTY Approved",
                qtyRequests: "QTY Requests",
                qtyDelivered: "QTY Delivered",
                unitCost: "Unit Cost",
                totalCost: "Total Cost",
                actions: "Actions",
                edit: "Edit",
                delete: "Delete",
                approveLine: "Approve Line",
            }
        },
        fields: {
            project: "Project",
            workItem: "Work Item",
            orderDate: "Order Date",
            deliveryDate: "Delivery Date",
            status: "Status",
            reason: "Reason",
            linkWithBOQ: "Link with BOQ",
            emergency: "Emergency",
        },
        searchBar: "Search Items"
    },
    // Login
    "LoginPage": {
        "welcome": "Welcome Back!",
        "message": "Please sign in to your account",
        "fields": [
            { label: "Email", type: "email", name: "email", validation: { pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ } },
            { label: "Password", type: "password", name: "password", validation: { minLength: { value: 6, message: "Password must be at least 6 characters long" } } },
            { label: "Organization Name", type: "text", name: "companyName" },
        ],
        "buttons": {
            signInButton: "Sign in",
            registerButton: "Register",
            dontHave: "Dont't have an account?"
        }
    },
    // Register 
    "RegisterPage": {
        "buttons": {
            googleSignButton: "Sign up with google",
            nextButton: {
                text: "Next",
                loading: "Processing..."
            },
            alreadyHave: "Alread have an account?",
            loginButton: "Login",
            backButton: "Back",
            createButton: {
                text: "Create",
                loading: "Processing..."
            }
        },
        fields1: [
            { label: "Company Email", type: "email", name: "email", validation: { pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ } },
            { label: "Password", type: "password", name: "password", validation: { minLength: { value: 6, message: "Password must be at least 6 characters long" } } },
            { label: "Confirm Password", type: "password", name: "confirmPassword", validation: { validate: "Passwords do not match" } },
            { label: "Phone Number", type: "number", name: "phone" },
        ],
        fields2: [
            { label: "First Name", type: "text", name: "firstName" },
            { label: "Second Name", type: "text", name: "secondName" },
            { label: "Company Name", type: "text", name: "companyName" },
            {
                label: "Company Size", type: "select", name: "companySize", options: [
                    "1-10 employees (Small startup)",
                    "11-50 employees (Growing small business)",
                    "51-200 employees (Medium-sized business)",
                    "201-500 employees (Mid-large company)",
                    "501-1,000 employees (Large company)",
                    "1,001-5,000 employees (Enterprise level)",
                ]
            },
            { label: "Company Type", type: "select", name: "companyType", options: ["Contractor", "Sub-Contractor"] },
        ],
        texts: ["Create Account", "Or"]
    },
    // Sidebar
    "Sidebar": {
        project: "Project",
        boqTemplates: "BOQ Templates",
        contracts: "Contracts",
        workConfirmation: "Work Confirmation",
        estimator: "Estimator",
        billing: "Billing",
        partners: "Partners",
        materialRequest: "Material Request",
        product: "Product",
        users: "Users",
        setting: "Setting",
        logout: "Logout",
    },
    // Estimation Page
    "EstimationPage": {
        noFound: "No Estimation Found",
        searchBar: "Search Estimation",
        buttons: {
            "createButton": "Create Estimator",
            "deleteButton": "Delete"
        },
        table: [
            "Name",
            "Project Name",
            "Contract",
            "Apply On",
            "Delete"
        ],
        sureDelete: {
            buttons: {
                backButton: "Back",
                deleteButton: {
                    text: "Delete",
                    loading: "Loading..."
                }
            },
            text: "Are You Sure !"
        }
    },
    // Estimation Form
    "EstimationForm": {
        title: "Add Estimator",
        addButton: {
            text: "Add Estimator",
            loading: "Adding Estimator..."
        },
        fields: {
            "name": "Name",
            "enterName": "Enter name",
            "nameRequired": "Name is required",
            "projectName": "Project Name",
            "selectProjectName": "Select Project Name",
            "projectNameRequired": "Project name is required",
            "applyOn": "Apply On",
            "selectApplyOn": "Select Apply On",
            "applyOnRequired": "Apply On is required",
            "wholeBOQ": "Whole BOQ",
            "boqLines": "BOQ Lines",
            "contract": "Contract",
            "selectContract": "Select Contract",
            "contractRequired": "Contract is required"
        }
    },
    // Contracts Page
    "ContractsPage": {
        searchBar: "Search cotnracts...",
        buttons: {
            "addButton": "+ Add Contract",
        },
        table: ["Code", "Contract", "Partner", "Contract Type", "Status", "Details"],
        details: {
            openEstimator: "Open Estimator",
            edit: "Edit",
            assignSubcontractor: "Assign to Subcontractor",
            createQuotation: "Create Quotation",
            attachDocument: "Attach Document",
            delete: "Delete"
        }
    },
    // Contracts Forms 
    "ContractsForms": {
        buttons: {
            nextButton: {
                text: "Next",
                loading: "Loading.."
            },
            backButton: "Back"
        },
        "form1": {
            "code": "Code",
            "codePlaceholder": "Enter code",
            "codeRequired": "Code is required",
            "codeMaxLength": "Code must be at most 10 characters long",
            "contractType": "Contract Type",
            "contractTypeRequired": "Contract Type is required",
            "contractTypeOptions": [
                {
                    value: "",
                    text: "choose"
                },
                {
                    value: "Owner",
                    text: "Owner"
                },
                {
                    value: "Sub-contractor",
                    text: "Sub-Contractor Contract"
                },
            ],
            "project": "Project",
            "projectRequired": "Project is required",
            "projectPlaceholder": "Choose...",
            "partner": "Partner",
            "partnerRequired": "Partner is required",
            "partnerPlaceholder": "Choose...",
            "startDate": "Start Date",
            "startDateRequired": "Start date is required.",
            "endDate": "End Date",
            "endDateRequired": "End date is required.",
            "endDateInvalid": "End date must be later than start date.",
            "consultant": "Consultant",
            "consultantRequired": "Consultant is required",
            "consultantPlaceholder": "Choose...",
            "typeOfProgress": "Type of Progress",
            "typeOfProgressRequired": "Type of Progress is required",
            "typeOfProgressOptions": [
                {
                    value: "",
                    text: "choose"
                },
                {
                    value: "In Progress",
                    text: "Quantity"
                },
                {
                    value: "Completed",
                    text: "Percentage Per Line"
                },
                {
                    value: "Suspended",
                    text: "Percentage Applied to Total of Line"
                },
                {
                    value: "Suspended",
                    text: "Financial Progress"
                },
                {
                    value: "Suspended",
                    text: "Time-Based Progress"
                },
            ],
            "description": "Description",
            "descriptionRequired": "Description is required.",
        },
        BOQ: {
            form: {
                title: "+AddItem",
                addButton: "Add Item",
                fields: [
                    {
                        label: "Main Item",
                        type: "text",
                        name: "itemName",
                        errorMessage: "Main item is required",
                        placeholder: "Enter main item"
                    },
                    {
                        label: "Sub Item",
                        type: "text",
                        name: "subItemName",
                        errorMessage: "Sub item is required",
                        placeholder: "Enter sub item"
                    },
                    {
                        label: "Work statement ",
                        type: "text",
                        name: "workItemName",
                        errorMessage: "Work statement is required",
                        placeholder: "Enter work item name"
                    },
                    {
                        label: "Unit Of Measure",
                        type: "text",
                        name: "unitOfMeasure",
                        errorMessage: "Unit of measure is required",
                        placeholder: "Enter unit of measure"
                    },
                    {
                        label: "Assigned Quantity",
                        type: "number",
                        name: "assignedQuantity",
                        errorMessage: "Assined quantity is required",
                        placeholder: "Enter "
                    },
                    {
                        label: "Price",
                        type: "number",
                        name: "price",
                        errorMessage: "Price is required",
                        placeholder: "Enter price"
                    },
                    {
                        label: "Start Date",
                        name: "startDate",
                        type: "date",
                        errorMessage: "Start Date is required",
                    },
                    {
                        label: "End Date",
                        name: "endDate",
                        type: "date",
                        errorMessage: "End Date is required",
                    },
                    {
                        label: "Work Item Type",
                        name: "workItemType",
                        type: "select",
                        errorMessage: "Work item type is required",
                        options: [
                            {
                                value: "",
                                text: "Select work item type",
                            },
                            {
                                value: "supplyOnlyItem",
                                text: "Supply Only Item",
                            },
                            {
                                value: "installationOnlyItem",
                                text: "Installation Only Item",
                            },
                            {
                                value: "supplyAndInstallationItem",
                                text: "Supply and Installation Item",
                            },
                            {
                                value: "miscellaneousItem",
                                text: "Miscellaneous Item",
                            },
                            {
                                value: "storageItem",
                                text: "Storage Item",
                            },
                            {
                                value: "equipmentRentalItem",
                                text: "Equipment Rental/Service Item",
                            },
                            {
                                value: "otherItem",
                                text: "Other Item",
                            },
                        ]
                    },
                    {
                        label: "Notes",
                        name: "notes",
                        type: "textarea",
                        placeholder: "Enter your notes",
                    },
                ]
            },
            table: {
                noFound: "Not item yet, Add first item",
                filter: {
                    filterButton: "Filter",
                    searchBar: "Search by item name",
                    addButton: "+ Add Item"
                },
                allItems: {
                    text: "ITEM",
                    main: {
                        text: "Main Item",
                        moreButton: "More"
                    },
                    sub: {
                        text: "Sub Item",
                        moreButton: "More"
                    },
                    work: {
                        text: "Work Item",
                        moreButton: "More"
                    },
                    contentWorkItems: {
                        unitOfMeasure: "Unit Of Measure",
                        assignedQuantity: "Assigned Quantity",
                        price: "Price",
                        total: "Total"
                    }
                },
                detailsButtons: {
                    editButton: "Edit",
                    deleteButton: "Delete"
                }
            },
            filter: {
                "columns": {
                    text: "Columns",
                    values: [
                        "Unit Of Measure",
                        "Assigned Quantity",
                        "Price",
                        "Total",
                    ]
                },
                expand: "Expand",
                reset: "Reset",
                saveTemplateForm: {
                    title: "Save as Template",
                    fields: {
                        "name": "Name",
                        "description": "Description",
                        "category": "Category",
                        "tags": "tags",
                        "tagsButton": "Add",
                        buttons: {
                            cancelButton: "Cancel",
                            saveButton: "Save"
                        },
                        messages: {
                            saveFailed: "Failed to save template. Please try again.",
                            sameName: "Template with the same name already exists!",
                            saveSuccess: "Template saved successfully!"
                        }
                    }
                }
            },
            excelAndTemplate: {
                getTemplate: "Get BOQ From Template",
                options: {
                    value: "",
                    text: "Template"
                },
                excelButton: "Import"
            },
            taxAndDownPayment: {
                taxInput: {
                    text: "Include Tax",
                    placeholder: "Tax Value",
                },
                downPaymentInput: {
                    text: "Down Payment",
                    placeholder: "Down Payment",
                },
                addButton: "Add"
            },
            sureDelete: {
                text: "Are You Sure !",
                backButton: "Back",
                deleteButton: {
                    text: "Delete",
                    loading: "Loading.."
                }
            },
            updateWorkItem: {
                title: "Update work item",
                fields: [
                    {
                        label: "Main Item",
                        type: "text",
                        name: "itemName",
                        errorMessage: "Main item is required",
                        placeholder: "Enter main item"
                    },
                    {
                        label: "Sub Item",
                        type: "text",
                        name: "subItemName",
                        errorMessage: "Sub item is required",
                        placeholder: "Enter sub item"
                    },
                    {
                        label: "Work statement ",
                        type: "text",
                        name: "workItemName",
                        errorMessage: "Work statement is required",
                        placeholder: "Enter work item name"
                    },
                    {
                        label: "Unit Of Measure",
                        type: "text",
                        name: "unitOfMeasure",
                        errorMessage: "Unit of measure is required",
                        placeholder: "Enter unit of measure"
                    },
                    {
                        label: "Assigned Quantity",
                        type: "number",
                        name: "assignedQuantity",
                        errorMessage: "Assined quantity is required",
                        placeholder: "Enter assigned quantity"
                    },
                    {
                        label: "Price",
                        type: "number",
                        name: "price",
                        errorMessage: "Price is required",
                        placeholder: "Enter price"
                    },
                    {
                        label: "Start Date",
                        name: "startDate",
                        type: "date",
                        errorMessage: "Start Date is required",
                    },
                    {
                        label: "End Date",
                        name: "endDate",
                        type: "date",
                        errorMessage: "End Date is required",
                    },
                    {
                        label: "Work Item Type",
                        name: "workItemType",
                        type: "select",
                        errorMessage: "Work item type is required",
                        options: [
                            {
                                value: "",
                                text: "Select work item type",
                            },
                            {
                                value: "supplyOnlyItem",
                                text: "Supply Only Item",
                            },
                            {
                                value: "installationOnlyItem",
                                text: "Installation Only Item",
                            },
                            {
                                value: "supplyAndInstallationItem",
                                text: "Supply and Installation Item",
                            },
                            {
                                value: "miscellaneousItem",
                                text: "Miscellaneous Item",
                            },
                            {
                                value: "storageItem",
                                text: "Storage Item",
                            },
                            {
                                value: "equipmentRentalItem",
                                text: "Equipment Rental/Service Item",
                            },
                            {
                                value: "otherItem",
                                text: "Other Item",
                            },
                        ]
                    },
                    {
                        label: "Notes",
                        name: "notes",
                        type: "textarea",
                        placeholder: "Enter your notes",
                    },
                ],
                updateButton: "Update Item",
                messages: {
                    success: "Update work item successfully"
                }
            },
            texts: {
                total: "Total",
            }
        },
        deduction: {
            buttons: {
                nextButton: "Next",
                backButton: "Back"
            },
            table: {
                noFound: ["No deductions available.", "Add deductions to see them listed here."],
                addButton: "+ Add Deduction",
                items: ["Code", "Name of Deduction", "Type", "Amount"],
                footer: "Total Deductions"
            },
            addForm: {
                title: "Add Deduction",
                name: "Deduction Name",
                namePlaceholder: "Enter Deduction Name",
                type: "Type",
                typeOptions: [
                    {
                        value: "Amount",
                        text: "Amount"
                    },
                    {
                        value: "Percentage %",
                        text: "Percentage %"
                    }
                ],
                valueType: "Enter Value of {{type}}",
                addButton: "Add"
            }
        },
        addition: {
            buttons: {
                nextButton: "Next",
                backButton: "Back"
            },
            table: {
                noFound: ["No additions available.", "Add additions to see them listed here."],
                addButton: "+ Add Addition",
                items: ["Code", "Name of Addition", "Type", "Amount"],
                footer: "Total Additions"
            },
            addForm: {
                title: "Add Addition",
                name: "Addition Name",
                namePlaceholder: "Enter Addition Name",
                type: "Type",
                typeOptions: [
                    {
                        value: "Amount",
                        text: "Amount"
                    },
                    {
                        value: "Percentage %",
                        text: "Percentage %"
                    }
                ],
                valueType: "Enter Value of {{type}}",
                addButton: "Add"
            }
        },
        summary: {
            backButton: "Back",
            contractDetails: {
                text: "Contract Details",
                data: {
                    totalContract: "Total Contract Value",
                    totalAdditon: "Total Addition",
                    otherDetection: "Other Detection/Discount",
                    workGuarantee: "Work Guarantee Discount"
                }
            },
            financialDetails: {
                text: "Financial Details of Contract",
                data: {
                    totalAmount: "total Amount Paid",
                    totalValue: "Total Value of Issued Invoices",
                    outstandingAmount: "Outstanding Amount",
                    otherAddition: "Other Addition/Discount"
                }
            },
            taxDetails: {
                text: "Tax Details",
                data: {
                    currentWork: "Current Work Value",
                    totalTax: "Total Tax Amount",
                }
            }
        }
    },
    // Edit Contract Form
    "EditContractForm": {
        title: "Edit Contract",
        fields: {
            "contractType": "Contract Type",
            "contractTypeRequired": "Contract Type is required",
            "contractTypeOptions": [
                {
                    value: "",
                    text: "choose"
                },
                {
                    value: "Owner",
                    text: "Owner"
                },
                {
                    value: "Sub-contractor",
                    text: "Sub-Contractor Contract"
                },
            ],
            "project": "Project",
            "projectRequired": "Project is required",
            "projectPlaceholder": "Choose...",
            "partner": "Partner",
            "partnerRequired": "Partner is required",
            "partnerPlaceholder": "Choose...",
            "startDate": "Start Date",
            "startDateRequired": "Start date is required.",
            "typeOfProgress": "Type of Progress",
            "typeOfProgressRequired": "Type of Progress is required",
            "typeOfProgressOptions": [
                {
                    value: "",
                    text: "choose"
                },
                {
                    value: "In Progress",
                    text: "Quantity"
                },
                {
                    value: "Completed",
                    text: "Percentage Per Line"
                },
                {
                    value: "Suspended",
                    text: "Percentage Applied to Total of Line"
                },
                {
                    value: "Suspended",
                    text: "Financial Progress"
                },
                {
                    value: "Suspended",
                    text: "Time-Based Progress"
                },
            ],
            "consultant": "Consultant",
            "consultantRequired": "Consultant is required",
            "consultantPlaceholder": "Choose...",
            "endDate": "End Date",
            "endDateRequired": "End date is required.",
            "endDateInvalid": "End date must be later than start date.",
            "description": "Description",
        },
        updateButton: "Update Contract"
    },
    // Contract Steps
    "ContractSteps": {
        addContract: "Add Contract",
        boq: "BOQ",
        deduction: "Deduction",
        addition: "Addition",
        summary: "Summary"
    },
    // Confirmation Steps
    "ConfirmationSteps": {
        addConfirmation: "Add Confirmation",
        boq: "BOQ",
        deduction: "Deduction",
        addition: "Addition",
    },
    // Confirmation Page
    "ConfirmationPage": {
        buttons: {
            createButton: "+ Create Work Confirmation",
            nextButton: "Next",
            previousButton: "Previous"
        },
        searchBar: "Search work confirmation...",
        table: {
            paggination: "Page {{currentPage}} of {{totalPages}}",
            items: [
                "Type",
                "Contract",
                "arrange for contract",
                "Date",
                "Project",
                "Partner",
                "Total Amount",
                "Duo Amount",
                "Status",
                "Details"
            ],
            noFound: "No Work Confirmation Found"
        },
        detailsModel: {
            editButton: "Edit",
            deleteButton: "Delete"
        }
    },
    // Confirmation Forms
    "ConfirmationForms": {
        sureDelete: {
            text: "Are You Sure!",
            buttons: {
                backButton: "Back",
                deleteButton: {
                    text: "Delete",
                    loading: "Loading..."
                }
            }
        },
        BOQ: {
            currentWork: {
                title: "Current Work Confirmation Details",
                data: {
                    totalCurrent: "Total Current Work",
                    guaranteeDeduction: "Guarantee Deduction",
                    totalOtherDeductions: "Total Other Deductions",
                    totalAdditions: "Total Additions",
                    dueAmount: "Due Amount",
                }
            },
            cuntractDetails: {
                title: "Contract Details",
                data: {
                    totalContract: "Total Contract Value",
                    totalWorkConfirmation: "Total Work Confirmation Issued As of now",
                    workGuarantee: "Work Guarantee Amount As of Now",
                    otherDetection: "Other Detection/Discount",
                    totalAdditions: "Total Additions",
                    remainingAmount: "Remaining Amount"
                }
            },
            taxDetails: {
                title: "Tax Details",
                data: {
                    totalUntaxed: "Total Untaxed Amount",
                    taxAmount: "Tax Amount"
                }
            },
            table: {
                calculateButton: "Calculate",
                searchBar: "Search work confirmation...",
                "columns": {
                    "workItem": "work item",
                    "unitOfMeasure": "Unit Of Measure",
                    "contractQuantity": "Contract Quantity",
                    "previousQuantity": "Previous Quantity",
                    "currentWorkPercent": "Current Work %",
                    "currentWorkQty": "Current Work QTY",
                    "currentWork": "Current Work",
                    "totalQuantity": "Total Quantity",
                    "price": "Price",
                    "totalAmount": "Total Amount",
                    "completionPercent": "Completion %",
                    "invoicingPercent": "Invoicing %",
                    "netAmount": "Net Amount",
                    "duoAmount": "Duo Amount",
                    "calculate": "Calculate"
                },
                nameColumn: [
                    "work item",
                    "Unit Of Measure",
                    "Contract Quantity",
                    "Previous Quantity",
                    "Current Work",
                    "Current Work QTY",
                    "Current Work %",
                    "Total Quantity",
                    "Price",
                    "Total Amount",
                    "Completion %",
                    "Invoicing %",
                    "Net Amount",
                    "Duo Amount",
                    "Calculate",
                ],
            },
        },
        form1: {
            contractType: "Contract Type",
            contractTypePlaceholder: "Contract Type",
            withContract: "With Contract",
            withContractSelect: "Select Contract Number",
            projectName: "Project name",
            projectNamePlaceholder: "Project Name",
            partner: "Partner",
            partnerPlaceholder: "Partner name",
            startDate: "Start Date",
            startDateRequired: "Start date is Required",
            endDate: "End Date",
            endDateRequired: "End date is required",
            workConfirmationType: "Work Confirmation Type",
            workConfirmationTypeRequired: "Work confirmation type is required",
            workConfirmationTypeOptions: [
                {
                    value: "",
                    text: "Select"
                },
                {
                    value: "progress",
                    text: "Progress Work Confirmation"
                },
                {
                    value: "inspection",
                    text: "Inspection-Based Confirmation"
                },
                {
                    value: "substantial",
                    text: "Substantial Completion Confirmation"
                },
                {
                    value: "final",
                    text: "Final Work Confirmation"
                },
                {
                    value: "material",
                    text: "Material and Equipment Receipt Confirmation"
                },
                {
                    value: "safety",
                    text: "Safety and Compliance Confirmation"
                },
                {
                    value: "daily",
                    text: "Daily Work Reports (DWR)"
                },
                {
                    value: "punch",
                    text: "Punch List Completion Confirmation"
                },
                {
                    value: "changeOrder",
                    text: "Change Order Work Confirmation"
                },
                {
                    value: "warranty",
                    text: "Warranty and Maintenance Confirmation"
                },
            ],
            typeOfProgress: "Type of progress",
            typeOfProgressOptions: [
                {
                    value: "",
                    text: "Select"
                },
                {
                    value: "Percentage per Line",
                    text: "Percentage per Line"
                },
                {
                    value: "Quantity per Line",
                    text: "Quantity per Line"
                },
            ],
            typeOfProgressRequired: "type Of Progress is required",
            toggles: {
                activate: "Activate Invoicing by %",
                completion: "Completion % - Based Work Confirmation",
                negative: "Active negative values"
            },
            messages: {
                mustChooseContract: "you must choose contract"
            },
            buttons: {
                backButton: "Back",
                nextButton: {
                    text: "Next",
                    loading: "Loading..."
                },
                updateButton: {
                    text: "Update",
                    loading: "Loading..."
                },
                previousButton: "Previous",
            }
        },
    },
    // BOQ Template
    "BoqTemplatePage": {
        searchBar: "Search Template...",
        table: [
            "Code",
            "Template Name",
            "Template Description",
            "Create Date",
            "Category",
            "Details"
        ],
        detailsModel: {
            edit: "Edit",
            delete: "Delete"
        },
        noFound: "No Templates Found",
        sureDelete: {
            text: "Are You Sure!",
            buttons: {
                backButton: "Back",
                deleteButton: {
                    text: "Delete",
                    loading: "Loading..."
                }
            }
        },
    },
    "EditBoqTemplateForm": {
        text: "Save as Template",
        fields: {
            name: "Name",
            nameRequired: "Name is required.",
            description: "Description",
            descriptionRequired: "Description is required.",
            category: "Category",
            categoryRequired: "Category is required.",
            tags: "Tags",
        },
        buttons: {
            addButton: "Add",
            cancelButton: "Cancel",
            saveButton: {
                text: "Save",
                loading: "Waiting..."
            }
        }

    }
}

export default TranslationEnglish