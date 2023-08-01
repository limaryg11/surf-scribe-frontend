import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API || 'http://localhost:8080';

const SurfLocationDetails = ({ surfLocations }) => {

  const {id} = useParams();
  const selectedSurfLocation = surfLocations.find((surfLocation) => surfLocation.id === id);

  // console.log(id);
  // console.log(selectedSurfLocation);

  const [newNoteText, setNewNoteText] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);

  const handleAddNote = () => {
    const newNote = {
      text: newNoteText,
      timestamp: new Date().toISOString(),
    };

    axios
      .post(`${API_URL}/surf-locations/${selectedSurfLocation.id}/notes`, newNote)
      .then((response) => {
        console.log('New Note added:', response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error adding Note:', error);
      });
  };

  const handleEditNote = (noteId, updatedText) => {
    const updatedNote = {
      text: updatedText,
    };

    axios
      .put(`${API_URL}/surf-locations/${selectedSurfLocation.id}/notes/${noteId}`, updatedNote)
      .then((response) => {
        console.log('Note updated:', response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating Note:', error);
      });
  };
  
  return (

    <div>
      <h2>Surf Location Details</h2>
      {selectedSurfLocation ? (
        <div>
          <h3>{selectedSurfLocation.name}</h3>
          <p>{selectedSurfLocation.description}</p>
          <h3>Notes:</h3>
          <ul>
            {selectedSurfLocation.notes.map((note) => (
              <li key={note.id}>
                {editingNoteId === note.id ? (
                  <>
                    <input
                      type="text"
                      value={note.text}
                      onChange={(e) => handleEditNote(note.id, e.target.value)}
                    />
                    <button onClick={() => setEditingNoteId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    {note.text}{' '}
                    <button onClick={() => setEditingNoteId(note.id)}>Edit</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Surf location not found.</p>
      )}

      <div>
        <h3>Add New Note:</h3>
        <input
          type="text"
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>
    </div>
  );



};

export default SurfLocationDetails;
