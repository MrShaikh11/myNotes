import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Form from "./Form";
import Notes from "./Notes";
import axios from "axios";

const HomePage = () => {
  const [date, setDate] = useState("");
  const [isAddNoteHidden, setAddNoteHidden] = useState(true);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login"); // Redirect to login if no token
    }
  }, [navigate]);

  useEffect(() => {
    const getCurrentDate = () => {
      const date = new Date();
      const options = { day: "numeric", month: "short" };
      return date.toLocaleDateString("en-US", options);
    };

    setDate(getCurrentDate());
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        try {
          const res = await axios.get("https://my-notes-backend-beta.vercel.app/notes", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setNotes(res.data);
        } catch (error) {
          console.error("Error fetching notes:", error);
        }
      }
    };
    fetchNotes();
  }, []);

  const toggleAddNote = () => {
    setAddNoteHidden(!isAddNoteHidden);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      // Send DELETE request to backend
      await axios.delete(`https://my-notes-backend-beta.vercel.app/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });

      // Update the state by filtering out the deleted note
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting notes:", error.message);
    }
  };

  const handleAddNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  return (
    <>
      <div
        className={`p-4 sm:ml-64 ${isAddNoteHidden ? "" : "filter blur-lg"}`}
      >
        <h1 className="mt-5 text-2xl font-extrabold">Today</h1>
        <div className="mt-3">{date}, Today</div>
        <a
          href="#"
          className="flex items-center p-2 text-gray-900 rounded-lg group"
          onClick={toggleAddNote}
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-gray-500 border-2 rounded-lg transition duration-75 group-hover:bg-gray-200 group-hover:text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            fill="currentColor"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
          <span className="flex-1 ms-3 whitespace-nowrap">Add Note</span>
        </a>
        <Notes notes={notes} onDelete={handleDelete} />
      </div>

      {!isAddNoteHidden && (
        <Form toggleForm={toggleAddNote} onAddNote={handleAddNote} />
      )}
    </>
  );
};

export default HomePage;
