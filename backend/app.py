from flask import Flask, request, jsonify, session
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import mysql.connector
from datetime import datetime, timedelta
import logging
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'nexuscare-secret-key-2024')
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=2)

# CORS configuration
CORS(app, supports_credentials=True, origins=['http://localhost:3000'])

# Logging configuration
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('nexuscare.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Database configuration for WAMP
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '',  # WAMP default: no password
    'database': 'nexuscare_db'
}

def get_db_connection():
    """Create and return a database connection"""
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        return conn
    except mysql.connector.Error as err:
        logger.error(f"Database connection error: {err}")
        return None

def login_required(f):
    """Decorator to protect routes that require authentication"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'error': 'Unauthorized access', 'code': 401}), 401
        return f(*args, **kwargs)
    return decorated_function

def role_required(*roles):
    """Decorator to protect routes that require specific roles"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if 'user_id' not in session:
                return jsonify({'error': 'Unauthorized access', 'code': 401}), 401
            if session.get('role') not in roles:
                return jsonify({'error': 'Access denied - insufficient permissions', 'code': 403}), 403
            return f(*args, **kwargs)
        return decorated_function
    return decorator

# ==================== AUTHENTICATION ENDPOINTS ====================

@app.route('/api/register', methods=['POST'])
def register():
    """User registration endpoint"""
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        role = data.get('role', 'Resident')
        full_name = data.get('full_name')
        phone = data.get('phone')

        if not all([username, email, password, full_name]):
            return jsonify({'error': 'Missing required fields'}), 400

        # Validate role
        valid_roles = ['Admin', 'Resident', 'Security Staff', 'Medical Assistant']
        if role not in valid_roles:
            return jsonify({'error': 'Invalid role'}), 400

        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500

        cursor = conn.cursor(dictionary=True)

        # Check if username or email already exists
        cursor.execute("SELECT * FROM users WHERE username = %s OR email = %s", (username, email))
        if cursor.fetchone():
            cursor.close()
            conn.close()
            return jsonify({'error': 'Username or email already exists'}), 409

        # Hash password
        password_hash = generate_password_hash(password)

        # Insert user
        query = """
            INSERT INTO users (username, email, password_hash, role, full_name, phone, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (username, email, password_hash, role, full_name, phone, datetime.now()))
        conn.commit()

        user_id = cursor.lastrowid
        logger.info(f"New user registered: {username} (ID: {user_id})")

        cursor.close()
        conn.close()

        return jsonify({
            'message': 'Registration successful',
            'user': {
                'id': user_id,
                'username': username,
                'email': email,
                'role': role
            }
        }), 201

    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        return jsonify({'error': 'Registration failed'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    """User login endpoint"""
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not all([username, password]):
            return jsonify({'error': 'Missing username or password'}), 400

        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500

        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE username = %s AND status = 'active'", (username,))
        user = cursor.fetchone()

        cursor.close()
        conn.close()

        if not user or not check_password_hash(user['password_hash'], password):
            logger.warning(f"Failed login attempt for username: {username}")
            return jsonify({'error': 'Invalid credentials'}), 401

        # Create session
        session.permanent = True
        session['user_id'] = user['id']
        session['username'] = user['username']
        session['role'] = user['role']
        session['email'] = user['email']

        logger.info(f"User logged in: {username} (Role: {user['role']})")

        return jsonify({
            'message': 'Login successful',
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email'],
                'role': user['role'],
                'full_name': user['full_name']
            }
        }), 200

    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return jsonify({'error': 'Login failed'}), 500

@app.route('/api/logout', methods=['POST'])
@login_required
def logout():
    """User logout endpoint"""
    username = session.get('username')
    session.clear()
    logger.info(f"User logged out: {username}")
    return jsonify({'message': 'Logout successful'}), 200

@app.route('/api/session', methods=['GET'])
def check_session():
    """Check if user session is valid"""
    if 'user_id' in session:
        return jsonify({
            'authenticated': True,
            'user': {
                'id': session['user_id'],
                'username': session['username'],
                'email': session['email'],
                'role': session['role']
            }
        }), 200
    return jsonify({'authenticated': False}), 200

# ==================== COMPLAINT MANAGEMENT ENDPOINTS ====================

@app.route('/api/complaints', methods=['GET'])
@login_required
def get_complaints():
    """Get all complaints (filtered by role)"""
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500

        cursor = conn.cursor(dictionary=True)

        # Admin sees all, others see only their own
        if session['role'] == 'Admin':
            query = """
                SELECT c.*, u.username, u.full_name 
                FROM complaints c
                JOIN users u ON c.user_id = u.id
                WHERE c.deleted_at IS NULL
                ORDER BY c.created_at DESC
            """
            cursor.execute(query)
        else:
            query = """
                SELECT c.*, u.username, u.full_name 
                FROM complaints c
                JOIN users u ON c.user_id = u.id
                WHERE c.user_id = %s AND c.deleted_at IS NULL
                ORDER BY c.created_at DESC
            """
            cursor.execute(query, (session['user_id'],))

        complaints = cursor.fetchall()
        cursor.close()
        conn.close()

        # Convert datetime objects to strings
        for complaint in complaints:
            for key, value in complaint.items():
                if isinstance(value, datetime):
                    complaint[key] = value.isoformat()

        return jsonify({'complaints': complaints}), 200

    except Exception as e:
        logger.error(f"Get complaints error: {str(e)}")
        return jsonify({'error': 'Failed to fetch complaints'}), 500

@app.route('/api/complaints', methods=['POST'])
@login_required
def create_complaint():
    """Create a new complaint"""
    try:
        data = request.get_json()
        title = data.get('title')
        description = data.get('description')
        category = data.get('category')
        priority = data.get('priority', 'Medium')

        if not all([title, description, category]):
            return jsonify({'error': 'Missing required fields'}), 400

        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500

        cursor = conn.cursor(dictionary=True)

        query = """
            INSERT INTO complaints (user_id, title, description, category, priority, status, created_at)
            VALUES (%s, %s, %s, %s, %s, 'Open', %s)
        """
        cursor.execute(query, (session['user_id'], title, description, category, priority, datetime.now()))
        conn.commit()

        complaint_id = cursor.lastrowid

        # Log audit
        audit_query = """
            INSERT INTO audit_logs (user_id, action, table_name, record_id, details, created_at)
            VALUES (%s, 'CREATE', 'complaints', %s, %s, %s)
        """
        cursor.execute(audit_query, (session['user_id'], complaint_id, f"Created complaint: {title}", datetime.now()))
        conn.commit()

        cursor.close()
        conn.close()

        logger.info(f"Complaint created by {session['username']}: {title}")

        return jsonify({
            'message': 'Complaint created successfully',
            'complaint_id': complaint_id
        }), 201

    except Exception as e:
        logger.error(f"Create complaint error: {str(e)}")
        return jsonify({'error': 'Failed to create complaint'}), 500

@app.route('/api/complaints/<int:complaint_id>', methods=['GET'])
@login_required
def get_complaint(complaint_id):
    """Get a specific complaint"""
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500

        cursor = conn.cursor(dictionary=True)

        query = """
            SELECT c.*, u.username, u.full_name 
            FROM complaints c
            JOIN users u ON c.user_id = u.id
            WHERE c.id = %s AND c.deleted_at IS NULL
        """
        cursor.execute(query, (complaint_id,))
        complaint = cursor.fetchone()

        cursor.close()
        conn.close()

        if not complaint:
            return jsonify({'error': 'Complaint not found'}), 404

        # Check authorization
        if session['role'] != 'Admin' and complaint['user_id'] != session['user_id']:
            return jsonify({'error': 'Access denied'}), 403

        # Convert datetime objects
        for key, value in complaint.items():
            if isinstance(value, datetime):
                complaint[key] = value.isoformat()

        return jsonify({'complaint': complaint}), 200

    except Exception as e:
        logger.error(f"Get complaint error: {str(e)}")
        return jsonify({'error': 'Failed to fetch complaint'}), 500

@app.route('/api/complaints/<int:complaint_id>', methods=['PUT'])
@login_required
def update_complaint(complaint_id):
    """Update a complaint"""
    try:
        data = request.get_json()
        
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500

        cursor = conn.cursor(dictionary=True)

        # Check if complaint exists and user has permission
        cursor.execute("SELECT * FROM complaints WHERE id = %s AND deleted_at IS NULL", (complaint_id,))
        complaint = cursor.fetchone()

        if not complaint:
            cursor.close()
            conn.close()
            return jsonify({'error': 'Complaint not found'}), 404

        if session['role'] != 'Admin' and complaint['user_id'] != session['user_id']:
            cursor.close()
            conn.close()
            return jsonify({'error': 'Access denied'}), 403

        # Build update query
        update_fields = []
        update_values = []

        if 'title' in data:
            update_fields.append("title = %s")
            update_values.append(data['title'])
        if 'description' in data:
            update_fields.append("description = %s")
            update_values.append(data['description'])
        if 'category' in data:
            update_fields.append("category = %s")
            update_values.append(data['category'])
        if 'priority' in data:
            update_fields.append("priority = %s")
            update_values.append(data['priority'])
        if 'status' in data and session['role'] == 'Admin':
            update_fields.append("status = %s")
            update_values.append(data['status'])

        update_fields.append("updated_at = %s")
        update_values.append(datetime.now())
        update_values.append(complaint_id)

        query = f"UPDATE complaints SET {', '.join(update_fields)} WHERE id = %s"
        cursor.execute(query, update_values)
        conn.commit()

        # Log audit
        audit_query = """
            INSERT INTO audit_logs (user_id, action, table_name, record_id, details, created_at)
            VALUES (%s, 'UPDATE', 'complaints', %s, %s, %s)
        """
        cursor.execute(audit_query, (session['user_id'], complaint_id, f"Updated complaint #{complaint_id}", datetime.now()))
        conn.commit()

        cursor.close()
        conn.close()

        logger.info(f"Complaint updated by {session['username']}: #{complaint_id}")

        return jsonify({'message': 'Complaint updated successfully'}), 200

    except Exception as e:
        logger.error(f"Update complaint error: {str(e)}")
        return jsonify({'error': 'Failed to update complaint'}), 500

@app.route('/api/complaints/<int:complaint_id>', methods=['DELETE'])
@login_required
def delete_complaint(complaint_id):
    """Soft delete a complaint"""
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500

        cursor = conn.cursor(dictionary=True)

        # Check if complaint exists and user has permission
        cursor.execute("SELECT * FROM complaints WHERE id = %s AND deleted_at IS NULL", (complaint_id,))
        complaint = cursor.fetchone()

        if not complaint:
            cursor.close()
            conn.close()
            return jsonify({'error': 'Complaint not found'}), 404

        if session['role'] != 'Admin' and complaint['user_id'] != session['user_id']:
            cursor.close()
            conn.close()
            return jsonify({'error': 'Access denied'}), 403

        # Soft delete
        query = "UPDATE complaints SET deleted_at = %s WHERE id = %s"
        cursor.execute(query, (datetime.now(), complaint_id))
        conn.commit()

        # Log audit
        audit_query = """
            INSERT INTO audit_logs (user_id, action, table_name, record_id, details, created_at)
            VALUES (%s, 'DELETE', 'complaints', %s, %s, %s)
        """
        cursor.execute(audit_query, (session['user_id'], complaint_id, f"Deleted complaint #{complaint_id}", datetime.now()))
        conn.commit()

        cursor.close()
        conn.close()

        logger.info(f"Complaint deleted by {session['username']}: #{complaint_id}")

        return jsonify({'message': 'Complaint deleted successfully'}), 200

    except Exception as e:
        logger.error(f"Delete complaint error: {str(e)}")
        return jsonify({'error': 'Failed to delete complaint'}), 500

# ==================== ADMIN ENDPOINTS ====================

@app.route('/api/admin/users', methods=['GET'])
@role_required('Admin')
def get_all_users():
    """Get all users (Admin only)"""
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500

        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, username, email, role, full_name, phone, status, created_at FROM users ORDER BY created_at DESC")
        users = cursor.fetchall()

        cursor.close()
        conn.close()

        # Convert datetime objects
        for user in users:
            for key, value in user.items():
                if isinstance(value, datetime):
                    user[key] = value.isoformat()

        return jsonify({'users': users}), 200

    except Exception as e:
        logger.error(f"Get users error: {str(e)}")
        return jsonify({'error': 'Failed to fetch users'}), 500

@app.route('/api/admin/stats', methods=['GET'])
@role_required('Admin')
def get_stats():
    """Get system statistics (Admin only)"""
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500

        cursor = conn.cursor(dictionary=True)

        stats = {}

        # Total users by role
        cursor.execute("SELECT role, COUNT(*) as count FROM users WHERE status = 'active' GROUP BY role")
        stats['users_by_role'] = cursor.fetchall()

        # Total complaints by status
        cursor.execute("SELECT status, COUNT(*) as count FROM complaints WHERE deleted_at IS NULL GROUP BY status")
        stats['complaints_by_status'] = cursor.fetchall()

        # Recent activity
        cursor.execute("SELECT COUNT(*) as count FROM audit_logs WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)")
        stats['recent_activity'] = cursor.fetchone()['count']

        cursor.close()
        conn.close()

        return jsonify({'stats': stats}), 200

    except Exception as e:
        logger.error(f"Get stats error: {str(e)}")
        return jsonify({'error': 'Failed to fetch statistics'}), 500

# ==================== ERROR HANDLERS ====================

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Resource not found', 'code': 404}), 404

@app.errorhandler(500)
def internal_error(error):
    logger.error(f"Internal server error: {str(error)}")
    return jsonify({'error': 'Internal server error', 'code': 500}), 500

@app.errorhandler(401)
def unauthorized(error):
    return jsonify({'error': 'Unauthorized access', 'code': 401}), 401

@app.errorhandler(403)
def forbidden(error):
    return jsonify({'error': 'Access forbidden', 'code': 403}), 403

# ==================== HEALTH CHECK ====================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'NexusCare API',
        'timestamp': datetime.now().isoformat()
    }), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
