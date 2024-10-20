import { useState, useEffect } from 'preact/hooks'

export default function Menu() {
 
    const [openMenu, setOpenMenu] = useState<boolean>(false)
    const [openMenuSubject, setOpenMenuSubject] = useState<boolean>(false)
    const [newTodo, setNewTodo] = useState<Object>({subject: '', paragraph: '', page: '', number: ''})
    const [todos, setTodos] = useState<Array>([])
    const [redact, setRedact] = useState<boolean>(false)

    const subjects: Array<string> = ['Русский язык', 'Физика', 'Английский язык', 'История', 'Химия', 'Биология', 'Алгебра', 'География', 'Информатика', 'Геометрия', 'Обществознание', 'Литература', 'ОБЗР']

    useEffect(() => {
        const storageTodos = localStorage.getItem('todos')
        if(storageTodos){
          setTodos(JSON.parse(storageTodos))
        }
      }, [])
 
    function createTodo(e: Event) {
        e.preventDefault()
        if(newTodo.subject && (newTodo.paragraph || newTodo.page || newTodo.number) !== ''){
            const todo = {
                subject: newTodo.subject,
                paragraph: newTodo.paragraph,
                page: newTodo.page ? ( ' / ' + newTodo.page) : null,
                number: newTodo.number ? (' / ' + newTodo.number) : null,
                id: Date.now(),
                date: (new Date().toDateString())
            }
            setTodos([...todos, todo])
            setOpenMenu(false)
            setOpenMenuSubject(false)
            setNewTodo({subject: '', paragraph: '', page: '', number: ''})
            localStorage.setItem('todos', JSON.stringify([...todos, todo]))
        }
    }

    function deleteTodo(id: Date){
        const newTodos = todos.filter((todo: Object) => {
          if(todo.id !== id){
            return todo
          }
        })
        setTodos(newTodos)
        localStorage.setItem('todos', JSON.stringify(newTodos))
      }

    function changeTodo(todo: Object) {
        setNewTodo(todo)
        setOpenMenu(true)
    }


    return(
        <>
            <main className='p-3 space-y-16 bg-white overflow-auto h-dvh max-w-screen-md md:max-h-[50rem] md:rounded-lg mx-auto md:mt-[20dvh]' >
                <button onClick={() => setOpenMenu(true)} className='flex items-center rounded-md bg-indigo-500 w-full p-3' >
                    <span className='flex-grow text-lg text-white font-medium' >Добавить новое задание</span>
                    <svg className="h-6 w-6 stroke-2 stroke-white">
                        <path d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>

                <ul className='space-y-3' >
                    {todos && todos.map((todo: Object) => 
                    <li key={todo.id} className='w-full ring-2 ring-zinc-300 rounded-md p-1 select-none' >
                        <span className='text-lg font-medium' >{todo.subject}</span>
                        <p className='text-sm text-zinc-500' >{todo.paragraph}{todo.page}{todo.number}</p>
                        <div className='flex justify-between items-center mt-1' >
                            <span className='text-sm text-zinc-500' >{todo.date}</span>

                            <span className='flex gap-x-1' >
                                <svg onClick={() => setRedact(true)} className="h-6 w-6 stroke-2 stroke-zinc-400 fill-none cursor-pointer">
                                    <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                                <svg onClick={() => deleteTodo(todo.id)} className="h-6 w-6 fill-none stroke-2 stroke-red-500 cursor-pointer">
                                    <path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </span>
                            
                        </div>
                    </li>
                    )}
                </ul>
            </main>


            {openMenu && 
                <section className='absolute top-0 w-full' >
                    <div onClick={() => setOpenMenu(false)} className='absolute w-dvw h-dvh bg-black/30 z-10' ></div>
                    <form onSubmit={createTodo} className='absolute rounded-md z-20 w-[94dvw] md:max-w-screen-md mx-auto right-0 left-0 top-[35dvh] bg-white shadow-sm p-3 space-y-5' >
                        <label>
                            <input value={ newTodo.subject ? newTodo.subject : 'Выбери предмет'} onClick={() => setOpenMenuSubject(!openMenuSubject)} type='button' className='w-full text-left font-medium ring-zinc-200 ring-2 rounded p-1' />
                            <svg className="absolute top-4 right-4 h-6 w-6 stroke-2 stroke-zinc-700 fill-none">
                                <path d={openMenuSubject ? 'm4.5 15.75 7.5-7.5 7.5 7.5 ' : ' m19.5 8.25-7.5 7.5-7.5-7.5'} />
                            </svg>

                            {openMenuSubject && 
                                <ul className='absolute bg-white ring-2 ring-zinc-200 rounded mt-1.5 p-1 left-3 right-3 mx-auto' >
                                    {subjects.map((subject : string) => 
                                    <li key={subject} onClick={() => (setNewTodo({...newTodo, subject: subject}))} className='font-medium w-full text-left hover:bg-zinc-100' >
                                        {subject}
                                    </li>
                                    )}
                                </ul>
                            }
                        </label>

                        <label className='flex flex-col space-y-1'>
                            <span className='font-medium' >Текст</span>
                            <input value={newTodo.paragraph} onChange={(e) => setNewTodo({...newTodo, paragraph: e.target.value})} className='ring-2 ring-zinc-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none p-1 rounded' placeholder='поле ввода' type="text" />
                        </label>
                        <label className='flex flex-col space-y-1'>
                            <span className='font-medium' >Страница</span>
                            <input value={newTodo.page} onChange={(e) => setNewTodo({...newTodo, page: e.target.value})} className='ring-2 ring-zinc-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none p-1 rounded' placeholder='поле ввода' type="text" />
                        </label>
                        <label className='flex flex-col space-y-1'>
                            <span className='font-medium' >Номер</span>
                            <input value={newTodo.number} onChange={(e) => setNewTodo({...newTodo, number: e.target.value})} className='ring-2 ring-zinc-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none p-1 rounded' placeholder='поле ввода' type="text" />
                        </label>
                        {redact ?
                        <button onClick={changeTodo} className='bg-indigo-500 w-full rounded text-white text-lg font-medium p-1' >Сохранить</button>
                        :
                        <button type='submit' className='bg-indigo-500 w-full rounded text-white text-lg font-medium p-1' >Отправить</button>}
                    </form>
                </section>
            }
        </>
    )
}