CREATE DATABASE music_space_prod;
USE music_space_prod;

-- Create users Table (musician, provider, admin)
CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  role ENUM('admin', 'provider', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create space_listings Table (size - studio/chamber hall/concert hall, sound proof or no sound proof)
CREATE TABLE space_listings (
  listing_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  address_link VARCHAR(255),
  pictures VARCHAR(255),
  availability VARCHAR(255) NOT NULL,
  description TEXT,
  capacity INT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create bookings Table
CREATE TABLE bookings (
  booking_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  listing_id INT NOT NULL, -- Added listing_id
  status ENUM('pending', 'confirmed', 'cancelled', 'declined') DEFAULT 'pending',
  reminder ENUM('24_hours', '12_hours', '6_hours', '3_hours', '45_minutes'),
  check_in TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  check_out TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  required_equipments ENUM('YES', 'NO') DEFAULT 'NO',
  other_remarks TEXT,
  purpose ENUM('practice', 'teaching', 'recording', 'rehearsal', 'seminar', 'masterclasses', 'workshop'),
  first_instrument TEXT NOT NULL,
  capacity ENUM('individual', 'less than four', 'band/orchestra'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (listing_id) REFERENCES space_listings(listing_id) -- Added listing_id reference
);

-- Create instrument_services Table
CREATE TABLE instrument_services (
  service_id INT PRIMARY KEY AUTO_INCREMENT,
  booking_id INT NOT NULL,
  instrument ENUM('keys', 'strings', 'woodwind', 'brass', 'percussion', 'vocal', 'contemporary') NOT NULL,
  required_instrument ENUM('pianoforte-upright', 'pianoforte-grand','harpsichord', 'celeste', 'keyboard', 'electric-organ', 'double-bass', 'timpani', 'vibraphone', 'xylophone', 'gong', 'gamelan', 'harp', 'regular-drum-set', 'microphone', 'amplifier', 'more-than-one', 'not-applicable') NOT NULL,
  remarks TEXT,
  rental_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
);

-- Create payment Table
CREATE TABLE payment (
  payment_id INT PRIMARY KEY AUTO_INCREMENT,
  booking_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(255) NOT NULL,
  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
);

-- Create reviews_rating Table
CREATE TABLE reviews_rating (
  review_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create conversations Table
CREATE TABLE conversations (
  conversation_id INT PRIMARY KEY AUTO_INCREMENT,
  provider_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (provider_id) REFERENCES users(user_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create messages Table
CREATE TABLE messages (
  message_id INT PRIMARY KEY AUTO_INCREMENT,
  conversation_id INT NOT NULL,
  sender_id INT NOT NULL,
  content TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id),
  FOREIGN KEY (sender_id) REFERENCES users(user_id)
);
