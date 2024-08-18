import './todo.css'

const Todo = ({ todo, passValue }) => {
    const { text, type, days = [] } = todo

    const todayTimestamp = Date.now()
    const today = new Date(todayTimestamp)
    // const formattedDate = today.toLocaleDateString('en-GB');
    const day = today.toLocaleDateString('en-GB', { weekday: 'long' });


    let className = 'todo';
    if (type === 'daily') {
        className += ' daily';
    }
    if (days.includes(day)) {
        className += ' today';
    }
    if (days.length > 0 && !days.includes(day)) {
        return null
    }



    return (
        <div className={className} onClick={() => passValue(todo)}>
            <div>{text}</div>
        </div>
    )
}

export default Todo