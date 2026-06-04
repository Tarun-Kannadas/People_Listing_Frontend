import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const AddEditPerson = () => {
const [formData, setFormData] = useState({
    name: "",
    age: "",
    nationality: ""
});
const navigate = useNavigate();
const { id } = useParams();

// Fetch data for edit mode
useEffect(() => {
    if (id) {
    fetch(`http://localhost:5000/api/people/${id}`)
        .then((res) => res.json())
        .then((data) => setFormData(data))
        .catch((err) => console.error("Error fetching person:", err));
    }
}, [id]);

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const method = id ? "PUT" : "POST";
    const url = id
    ? `http://localhost:5000/api/people/${id}`
    : "http://localhost:5000/api/people";

    try 
    {
      const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
      });

      if (response.ok) {
      Swal.fire({
          title: id ? "Updated Successfully!" : "Added Successfully!",
          icon: "success",
          confirmButtonColor: "#28a745",
          timer: 2000
      });
      navigate("/");
      } else {
      Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonColor: "#dc3545"
      });
      }
    } catch (error) {
      Swal.fire({
        title:"Network Error",
        text: error.message || "Unable to connect the server!",
        icon: "error",
        confirmButtonColor: "#dc3545"
      })
    }
};

  return (
    <div className="form-container">
      <h2>{id ? "Edit Person" : "Add New Person"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nationality"
          placeholder="Enter Nationality"
          value={formData.nationality}
          onChange={handleChange}
          required
        />
        <button type="submit">{id ? "Update" : "Add"}</button>
        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddEditPerson;
