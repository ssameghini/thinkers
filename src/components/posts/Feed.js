import React, { Component } from "react";
import Post from './Post';
import SendBox from './Send';

export default class Feed extends Component {
    constructor(props){
        super(props);

        this.postsList = this.postsList.bind(this);
        this.onChangeHandle = this.onChangeHandle.bind(this);
        this.onSubmitHandle = this.onSubmitHandle.bind(this);

        this.state = {
            posts : [{
                author: 'Sebas',
                message: 'Hey, there!',
                date: new Date().toString()
            },
            {
                author: 'Belu',
                message: 'Hola!',
                date: new Date().toString()
            },
            {
                author: 'Zorro',
                message: 'Auuuu',
                date: new Date().toString()
            }],
            send: ''
        };
    }
    
    postsList() {
        return this.state.posts.map((post, index) => {
            return <Post author={post.author} message={post.message} date={post.date} key={index}/>
        });
    }


    onChangeHandle(e) {
        this.setState({send: e.target.value});
    }

    onSubmitHandle(e) {
        e.preventDefault();
        let author = 'Unidentified user';
        let date = new Date().toString();
        let message = this.state.send;

        this.setState({posts: [...this.state.posts, {
            author,
            message,
            date
        }]});

        this.setState({send: ''});
    }

    render() {
        return(
            <div className='mainpage mainpage-flex'>
                <section id='feed'>
                    { this.postsList() }
                </section>
                <SendBox onChange={this.onChangeHandle} onSubmit={this.onSubmitHandle} value={this.state.send}/>
            </div>
        )
    }
}
