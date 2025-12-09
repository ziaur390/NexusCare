"""
Script to update user passwords in the database with properly hashed passwords
Run this if login is not working
"""

from werkzeug.security import generate_password_hash
import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()

# Database configuration for WAMP (no password)
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '',  # WAMP default: no password
    'database': 'nexuscare_db'
}

def update_passwords():
    """Update all user passwords with properly hashed versions"""
    try:
        # Connect to database
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor()
        
        # Users to update with password: admin123
        users = [
            ('admin', 'admin123'),
            ('resident1', 'admin123'),
            ('security1', 'admin123'),
            ('medical1', 'admin123')
        ]
        
        print("Updating user passwords...")
        
        for username, password in users:
            # Generate proper password hash
            password_hash = generate_password_hash(password)
            
            # Update user
            query = "UPDATE users SET password_hash = %s WHERE username = %s"
            cursor.execute(query, (password_hash, username))
            print(f"✓ Updated password for: {username}")
        
        conn.commit()
        cursor.close()
        conn.close()
        
        print("\n✅ All passwords updated successfully!")
        print("\nYou can now login with:")
        print("Username: admin")
        print("Password: admin123")
        
    except mysql.connector.Error as err:
        print(f"❌ Database error: {err}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    update_passwords()
