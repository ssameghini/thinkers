export default function Post(props) {
    let { author, message, date, key } = props;
    
    return(
        <article key={key} className='post'>
            <address className='post-author'>{author}</address>
            <p className='post-message'>{message}</p>
            <time className='post-date'>{date}</time>
        </article>
    )
}