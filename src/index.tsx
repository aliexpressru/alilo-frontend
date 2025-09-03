import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
// import "react-widgets/styles.css"; // https://jquense.github.io/react-widgets/docs/ TODO: remove
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
// import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';

const rootContainer = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootContainer);

function render() {
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </React.StrictMode>
    );
}

function renderWithKeycloak() {
    render();
}

renderWithKeycloak();

// --- TEST
// localStorage.setItem("userName", unknownName);
// localStorage.setItem("userNameChars", getFirstCharsOfFullName(unknownName));
// render();
