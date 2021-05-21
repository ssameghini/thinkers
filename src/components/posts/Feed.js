import React, { Component } from "react";
import axios from 'axios';
import Post from './Post';
import SendBox from './Send';

export default class Feed extends Component {
    constructor(props){
        super(props);

        this.postsList = this.postsList.bind(this);
        this.updatePostsList = this.updatePostsList.bind(this);

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
            }]
        };
    }

    updatePostsList(post){
        this.setState({posts: [post, ...this.state.posts]});
    }
    
    postsList() {
        return this.state.posts.map((post, index) => {
            return <Post author={post.author} message={post.message} date={post.date} key={index}/>
        });
    }

    componentDidMount() {
        axios.get('http://localhost:5000/feed-posts', { withCredentials: true })
            .then(res => {
                console.log(res.data);
                const postsQueried = res.data;
                if (postsQueried.length < 1) {
                    return;
                } else {
                    let newPostsArray = [];
                    let date= '';

                    postsQueried.forEach(post => {
                        if (post.date) {
                            let yearMonthDay  = post.date.slice(0, 10);
                            let hour = post.date.slice(11, 20);
                            date = `${yearMonthDay} at ${hour}`;
                        } else {
                            let newDate = new Date().toString();
                            let yearMonthDay  = newDate.slice(0, 10);
                            let hour = newDate.slice(11, 20);
                            date = `${yearMonthDay} at ${hour}`;
                        }
                        newPostsArray.push({
                            author: post.username,
                            message: post.message,
                            date: date
                        });
                    });
                    this.setState({posts: newPostsArray});
                }
            })
            .catch(e => console.log(e));
    }

    render() {
        return(
            <div className='mainpage mainpage-flex'>
                <section id='feed'>
                    { this.postsList() }
                </section>
                <SendBox location={this.props.location.pathname} onSubmit={this.updatePostsList}/>
            </div>
        )
    }
}
