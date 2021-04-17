export default function SendBox (props) {
    let { onChange, onSubmit, value } = props;

    return (
        <aside id='send'>
            <form>
                <textarea id='send-text' placeholder='I think...' rows='5' onChange={onChange} value={value} required></textarea>
                <button type='submit' onClick={onSubmit}>Send!</button>
            </form>
        </aside>
    )
}