import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faEye, faEyeSlash, faCopy, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../lib/axios.js"; 

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({ website: "", username: "", password: "" });
  const [passArray, setPassArray] = useState([]);

 const getPasswords = async () => {
  try {
    const res = await axiosInstance.get("/api/pass");
    console.log("API response:", res.data);  // Debug line
    setPassArray(Array.isArray(res.data) ? res.data : []);
  } catch (error) {
    setPassArray([]);  // fallback to empty array to prevent .map crash
    toast.error('Failed to load passwords');
    console.error("Fetch passwords error:", error);
  }
};



  useEffect(() => { getPasswords(); }, []);

  const toggleShowPassword = () => setShowPassword(prev => !prev);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const savePass = async () => {
  if (!form.website || !form.username || !form.password) {
    toast.error('Please fill all fields', { position: "top-right", autoClose: 2000, theme: "light", transition: Bounce });
    return;
  }

  if (isSaving) return;
  setIsSaving(true);

  try {
    await axiosInstance.post("/api/pass", form);
    await getPasswords();
    setForm({ website: "", username: "", password: "" });
    toast.success('Password saved', { position: "top-right", autoClose: 2000, theme: "light", transition: Bounce });
  } catch (error) {
    toast.error('Failed to save password');
    console.error("Save error:", error);
  } finally {
    setIsSaving(false);
  }
};


  const deletePass = async (index) => {
  try {
    const itemToDelete = passArray[index];
    if (!itemToDelete._id) throw new Error("No ID to delete");

    await axiosInstance.delete(`/api/pass/${itemToDelete._id}`);
    await getPasswords();
    toast.success('Password deleted', { position: "top-right", autoClose: 2000, theme: "light", transition: Bounce });
  } catch (error) {
    toast.error('Failed to delete password');
    console.error("Delete error:", error);
  }
};


  const editPass = (index) => {
    setForm(passArray[index]);
    const newPassArray = passArray.filter((_, i) => i !== index);
    setPassArray(newPassArray);
    toast.info('Password loaded for editing', { position: "top-right", autoClose: 2000, theme: "light", transition: Bounce });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to Clipboard', { position: "top-right", autoClose: 2000, theme: "light", transition: Bounce });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} theme="light" transition={Bounce} />

      <div className="min-h-screen bg-gray-50 flex justify-center py-6 sm:py-8">
        <div className="w-full max-w-4xl px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 text-center mb-2">Password Manager</h1>
          <p className="text-blue-700 text-center text-sm sm:text-base mb-6 sm:mb-8">Securely store and manage your credentials</p>

          <div className="space-y-4 mb-6 sm:mb-8">
            <input
              value={form.website}
              onChange={handleChange}
              name="website"
              className="w-full p-3 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 text-sm sm:text-base"
              type="text"
              placeholder="Website URL"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                value={form.username}
                onChange={handleChange}
                name="username"
                className="w-full p-3 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                type="text"
                placeholder="Username"
              />
              <div className="relative">
                <input
                  value={form.password}
                  onChange={handleChange}
                  name="password"
                  className="w-full p-3 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  aria-label="Password"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-blue-500 hover:text-blue-700"
                  onClick={toggleShowPassword}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={savePass}
                disabled={isSaving}
                className={`px-4 sm:px-6 py-2 font-medium rounded-md transition-colors duration-200 text-sm sm:text-base ${isSaving ? 'bg-blue-200 cursor-not-allowed' : 'bg-blue-950 hover:bg-blue-900 text-white'}`}
                aria-label="Add password"
              >
                <FontAwesomeIcon icon={faBookmark} className="mr-2" />
                {isSaving ? 'Saving...' : 'Add Password'}
              </button>
            </div>
          </div>

          <h2 className="text-lg sm:text-xl font-semibold text-blue-900 mb-4">Your Passwords</h2>
          {passArray.length === 0 ? (
            <p className="text-blue-700 text-center text-sm sm:text-base">No passwords saved yet.</p>
          ) : (
            <div className="space-y-4 sm:overflow-x-auto">
              {/* Desktop Table Layout */}
              <table className="w-full border-collapse hidden sm:table">
                <thead className="bg-blue-950 text-blue-50">
                  <tr>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm">Website</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm">Username</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm">Password</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-black">
                  {passArray.map((item, index) => (
                    <tr key={index} className="border-b border-blue-200 hover:bg-blue-100">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                        <div className="flex items-center">
                          <a
                            href={item.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                            aria-label={`Visit ${item.website}`}
                          >
                            {item.website}
                          </a>
                          <button
                            onClick={() => copyText(item.website)}
                            className="ml-2 text-black hover:text-blue-700"
                            aria-label="Copy website URL"
                          >
                            <FontAwesomeIcon icon={faCopy} />
                          </button>
                        </div>
                      </td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                        <div className="flex items-center">
                          {item.username}
                          <button
                            onClick={() => copyText(item.username)}
                            className="ml-2 text-black hover:text-blue-700"
                            aria-label="Copy username"
                          >
                            <FontAwesomeIcon icon={faCopy} />
                          </button>
                        </div>
                      </td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                        <div className="flex items-center">
                          {item.password}
                          <button
                            onClick={() => copyText(item.password)}
                            className="ml-2 text-black hover:text-blue-700"
                            aria-label="Copy password"
                          >
                            <FontAwesomeIcon icon={faCopy} />
                          </button>
                        </div>
                      </td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                        <button
                          onClick={() => deletePass(index)}
                          className="text-red-500 hover:text-red-700 mx-1"
                          aria-label="Delete password"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button
                          onClick={() => editPass(index)}
                          className="text-blue-500 hover:text-blue-700 mx-1"
                          aria-label="Edit password"
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile Box Layout */}
              <div className="sm:hidden space-y-4">
                {passArray.map((item, index) => (
                  <div key={index} className="bg-white border border-blue-200 rounded-md p-4 shadow-sm">
                    <div className="flex flex-col space-y-3 text-blue-900">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-xs">Website</span>
                        <div className="flex items-center">
                          <a
                            href={item.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-xs"
                            aria-label={`Visit ${item.website}`}
                          >
                            {item.website}
                          </a>
                          <button
                            onClick={() => copyText(item.website)}
                            className="ml-2 text-blue-500 hover:text-blue-700"
                            aria-label="Copy website URL"
                          >
                            <FontAwesomeIcon icon={faCopy} size="sm" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-xs">Username</span>
                        <div className="flex items-center">
                          <span className="text-xs">{item.username}</span>
                          <button
                            onClick={() => copyText(item.username)}
                            className="ml-2 text-blue-500 hover:text-blue-700"
                            aria-label="Copy username"
                          >
                            <FontAwesomeIcon icon={faCopy} size="sm" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-xs">Password</span>
                        <div className="flex items-center">
                          <span className="text-xs">{item.password}</span>
                          <button
                            onClick={() => copyText(item.password)}
                            className="ml-2 text-blue-500 hover:text-blue-700"
                            aria-label="Copy password"
                          >
                            <FontAwesomeIcon icon={faCopy} size="sm" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => deletePass(index)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Delete password"
                        >
                          <FontAwesomeIcon icon={faTrash} size="sm" />
                        </button>
                        <button
                          onClick={() => editPass(index)}
                          className="text-blue-500 hover:text-blue-700"
                          aria-label="Edit password"
                        >
                          <FontAwesomeIcon icon={faPenToSquare} size="sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;