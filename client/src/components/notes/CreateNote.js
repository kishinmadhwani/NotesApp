import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from 'react-bootstrap';


const CreateNote = () => {
    const [note, setNote] = useState({
        title: '',
        content: '',
        date: ''
    })
    const navigate = useNavigate();

    const onChangeInput = e => {
        const { name, value } = e.target;
        setNote({ ...note, [name]: value })
    }

    const createNote = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if (token) {
                const { title, content } = note;
                const newNote = { title,
                    content,
                    date: new Date()  }

                await axios.post('/api/notes', newNote, {
                    headers: { Authorization: token }
                })

                return navigate('/')
            }
        } catch (err) {
            window.location.href = "/";
        }
    }

    return (
        <Container className='p-3 mt-5 bg-dark text-light rounded-3'> 
        <Form onSubmit={createNote} autoComplete='off'>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={note.title} id="title" name="title" onChange={onChangeInput} placeholder="Some title here..." required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control  as="textarea" type="text" value={note.content} id="content" name="content" onChange={onChangeInput} required rows="5" placeholder="Some random note..." />
            </Form.Group>
            <Button variant="btn bg_purple btn-lg mt-1" type="submit">Create Note</Button>
        </Form>
        </Container>

    );
}

export default CreateNote;