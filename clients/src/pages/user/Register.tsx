import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewUser } from "../../service/user.service";
import "../../components/css/Register.css";
import { Link } from "react-router-dom";
import Logo from "../../components/image/logo.png";
import { TbMotorbike } from "react-icons/tb";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  onl: boolean;
  block: boolean;
  age: number;
  phoneNumber: string;
  cart: [];
  buy: [];
  image:''
}

export default function Register() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    onl: false,
    block: false,
    age: 0,
    phoneNumber: "",
    cart: [],
    buy: [],
    image:''
  });

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isValidEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const isValidPhoneNumber = (phoneNumber: string) => {
    const re = /^\d{10,11}$/; // Vietnamese phone numbers are usually 10 or 11 digits
    return re.test(phoneNumber);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail(formData.email)) {
      alert("Vui lòng nhập một địa chỉ email hợp lệ");
      return;
    }
    if (!isValidPhoneNumber(formData.phoneNumber)) {
      alert("Vui lòng nhập một số điện thoại hợp lệ (10-11 số)");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Password xác nhận không đúng");
      return;
    }
    if (formData.age < 18) {
      alert("Tuổi phải lớn hơn hoặc bằng 18");
      return;
    }
    dispatch(addNewUser(formData));
  };

  return (
    <div className="register-container">
      <h2 className="text-center" style={{ fontFamily: "sans-serif" }}>
        <TbMotorbike style={{ fontSize: "2rem" }} /> Motorbike Shop
      </h2>
      <div className="text-center mb-4">
        <img src={Logo} alt="Logo" />
      </div>
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            <b>Name</b>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder="Your name?"
            value={formData.name}
            onChange={handleInput}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            <b>Email</b>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Your email?"
            value={formData.email}
            onChange={handleInput}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            <b>Password</b>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="Your password?"
            value={formData.password}
            onChange={handleInput}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            <b>Confirm Password</b>
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="form-control"
            placeholder="Confirm your password?"
            value={formData.confirmPassword}
            onChange={handleInput}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            <b>Your age</b>
          </label>
          <input
            type="number"
            name="age"
            id="age"
            className="form-control"
            placeholder="Your age?"
            value={formData.age}
            onChange={handleInput}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            <b>Phone Number</b>
          </label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            className="form-control"
            placeholder="Your phone number?"
            value={formData.phoneNumber}
            onChange={handleInput}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Image" className="form-label">
            <b>Image</b>
          </label>
          <input
            type="text"
            name="image"
            id="image"
            className="form-control"
            placeholder="Your phone number?"
            value={formData.image}
            onChange={handleInput}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
        <br />
        <div className="text-center mt-3">
          <Link to="/login" style={{ color: "blue" }}>
            Bạn đã có tài khoản? Ấn vào đây để đăng nhập
          </Link>
        </div>
      </form>
    </div>
  );
}
