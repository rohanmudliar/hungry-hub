import React from 'react';
import ReactDOM  from "react-dom/client";


const element = React.createElement("h1", {}, "The is coming from createElement");
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(element);