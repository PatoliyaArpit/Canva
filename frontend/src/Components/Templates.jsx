import React, { useState } from 'react';

import api from"../utils/api";

const Templates = () => {
  const [state, setState] = useState({
    name: "",
    contact: "",
  });

  const [loader, setLoader] = useState(false);

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const user_msg = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      console.log(state);
      const { data } = await api.post('/api/user-msg', state);
      setLoader(false);
      setState({
        name: "",
        contact: "",
      });
     
      console.log(data);
    } catch (error) {
      setLoader(false);
      console.log(error.response);
    }
  };

  return (
    <div>
      <form onSubmit={user_msg}>
        <div className="flex flex-col gap-3 mb-3 text-white">
          <label htmlFor="name">Name</label>
          <input
            onChange={inputHandle}
            type="text"
            name="name"
            id="name"
            placeholder="Enter name"
            value={state.name}
            required
            className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
          />
        </div>
        <div className="flex flex-col gap-3 mb-3 text-white">
          <label htmlFor="contact">Contact</label>
          <input
            onChange={inputHandle}
            type="text"
            name="contact"
            id="contact"
            placeholder="Enter contact"
            value={state.contact}
            required
            className="px-3 py-2 rounded-md border outline-none border-[#5c5c5e] focus:border-purple-500 bg-transparent"
          />
        </div>
        <div>
          <button
            disabled={loader}
            className="px-3 py-2 rounded-md bg-purple-500 w-full outline-none hover:bg-purple-600 text-white"
          >
            {loader ? "Loading..." : "Sign up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Templates;
