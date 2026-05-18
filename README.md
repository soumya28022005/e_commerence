```python
readme_content = """# E-Commerce Backend API 🛒

A secure, scalable, and fully optimized REST API built using **Node.js**, **Express.js**, and **MongoDB**. This backend implements robust role-based access control (RBAC), secure third-party file uploads, and prevents critical vulnerabilities like Insecure Direct Object References (IDOR).

---

## 🚀 Features

* **Authentication & Authorization:** Secure registration and login using JWT stored in HTTP-only cookies and password hashing via `bcryptjs`.
* **Role-Based Access Control (RBAC):** Distinct permissions tailored for `user`, `seller`, and `admin` roles.
* **Product Management:** Sellers and admins can create, update, and delete products. Includes image uploads handled seamlessly via **Cloudinary**.
* **Cart Operations:** Complete shopping cart ecosystem allowing users to dynamically manage product quantities with automatic total price calculation and validation.
* **Order Automation:** Automated order generation directly fetched from the active user cart, followed by immediate and safe cart clearance upon successful checkout.
* **Payload Validation:** Strict data parsing and validation on incoming requests utilizing **Zod schemas**.
* **Advanced Security & Fixes:** Structured checks verifying entity ownership to prevent unauthorized access and modification across user profiles, product listings, and cart states.

---

## 🛠️ Tech Stack

* **Runtime Environment:** Node.js
* **Backend Framework:** Express.js (ES Modules syntax)
* **Database / ODM:** MongoDB & Mongoose
* **Media Cloud Storage:** Cloudinary API
* **Middleware:** Multer (Memory Storage) & Cookie Parser
* **Security & Tokenization:** JSON Web Tokens (JWT) & bcryptjs
* **Data Validation:** Zod

---

## 📋 Prerequisites & Environment Setup

Create a `.env` file in the root directory of your project and configure the following variables:


```

```text
New professional README generated successfully.

```env
PORT=4000
MonngoDbUr=mongodb+srv://<username>:<password>@cluster.mongodb.net/e-commerce
JWT_SECRET=your_super_secure_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
node_env=development

```

---

## 📦 Installation & Getting Started

1. **Clone the repository:**
```bash
git clone [https://github.com/soumya28022005/e_commerence.git](https://github.com/soumya28022005/e_commerence.git)
cd e_commerence

```


2. **Install all required dependencies:**
```bash
npm install

```


3. **Run the development server (via nodemon):**
```bash
npm run dev

```


The backend service will initialize and listen on: `http://localhost:4000`

---

## 🔗 API Architecture & Endpoints

### 1. Authentication Routes (`/api/v1/auth`)

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/register` | Public | Registers a new account with Zod schemas payload validation. |
| `POST` | `/login` | Public | Authenticates credentials and assigns an HTTP-only JWT token. |
| `DELETE` | `/delete-user` | Authenticated | Permanently deletes the authenticated user profile based on the JWT token. |

### 2. Product Routes (`/api/v1/product`)

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/create-product` | Seller / Admin | Uploads a product image to Cloudinary and saves the product profile to DB. |
| `PATCH` | `/editproduct/:id` | Seller / Admin | Modifies an existing product (Restricted only to the product's owner). |
| `DELETE` | `/delete-product/:id` | Seller / Admin | Deletes product data and purges the associated media file from Cloudinary. |

### 3. Cart Routes (`/api/v1/cart`)

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/addCart/:id` | Authenticated | Adds a specific product to the cart or increments its total quantity. |
| `GET` | `/allcart` | Authenticated | Fetches the full cart state with populated product descriptions. |
| `DELETE` | `/deleteCart/:id` | Authenticated | Decrements item counts or removes an entire item structure if count reaches zero. |

### 4. Order Routes (`/api/v1/order`)

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/orderrouter/:cartId` | Authenticated | Processes checkout, creates an immutable order profile, and clears the cart. |

---

## 🛡️ Project Security Implementations

* **No Plain IDs on URL for Destructive Methods:** Sensitive actions such as deleting user profiles fetch identity from the verified server-side JWT signature instead of raw URL parameters.
* **Strict Ownership Matches:** Cross-resource access is entirely blocked. A user cannot trigger checkout workflows on another user's `cartId`, nor can a seller edit/delete listings created by another merchant profile.
* **Fault-Tolerant Validations:** Prevents invalid payloads (such as negative numbers or absent inputs for product counts) using robust Zod middleware structures.

---

## 👨‍💻 Maintainer

**Soumya Chatterjee**

* Full-Stack Web Developer
* B.Tech in Computer Science and Engineering (2023-2027)


with open("README-v2.md", "w", encoding="utf-8") as f:
f.write(readme_content)

print("New professional README generated successfully.")

