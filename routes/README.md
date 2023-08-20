Implement Controllers and Routes

1. auth.routes.js
2. booking.routes.js
3. listing.routes.js
4. messaging.routes.js
5. payment.routes.js
6. RnR.routes.js
7. user.routes.js

USERS (customer)

1. Registration & Authentication [CRUD]
    - User can create an account (need approval from admin)
    - User can view their profile (need Auth)
    - User can update their profile (need Auth)
    - User can login their account
    - User can delete their account (need Auth)

2. Spacing Listings (Search and Filter)
- User can view space listing (price, space-time-date availability) (need Auth)

3. Booking system [CRUD] (create status pending by default, need approval from providers)
- User can create booking (need Auth)
- User can view booking (need Auth)
- User can update booking (status: can change to cancel after provider “confirm” status) (need Auth)
- User can delete booking if status is pending (for booking history) (need Auth)
- User can choose reminder (1 day or 30 minutes before) (need Auth)
- Booking Alert/Reminder (from backend) - User can view reminders (need Auth)

4. Reviews and Ratings
- User can create review and rating (need Auth)
- User can view reviews and ratings of the space
- User can ONLY update their own review and rating (need Auth)
- User can ONLY delete their own review and rating (need Auth)

5. Payment
- User can read payment

6. Messaging (Optional)
- User can create DM (need Auth)
- User can read DM (need Auth)
- User can update DM (if got time)
- User can delete DM (if got time)


Users (provider)

1. Registration & Authentication [CRUD]
- Provider can create an account (need approval from admin)
- Provider can view their profile (need Auth)
- Provider can update their profile (need Auth)
- Provider can login their account
- Provider can delete their account (need Auth)

2. Space Listings (upload location, pictures, availability etc)
- Provider can create space listing (price, space-time-date availability, equipments) (need Auth)
- Provider can update space listing (price, space-time-date availability, equipments)(need Auth)
- Provider can view space listing
- Provider can delete space listing  (need Auth)

3. Booking system [CRUD] (edit status from pending)
- Provider can view booking (confirmed and deleted) (need Auth)
- Provider can update booking (status: pending by default, confirm, decline) (need Auth)
- Booking Alert/Reminder (from backend) - Provider can view reminders (1 day and 30 minutes before appointment) (need Auth)

4. Reviews
- Provider can create review for individual user (need Auth)
- Provider can read reviews and ratings for space listing from user (need Auth)
- Provider can read reviews and ratings created for the users (need Auth)
- Provider can update their own review for user (need Auth)
- Provider can delete their own review for user (need Auth)

5. Payment (stripe payment)
- Provider can create payment
- Provider can read payment
- Provider can update payment
- Provider can delete payment

6. Messaging (Optional)
- Provider can create DM (need Auth)
- Provider can read DM (need Auth)
- User can update DM  (if got time)
- User can delete DM  (if got time)