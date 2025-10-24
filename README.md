# Wonderlust - Airbnb Clone

A full-featured Airbnb clone built with Node.js, Express, MongoDB, and EJS templating. This application allows users to list and book properties, leave reviews, and interact with an interactive map interface.

## Live Demo

The application is deployed and accessible on Render: [Visit Wonderlust](https://major-project-70nl.onrender.com/listings)

## Features

- **User Authentication**
  - Sign up/Login functionality using Passport.js
  - User profiles with email verification
  - Protected routes for authenticated users

- **Property Listings**
  - Create, read, update, and delete property listings
  - Image upload and storage
  - Property details including location, price, and description
  - Interactive map display using Mapbox
  - Geocoding for property locations

- **Reviews & Ratings**
  - Users can leave reviews and ratings for properties
  - Star-based rating system (1-5 stars)
  - Review management (create/delete)
  - Owner-specific functionalities

- **UI Features**
  - Responsive design
  - Flash messages for user feedback
  - Bootstrap styling
  - Interactive maps for property locations
  - Client-side form validation

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating, Bootstrap 5
- **Authentication**: Passport.js
- **Map Integration**: Mapbox API
- **Image Upload**: Cloudinary
- **Session Management**: Express-session with MongoDB store
- **Error Handling**: Custom error middleware
- **Security**: JOI validation, XSS protection

## Project Structure

```
├── app.js                 # Application entry point
├── cloudConfig.js         # Cloudinary configuration
├── middleware.js          # Custom middleware functions
├── schema.js             # JOI validation schemas
├── controllers/          # Route controllers
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── models/              # Database models
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/              # Express routes
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/              # EJS templates
│   ├── listings/
│   ├── users/
│   └── includes/
└── public/            # Static files
    ├── css/
    └── js/
```

## Setup Instructions

1. Clone the repository
\`\`\`bash
git clone Rishi-Cs-ms/Major-Project
cd wonderlust
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Create a .env file in the root directory with the following variables:
\`\`\`
ATLASDB_URL=your_mongodb_url
SECRET=your_session_secret
MAP_TOKEN=your_mapbox_token
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
\`\`\`

4. Initialize the database with sample data (optional)
\`\`\`bash
node init/index.js
\`\`\`

5. Start the server
\`\`\`bash
node app.js
\`\`\`

## Features Implementation

### Listings
- Create new listings with images, description, and location
- Edit and delete listings (owner only)
- View all listings with map integration
- Filter and search capabilities

### User Authentication
- User registration with email
- Secure login/logout functionality
- Protected routes for authenticated users
- User-specific actions (create listings, leave reviews)

### Reviews
- Create and delete reviews
- Star rating system
- Review display on listing pages
- Owner cannot review their own listings

### Maps
- Interactive map display for each listing
- Geocoding of listing addresses
- Cluster map for multiple listings
- Location-based search

## API Integration

### Mapbox
- Used for displaying interactive maps
- Geocoding services for listing locations
- Cluster maps for listing overview

### Cloudinary
- Image upload and storage
- Image optimization and transformation
- Secure image delivery

## Security Features

- Password hashing using Passport.js
- JOI validation for user inputs
- MongoDB injection protection
- XSS protection
- Session security
- CSRF protection

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request
