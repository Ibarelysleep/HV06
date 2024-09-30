│
├── /config               # Database connection config
│   └── db.js
├── /controllers          # Logic for handling API requests
│   └── userController.js
│   └── groundController.js
│   └── matchController.js
│   └── bookingController.js
│   └── leaderboardController.js
├── /models               # Database models (Schemas)
│   └── userModel.js
│   └── groundModel.js
│   └── bookingModel.js
├── /routes               # API routes
│   └── userRoutes.js
│   └── groundRoutes.js
│   └── matchRoutes.js
│   └── bookingRoutes.js
│   └── leaderboardRoutes.js
├── /middleware           # Middleware for auth, etc.
│   └── authMiddleware.js
├── /utils                # Utility functions (e.g., matching algorithm)
│   └── matchUtils.js
│   └── pointUtils.js
├── server.js             # Main entry point for the backend
└── package.json          # Project dependencies
