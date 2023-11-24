import React, { useState } from 'react';
import './ProductTable.css'; // Import your CSS file for styling
import AddProduct from '../AddProduct/AddProduct';
import UpdateProduct from '../UpdateProduct/UpdateProduct';
const ProductTable = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      productName: 'Product 1',
      productId: '1234',
      productCategory: 'Category 1',
      courseName: 'Course A',
      authorName: 'Author X',
      subjectName: 'Subject 1',
      universityName: 'University A',
      semesterName: 'Semester 1'
    },
    {
      id: 2,
      productName: 'Product 2',
      productId: '5678',
      productCategory: 'Category 2',
      courseName: 'Course B',
      authorName: 'Author Y',
      subjectName: 'Subject 2',
      universityName: 'University B',
      semesterName: 'Semester 2'
    },
    // Add more products as needed
  ]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleUpdate = (id) => {
    // Logic to handle updating a product with 'id'
    console.log(`Update product with ID: ${id}`);
    setSelectedProductId(id);
    setShowUpdateProduct(true);
    // Implement update functionality
  };

  const handleDelete = (id) => {
    // Logic to handle deleting a product with 'id'
    console.log(`Delete product with ID: ${id}`);
    // Implement delete functionality
  };
  const handleAddProduct = () => {
    setShowAddProduct(true);
  };

  const handleBack = () => {
    setShowAddProduct(false);
    setShowUpdateProduct(false);
  };

  return (
    <div className="product-table-container">
      { showAddProduct ? (
        <AddProduct handleBack={handleBack} />
      ) : showUpdateProduct ? (
        <UpdateProduct productId={selectedProductId} handleBack={handleBack} />
      ) : (<table className="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product ID</th>
            <th>Product Category</th>
            <th>Course Name</th>
            <th>Author Name</th>
            <th>Subject Name</th>
            <th>University Name</th>
            <th>Semester Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.productName}</td>
              <td>{product.productId}</td>
              <td>{product.productCategory}</td>
              <td>{product.courseName}</td>
              <td>{product.authorName}</td>
              <td>{product.subjectName}</td>
              <td>{product.universityName}</td>
              <td>{product.semesterName}</td>
              <td>
                <button onClick={() => handleUpdate(product.id)}>Update</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>)}
      {!showAddProduct && !showUpdateProduct && (
        <button className="add-product-btn" onClick={handleAddProduct}>
          Add Product
        </button>
      )}
    </div>
  );
};

export default ProductTable;
