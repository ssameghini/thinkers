import React, { useState } from 'react';
import axios from 'axios';

export default function SendBox (props) {
    const [message, setMessage ] = useState('');

    const handleChange = (e) => {
        let input = e.target.value;
        setMessage(input);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let postToSend = {
            message,
            date: new Date()
        }

        axios.post('http://localhost:5000/posts', postToSend, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                let post = {
                    author: res.data.user,
                    message: res.data.message,
                    date: res.data.date.toString()
                };
                props.onSubmit(post);
                setMessage('');
            })
            .catch(e => console.log(e));
    };

    return (
        <aside id='send'>
            <form>
                <textarea id='send-text' placeholder='I think...' rows='5' onChange={handleChange} value={message} required></textarea>
                <button type='submit' onClick={handleSubmit}>Send!</button>
            </form>
        </aside>
    )
}