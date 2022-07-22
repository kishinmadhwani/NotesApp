import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container } from 'react-bootstrap';

export default function EditNote({ match }) {
    const { id } = useParams();
    const [note, setNote] = useState({
        title: '',
        content: '',
        date: '',
        id: ''
    })
    const navigate = useNavigate();

    useEffect(() => {
        const getNote = async () => {
            const token = localStorage.getItem('tokenStore')
            // console.log(id);
            if (id) {
                const res = await axios.get(`/api/notes/${id}`, {
                    headers: { Authorization: token }
                })
                setNote({
                    title: res.data.title,
                    content: res.data.content,
                    date: new Date(),
                    id: res.data._id
                })
            }
        }
        getNote()
    }, [id])

    const onChangeInput = e => {
        const { name, value } = e.target;
        setNote({ ...note, [name]: value })
    }

    const editNote = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if (token) {
                const { title, content, date, id } = note;
                const newNote = {
                    title, content, date
                }

                await axios.put(`/api/notes/${id}`, newNote, {
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
        <Form onSubmit={editNote} autoComplete='off'>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={note.title} id="title" name="title" onChange={onChangeInput} placeholder="Some title here..." required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control  as="textarea" type="text" value={note.content} id="content" name="content" onChange={onChangeInput} required rows="5" placeholder="Some random note..." />
            </Form.Group>
            <Button variant="btn bg_purple btn-lg mt-1" type="submit">Update Note</Button>
        </Form>
        </Container>
    );
}