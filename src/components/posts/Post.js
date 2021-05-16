export default function Post(props) {
    let { author, message, date } = props;
    
    return(
        <article className='post'>
            <address className='post-author'>{author}</address>
            <p className='post-message'>{message}</p>
            <time className='post-date'>{date}</time>
        </article>
    )
}