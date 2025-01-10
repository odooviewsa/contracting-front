const TranslationArabic = {
    // User Tanet Page
    "UserTanetPage": {
        AddButton: "إضافة مستخدم",
        SearchBar: "ابحث عن المستخدمين...",
        Table: ["الاسم الأول", "الاسم الثاني", "البريد الإلكتروني", "رقم الهاتف", "اسم الشركة", "نوع الشركة", "التفاصيل"],
        AddUser: {
            Title: "إضافة مستخدم",
            Fields: [
                {
                    label: "الاسم الأول",
                    name: "firstName",
                    placeholder: "أدخل الاسم الأول",
                    type: "text"
                },
                {
                    label: "الاسم الثاني",
                    name: "secondName",
                    placeholder: "أدخل الاسم الثاني",
                    type: "text"
                },
                {
                    label: "البريد الإلكتروني للشركة",
                    name: "email",
                    placeholder: "أدخل البريد الإلكتروني",
                    type: "email"
                },
                {
                    label: "كلمة المرور",
                    name: "password",
                    placeholder: "أدخل كلمة المرور",
                    type: "password"
                },
                {
                    label: "تأكيد كلمة المرور",
                    name: "confirmPassword",
                    placeholder: "أدخل كلمة المرور",
                    type: "password"
                },
                {
                    label: "رقم الهاتف",
                    name: "phone",
                    placeholder: "أدخل رقم الهاتف",
                    type: "number"
                },
            ],
            SubmitButton: "إضافة مستخدم"
        }
    },
    // Projects Page
    "ProjectsPage": {
        "title": "نظرة عامة",
        "charts": [
            {
                "title": "المشاريع",
                "bgColor": "bg-pink-500",
                "circleColor1": "bg-pink-300",
                "circleColor2": "bg-pink-400"
            },
            {
                "title": "إجمالي الإيرادات",
                "bgColor": "bg-orange-400",
                "circleColor1": "bg-orange-200",
                "circleColor2": "bg-orange-300"
            },
            {
                "title": "إجمالي التكلفة",
                "bgColor": "bg-blue-500",
                "circleColor1": "bg-blue-300",
                "circleColor2": "bg-blue-400"
            },
        ],
        "statusChartLabels": ['مكتمل', 'تخطيط', 'قيد التنفيذ'],
        "searchBarPlaceholder": "ابحث عن المشاريع...",
        "addButton": "إضافة مشروع +",
        "table": {
            "noFoundMessage": "لم يتم العثور على مشاريع",
            "items": [
                {
                    "text": "الكود"
                },
                {
                    "text": "اسم المشروع"
                },
                {
                    "text": "مدير المشروع"
                },
                {
                    "text": "الحالة"
                },
                {
                    "text": "التفاصيل",
                },
            ],
            "menu": {
                "edit": "تعديل",
                "delete": "حذف"
            }
        },
        "pagination": {
            "text": "عرض {displaying} من {projects} المشاريع",
            "nextButton": "التالي",
            "previousButton": "السابق",
            "page": "صفحة {page} من {projects}"
        },
    },
    // Add Project Page 
    "AddProjectPage": {
        "saveButton": "حفظ",
        "backButton": "رجوع",
        "feilds1": [
            {
                "label": "اسم المشروع",
                "placeholder": "أدخل اسم المشروع",
                "name": "projectName",
                "required": true,
                "errorMessage": "اسم المشروع مطلوب",
            },
            {
                "label": "تاريخ البدء",
                "placeholder": "10/10/2023",
                "name": "startDate",
                "required": true,
                "errorMessage": "تاريخ البدء مطلوب",
                "type": "date",
            },
            {
                "label": "موقع المشروع",
                "placeholder": "اختر",
                "name": "projectLocation",
                "required": true,
                "errorMessage": "موقع المشروع مطلوب",
            },
            {
                "label": "مدير المشروع",
                "placeholder": "اختر مدير المشروع",
                "name": "projectManger",
                "required": true,
                "errorMessage": "مدير المشروع مطلوب",
                "type": "select",
            },
            {
                "label": "الحالة",
                "placeholder": "اختر الحالة",
                "name": "status",
                "required": true,
                "errorMessage": "الحالة مطلوبة",
                "type": "select",
                "options": ["مكتمل", "تخطيط", "قيد التنفيذ"]
            },
            {
                "label": "أعضاء الفريق",
                "multiSelect": true
            },
            {
                "label": "نطاق العمل",
                "placeholder": "أدخل التفاصيل",
                "name": "scopeOfWork",
                "required": true,
                "errorMessage": "نطاق العمل مطلوب",
            }
        ],
        "riskAssessment": {
            "text": "+ إضافة تقييم المخاطر",
            "feilds": [
                {
                    "label": "استراتيجيات التخفيف",
                    "placeholder": "أدخل استراتيجيات التخفيف",
                    "name": "mitigationStrategies",
                },
                {
                    "label": "الأثر",
                    "placeholder": "أدخل الأثر",
                    "name": "impact",
                    "type": "date",
                },
                {
                    "label": "الاحتمالية",
                    "placeholder": "أدخل الاحتمالية",
                    "type": "date",
                    "name": "potential",
                }
            ]
        },
        "addMilestones": {
            "text": "+ إضافة مراحل",
            "feilds": [
                {
                    "label": "تاريخ البدء",
                    "placeholder": "تاريخ البدء",
                    "type": "date",
                    "name": "taskStartDate",
                },
                {
                    "label": "تاريخ الانتهاء",
                    "placeholder": "تاريخ الانتهاء",
                    "name": "taskEndDate",
                    "type": "date",
                }
            ]
        },
        "feilds2": [
            {
                "label": "اسم العميل",
                "placeholder": "اختر العميل",
                "name": "clientName",
                "required": true,
                "errorMessage": "اسم العميل مطلوب",
                "type": "select",
            },
            {
                "label": "تاريخ الانتهاء",
                "placeholder": "25/12/2023",
                "name": "endDate",
                "required": true,
                "errorMessage": "تاريخ الانتهاء مطلوب",
                "type": "date",
            },
            {
                "label": "الميزانية",
                "placeholder": "أدخل الميزانية",
                "name": "budget",
                "required": true,
                "errorMessage": "الميزانية مطلوبة",
                "type": "number",
            },
            {
                "label": "الوصف",
                "placeholder": "أدخل الوصف",
                "name": "description",
                "required": true,
                "errorMessage": "الوصف مطلوب",
            },
            {
                "label": "تحميل المستند",
                "name": "documents",
                "type": "file",
            }
        ]
    },
    // Edit Project Page
    "EditProjectPage": {
        "updateButton": "تحديث المشروع",
        "fields": {
            "projectName": "اسم المشروع",
            "enterProjectName": "أدخل اسم المشروع",
            "startDate": "تاريخ البدء",
            "enterStartDate": "10/10/2023",
            "projectLocation": "موقع المشروع",
            "select": "اختر",
            "projectManager": "مدير المشروع",
            "selectProjectManager": "اختر مدير المشروع",
            "status": "الحالة",
            "selectStatus": "اختر الحالة",
            "teamMembers": "أعضاء الفريق",
            "scopeOfWork": "نطاق العمل",
            "enterDetails": "أدخل التفاصيل",
            "clientName": "اسم العميل",
            "selectClient": "اختر العميل",
            "endDate": "تاريخ الانتهاء",
            "enterEndDate": "25/12/2023",
            "budget": "الميزانية",
            "enterBudget": "أدخل الميزانية",
            "description": "الوصف",
            "enterDescription": "أدخل وصف المشروع",
            "documents": "المستندات",
            "requiredField": "{{field}} مطلوب"
        }
    },
    // Project Details Page
    "ProjectDetailsPage": {
        "backButton": "رجوع",
        "projectInfo": [
            {
                "text": "اسم المشروع"
            },
            {
                "text": "اسم العميل"
            },
            {
                "text": "موقع المشروع"
            },
            {
                "text": "تاريخ البدء",
                "isDate": true
            },
            {
                "text": "تاريخ الانتهاء",
                "isDate": true
            },
            {
                "text": "الميزانية"
            },
            {
                "text": "الحالة",
                "isStatus": true
            }
        ],
        "teamMember": {
            "title": "أعضاء الفريق",
            "seeAll": "عرض الكل"
        },
        "projectOverview": "نظرة عامة على المشروع",
        "scopeOfWork": "نطاق العمل"
    },
    // Delete Project
    "DeleteProject": {
        "message": "هل أنت متأكد؟",
        "backButton": "رجوع",
        "deleteButton": "حذف"
    },
    // Partners
    "PartnersPage": {
        "addButton": "إضافة شريك",
        "table": ["الاسم", "النوع", "البريد الإلكتروني", "رقم الهاتف", "العنوان", "الرقم الضريبي", "الرقم التجاري", "التفاصيل"],
        "detailsButton": {
            "editButton": "تعديل",
            "deleteButton": "حذف"
        },
        "noFound": "لا يوجد شركاء بعد"
    },
    // Add Partner
    "AddPartnerForm": {
        "title": "إضافة شريك جديد",
        "fields": [
            {
                "label": "اسم الشريك",
                "name": "partnerName",
                "type": "text",
                "placeholder": "أدخل الاسم الكامل للشريك",
                "required": true,
                "icon": "IoPersonOutline"
            },
            {
                "label": "النوع",
                "name": "type",
                "type": "select",
                "required": true,
                "icon": "IoBusinessOutline",
                "options": [
                    { "value": "Owner", "label": "مالك" },
                    { "value": "Sub-contractor", "label": "مقاول فرعي" },
                    { "value": "Consultant", "label": "استشاري" }
                ]
            },
            {
                "label": "البريد الإلكتروني",
                "name": "email",
                "type": "email",
                "placeholder": "partner@company.com",
                "required": true,
                "icon": "IoMailOutline"
            },
            {
                "label": "رقم الهاتف",
                "name": "phone",
                "type": "tel",
                "placeholder": "+1 (555) 000-0000",
                "required": true,
                "icon": "IoCallOutline"
            },
            {
                "label": "العنوان",
                "name": "address",
                "type": "textarea",
                "placeholder": "أدخل العنوان بالكامل",
                "required": true,
                "icon": "IoLocationOutline"
            },
            {
                "label": "الرقم الضريبي",
                "name": "taxNumber",
                "type": "text",
                "placeholder": "أدخل رقم التسجيل الضريبي",
                "required": true,
                "icon": "IoDocumentTextOutline"
            },
            {
                "label": "الرقم التجاري",
                "name": "commercialNumber",
                "type": "text",
                "placeholder": "أدخل رقم السجل التجاري",
                "required": true,
                "icon": "IoBusinessOutline"
            }
        ],
        "addButton": {
            "loading": "جاري المعالجة...",
            "text": "إضافة شريك"
        }
    },
    // Edit Partner
    "EditPartnerForm": {
        "title": "تحديث الشريك",
        "fields": [
            { "label": "اسم الشريك", "type": "text", "name": "partnerName" },
            {
                "label": "النوع",
                "type": "select",
                "name": "type",
                "option": ["مالك", "مقاول فرعي", "استشاري"]
            },
            { "label": "البريد الإلكتروني", "type": "email", "name": "email" },
            { "label": "رقم الهاتف", "type": "number", "name": "phone" },
            {
                "label": "العنوان",
                "type": "text",
                "name": "address"
            },
            {
                "label": "الرقم الضريبي",
                "type": "number",
                "name": "taxNumber"
            },
            {
                "label": "الرقم التجاري",
                "type": "number",
                "name": "commercialNumber"
            }
        ],
        "editButton": {
            "loading": "جاري التحميل...",
            "text": "تحديث العنصر"
        }
    },
    // Delete Partner
    "DeletePartner": {
        "title": "هل أنت متأكد؟",
        "backButton": "رجوع",
        "deleteButton": {
            "loading": "جاري التحميل...",
            "text": "حذف"
        }
    },
    // Products Page
    "ProductsPage": {
        "backButton": "الرجوع إلى القائمة الرئيسية",
        "addButton": "+ إضافة منتج",
        "deleteButton": "حذف",
        "editButton": "تعديل",
        "fields": [
            {
                "label": "الاسم",
                "type": "text",
                "id": "name",
                "name": "name",
                "placeholder": "ابحث بالاسم"
            },
            {
                "label": "الفئة",
                "type": "select",
                "id": "category",
                "name": "category"
            },
            {
                "label": "المورد",
                "type": "select",
                "id": "supplier",
                "name": "supplier"
            }
        ],
        "table": [
            "الرمز التعريفي",
            "الاسم",
            "الفئة",
            "السعر",
            "الكمية",
            "وحدة القياس",
            "الوصف",
            "المورد",
            "الرقم التعريفي",
            "الإجراءات"
        ],
        "searchButton": "بحث",
        "noFound": "لا توجد منتجات متاحة"
    },
    "ProductsList": {
        "title": "قائمة المنتجات",
        "searchBar": "ابحث عن منتج بالاسم",
        "selectButton": "اختيار",
        "table": [
            "الرمز التعريفي",
            "الاسم",
            "الفئة",
            "السعر",
            "الكمية",
            "وحدة القياس",
            "المورد",
            "الرقم التعريفي",
            "الإجراءات"
        ],
        "noFound": "لا توجد منتجات"
    },
    // Edit & Add Product Form
    "EditAndAddProductForm": {
        "sku": "الرمز التعريفي",
        "uom": "وحدة القياس",
        "name": "الاسم",
        "category": "الفئة",
        "price": "السعر",
        "quantity": "الكمية",
        "supplier": "المورد",
        "description": "الوصف",
        "save": "حفظ",
        "cancel": "إلغاء",
        "addProduct": "إضافة منتج",
        "editProduct": "تعديل منتج",
        "fillRequiredFields": "يرجى ملء جميع الحقول المطلوبة."
    },
    // Material Request Page
    "MaterialRequestPage": {
        "title": "طلب المواد",
        "noFound": "لا توجد مواد بعد",
        "cards": [
            { "label": "إجمالي الخطوط المعتمدة", "value": 7155, "color": "#4CAF50" },
            { "label": "عدد العناصر", "value": 2, "color": "#FF9800" },
            { "label": "إجمالي التكلفة", "value": 5685, "color": "#2196F3" }
        ],
        "tooltips": {
            "refresh": "تحديث البيانات",
            "print": "طباعة الطلب"
        },
        "buttons": {
            "addButton": "إضافة مادة",
            "backButton": "الرجوع",
            "printButton": "طباعة"
        }
    },
    // Material Request Form
    "MaterialRequestForm": {
        "buttons": {
            "submitButton": "إرسال إلى المدير",
            "saveButton": "حفظ كمسودة",
            "helpButton": "مساعدة",
            "addLineButton": "إضافة خط جديد",
            "bulkButton": "موافقة جماعية"
        },
        "upload": {
            "text": "رفع المستند",
            "model": "اسحب وأفلت الملف هنا",
            "button": "فتح النافذة"
        },
        "table": {
            "title": "العناصر",
            "items": {
                "product": "المنتج",
                "boqLine": "خط BOQ",
                "uom": "وحدة القياس",
                "boqQty": "الكمية في BOQ",
                "qtyAvailable": "الكمية المتوفرة",
                "qtyApproved": "الكمية المعتمدة",
                "qtyRequests": "الكمية المطلوبة",
                "qtyDelivered": "الكمية المستلمة",
                "unitCost": "تكلفة الوحدة",
                "totalCost": "إجمالي التكلفة",
                "actions": "الإجراءات",
                "edit": "تعديل",
                "delete": "حذف",
                "approveLine": "اعتماد الخط"
            }
        },
        "fields": {
            "project": "المشروع",
            "workItem": "البند العمالي",
            "orderDate": "تاريخ الطلب",
            "deliveryDate": "تاريخ التسليم",
            "status": "الحالة",
            "reason": "السبب",
            "linkWithBOQ": "الربط مع BOQ",
            "emergency": "طوارئ"
        },
        "searchBar": "ابحث عن العناصر"
    },
    // Login
    "LoginPage": {
        "welcome": "مرحباً بعودتك!",
        "message": "يرجى تسجيل الدخول إلى حسابك",
        "fields": [
            { "label": "البريد الإلكتروني", "type": "email", "name": "email", "validation": { "pattern": /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ } },
            { "label": "كلمة المرور", "type": "password", "name": "password", "validation": { "minLength": { "value": 6, "message": "يجب أن تكون كلمة المرور مكونة من 6 أحرف على الأقل" } } },
            { "label": "اسم المؤسسة", "type": "text", "name": "companyName" }
        ],
        "buttons": {
            "signInButton": "تسجيل الدخول",
            "registerButton": "إنشاء حساب",
            "dontHave": "لا تملك حساباً؟"
        }
    },
    // Register
    "RegisterPage": {
        "buttons": {
            "googleSignButton": "اشترك باستخدام جوجل",
            "nextButton": {
                "text": "التالي",
                "loading": "جاري المعالجة..."
            },
            "alreadyHave": "هل لديك حساب؟",
            "loginButton": "تسجيل الدخول",
            "backButton": "الرجوع",
            "createButton": {
                "text": "إنشاء",
                "loading": "جاري المعالجة..."
            }
        },
        "fields1": [
            { "label": "البريد الإلكتروني للشركة", "type": "email", "name": "email", "validation": { "pattern": /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ } },
            { "label": "كلمة المرور", "type": "password", "name": "password", "validation": { "minLength": { "value": 6, "message": "يجب أن تكون كلمة المرور مكونة من 6 أحرف على الأقل" } } },
            { "label": "تأكيد كلمة المرور", "type": "password", "name": "confirmPassword", "validation": { "validate": "كلمات المرور لا تطابق" } },
            { "label": "رقم الهاتف", "type": "number", "name": "phone" }
        ],
        "fields2": [
            { "label": "الاسم الأول", "type": "text", "name": "firstName" },
            { "label": "الاسم الثاني", "type": "text", "name": "secondName" },
            { "label": "اسم الشركة", "type": "text", "name": "companyName" },
            {
                "label": "حجم الشركة", "type": "select", "name": "companySize", "options": [
                    "1-10 موظف (شركة ناشئة صغيرة)",
                    "11-50 موظف (شركة صغيرة متنامية)",
                    "51-200 موظف (شركة متوسطة)",
                    "201-500 موظف (شركة متوسطة إلى كبيرة)",
                    "501-1,000 موظف (شركة كبيرة)",
                    "1,001-5,000 موظف (مستوى المؤسسات)"
                ]
            },
            { "label": "نوع الشركة", "type": "select", "name": "companyType", "options": ["مقاول", "مقاول من الباطن"] }
        ],
        "texts": ["إنشاء حساب", "أو"]
    },
    "Sidebar": {
        "project": "المشروع",
        "boqTemplates": "قوالب BOQ",
        "contracts": "العقود",
        "workConfirmation": "تأكيد العمل",
        "estimator": "المقدر",
        "billing": "الفواتير",
        "partners": "الشركاء",
        "materialRequest": "طلب المواد",
        "product": "المنتج",
        "users": "المستخدمون",
        "setting": "الإعدادات",
        "logout": "تسجيل الخروج"
    },
    "EstimationPage": {
        "noFound": "لم يتم العثور على تقدير",
        "searchBar": "بحث في التقديرات",
        "buttons": {
            "createButton": "إنشاء مقدر",
            "deleteButton": "حذف"
        },
        "table": [
            "الاسم",
            "اسم المشروع",
            "العقد",
            "التطبيق على",
            "حذف"
        ],
        "sureDelete": {
            "buttons": {
                "backButton": "رجوع",
                "deleteButton": {
                    "text": "حذف",
                    "loading": "جاري التحميل..."
                }
            },
            "text": "هل أنت متأكد؟"
        }
    },
    "EstimationForm": {
        "title": "إضافة مقدر",
        "addButton": {
            "text": "إضافة مقدر",
            "loading": "جاري إضافة المقدر..."
        },
        "fields": {
            "name": "الاسم",
            "enterName": "أدخل الاسم",
            "nameRequired": "الاسم مطلوب",
            "projectName": "اسم المشروع",
            "selectProjectName": "حدد اسم المشروع",
            "projectNameRequired": "اسم المشروع مطلوب",
            "applyOn": "التطبيق على",
            "selectApplyOn": "حدد التطبيق على",
            "applyOnRequired": "التطبيق على مطلوب",
            "wholeBOQ": "BOQ كامل",
            "boqLines": "أسطر BOQ",
            "contract": "العقد",
            "selectContract": "حدد العقد",
            "contractRequired": "العقد مطلوب"
        }
    },
    "ContractsPage": {
        "searchBar": "ابحث عن العقود...",
        "buttons": {
            "addButton": "+ إضافة عقد"
        }
    },
    "ContractsForms": {
        "form1": {
            "code": "الكود",
            "codePlaceholder": "أدخل الكود",
            "codeRequired": "الكود مطلوب",
            "codeMaxLength": "يجب أن يتكون الكود من 10 أحرف كحد أقصى",
            "contractType": "نوع العقد",
            "contractTypeRequired": "نوع العقد مطلوب",
            "project": "المشروع",
            "projectRequired": "المشروع مطلوب",
            "partner": "الشريك",
            "partnerRequired": "الشريك مطلوب",
            "startDate": "تاريخ البداية",
            "startDateRequired": "تاريخ البداية مطلوب",
            "endDate": "تاريخ الانتهاء",
            "endDateRequired": "تاريخ الانتهاء مطلوب",
            "endDateInvalid": "يجب أن يكون تاريخ الانتهاء بعد تاريخ البداية",
            "consultant": "الاستشاري",
            "consultantRequired": "الاستشاري مطلوب",
            "typeOfProgress": "نوع التقدم",
            "typeOfProgressRequired": "نوع التقدم مطلوب",
            "description": "الوصف",
            "descriptionRequired": "الوصف مطلوب",
            "createContract": "إنشاء عقد",
            "choose": "اختار...",
            "owner": "المالك",
            "subcontractor": "عقد المقاول الفرعي"
        }
    }
}


export default TranslationArabic