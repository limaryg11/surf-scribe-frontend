import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API || '18.216.93.191:8080';

const Photo = ({surfLocations}) => {

    const [photos, setPhotos] = useState([])

    const {id} = useParams();
    const selectedSurfLocation = surfLocations.find((surfLocation) => surfLocation.id === id);

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        setPhotos(selectedFiles);
    };
    
    const handlePhotoUpload = () => {
        const formData = new FormData();
        
        
        for (let i= 0; i < photos.length; i++) {
            formData.append('photos', photos[i])
        }
    
        axios
        .post(`${API_URL}/surf-locations/${selectedSurfLocation.id}/upload-photos`, formData,  {
            headers: {
            'Content-Type': 'multipart/form-data'
            },
        })
        .then((response)=> {
            console.log('Photo uploaded successfully')
        })
        .catch((error) => {
            console.error('Error uploading photo: ', error)
        });
    };
    
    return (
        <Container>
            <h3>Upload Photo</h3>
            <div>
            <input type='file' multiple onChange={handleFileChange}></input>
            <Button onClick={handlePhotoUpload}>Upload Photo</Button>
            </div>
            <div>
                {selectedSurfLocation.photoPaths.map((photoPath) => (
                <img
                    key={photoPath}
                    src={`${API_URL}/${photoPath}`}
                    alt={`file name: ${photoPath}`}
                    style={{width:'200px', height:'200px', objectFit:'cover'}}
                />
                )

                )}
            </div>
        </Container>
    )
}

export default Photo;