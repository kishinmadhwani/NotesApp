import React, { useEffect, useState } from 'react';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import axios from "axios";
import { Card, Row, Col, Container } from 'react-bootstrap';
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US')

const Home = () => {

    const [notes, setNotes] = useState([]);
    const [token, setToken] = useState('');

    const getNotes = async (token) => {
        const res = await axios.get('api/notes', {
            headers: { Authorization: token }
        })
        setNotes(res.data)
    }

    useEffect(() => {
        const token = localStorage.getItem('tokenStore')
        setToken(token)
        if (token) {
            getNotes(token)
        }
    }, [])

    const deleteNote = async (id) => {
        try {
            if (token) {
                await axios.delete(`api/notes/${id}`, {
                    headers: { Authorization: token }
                })
                getNotes(token)
            }
        } catch (err) {
            window.location.href = "/"
        }
    }

    return (
        <div>
            <Container className='mt-5'>
                <Row xs={1} md={4} className="g-4">
                    {
                        notes.map(note => (
                            <Col>
                                <Card className="bg-dark text-white" style={{ width: '16rem' }} key={note._id}>
                                    <Card.Body>
                                        <Card.Title>{note.title}</Card.Title>
                                        <Card.Text style={{opacity:.75}}> {note.content}</Card.Text>
                                        <Card.Text className='text-muted'>Last updated {timeAgo.format(new Date(note.date))}</Card.Text>
                                            <Card.Link href={`edit/${note._id}`}>
                                                <img
                                                    src="/images/Edit.png"
                                                    width="24"
                                                    height="24"
                                                    alt='edit'
                                                />
                                            </Card.Link>
                                            <Card.Link style={{float: "right"}} onClick={() => deleteNote(note._id)}>
                                                <img
                                                    src="/images/delete.png"
                                                    width="24"
                                                    height="24"
                                                    alt='delete'
                                                />
                                            </Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </div>
    );
}

export default Home;

