import { Link } from 'react-router-dom'
import { cookies } from './Login'

export function Header () {
    const isLoggedIn = cookies.get('user_token');
    return (
        <header className='main-header'>
            <Link to=''><button className='roundable'> Главная </button></Link>
            <Link to='/about'><button className='roundable'> О сайте </button></Link>
            {/*<Link to='/task-create'><button className='roundable'> Создать задачу </button></Link>*/}
            {!isLoggedIn && <Link to='/login'><button className='roundable'> Войти </button></Link>}
            {isLoggedIn && <Link to='/mypage'><button className='roundable'> Моя страница </button></Link>}
        </header>
    )
}