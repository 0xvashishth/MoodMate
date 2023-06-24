import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Lobby = ({ joinRoom }) => {
    const [user, setUser] = useState();
    const [room, setRoom] = useState();

    return <Form className='lobby'
        onSubmit={e => {
            e.preventDefault();
            var parts = room.split(" ");

            var first = parts[0];
            var second = parts[1];
            joinRoom(user, first, second);
        }} >
        <Form.Group>
            <Form.Control placeholder="name" onChange={e => setUser(e.target.value)} />
            <Form.Control placeholder="room" onChange={e => setRoom(e.target.value)} />
        </Form.Group>
        <Button variant="success" type="submit" disabled={!user || !room}>Join</Button>
    </Form>
}

export default Lobby;