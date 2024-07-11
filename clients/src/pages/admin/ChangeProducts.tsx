
import React, { useState } from 'react';
import '../../components/css/ChangeProdcuts.css';

interface Product {
  id: number;
  name: string;
  image: string;
  quantity: number;
  type: string;
  state: string;
  price: string;
  description: string;
}

interface ChangeProductsProps {
  product: Product;
  onSave: (updatedProduct: Product) => void;
  onCancel: () => void;
}

export default function ChangeProducts({ product, onSave, onCancel }: ChangeProductsProps) {
  const [updatedProduct, setUpdatedProduct] = useState<Product>(product);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(updatedProduct);
  };

  return (
    <div className="change-products-container">
      <form className="change-products-form" onSubmit={handleSubmit}>
        <h2>Change Products Information</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={updatedProduct.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">New Image</label>
          <input
            type="file"
            id="image"
            name="image"
            value={updatedProduct.image}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">New Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={updatedProduct.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
        <select
                id="type"
                name="type"
                value={updatedProduct.type}
                onChange={handleChange}
                required
              >
                <option value="">Chọn loại xe</option>
                <option value="dưới 50cc">Dưới 50cc</option>
                <option value="trên 50cc">Trên 50cc</option>
                <option value="trên 100cc">Trên 100cc</option>
                <option value="trên 180cc">Trên 180cc</option>
              </select>
        </div>
        <div className="form-group">
          <label htmlFor="state">New State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={updatedProduct.state}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">New Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={updatedProduct.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">New Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={updatedProduct.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
        <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}
