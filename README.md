🔥 API Endpoints
Method	Endpoint	Description	Auth Required
POST	/api/auth/register	Register a new user	❌ No
POST	/api/auth/login	Login user (Returns JWT)	❌ No
GET	/api/auth/profile	Get logged-in user profile	✅ Yes
GET	/api/items	Fetch all booking items	❌ No
POST	/api/items	Add a new item (Admin)	✅ Yes (Admin)
DELETE	/api/items/:id	Delete an item (Admin)	✅ Yes (Admin)
GET	/api/bookings	Get user bookings	✅ Yes
POST	/api/bookings	Create a booking	✅ Yes
PUT	/api/bookings/:id/cancel	Cancel a booking	✅ Yes
GET	/api/admin/users	Get all users (Admin)	✅ Yes (Admin)
DELETE	/api/admin/users/:id	Delete user (Admin)	✅ Yes (Admin)
