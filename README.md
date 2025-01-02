## FOLDER STRUCTURE

my-app/
│
├── src/
│   ├── assets/               # Static files (images, styles, etc.)
│   │
│   ├── components/           # Components (Atoms, Molecules, Organisms)
│   │   ├── atoms/            # Basic building blocks (buttons, inputs, etc.)
│   │   │   ├── Button.js     # Example atom component
│   │   │   └── Input.js      # Example atom component
│   │   │
│   │   ├── molecules/        # Combinations of atoms (form fields, cards, etc.)
│   │   │   ├── FormField.js  # Example molecule component
│   │   │   └── Card.js       # Example molecule component
│   │   │
│   │   ├── organisms/        # Complex components (forms, lists, etc.)
│   │   │   ├── ReceiptForm.js    # Component for the receipt upload form
│   │   │   ├── ReceiptList.js    # Component to display the list of receipts
│   │   │   └── ReceiptItem.js    # Individual receipt component
│   │   │
│   │   ├── layouts/          # Layout components (grids, headers, footers, etc.)
│   │   │   ├── Header.js     # Example layout component
│   │   │   └── Footer.js     # Example layout component
│   │   │
│   │   └── pages/            # Page components (specific views)
│   │       ├── ReceiptsPage.js    # Page that uses ReceiptList and Filter
│   │       └── DashboardPage.js   # Page for dashboard with metrics
│   │
│   ├── containers/           # Container components to connect Redux
│   │   ├── ReceiptsContainer.js # Container component for ReceiptsPage
│   │   └── DashboardContainer.js # Container component for DashboardPage
│   │
│   ├── redux/                # Folder for Redux
│   │   ├── actions/          # Actions related to business logic
│   │   │   ├── receipts.js  # Action to handle the state of receipts
│   │   │   └── filters.js   # Action to handle filters (categories, locations)
│   │   │
│   │   ├── reducers/         # Reducers to handle global state
│   │   │   ├── index.js     # Combines all reducers
│   │   │   ├── receipts.js  # Reducer for receipts
│   │   │   └── filters.js   # Reducer for filters
│   │   │
│   │   ├── store.js         # Initial configuration of the Redux store
│   │   └── types.js         # Definition of action types and constants
│   │
│   ├── services/            # Services for API communication or auxiliary functions
│   │   ├── api.js           # Configuration and functions to interact with the API
│   │   └── visionApi.js     # Functions to use the Vision Pro or Google Vision API
│   │
│   ├── utils/               # Utilities, common or support functions
│   │   ├── formatData.js   # Function to format data extracted from receipts
│   │   └── validateImage.js # Validation or handling of images before processing
│   │
│   ├── App.js               # Main application component
│   └── index.js             # Application entry point
│
└── package.json
