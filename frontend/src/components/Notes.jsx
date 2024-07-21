import React from "react";
import NoteCard from "./NoteCard"; // Adjust the path as needed

const Notes = ({ notes, onDelete }) => {
  if (!notes || notes.length === 0) {
    return <div>No notes available</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          title={note.title}
          content={note.note}
          onDelete={() => onDelete(note._id)}
        />
      ))}
    </div>
  );
};

export default Notes;
