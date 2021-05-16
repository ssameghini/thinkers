import React, { Component } from "react";
import axios from 'axios';
import Post from '../posts/Post';
import SendBox from '../posts/Send';
import imgsrc from '../../resources/images/seba-perfil-2.png';

class User extends Component {
    constructor(props){
        super(props);

        this.postsList = this.postsList.bind(this);
        this.updatePostsList = this.updatePostsList.bind(this);

        this.state = {
            username: '',
            posts: [{
                author: 'Thinkers',
                message: 'Come on! Say something!',
                date: new Date().toString()
            }, {
                author: 'Thinkers',
                message: 'You haven\'t posted anything yet!',
                date: (new Date() - 30000).toString()
            }, {
                author: 'Thinkers',
                message: '*Struggling*',
                date: (new Date() - 60000).toString()
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
        axios.get('http://localhost:5000/user-posts', { withCredentials: true })
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
            <div className='mainpage mainpage-grid'>
                <figure className='profile-banner'>
                    <img src={imgsrc} alt='profile' />
                    <figcaption>{this.state.username}</figcaption>
                </figure>
                <nav className='side-navbar'>
                    <ul>
                        <li><button>Posts</button></li>
                        <li><button>Followers</button></li>
                        <li><button>Information</button></li>
                    </ul>
                </nav>
                <section className='user-posts'>
                    <SendBox location={this.props.location.pathname} onSubmit={this.updatePostsList}/>
                    { this.postsList() }
                    </section>
            </div>
        );
    }
}

export default User;