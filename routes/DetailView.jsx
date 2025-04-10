import React from "react";
import { Link } from "react-router-dom";
import ComicDetail from "../src/Components/ComicDetail";

const DetailView = () => {
    return (
        <div className="detail-view">
            <Link to="/" className="scroll-link">Back to Comics</Link>
            <ComicDetail />
        </div>
    );
  };
  
  export default DetailView;