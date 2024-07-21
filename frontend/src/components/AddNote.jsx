import React from "react";

function AddNote() {
  const [isAddNoteHidden, setAddNoteHidden] = useState(true);
  const toggleAddNote = () => {
    setAddNoteHidden(!isAddNoteHidden);
  };

  return <div></div>;
}

export default AddNote;
