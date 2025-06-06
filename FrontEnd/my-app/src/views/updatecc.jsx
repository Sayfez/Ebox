import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const UpdateNoteCC = () => {
  const [noteCC, setNoteCC] = useState('');
  const [error, setError] = useState('');

  const handleNoteCCChange = (e) => {
    const value = e.target.value;
    setNoteCC(value);
  };

  const handleUpdateNoteCC = async () => {
    const parsedValue = parseFloat(noteCC);
    if (isNaN(parsedValue) || parsedValue < 0) {
      setError('Invalid Note CC value. It must be a non-negative number.');
      return;
    }

    try {
      const idPresence = "667d6620b37391f8c5a12ec7"; // Replace with actual ID or dynamic value
    const res=  await axios.patch(`http://localhost:3003/presences/${idPresence}/noteCc`, { noteCc: parsedValue });
      Swal.fire('Success!', 'Note CC has been updated.', 'success');
      setError('');
      console.log(res)
    } catch (error) {
      console.error('Error updating Note CC:', error);
      Swal.fire('Error', 'Failed to update Note CC.', 'error');
    }
  };

  return (
    <div>
      <input
        type="number"
        value={noteCC}
        onChange={handleNoteCCChange}
        placeholder="Enter Note CC"
        style={{ width: '150px', marginRight: '10px' }}
      />
      <button onClick={handleUpdateNoteCC} className="btn btn-sm btn-primary">
        Update Note CC
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default UpdateNoteCC;
