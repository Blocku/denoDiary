import { useState } from 'preact/hooks'

export default function Menu() {
 
    const [openMenu, setOpenMenu] = useState<boolean>(true)
    const [openMenuSubject, setOpenMenuSubject] = useState<boolean>(false)
    const [newTodo, setNewTodo] = useState<Object>({subject:'', paragraph: '', page: '', number: ''})
    const [todos, setTodos] = useState<Array>([])

    const subjects: Array<string> = ['Русский язык', 'Физика', 'Английский язык', 'История', 'Химия', 'Биология', 'Математика', 'География']

    return(
        <>
            <main className='p-3 space-y-16' >
                <button onClick={() => setOpenMenu(true)} className='flex items-center rounded-md bg-indigo-500 w-full p-3' >
                    <span className='flex-grow text-lg text-white font-medium' >Добавить новое задание</span>
                    <svg className="h-6 w-6 stroke-2 stroke-white">
                        <path d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>

                <ul>
                    <li className='ring-2 ring-zinc-300 rounded-md p-1' >
                        Hi
                    </li>
                </ul>
            </main>


            {openMenu && <section className='absolute top-0 left-0' >
                <div onClick={() => setOpenMenu(false)} className='absolute w-dvw h-dvh bg-black/30 z-10' ></div>
                <form className='absolute rounded-md z-20 w-[94dvw] left-[3dvw] top-[30dvh] bg-white shadow-sm p-3 space-y-5' >
                    <label>
                        <input value={ newTodo.subject ? newTodo.subject : 'Выбери предмет'} onClick={() => setOpenMenuSubject(!openMenuSubject)} type='button' className='w-full text-left font-medium ring-zinc-200 ring-2 rounded p-1' />
                        <svg className="absolute top-4 right-4 h-6 w-6 stroke-2 stroke-zinc-700 fill-none">
                            <path d={openMenuSubject ? 'm4.5 15.75 7.5-7.5 7.5 7.5 ' : ' m19.5 8.25-7.5 7.5-7.5-7.5'} />
                        </svg>

                        {openMenuSubject && 
                            <ul className='absolute bg-white w-[88dvw] ring-2 ring-zinc-200 rounded mt-1.5 p-1 left-0 right-0 mx-auto' >
                                {subjects.map((subject : string) => 
                                <li key={subject} onClick={() => (setOpenMenuSubject(false), setNewTodo({...newTodo, subject: subject}))} className='font-medium' >
                                    {subject}
                                </li>
                                )}
                            </ul>
                        }
                    </label>

                    <label className='flex flex-col space-y-1'>
                        <span className='font-medium' >Параграф</span>
                        <input className='ring-2 ring-zinc-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none p-1 rounded' placeholder='обязательное поле' type="text" />
                    </label>
                    <label className='flex flex-col space-y-1'>
                        <span className='font-medium' >Страница</span>
                        <input className='ring-2 ring-zinc-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none p-1 rounded' placeholder='необязательное поле' type="text" />
                    </label>
                    <label className='flex flex-col space-y-1'>
                        <span className='font-medium' >Номер</span>
                        <input className='ring-2 ring-zinc-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none p-1 rounded' placeholder='необязательное поле' type="text" />
                    </label>
                    <button type='submit' className='bg-indigo-500 w-full rounded text-white text-lg font-medium p-1' >Отправить</button>
                </form>
            </section>}
        </>
    )
}