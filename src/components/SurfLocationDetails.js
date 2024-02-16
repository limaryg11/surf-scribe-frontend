import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Container, Stack } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import "./SurfLocationDetails.css"


const API_URL = process.env.REACT_APP_API || 'https://agile-badlands-99127-e0dd8e555c49.herokuapp.com/http://18.117.189.190:8080';

const SurfLocationDetails = ({ surfLocations, handleDeleteNote }) => {

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
      <h1 className="p-3 mb-2 bg-info bg-gradient text-light bg-opacity-25">Surf Location Details</h1>
      
      {selectedSurfLocation ? (
      
        <div className='center'>
          <ListGroup>
          <Stack gap={3}>
          <h4
          >Location:
          </h4>
          
          <p className="mb-2 bg-light bg-gradient text-dark rounded-5 bg-opacity-75">{selectedSurfLocation.name}</p>
          <h4>
            Description: </h4>
            
          <p className="mb-2 bg-light bg-gradient text-dark rounded-5 bg-opacity-75">{selectedSurfLocation.description}</p>
          </Stack>
          </ListGroup>
          
          <h4>Notes:</h4>
            <ListGroup as="ul">
            {selectedSurfLocation.notes.map((note) => (
              
              <ListGroup.Item as="li" action variant="info" className="p-3 mb-2 bg-gradient text-dark rounded-5" key={note.id}>
                {editingNoteId === note.id ? (
                  <>
                  <Stack gap={3}>
                  <>
                    <FloatingLabel
                      controlId="floatingTextarea"
                      label="Edit Note"
                      className="mb-3 rounded-5"
                    >
                      <Form.Control 
                      as="textarea" 
                      placeholder="Leave a comment here"
                      value={editedNoteText}
                      className='rounded-5'
                      style={{ height: '100px', width:'40vw' }}
                      onChange={(e) => setEditedNoteText(e.target.value)}
                      />
                    </FloatingLabel>
                  </>
                    {/* <input
                      type="text"
                      value={editedNoteText}
                      onChange={(e) => setEditedNoteText(e.target.value)}
                      /> */}
                    {/* <div className='vr' /> */}
                    <Stack direction='horizontal' className='d-grid gap-2 d-md-flex justify-content-md-end' gap={2}>
                      <Button 
                      variant="light"
                      className="bg-info text-dark rounded-4 bg-opacity-25"  onClick={() => handleEditNote(note.id)}>Submit</Button>
                      <Button 
                      variant="light"
                      className="bg-info text-dark rounded-4 bg-opacity-25"  onClick={() => setEditingNoteId(null)}>Cancel</Button>
                    </Stack>
                  </Stack>
                  </>
                ) : (
                  <>
                    <Stack direction='horizontal'>
                      <div className='noteText'>
                    {note.text}{' '}
                    </div>
                    </Stack>
                      <Stack direction="horizontal"  className='d-grid gap-2 d-md-flex justify-content-md-end' gap={2}>
                      <Button
                      variant="light" 
                      className="bg-info text-dark rounded-4 bg-opacity-25" 
                      size='sm' 
                      onClick={() => enterEditMode(note.id, note.text)}>
                        Edit
                        </Button>
                      <Button
                      variant="danger"
                      className="bg-danger text-white rounded-4 bg-opacity-50"
                      size='sm'
                      onClick={() => handleDeleteNote(selectedSurfLocation.id, note.id)}
                    >
                      Delete
                    </Button>
                        </Stack>
                    
                  </>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div>
            <h4>Add New Note:</h4>
            <Stack direction="vertical" gap={3}>
            <ListGroup className='addNewNote'>
              <ListGroup.Item as="li" variant="info" className="p-3 mb-2 bg-success bg-gradient text-dark rounded-5 bg-opacity-25">
            <>
              <FloatingLabel controlId="floatingTextarea2" label="New Note">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  className="rounded-5"
                  style={{ height: '100px', width:'40vw' }}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                />
              </FloatingLabel>
            </>
            
            {/* <input
              type="text"
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              style={{width:'40vw'}}
            /> */}
              
              <Button
              id="add-note"
              size='xxl' 
              onClick={handleAddNote}
              style={{width:'40vw'}}
              variant="info"
              className="p-3 mb-2 bg-gradient text-white rounded-4 bg-opacity-50"
              >
              Add Note
              </Button>
              </ListGroup.Item>
            </ListGroup>
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
