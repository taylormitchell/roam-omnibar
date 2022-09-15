import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";

// document.addEventListener("keydown", (e) => {
//   console.log("outside!")
//   if (e.shiftKey && e.metaKey && e.key == "u") {
//     // let el = document.getElementById('omnibar-app'); 
//     console.log("here!")
//     let el = document.createElement("div");
//     el.id = 'omnibar-app';
//     document.querySelector('.roam-app').appendChild(el)
//     const root = ReactDOM.createRoot(el);
//     root.render(
//       <React.StrictMode>
//         <OmniBar />
//       </React.StrictMode>
//     );
//   }
// });



let el = document.getElementById('omnibar-root'); 
if (!el) {
  el = document.createElement("div");
  el.id = "omnibar-root";
  document.body.appendChild(el)
}
const root = ReactDOM.createRoot(el);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


