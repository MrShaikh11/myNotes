import React, { useState } from "react";
import axios from "axios";

function Form({ toggleForm, onAddNote }) {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const createdOn = new Date();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve the JWT token from local storage
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      // Send a POST request to add the note
      const res = await axios.post(
        "https://my-notes-backend-beta.vercel.app/addNote",
        {
          title: title,
          note: note,
          createdOn: createdOn,
          modifiedOn: null, // Or set it to the current date if you want
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      console.log("Server response:", res); // Log the entire response for debugging

      console.log("Note added", res.data);
      onAddNote(res.data); // Assuming onAddNote correctly updates the notes state
      setTitle("");
      setNote("");
      toggleForm();
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-w-sm mx-auto bg-white p-5 rounded-lg">
        <button
          className="absolute top-3 right-3 p-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
          onClick={toggleForm}
        >
          <svg
            className="w-4 h-4 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <form className="mt-4" onSubmit={handleSubmit}>
          <h1 className="ml-1 mb-2 font-bold text-2xl">Add Note</h1>
          <div className="border-2 p-3 border rounded-lg">
            <input
              type="text"
              id="small-input"
              placeholder="Title"
              value={title}
              onChange={handleTitleChange}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mt-3 border-2 p-3 border rounded-lg">
            <textarea
              placeholder="Take a Note...."
              type="text"
              id="large-input"
              value={note}
              onChange={handleNoteChange}
              className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
