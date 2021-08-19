/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */

import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Links from './components/Links';

function App() {
  return (
    // Fragmet
    <>
      <Links />
      <ToastContainer />
    </>
  );
}

export default App;
