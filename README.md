

# SurfScribe Web Application

This application was created as my solo capstone project during my time at Ada Developers Academy bootcamp. I created this app to learn new technologies, to revisit React.js topics, like state management, that I found challenging, and to have a little fun blending my love for surfing with a technical project.

Link to source code for entire front end of SurfScribe Web Application: [Link](https://github.com/limaryg11/surf-scribe-frontend/tree/main/src)


## Purpose

**Intended Use Case:**
Allow users to input details about places they have surfed worldwide, including the name of the location, notes, and descriptions. The main feature is a map interface with markers and popups linked to saved surf locations. 

## Overview

### `surfLocations` Prop:
- The `surfLocations` prop represents data fetched from the backend database and passed to the SurfMap component. It is an array of objects, where each object contains details about a specific surf location.


## Main Features:
- Integration with Mapbox API for map rendering and user interaction.
- Utilizes React Bootstrap and SurfMap.css for styling.
- Incorporates React hooks like `useEffect`, `useRef`, and `useState` for managing component state and lifecycle.
- Handles events (like when a user clicks on a location) and uses PropTypes for prop validation.

## Highlighted Features

- **User Input Interaction:**
  - User can input new surf location with details such as name and description via forms that undergo validation.
  - User input triggers a backend API call, fetching longitude and latitude coordinates from an external API and adding those as fields of each surf location in the database.
  - After input, user can navigate to location specific pages to edit details/notes.
  - The updated `surfLocations` then populates the map interface with markers based on coordinates for each location.

- **Map Interaction:**
  - Users can navigate the map, clicking on markers to view popups with brief descriptions.
  - Links within popups allow users to navigate a page to update or delete notes/descriptions for specific surf locations.

- **Interactive List:**
  - A scrollable list displays the clickable surf location names.
  - Clicking on a location name in list "flies" or zooms into the corresponding location on the map.


## Home Page of SurfScribe Web App:

<img width="1170" alt="Screenshot 2024-02-15 at 3 12 10 PM" src="https://github.com/limaryg11/limary_airbnb_code_sample/assets/105609727/d2d97cd5-cfd4-44a7-94d2-464ec191e029">
