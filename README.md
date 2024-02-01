# E-Commerce Platform

This README provides an overview of the functionalities and usage of our e-commerce platform. The project is structured using Node.js and MongoDB for the backend, Below is a breakdown of the key components and features:

## 1. Product Management

### 1.1 Create Product

- **Endpoint:** `/api/products/createProduct` (POST)
- **Description:** Allows to create a new product by providing details such as name, description, price, and variants.
- **Validation:**
  - Product name and price are required fields.
  - Variants can be added during product creation.

### 1.2 Get All Products

- **Endpoint:** `/api/products/allProduct` (GET)
- **Description:** Retrieves a list of all products available on the platform.

### 1.3 Update Product by ID

- **Endpoint:** `/api/products/:productId` (PUT)
- **Description:** Updates the details of a specific product by its ID for authenticated users.
- **Validation:**
  - Only the product owner can update the product.

### 1.4 Delete Product by ID

- **Endpoint:** `/api/products/deleteProduct/:id` (DELETE)
- **Description:** Deletes a specific product by its ID.

### 1.5 Search Products

- **Endpoint:** `/api/products/search` (GET)
- **Description:** Searches for products based on a query parameter (`q`) provided in the request.
- **Validation:**
  - Search query parameter 'q' is required.

## 2. Product Variant Management

### 2.1 Create Variant

- **Endpoint:** `/api/products/:id/addVariants` (POST)
- **Description:** Allows authenticated users to add a new variant to a product by providing details such as name, SKU, additional cost, and stock count.
- **Validation:**
  - Variant name and SKU are required fields.

### 2.2 Update Variant by ID

- **Endpoint:** `/api/products/:productId/editVariants/:variantId` (PUT)
- **Description:** Updates the details of a specific variant by its ID for authenticated users.
- **Validation:**
  - Only the product owner can update the variant.

## 4. Technologies Used

- **Backend Framework:** Node.js
- **Database:** MongoDB

## 5. Setup Instructions

1. Install Node.js and MongoDB.
2. Clone the repository.
3. Run `npm install` to install dependencies.
4. MongoDB connection details. (for Localdb can use MongoDB Compass)
5. Run the application using `npm start`.

## 6. Error Handling

- Proper error messages and status codes are provided for different scenarios, such as validation failures, authentication issues, and database errors.

## 7. Testing

Testing has been conducted using Postman, and edge cases have been addressed to ensure robust functionality.

**Notes:**
For ease of code execution and comfort during development, the `.env` file has been used to secure the `MONGO_URI`. Keep in mind that in a production environment, it's crucial to use environment variables and secure sensitive information like secrets to enhance application security.

