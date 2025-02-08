import { IoIosDocument } from "react-icons/io";
import {
  IoPersonOutline,
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
  IoBusinessOutline,
  IoDocumentTextOutline,
  IoCalendarOutline,
  IoDownloadOutline,
  IoPrintOutline,
  IoAlertCircleOutline,
  IoCheckmarkCircleOutline,
  IoTimeOutline,
} from "react-icons/io5";

const TranslationEnglish = {
  // User Tanet Page
  UserTanetPage: {
    AddButton: "Add User",
    SearchBar: "Search users...",
    Table: [
      "First Name",
      "Second Name",
      "Email",
      "Phone",
      "Company Name",
      "Company Type",
      "Details",
    ],
    modelDetails: {
      editButton: "Edit",
      deleteButton: "Delete",
    },
    AddUser: {
      Title: "Add User",
      Fields: [
        {
          label: "First Name",
          name: "firstName",
          placeholder: "Enter your First Name",
          type: "text",
        },
        {
          label: "Second Name",
          name: "secondName",
          placeholder: "Enter your Second Name",
          type: "text",
        },
        {
          label: "Email",
          name: "email",
          placeholder: "Enter your email",
          type: "email",
        },
        {
          label: "Password",
          name: "password",
          placeholder: "Enter your password",
          type: "password",
        },
        {
          label: "Confirm Password",
          name: "confirmPassword",
          placeholder: "Enter you confirm password",
          type: "password",
        },
        {
          label: "Phone number",
          name: "phone",
          placeholder: "Enter your phone number",
          type: "number",
        },
      ],
      SubmitButton: "Add User",
    },
    editUser: {
      title: "Edit User",
      fields: [
        {
          label: "First Name",
          placeholder: "Enter your first name",
          type: "text",
          name: "firstName",
        },
        {
          label: "Second Name",
          placeholder: "Enter your second name",
          type: "text",
          name: "secondName",
        },
        {
          label: "Email",
          placeholder: "Enter your email",
          type: "email",
          name: "email",
        },
        {
          label: "Phone number",
          placeholder: "Enter your phone number",
          type: "number",
          name: "phone",
        },
      ],
      requiredMessage: "{{name}} is required",
      updateButton: {
        text: "Update User",
        loading: "Saving...",
      },
    },
  },
  // Projects Page
  ProjectsPage: {
    title: "Overview",
    charts: [
      {
        title: "Projects",
        bgColor: "bg-pink-500",
        circleColor1: "bg-pink-300",
        circleColor2: "bg-pink-400",
      },
      {
        title: "Total Revenue",
        bgColor: "bg-orange-400",
        circleColor1: "bg-orange-200",
        circleColor2: "bg-orange-300",
      },
      {
        title: "Total Cost",
        bgColor: "bg-blue-500",
        circleColor1: "bg-blue-300",
        circleColor2: "bg-blue-400",
      },
    ],
    statusChartLabels: ["Completed", "Planning", "In Progress"],
    searchBarPlaceholder: "Search projects...",
    addButton: "Add Project +",
    table: {
      noFoundMessage: "No Projects Found",
      items: [
        {
          text: "Code",
        },
        {
          text: "Project Name",
        },
        {
          text: "Project Manager",
        },
        {
          text: "Status",
        },
        {
          text: "Details",
        },
      ],
      menu: {
        edit: "Edit",
        delete: "Delete",
      },
      status: {
        inProgress: "in Progress",
        planning: "Planning",
        completed: "Completed",
      },
    },
    pagination: {
      text: "Displaying {displaying} of {projects} projects",
      nextButton: "Next",
      previousButton: "Previous",
      page: "Page {page} of {projects}",
    },
  },
  // Add Project Page
  AddProjectPage: {
    saveButton: "Save",
    backButton: "Back",
    feilds1: [
      {
        label: "Project name",
        placeholder: "Enter project name",
        name: "projectName",
        required: true,
        errorMessage: "Project Name is required",
      },
      {
        label: "Start Date",
        placeholder: "10/10/2023",
        name: "startDate",
        required: true,
        errorMessage: "Start Date is required",
        type: "date",
      },
      {
        label: "Project Location",
        placeholder: "Enter project location",
        name: "projectLocation",
        required: true,
        errorMessage: "Project Location is required",
      },
      {
        label: "Project Manager",
        placeholder: "Select Project Manager",
        name: "projectManger",
        required: true,
        errorMessage: "Project Manager is required",
        type: "select",
      },
      {
        label: "Status",
        placeholder: "Select Status",
        name: "status",
        required: true,
        errorMessage: "Status is required",
        type: "select",
        options: [
          {
            value: "in Progress",
            text: "in Progress",
          },
          {
            value: "Completed",
            text: "Completed",
          },
          {
            value: "Planning",
            text: "Planning",
          },
        ],
      },
      {
        label: "Team Members",
        multiSelect: true,
      },
      {
        label: "Scope Of Work",
        placeholder: "Enter details",
        name: "scopeOfWork",
        required: true,
        errorMessage: "Scope of Work is required",
      },
    ],
    riskAssessment: {
      text: "+ Add Risk Assessment",
      feilds: [
        {
          label: "Mitigation Strategies",
          placeholder: "Enter Mitigation Strategies",
          name: "mitigationStrategies",
        },
        {
          label: "Impact",
          placeholder: "Enter impact",
          name: "impact",
          type: "date",
        },
        {
          label: "Potential",
          placeholder: "Enter potential",
          type: "date",
          name: "potential",
        },
      ],
    },
    addMilestones: {
      text: "+ Add Milestones",
      feilds: [
        {
          label: "Start Date",
          placeholder: "Start Date",
          type: "date",
          name: "taskStartDate",
        },
        {
          label: "End Date",
          placeholder: "End Date",
          name: "taskEndDate",
          type: "date",
        },
      ],
    },
    feilds2: [
      {
        label: "Client Name",
        placeholder: "Select Client",
        name: "clientName",
        required: true,
        errorMessage: "Client Name is required",
        type: "select",
      },
      {
        label: "End Date",
        placeholder: "25/12/2023",
        name: "endDate",
        required: true,
        errorMessage: "End Date is required",
        type: "date",
      },
      {
        label: "Budget",
        placeholder: "Enter budget",
        name: "budget",
        required: true,
        errorMessage: "Budget is required",
        type: "number",
      },
      {
        label: "Description",
        placeholder: "Enter description",
        name: "description",
        required: true,
        errorMessage: "Description is required",
      },
      {
        label: "Upload Document",
        name: "documents",
        type: "file",
      },
    ],
  },
  // Edit Project Page
  EditProjectPage: {
    updateButton: "Update Project",
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
      requiredField: "{{field}} is required",
    },
  },
  // Project Details Page
  ProjectDetailsPage: {
    backButton: "Back",
    projectInfo: [
      {
        text: "Project Name",
      },
      {
        text: "Client Name",
      },
      {
        text: "Project Location",
      },
      {
        text: "Start Date",
        isDate: true,
      },
      {
        text: "End Date",
        isDate: true,
      },
      {
        text: "Budget",
      },
      {
        text: "Status",
        isStatus: true,
      },
    ],
    teamMember: {
      title: "Team Member",
      seeAll: "See All",
      projectMember: "Project Member",
      projectManager: "Project Manager",
    },
    projectOverview: "Project Overview",
    scopeOfWork: "Scope of Work",
    contracts: {
      headTitle: "Contracts",
    },
    workConfirmation: {
      headTitle: "Work Confirmation",
    },
    messages: {
      loadingMessage: "Loading...",
      errorMessage: "Error fetching data!",
    },
  },
  // Delete Project
  DeleteProject: {
    message: "Are you sure !",
    backButton: "Back",
    deleteButton: { loading: "Loading...", text: "Delete" },
  },
  // Partners
  PartnersPage: {
    addButton: "Add Partner",
    table: [
      "Name",
      "Type",
      "Email",
      "Phone",
      "Address",
      "Tax Number",
      "Commercial Number",
      "Details",
    ],
    detailsButton: {
      editButton: "Edit",
      deleteButton: "Delete",
    },
    noFound: "Not Partners Yet",
  },
  // Add Partner
  AddPartnerForm: {
    title: "Add New Partner",
    fields: [
      {
        label: "Partner Name",
        name: "partnerName",
        type: "text",
        placeholder: "Enter partner's full name",
        required: true,
        icon: IoPersonOutline,
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
          { value: "Consultant", label: "Consultant" },
        ],
      },
      {
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "partner@company.com",
        required: true,
        icon: IoMailOutline,
      },
      {
        label: "Phone Number",
        name: "phone",
        type: "tel",
        placeholder: "+1 (555) 000-0000",
        required: true,
        icon: IoCallOutline,
      },
      {
        label: "Address",
        name: "address",
        type: "textarea",
        placeholder: "Enter complete address",
        required: true,
        icon: IoLocationOutline,
      },
      {
        label: "Tax Number",
        name: "taxNumber",
        type: "text",
        placeholder: "Enter tax registration number",
        required: true,
        icon: IoDocumentTextOutline,
      },
      {
        label: "Commercial Number",
        name: "commercialNumber",
        type: "text",
        placeholder: "Enter commercial registration number",
        required: true,
        icon: IoBusinessOutline,
      },
    ],
    addButton: {
      loading: "Processing...",
      text: "Add Partner",
    },
  },
  // Edit Partner
  EditPartnerForm: {
    title: "Update Partner",
    fields: [
      { label: "Partner Name", type: "text", name: "partnerName" },
      {
        label: "Type",
        type: "select",
        name: "type",
        option: [
          { value: "Owner", label: "Owner" },
          { value: "Sub-contractor", label: "Sub-contractor" },
          { value: "Consultant", label: "Consultant" },
        ],
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
    editButton: {
      loading: "Loading...",
      text: "Update Item",
    },
  },
  // Delete Partner
  DeletePartner: {
    title: "Are you sure!",
    backButton: "Back",
    deleteButton: {
      loading: "Loading...",
      text: "Delete",
    },
  },
  // Products Page
  ProductsPage: {
    backButton: "Back to Main Menu",
    addButton: "+ Add Product",
    deleteButton: "Delete",
    editButton: "Edit",
    fields: [
      {
        label: "Name",
        type: "text",
        id: "name",
        name: "name",
        placeholder: "Search by name",
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
    table: [
      "Sku",
      "Name",
      "Category",
      "Price",
      "Quantity",
      "Uom",
      "Description",
      "Supplier",
      "Id",
      "Actions",
    ],
    searchButton: "Search",
    noFound: "No products available",
  },
  ProductsList: {
    title: "List of products",
    searchBar: "Search Product by name",
    selectButton: "Select",
    table: [
      "Sku",
      "Name",
      "Category",
      "Price",
      "Quantity",
      "Uom",
      "Supplier",
      "Id",
      "Actions",
    ],
    noFound: "No products found",
  },
  // Edit & Add Product Form
  EditAndAddProductForm: {
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
  MaterialRequestPage: {
    title: "Material Request",
    noFound: "No Materials Yet",
    cards: [
      { label: "Total Approved Line", value: 7155, color: "#4CAF50" },
      { label: "Number of Items", value: 2, color: "#FF9800" },
      { label: "Total Cost", value: 5685, color: "#2196F3" },
    ],
    tooltips: {
      refresh: "Refresh Data",
      print: "Print Request",
    },
    buttons: {
      addButton: "Add Material",
      backButton: "Back",
      printButton: "Print",
    },
  },
  // Material Request Form
  MaterialRequestForm: {
    buttons: {
      submitButton: "Submit to manger",
      saveButton: "Save as draft",
      helpButton: "Help",
      addLineButton: "Add new line",
      bulkButton: "Bulk approve",
    },
    upload: {
      text: "Upload Document",
      model: "Drag & Drop File Here",
      button: "Open Modal",
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
      },
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
    searchBar: "Search Items",
  },
  // Login
  LoginPage: {
    welcome: "Welcome Back!",
    message: "Please sign in to your account",
    fields: [
      {
        label: "Email",
        type: "email",
        name: "email",
        validation: {
          pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        },
      },
      {
        label: "Password",
        type: "password",
        name: "password",
        validation: {
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
          },
        },
      },
      { label: "Organization Name", type: "text", name: "companyName" },
    ],
    buttons: {
      signInButton: "Sign in",
      registerButton: "Register",
      dontHave: "Dont't have an account?",
    },
  },
  // Register
  RegisterPage: {
    buttons: {
      googleSignButton: "Sign up with google",
      nextButton: {
        text: "Next",
        loading: "Processing...",
      },
      alreadyHave: "Alread have an account?",
      loginButton: "Login",
      backButton: "Back",
      createButton: {
        text: "Create",
        loading: "Processing...",
      },
    },
    fields1: [
      {
        label: "Company Email",
        type: "email",
        name: "email",
        validation: {
          pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        },
      },
      {
        label: "Password",
        type: "password",
        name: "password",
        validation: {
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
          },
        },
      },
      {
        label: "Confirm Password",
        type: "password",
        name: "confirmPassword",
        validation: { validate: "Passwords do not match" },
      },
      { label: "Phone Number", type: "number", name: "phone" },
    ],
    fields2: [
      { label: "First Name", type: "text", name: "firstName" },
      { label: "Second Name", type: "text", name: "secondName" },
      { label: "Company Name", type: "text", name: "companyName" },
      {
        label: "Company Size",
        type: "select",
        name: "companySize",
        options: [
          "1-10 employees (Small startup)",
          "11-50 employees (Growing small business)",
          "51-200 employees (Medium-sized business)",
          "201-500 employees (Mid-large company)",
          "501-1,000 employees (Large company)",
          "1,001-5,000 employees (Enterprise level)",
        ],
      },
      {
        label: "Company Type",
        type: "select",
        name: "companyType",
        options: ["Contractor", "Sub-Contractor"],
      },
    ],
    texts: ["Create Account", "Or"],
  },
  // Sidebar
  Sidebar: {
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
    reports: "Reports",
  },
  // Estimation Page
  EstimationPage: {
    noFound: "No Estimation Found",
    searchBar: "Search Estimation",
    buttons: {
      createButton: "Create Estimator",
      deleteButton: "Delete",
    },
    table: ["Name", "Project Name", "Contract", "Apply On", "Delete"],
    sureDelete: {
      buttons: {
        backButton: "Back",
        deleteButton: {
          text: "Delete",
          loading: "Loading...",
        },
      },
      text: "Are You Sure !",
    },
  },
  // Estimation Form
  EstimationForm: {
    title: "Add Estimator",
    addButton: {
      text: "Add Estimator",
      loading: "Adding Estimator...",
    },
    fields: {
      name: "Name",
      enterName: "Enter name",
      nameRequired: "Name is required",
      projectName: "Project Name",
      selectProjectName: "Select Project Name",
      projectNameRequired: "Project name is required",
      applyOn: "Apply On",
      selectApplyOn: "Select Apply On",
      applyOnRequired: "Apply On is required",
      wholeBOQ: "Whole BOQ",
      boqLines: "BOQ Lines",
      contract: "Contract",
      selectContract: "Select Contract",
      contractRequired: "Contract is required",
    },
  },
  // Estimator Page
  EstimatorPage: {
    header: {
      backButton: " Back to Main Menu",
      headTitle: "BOQ Item Cost Estimator",
      bulkUpload: {
        errorMessage: "you must apply on Whole BOQ",
        excelSheetButton: "Add",
        bulkButton: "Bulk Upload",
        printButton: "Print",
      },
    },
    projectDetails: {
      headTitle: "Project Details",
      fields: {
        projectName: "Project Name",
        applyOn: "Apply On",
        contractSelection: "Contract Selection",
      },
    },
    extraFactors: {
      headTitle: "Extra Factors",
      fields: {
        riskFactor: "Risk Factor (%)",
        riskFactorTooltip:
          "Percentage to account for risk in cost calculations",
        includeTax: "Include Tax",
        showSalesPrice: "Show Sales Price",
      },
      taxButton: "Add Tax, Profit",
    },
    costSummary: {
      headTitle: "Cost Summary",
      categories: [
        {
          text: "Total Material Cost",
          color: "#4caf50",
        },
        {
          text: "Total Labor Cost",
          color: "#ff9800",
        },
        {
          text: "Total Equipment Cost",
          color: "#2196f3",
        },
        {
          text: "Total Other Costs Cost",
          color: "#9c27b0",
        },
      ],
      overallTotal: "overall Total: ${{overallTotal}}",
    },
    fourTabs: {
      categories: [
        {
          text: "Material",
          color: "#4caf50",
          value: "Material",
        },
        {
          text: "Labor",
          color: "#ff9800",
          value: "Labor",
        },
        {
          text: "Equipment",
          color: "#2196f3",
          value: "Equipment",
        },
        {
          text: "Other Costs",
          color: "#9c27b0",
          value: "Other Costs",
        },
      ],
      text: "Costs",
      table: {
        item: "Item",
        unitOfMeasure: "Unit Of Measure",
        quantity: "Quantity",
        cost: "Cost",
        boqItem: "BOQ Item",
        profitMargin: "Profit Margin",
        includeTax: "Include Tax",
        totalCost: "Total Cost",
        actions: "Actions",
      },
      addButton: "Add {{categoryText}} Row",
    },
    addTab: {
      selectProduct: "Select Product",
      selectName: "Select Name",
      enterName: "Enter name",
      successMessage: "Add Successfully",
    },
  },
  // Contracts Page
  ContractsPage: {
    searchBar: "Search cotnracts...",
    buttons: {
      addButton: "+ Add Contract",
    },
    table: [
      "Code",
      "Contract",
      "Partner",
      "Contract Type",
      "Status",
      "Details",
    ],
    details: {
      openEstimator: "Open Estimator",
      edit: "Edit",
      assignSubcontractor: "Assign to Subcontractor",
      createQuotation: "Create Quotation",
      attachDocument: "Attach Document",
      delete: "Delete",
    },
    pagination: {
      nextButton: "Next",
      previousButton: "Previous",
      text: "Page {{page}} - contracts {{currentPage}} to {{totalPages}}",
    },
  },
  // Contracts Forms
  ContractsForms: {
    buttons: {
      nextButton: {
        text: "Next",
        loading: "Loading..",
      },
      backButton: "Back",
    },
    form1: {
      code: "Code",
      codePlaceholder: "Enter code",
      codeRequired: "Code is required",
      codeMaxLength: "Code must be at most 10 characters long",
      contractType: "Contract Type",
      contractTypeRequired: "Contract Type is required",
      contractTypeOptions: [
        {
          value: "",
          text: "choose",
        },
        {
          value: "Owner",
          text: "Owner",
        },
        {
          value: "Sub-contractor",
          text: "Sub-Contractor Contract",
        },
      ],
      project: "Project",
      projectRequired: "Project is required",
      projectPlaceholder: "Choose...",
      partner: "Partner",
      partnerRequired: "Partner is required",
      partnerPlaceholder: "Choose...",
      startDate: "Start Date",
      startDateRequired: "Start date is required.",
      endDate: "End Date",
      endDateRequired: "End date is required.",
      endDateInvalid: "End date must be later than start date.",
      consultant: "Consultant",
      consultantRequired: "Consultant is required",
      consultantPlaceholder: "Choose...",
      typeOfProgress: "Type of Progress",
      typeOfProgressRequired: "Type of Progress is required",
      typeOfProgressOptions: [
        {
          value: "",
          text: "Select",
        },
        {
          value: "Percentage per Line",
          text: "Percentage per Line",
        },
        {
          value: "Quantity per Line",
          text: "Quantity per Line",
        },
      ],
      description: "Description",
      descriptionRequired: "Description is required.",
      businessGuarantee: "Business Guarantee",
      businessGuaranteePlaceholder: "Enter Business Guarantee",
      businessGuaranteeErrorMessageMax: "The maximum value is 100%",
      businessGuaranteeErrorMessageMin: "The minimum value is 0%",
      businessGuaranteeActive: "Active Business Guarantee %",
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
            placeholder: "Enter main item",
          },
          {
            label: "Sub Item",
            type: "text",
            name: "subItemName",
            errorMessage: "Sub item is required",
            placeholder: "Enter sub item",
          },
          {
            label: "Work statement ",
            type: "text",
            name: "workItemName",
            errorMessage: "Work statement is required",
            placeholder: "Enter work item name",
          },
          {
            label: "Unit Of Measure",
            type: "text",
            name: "unitOfMeasure",
            errorMessage: "Unit of measure is required",
            placeholder: "Enter unit of measure",
          },
          {
            label: "Assigned Quantity",
            type: "number",
            name: "assignedQuantity",
            errorMessage: "Assigned quantity is required",
            placeholder: "Enter assigned quantity",
          },
          {
            label: "Price",
            type: "number",
            name: "price",
            errorMessage: "Price is required",
            placeholder: "Enter price",
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
            ],
          },
          {
            label: "Notes",
            name: "notes",
            type: "textarea",
            placeholder: "Enter your notes",
          },
        ],
      },
      table: {
        noFound: "Not item yet, Add first item",
        filter: {
          filterButton: "Filter",
          searchBar: "Search by item name",
          addButton: "+ Add Item",
        },
        allItems: {
          text: "ITEM",
          main: {
            text: "Main Item",
            moreButton: "More",
          },
          sub: {
            text: "Sub Item",
            moreButton: "More",
          },
          work: {
            text: "Work Item",
            moreButton: "More",
          },
          contentWorkItems: {
            unitOfMeasure: "Unit Of Measure",
            assignedQuantity: "Assigned Quantity",
            price: "Price",
            total: "Total",
          },
        },
        detailsButtons: {
          editButton: "Edit",
          deleteButton: "Delete",
        },
      },
      filter: {
        columns: {
          text: "Columns",
          unitOfMeasure: "Unit Of Measure",
          assignedQuantity: "Assigned Quantity",
          previousQuantity: "Previous Quantity",
          remainingQuantity: "Remaining Quantity",
          financialCategory: "Financial Category",
          price: "Price",
          total: "Total",
        },
        expand: "Expand",
        reset: "Reset",
        saveTemplateForm: {
          title: "Save as Template",
          fields: {
            name: "Name",
            description: "Description",
            category: "Category",
            tags: "tags",
            tagsButton: "Add",
            buttons: {
              cancelButton: "Cancel",
              saveButton: "Save",
            },
            messages: {
              saveFailed: "Failed to save template. Please try again.",
              sameName: "Template with the same name already exists!",
              saveSuccess: "Template saved successfully!",
            },
          },
        },
      },
      excelAndTemplate: {
        getTemplate: "Get BOQ From Template",
        options: {
          value: "",
          text: "Template",
        },
        excelButton: "Import",
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
        addButton: "Add",
      },
      sureDelete: {
        text: "Are You Sure !",
        backButton: "Back",
        deleteButton: {
          text: "Delete",
          loading: "Loading..",
        },
      },
      updateWorkItem: {
        title: "Update work item",
        fields: [
          {
            label: "Main Item",
            type: "text",
            name: "itemName",
            errorMessage: "Main item is required",
            placeholder: "Enter main item",
          },
          {
            label: "Sub Item",
            type: "text",
            name: "subItemName",
            errorMessage: "Sub item is required",
            placeholder: "Enter sub item",
          },
          {
            label: "Work statement ",
            type: "text",
            name: "workItemName",
            errorMessage: "Work statement is required",
            placeholder: "Enter work item name",
          },
          {
            label: "Unit Of Measure",
            type: "text",
            name: "unitOfMeasure",
            errorMessage: "Unit of measure is required",
            placeholder: "Enter unit of measure",
          },
          {
            label: "Assigned Quantity",
            type: "number",
            name: "assignedQuantity",
            errorMessage: "Assined quantity is required",
            placeholder: "Enter assigned quantity",
          },
          {
            label: "Price",
            type: "number",
            name: "price",
            errorMessage: "Price is required",
            placeholder: "Enter price",
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
            ],
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
          success: "Update work item successfully",
        },
      },
      texts: {
        total: "Total",
      },
    },
    deduction: {
      buttons: {
        nextButton: "Next",
        backButton: "Back",
      },
      table: {
        noFound: [
          "No deductions available.",
          "Add deductions to see them listed here.",
        ],
        addButton: "+ Add Deduction",
        items: ["Code", "Name of Deduction", "Type", "Amount"],
        footer: "Total Deductions",
      },
      addForm: {
        title: "Add Deduction",
        name: "Deduction Name",
        namePlaceholder: "Enter Deduction Name",
        type: "Type",
        typeOptions: [
          {
            value: "Amount",
            text: "Amount",
          },
          {
            value: "Percentage %",
            text: "Percentage %",
          },
        ],
        valueType: "Enter Value of {{type}}",
        addButton: "Add",
      },
    },
    addition: {
      buttons: {
        nextButton: "Next",
        backButton: "Back",
      },
      table: {
        noFound: [
          "No additions available.",
          "Add additions to see them listed here.",
        ],
        addButton: "+ Add Addition",
        items: ["Code", "Name of Addition", "Type", "Amount"],
        footer: "Total Additions",
      },
      addForm: {
        title: "Add Addition",
        name: "Addition Name",
        namePlaceholder: "Enter Addition Name",
        type: "Type",
        typeOptions: [
          {
            value: "Amount",
            text: "Amount",
          },
          {
            value: "Percentage %",
            text: "Percentage %",
          },
        ],
        valueType: "Enter Value of {{type}}",
        addButton: "Add",
      },
    },
    summary: {
      backButton: "Back",
      contractDetails: {
        text: "Contract Details",
        data: {
          totalContract: "Total Contract Value",
          totalAdditon: "Total Addition",
          otherDetection: "Other Detection/Discount",
          workGuarantee: "Work Guarantee Discount",
        },
      },
      financialDetails: {
        text: "Financial Details of Contract",
        data: {
          totalAmount: "total Amount Paid",
          totalValue: "Total Value of Issued Invoices",
          outstandingAmount: "Outstanding Amount",
          otherAddition: "Other Addition/Discount",
        },
      },
      taxDetails: {
        text: "Tax Details",
        data: {
          currentWork: "Current Work Value",
          totalTax: "Total Tax Amount",
        },
      },
    },
    summaryReports: {
      title: "Total Works Summary Report",
      buttons: [
        {
          text: "Excel",
          icon: IoIosDocument,
          bgColor: "#00C951",
          type: "excel",
        },
        {
          text: "PDF",
          icon: IoDownloadOutline,
          bgColor: "#E7000B",
          type: "pdf",
        },
        {
          text: "Print",
          icon: IoPrintOutline,
          bgColor: "#6a7282",
          type: "print",
        },
      ],
      subTitles: [
        {
          text: "Commercial Peace Tower",
          icon: IoDocumentTextOutline,
        },
        {
          text: "{{date}}",
          icon: IoCalendarOutline,
        },
      ],
      details: [
        {
          text: "Contract No: {{contractNo}}",
        },
        {
          text: "Contract Value: {{contractValue}}",
        },
        {
          text: "Contract Duration: {{contractDuration}}",
        },
      ],
    },
  },
  // Edit Contract Form
  EditContractForm: {
    title: "Edit Contract",
    fields: {
      contractType: "Contract Type",
      contractTypeRequired: "Contract Type is required",
      contractTypeOptions: [
        {
          value: "",
          text: "choose",
        },
        {
          value: "Owner",
          text: "Owner",
        },
        {
          value: "Sub-contractor",
          text: "Sub-Contractor Contract",
        },
      ],
      project: "Project",
      projectRequired: "Project is required",
      projectPlaceholder: "Choose...",
      partner: "Partner",
      partnerRequired: "Partner is required",
      partnerPlaceholder: "Choose...",
      startDate: "Start Date",
      startDateRequired: "Start date is required.",
      typeOfProgress: "Type of Progress",
      typeOfProgressRequired: "Type of Progress is required",
      typeOfProgressOptions: [
        {
          value: "",
          text: "Select",
        },
        {
          value: "Percentage per Line",
          text: "Percentage per Line",
        },
        {
          value: "Quantity per Line",
          text: "Quantity per Line",
        },
      ],
      consultant: "Consultant",
      consultantRequired: "Consultant is required",
      consultantPlaceholder: "Choose...",
      endDate: "End Date",
      endDateRequired: "End date is required.",
      endDateInvalid: "End date must be later than start date.",
      description: "Description",
    },
    updateButton: "Update Contract",
  },
  // Contract Steps
  ContractSteps: {
    addContract: "Add Contract",
    boq: "BOQ",
    deduction: "Deduction",
    addition: "Addition",
    summary: "Summary",
    summaryReports: "Reports",
  },
  // Confirmation Steps
  ConfirmationSteps: {
    addConfirmation: "Add Confirmation",
    boq: "BOQ",
    deduction: "Deduction",
    addition: "Addition",
  },
  // Confirmation Page
  ConfirmationPage: {
    buttons: {
      createButton: "+ Create Work Confirmation",
      nextButton: "Next",
      previousButton: "Previous",
      backButton: "Back",
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
        "Details",
      ],
      noFound: "No Work Confirmation Found",
      calcButton: {
        loading: "Loading...",
        text: "Calculate",
      },
    },
    detailsModel: {
      editButton: "Edit",
      deleteButton: "Delete",
    },
  },
  // Confirmation Forms
  ConfirmationForms: {
    sureDelete: {
      text: "Are You Sure!",
      buttons: {
        backButton: "Back",
        deleteButton: {
          text: "Delete",
          loading: "Loading...",
        },
      },
    },
    BOQ: {
      currentWork: {
        title: "Current Work Confirmation Details",
        data: {
          totalCurrent: "Total Current Work",
          guaranteeDeduction: "Guarantee Deduction",
          totalOtherDeductions: "Total Other Deductions",
          totalAdditions: "Total Additions",
          downPayment: "Down Payment",
          dueAmount: "Due Amount",
        },
      },
      cuntractDetails: {
        title: "Contract Details",
        data: {
          totalContract: "Total Contract Value",
          totalWorkConfirmation: "Total Work Confirmation Issued As of now",
          workGuarantee: "Work Guarantee Amount As of Now",
          otherDetection: "Other Detection/Discount",
          totalAdditions: "Total Additions",
          remainingAmount: "Remaining Amount",
        },
      },
      taxDetails: {
        title: "Tax Details",
        data: {
          totalUntaxed: "Total Untaxed Amount",
          taxAmount: "Tax Amount",
        },
      },
      table: {
        calculateButton: "Calculate",
        searchBar: "Search work confirmation...",
        columnsText: "Columns",
        columns: {
          workItem: "work item",
          unitOfMeasure: "Unit Of Measure",
          contractQuantity: "Contract Quantity",
          previousQuantity: "Previous Quantity",
          currentWorkPercent: "Current Work %",
          currentWorkQty: "Current Work QTY",
          currentWork: "Current Work",
          totalQuantity: "Total Quantity",
          price: "Price",
          totalAmount: "Total Amount",
          completionPercent: "Completion %",
          invoicingPercent: "Invoicing %",
          netAmount: "Net Amount",
          duoAmount: "Duo Amount",
          calculate: "Calculate",
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
          text: "Select",
        },
        {
          value: "progress",
          text: "Progress Work Confirmation",
        },
        {
          value: "inspection",
          text: "Inspection-Based Confirmation",
        },
        {
          value: "substantial",
          text: "Substantial Completion Confirmation",
        },
        {
          value: "final",
          text: "Final Work Confirmation",
        },
        {
          value: "material",
          text: "Material and Equipment Receipt Confirmation",
        },
        {
          value: "safety",
          text: "Safety and Compliance Confirmation",
        },
        {
          value: "daily",
          text: "Daily Work Reports (DWR)",
        },
        {
          value: "punch",
          text: "Punch List Completion Confirmation",
        },
        {
          value: "changeOrder",
          text: "Change Order Work Confirmation",
        },
        {
          value: "warranty",
          text: "Warranty and Maintenance Confirmation",
        },
      ],
      typeOfProgress: "Type of progress",
      typeOfProgressOptions: [
        {
          value: "",
          text: "Select",
        },
        {
          value: "Percentage per Line",
          text: "Percentage per Line",
        },
        {
          value: "Quantity per Line",
          text: "Quantity per Line",
        },
      ],
      typeOfProgressRequired: "type Of Progress is required",
      toggles: {
        activate: "Activate Invoicing by %",
        completion: "Completion % - Based Work Confirmation",
        negative: "Active negative values",
      },
      messages: {
        mustChooseContract: "you must choose contract",
      },
      buttons: {
        backButton: "Back",
        nextButton: {
          text: "Next",
          loading: "Loading...",
        },
        updateButton: {
          text: "Update",
          loading: "Loading...",
        },
        previousButton: "Previous",
      },
    },
  },
  // BOQ Template
  BoqTemplatePage: {
    searchBar: "Search Template...",
    table: [
      "Code",
      "Template Name",
      "Template Description",
      "Create Date",
      "Category",
      "Details",
    ],
    detailsModel: {
      edit: "Edit",
      delete: "Delete",
    },
    noFound: "No Templates Found",
    sureDelete: {
      text: "Are You Sure!",
      buttons: {
        backButton: "Back",
        deleteButton: {
          text: "Delete",
          loading: "Loading...",
        },
      },
    },
  },
  EditBoqTemplateForm: {
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
        loading: "Waiting...",
      },
    },
  },
  // Setting
  SettingSideBar: {
    links: [
      {
        to: "{{companyName}}/setting/users",
        text: "Users",
        icon: "HiUsers",
      },
      {
        to: "{{companyName}}/setting/companyProfile",
        text: "Company Profile",
        icon: "ImProfile",
      },
    ],
  },
  // Company Profile
  CompanyProfile: {
    form: {
      fields: [
        {
          id: "companyName",
          type: "text",
          placeholder: "Enter your company name",
          label: "Company Name",
          required: true,
          errorMessage: "Company name is required",
          disabled: true,
        },
        {
          id: "companySize",
          type: "select",
          label: "Company Size",
          required: true,
          errorMessage: "Company size is required",
          options: [
            {
              text: "Select company size",
              value: "",
            },
            {
              text: "1-10 employees (Small startup)",
              value: "1-10 employees (Small startup)",
            },
            {
              text: "11-50 employees (Growing small business)",
              value: "11-50 employees (Growing small business)",
            },
            {
              text: "51-200 employees (Medium-sized business)",
              value: "51-200 employees (Medium-sized business)",
            },
            {
              text: "201-500 employees (Mid-large company)",
              value: "201-500 employees (Mid-large company)",
            },
            {
              text: "501-1,000 employees (Large company)",
              value: "501-1,000 employees (Large company)",
            },
            {
              text: "1,001-5,000 employees (Enterprise level)",
              value: "1,001-5,000 employees (Enterprise level)",
            },
          ],
        },
        {
          id: "companyType",
          type: "select",
          label: "Company Type",
          required: true,
          errorMessage: "Company type is required",
          options: [
            {
              text: "Select company type",
              value: "",
            },
            {
              text: "Contractor",
              value: "Contractor",
            },
            {
              text: "Sub-Contractor",
              value: "Sub-Contractor",
            },
          ],
        },
        {
          id: "phone",
          type: "phone",
          placeholder: "Enter your phone number",
          label: "Phone",
        },
        {
          id: "website",
          type: "link",
          placeholder: "Enter your website",
          label: "Website",
        },
        {
          id: "taxId",
          type: "text",
          placeholder: "Enter your company tax ID",
          label: "Tax ID",
        },
        {
          id: "companyId",
          type: "text",
          placeholder: "Enter your company ID",
          label: "Company ID",
        },
      ],
    },
    buttons: {
      updateButton: "Update",
    },
  },
  // Details Work Line
  DetailsWorkLine: {
    line: {
      title: "Overall Progress",
      alertMessage:
        "Please calculate the progress to view the overall progress",
      widgets: {
        qcPoints: "QC Points",
        ncrs: "NCRs",
        photos: "Photos",
        documents: "Documents",
      },
      lastUpdate: "Last updated: {{date}}",
      tabs: {
        progress: {
          title: "Progress Analysis",
          text: "Actual Progress",
        },
        quality: {
          title: "Quality Control",
          addButton: "Add QC Point",
          text: "Quality Control Points",
          noFoundMessage: "No QC Points",
          form: {
            formTitle: "Add New QC Point",
            titleLabel: "QC Point",
            titlePlaceholder: "Enter QC Point",
            titleMessage: "QC Point is required",
            passedLabel: "Passed",
            button: "Add",
          },
        },
        photos: {
          title: "Photos",
          text: "Site Photos",
          addButton: "Upload Photo",
          noFoundMessage: "No Photos",
          alerts: [
            "Some files were not accepted. Only image files are allowed.",
            "You can only upload a maximum of 5 files at a time. Please try again.",
            "Failed to download the image. Please try again.",
          ],
          success: [
            "Photo uploaded successfully",
            "Photo deleted successfully",
          ],
        },
        docs: {
          title: "Docs",
          text: "Documents",
          addButton: "Add Document",
          noFoundMessage: "No Documents",
          alerts: [
            "Some files were not accepted. Only document files are allowed.",
            "You can only upload a maximum of 3 files at a time. Please try again.",
            "Failed to download the document. Please try again.",
          ],
          success: [
            "Document uploaded successfully",
            "Document deleted successfully",
          ],
        },
      },
    },
  },
  // Print Work Confirmation Details
  PrintConfirmationDetails: {
    title: "Work Confirmation No. {{code}}",
    details: [
      [
        {
          label: "Project",
          text: "{{project}}",
        },
        {
          label: "Contractor",
          text: "{{contractor}}",
        },
        {
          label: "Contract Number",
          text: "{{contractNumber}}",
        },
        {
          label: "Contract Value",
          text: "{{contractValue}}",
        },
        {
          label: "Remaining Amount",
          text: "{{remainingAmount}}",
          color: "#155DFC",
        },
      ],
      [
        {
          label: "Date",
          text: "{{date}}",
        },
        {
          label: "Consultant",
          text: "{{consultant}}",
        },
        {
          label: "Contract Duration",
          text: "{{contractDuration}}",
        },
        {
          label: "Previous Payments",
          text: "{{previousPayments}}",
          color: "#00A63E",
        },
      ],
    ],
    summary: {
      title: "Financial Summary",
      items: [
        {
          label: "Works Value",
          text: "{{worksValue}}",
        },
        {
          label: "VAT",
          text: "{{vat}}",
          bgColor: "#DBEAFE",
          textColor: "#155DFC",
        },
        {
          label: "Business Guarantee Deduction",
          text: "{{businessGuarantee}}",
          bgColor: "#FFE2E2",
          textColor: "#E7000B",
        },
        [
          {
            label: "Deductions",
            text: "{{deductions}}",
            bgColor: "#FFE2E2",
            textColor: "#E7000B",
          },
          {
            label: "Additions",
            text: "{{additions}}",
            bgColor: "#DBFCE7",
            textColor: "#00A63E",
          },
        ],
        {
          label: "Down Payments",
          text: "{{downPayments}}",
        },
        {
          label: "Net Due",
          text: "{{netDue}}",
          bgColor: "#DBFCE7",
          textColor: "#00A63E",
        },
      ],
    },
    table: {
      columns: [
        "Item",
        "Unit",
        "Contract QTY",
        "Previous Works",
        "Current Extract",
        "Total QTY",
        "Completions %",
        "Remaining QTY",
        "Cost",
        "Previous Amount",
        "Current Amount ",
        "Total Value",
      ],
    },
  },
  // Report Page
  ReportPage: {
    title: "Reports",
    projectsLabel: "Projects",
    selectProject: "Select a Project",
    projectErrorMessage: "You must select a project before saving.",
    contractsLabel: "Contracts",
    selectContract: "Select a Contract",
    contractErrorMessage: "You must select a contract before saving.",
    saveButton: "Save",
  },
  BusinessGuaranteeReportPage: {
    title: "Business Guarantee Report",
    exportButton: "Export Report",
    widgets: [
      {
        icon: IoAlertCircleOutline,
        textColor: "#2b7fff",
        bgColor: "#dbeafe",
        valueColor: "#0084d1",
        text: "Total Business Guarantee",
        value: "{{alertValue}}",
        subText: `Percentage {{businessGuarantee}}%`,
      },
      {
        icon: IoAlertCircleOutline,
        textColor: "#e7000b",
        bgColor: "#ffe2e2",
        valueColor: "#c10007",
        text: "Claims Value",
        value: "{{claimsValue}}",
        subText: `{{claimsLength}} claims`,
      },
      {
        icon: IoCheckmarkCircleOutline,
        textColor: "#00c950",
        bgColor: "#dbfce7",
        valueColor: "#008235",
        text: "Available Business Guarantee",
        value: "{{availableBusinessGuarantee}}",
        subText: `Remaining {{remaining}}%`,
      },
      {
        icon: IoTimeOutline,
        textColor: "#e12afb",
        bgColor: "#f3e8ff",
        valueColor: "#9810fa",
        text: "Business Guarantee Duration",
        value: "{{businessGuaranteeDuration}}",
        subText: `From {{availableBusinessGuaranteeDuration}}`,
      },
    ],
    table1: {
      columns: [
        "Work Confirmation",
        "Date",
        "Work Confirmation Value",
        "Business Guarantee Value",
      ],
      title: "Business Guarantee Deductions Details",
      total: "Total",
    },
    table2: {
      title: "Business Guarantee Claims",
      total: "Total",
      addButton: "Add Claim",
      columns: [
        "Claim Number",
        "Date",
        "Description",
        "Value",
        "Notes",
        "Options",
      ],
    },
    messages: {
      noBusinessGuarantee: "No business guarantee found",
      noClaims: "No claims found.",
      deleteClaim: "Claim deleted successfully",
      noWorkConfirmation: "No work confirmation found.",
      addClaim: "Add a claim",
    },
  },
};

export default TranslationEnglish;
