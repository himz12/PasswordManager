import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faEye, faEyeSlash, faCopy, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    site: "",
    username: "",
    password: ""
  });
  const [passArray, setPassArray] = useState([]);

  const getPasswords = async () =>{
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setPassArray(passwords)
  }

  useEffect(() => {
    getPasswords()
  }, []);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePass = async () => {
    if (!form.site || !form.username || !form.password) {
      toast.error('Please fill all fields', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce
      });
      return;
    }
    const newPassArray =  [...passArray, form];
    setPassArray(newPassArray);
    let res = await fetch("http://localhost:3000/",{method:'POST',headers:{"content-type":"application/json"},body:JSON.stringify(form)})
    // localStorage.setItem("passwords", JSON.stringify(newPassArray));
    
    setForm({ site: "", username: "", password: "" });
    toast.success('Password saved', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce
    });
  };

  const deletePass = async (index) => {
  try {
    const itemToDelete = passArray[index];
    const newPassArray = passArray.filter((_, i) => i !== index);
    setPassArray(newPassArray);

    let res;
    if (itemToDelete.id) {
      // Try DELETE with ID in URL (e.g., http://localhost:3000/:id)
      res = await fetch(`http://localhost:3000/${itemToDelete.id}`, {
        method: 'DELETE',
        headers: { "content-type": "application/json" }
      });
    } else {
      // Fallback to sending full object in body
      res = await fetch("http://localhost:3000/", {
        method: 'DELETE',
        headers: { "content-type": "application/json" },
        body: JSON.stringify(itemToDelete)
      });
    }

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    await getPasswords();
    toast.success('Password deleted', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce
    });
  } catch (error) {
    console.error('Delete error:', error);
    toast.error('Failed to delete password', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce
    });
  }
};

  const editPass = (index) => {
    setForm(passArray[index]);
    const newPassArray = passArray.filter((_, i) => i !== index);
    setPassArray(newPassArray);
    toast.info('Password loaded for editing', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce
    });
  };

  const copyText = (text) => {
    toast.success('Copied to Clipboard', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="relative bg-slate-950 min-h-screen">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
        <div className="absolute bottom-0 right-[-20%] top-[-10%] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />

        <div className="bg-slate-800 mycontainer text-white relative z-10">
          <h1 className="text-4xl text-center font-bold">
            <span className="text-yellow-200">&lt;</span>
            <span>Lock</span>
            <span className="text-yellow-200">/IN&gt;</span>
          </h1>
          <p className="text-yellow-200 text-lg text-center">Store your passwords securely</p>

          <div className="text-white flex flex-col p-4 gap-5">
            <input
              value={form.site}
              onChange={handleChange}
              name='site'
              className="rounded-full border border-slate-100 w-full p-4 py-1 placeholder:text-white/30 text-white"
              type="text"
              placeholder="Enter your Website URL"
            />
            <div className="flex w-full gap-4 justify-between">
              <input
                value={form.username}
                onChange={handleChange}
                name='username'
                className="rounded-full border border-slate-100 w-full p-4 py-1 placeholder:text-white/30 text-white"
                type="text"
                placeholder="Username"
              />
              <div className="relative w-full">
                <input
                  value={form.password}
                  onChange={handleChange}
                  name='password'
                  className="rounded-full border border-slate-100 w-full p-4 py-1 placeholder:text-white/30 text-white pr-10"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                />
                <span
                  className="absolute right-3 top-1.5 cursor-pointer text-white/70 hover:text-white"
                  onClick={toggleShowPassword}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button onClick={savePass} className="flex justify-center px-2.5 py-1.5 bg-green-300 hover:bg-green-500 transition-colors duration-200 cursor-pointer gap-2.5 w-40 h-15 items-center font-black text-black rounded-2xl">
                <FontAwesomeIcon icon={faBookmark} />
                Add password
              </button>
            </div>
            <div className='passwords'>
              <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
              {passArray.length === 0 && <div>No passwords to show</div>}
              {passArray.length !== 0 &&
                <table className='table-auto w-full rounded-md overflow-hidden'>
                  <thead className='bg-yellow-200 text-black font-bold'>
                    <tr>
                      <th className='py-2'>Site</th>
                      <th className='py-2'>Username</th>
                      <th className='py-2'>Password</th>
                      <th className='py-2'>Actions</th>
                    </tr>
                  </thead>
                  <tbody className='bg-yellow-100'>
                    {passArray.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-black py-2 border border-white text-center">
                            <div className="flex items-center justify-center gap-3">
                              <a
                                href={item.site}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline text-blue-600 cursor-pointer"
                              >
                                {item.site}
                              </a>
                              <button
                                onClick={() => copyText(item.site)}
                                className="text-black hover:text-yellow-600 cursor-pointer"
                                title="Copy Site URL"
                              >
                                <FontAwesomeIcon icon={faCopy} />
                              </button>
                            </div>
                          </td>
                          <td className="text-black py-2 border border-white text-center">
                            <div className="flex items-center justify-center gap-3">
                              <span>{item.username}</span>
                              <button
                                onClick={() => copyText(item.username)}
                                className="text-black hover:text-yellow-600 cursor-pointer"
                                title="Copy Username"
                              >
                                <FontAwesomeIcon icon={faCopy} />
                              </button>
                            </div>
                          </td>
                          <td className="text-black py-2 border border-white text-center">
                            <div className="flex items-center justify-center gap-3">
                              <span>{item.password}</span>
                              <button
                                onClick={() => copyText(item.password)}
                                className="text-black hover:text-yellow-600 cursor-pointer"
                                title="Copy Password"
                              >
                                <FontAwesomeIcon icon={faCopy} />
                              </button>
                            </div>
                          </td>
                          <td className="py-2 border border-white text-center">
                            <div className="flex items-center justify-center gap-3">
                              <button
                                onClick={() => deletePass(index)}
                                className="text-red-600 hover:text-red-800 cursor-pointer transition-colors duration-200"
                                title="Delete"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                              <button
                                onClick={() => editPass(index)}
                                className="text-green-600 hover:text-green-800 cursor-pointer transition-colors duration-200"
                                title="Edit"
                              >
                                <FontAwesomeIcon icon={faPenToSquare} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;