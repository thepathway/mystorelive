// frontend/src/pages/Register.jsx
import { useEffect, useState } from "react";
import axios from "@/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    customerName: "",
    contactFirstName: "",
    contactLastName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state_id: "",
    postalCode: "",
    country_id: ""
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/locations/countries").then(res => setCountries(res.data));
  }, []);

  useEffect(() => {
    if (form.country_id) {
      axios.get(`/api/locations/states?countryId=${form.country_id}`).then(res => setStates(res.data));
    }
  }, [form.country_id]);

  useEffect(() => {
    if (form.state_id) {
      axios.get(`/api/locations/cities?stateId=${form.state_id}`).then(res => setCities(res.data));
    }
  }, [form.state_id]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const requiredFields = [
      "email", "password", "confirmPassword", "customerName",
      "contactFirstName", "contactLastName", "phone", "addressLine1",
      "city", "country_id"
    ];

    for (const field of requiredFields) {
      if (!form[field]?.trim()) {
        setError("Please fill all required fields.");
        return;
      }
    }

    if (!validateEmail(form.email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post("/api/auth/register", form);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-12 py-24">
      <form onSubmit={handleSubmit} className="max-w-3xl w-full space-y-4">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="grid grid-cols-2 gap-4">
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="border px-4 py-2 rounded col-span-2" />
          <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" className="border px-4 py-2 rounded" />
          <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" type="password" className="border px-4 py-2 rounded" />
          <input name="customerName" value={form.customerName} onChange={handleChange} placeholder="Customer Name" className="border px-4 py-2 rounded col-span-2" />
          <input name="contactFirstName" value={form.contactFirstName} onChange={handleChange} placeholder="Contact First Name" className="border px-4 py-2 rounded" />
          <input name="contactLastName" value={form.contactLastName} onChange={handleChange} placeholder="Contact Last Name" className="border px-4 py-2 rounded" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border px-4 py-2 rounded" />
          <input name="addressLine1" value={form.addressLine1} onChange={handleChange} placeholder="Address Line 1" className="border px-4 py-2 rounded" />
          <input name="addressLine2" value={form.addressLine2} onChange={handleChange} placeholder="Address Line 2 (optional)" className="border px-4 py-2 rounded" />

          <select name="country_id" value={form.country_id} onChange={handleChange} className="border px-4 py-2 rounded">
            <option value="">Select Country</option>
            {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <select name="state_id" value={form.state_id} onChange={handleChange} className="border px-4 py-2 rounded">
            <option value="">Select State</option>
            {states.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>

          <select name="city" value={form.city} onChange={handleChange} className="border px-4 py-2 rounded">
            <option value="">Select City</option>
            {cities.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>

          <input name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="Postal Code" className="border px-4 py-2 rounded" />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}

