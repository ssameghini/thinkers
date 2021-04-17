import { Component } from "react";
import Post from '../posts/Post';
import SendBox from '../posts/Send';
import imgsrc from '../../resources/images/seba-perfil-2.png';

class User extends Component {
    constructor(props){
        super(props);

        this.postsList = this.postsList.bind(this);
        this.onChangeHandle =this.onChangeHandle.bind(this);
        this.onSubmitHandle = this.onSubmitHandle.bind(this);

        this.state = {
            username: 'Seba',
            posts: [{
                author: 'Sebas',
                message: 'Hey, there!',
                date: new Date().toString()
            },{
                author: 'Sebas',
                message: 'Another post',
                date: new Date('2017-12-02').toString()
            },{
                author: 'Sebas',
                message: 'Older post',
                date: new Date('2015-12-02').toString()
            }],
            send: ''
        };
    }

    postsList() {
        return this.state.posts.map((post, index) => {
            return <Post author={post.author} message={post.message} date={post.date} key={index}/>
        });
    }

    onChangeHandle(e){
        this.setState({send: e.target.value});
    }

    onSubmitHandle(e){
        e.preventDefault();
        let author = this.state.username;
        let date = new Date().toString();
        let message = this.state.send;

        this.setState({posts: [{
            author,
            message,
            date
        }, ...this.state.posts]});

        this.setState({send: ''});
    }

    render() {
        return(
            <div className='mainpage-grid'>
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
                    <SendBox 
                        onChange={this.onChangeHandle} 
                        onSubmit={this.onSubmitHandle} 
                        value={this.state.send}/>
                    { this.postsList() }
                    </section>
            </div>
        );
    }
}

export default User;