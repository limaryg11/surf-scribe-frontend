import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Container, Stack } from 'react-bootstrap';


const API_URL = process.env.REACT_APP_API || 'http://18.219.118.158:8080';

const SurfLocationDetails = ({ surfLocations }) => {

  const {id} = useParams();
  const selectedSurfLocation = surfLocations.find((surfLocation) => surfLocation.id === id);



  const [newNoteText, setNewNoteText] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedNoteText, setEditedNoteText] = useState('');




  const enterEditMode = (noteId, currentText) => {
    setEditingNoteId(noteId);
    setEditedNoteText(currentText);
  };
  

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

  const handleEditNote = (noteId) => {
    const updatedNote = {
      text: editedNoteText,
      timestamp: new Date().toISOString(),
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

    <Container>
      <h2>Surf Location Details</h2>
      {selectedSurfLocation ? (
        <div>
          <Stack gap={3}>
          <h4>Location Name: <p>{selectedSurfLocation.name}</p> </h4>
          <h4>Description: <p>{selectedSurfLocation.description}</p></h4>
          </Stack>
          
          <h3>Notes:</h3>
            <ul>
            {selectedSurfLocation.notes.map((note) => (
              
              <li key={note.id}>
                {editingNoteId === note.id ? (
                  <>
                  <Stack gap={3}>
                    <input
                      type="text"
                      value={editedNoteText}
                      onChange={(e) => setEditedNoteText(e.target.value)}
                      />
                  
                    <Stack direction='horizontal' gap={2}>
                      <Button onClick={() => handleEditNote(note.id)}>Submit</Button>
                      <Button onClick={() => setEditingNoteId(null)}>Cancel</Button>
                    </Stack>
                  </Stack>
                  </>
                ) : (
                  <>
                    <Stack direction='horizontal' gap={3}>
                    {note.text}{' '}
                      <Button className='editButton' size='sm' onClick={() => enterEditMode(note.id, note.text)}>Edit</Button>
                    </Stack>
                  </>
                )}
              </li>
            ))}
          </ul>
          <div>
            <h3>Add New Note:</h3>
            <Stack gap={2}>
            <input
              type="text"
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              style={{width:'40vw'}}
            />
              <Button size='xxl' 
              onClick={handleAddNote}
              style={{width:'40vw'}}
              >Add Note</Button>
            </Stack>
          </div>
        </div>
      ) : (
        <p>Surf location not found.</p>
      )}

    </Container>
  );



};

export default SurfLocationDetails;
