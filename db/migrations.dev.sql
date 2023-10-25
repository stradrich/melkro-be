CREATE DATABASE music_space_dev;
USE music_space_dev;

-- Create users Table
CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  role ENUM('admin', 'provider', 'musician') DEFAULT 'musician',
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  major ENUM('Piano', 'Violin', 'Cello', 'Guitar', 'Others'),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create space_listings Table (size - studio/chamber hall/concert hall, soundproof or no soundproof)
CREATE TABLE space_listings (
  listing_id INT PRIMARY KEY AUTO_INCREMENT,
  stripeProductId VARCHAR(255), -- New column for Stripe Product ID
  stripePriceId VARCHAR(255),
  user_id INT,
  price_per_hour DECIMAL(10, 2),
  address_link VARCHAR(255),
  pictures VARCHAR(255),
  availability VARCHAR(255),
  name TEXT,
  description TEXT,
  capacity INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create bookings Table
CREATE TABLE bookings (
  booking_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  listing_id INT NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled', 'declined') DEFAULT 'pending',
  reminder ENUM('24_hours', '12_hours', '6_hours', '3_hours', '45_minutes'),
  check_in TIMESTAMP,
  check_out TIMESTAMP,
  required_equipments ENUM('YES', 'NO') DEFAULT 'NO',
  other_remarks TEXT,
  purpose ENUM('practice', 'teaching', 'recording', 'rehearsal', 'seminar', 'masterclasses', 'workshop'),
  first_instrument TEXT,
  capacity ENUM('individual', 'less than four', 'band/orchestra'),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (listing_id) REFERENCES space_listings(listing_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create timeslots Table
CREATE TABLE timeslots (
  timeslot_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  booking_id INT,  -- Add a reference to the booking
  timeslot_datetime_start TIMESTAMP,
  timeslot_datetime_end TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CHECK (timeslot_datetime_start < timeslot_datetime_end),
  UNIQUE (user_id, timeslot_datetime_start, timeslot_datetime_end)
);

-- Create payment Table
CREATE TABLE payments (
  payment_id INT PRIMARY KEY AUTO_INCREMENT,
  booking_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  amount_total DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(255) DEFAULT 'Credit Card', -- Set a default value here
  payment_method_types JSON NOT NULL,
  status VARCHAR(255) DEFAULT 'incomplete',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE ON UPDATE CASCADE 
);

-- Create reviews_rating Table
CREATE TABLE reviews_ratings (
  review_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
