-- NexusCare Database Schema
-- Drop database if exists and create new
DROP DATABASE IF EXISTS nexuscare_db;
CREATE DATABASE nexuscare_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nexuscare_db;

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Resident', 'Security Staff', 'Medical Assistant') NOT NULL DEFAULT 'Resident',
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB;

-- Complaints Table (CRUD Module)
CREATE TABLE complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category ENUM('Maintenance', 'Security', 'Noise', 'Parking', 'Cleanliness', 'Other') NOT NULL,
    priority ENUM('Low', 'Medium', 'High', 'Critical') DEFAULT 'Medium',
    status ENUM('Open', 'In Progress', 'Resolved', 'Closed') DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_category (category),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

-- Audit Logs Table
CREATE TABLE audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action ENUM('CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT') NOT NULL,
    table_name VARCHAR(50),
    record_id INT,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

-- Insert default admin user
-- Password: admin123 (hashed)
INSERT INTO users (username, email, password_hash, role, full_name, phone) VALUES
('admin', 'admin@nexuscare.com', 'scrypt:32768:8:1$vqJZGxKzXLFGTJYO$c8e0c0e8f8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8', 'Admin', 'System Administrator', '+1234567890'),
('resident1', 'resident@nexuscare.com', 'scrypt:32768:8:1$vqJZGxKzXLFGTJYO$c8e0c0e8f8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8', 'Resident', 'John Doe', '+1234567891'),
('security1', 'security@nexuscare.com', 'scrypt:32768:8:1$vqJZGxKzXLFGTJYO$c8e0c0e8f8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8', 'Security Staff', 'Mike Security', '+1234567892'),
('medical1', 'medical@nexuscare.com', 'scrypt:32768:8:1$vqJZGxKzXLFGTJYO$c8e0c0e8f8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8', 'Medical Assistant', 'Dr. Sarah Medical', '+1234567893');

-- Insert sample complaints
INSERT INTO complaints (user_id, title, description, category, priority, status) VALUES
(2, 'Broken elevator in Building A', 'The elevator has been out of service for 3 days', 'Maintenance', 'High', 'Open'),
(2, 'Parking lot lighting issue', 'Several lights are not working in the parking area', 'Maintenance', 'Medium', 'In Progress'),
(2, 'Noise complaint from Unit 305', 'Loud music late at night', 'Noise', 'Low', 'Resolved');

-- Insert sample audit logs
INSERT INTO audit_logs (user_id, action, table_name, record_id, details) VALUES
(1, 'CREATE', 'users', 1, 'Admin user created'),
(2, 'CREATE', 'complaints', 1, 'Created complaint: Broken elevator in Building A');
