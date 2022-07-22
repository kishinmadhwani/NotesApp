import React from 'react';
import Header from './notes/Header';
import Home from './notes/Home';
import EditNote from './notes/EditNote';
import CreateNote from './notes/CreateNote';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const Notes = ({setIsLogin}) => {
    return (
        <Router>
            <div className='notes-page'>
                <Header setIsLogin={setIsLogin}/>
                <section>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create" element={<CreateNote />}  />
                        <Route path="/edit/:id" element={<EditNote />}  />
                    </Routes>
                </section>

            </div>
        </Router>
    );
}

export default Notes;
