import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {ajaxService} from '../services/ajaxService';
import {Page} from './Page';
import {Loader} from './Loader';
import {UserTasks} from "./UserTasks";

export function UserPage() {
    const params = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        ajaxService(`/api/v1/auth/users/${params.id}`).then((data) => {
            setUser(data);
        });
    }, [params.id]);


    return (
        <aside className='main-aside'>
            {user ? (
                <table className="table">
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Имя пользователя</th>
                        <th>Почта</th>
                    </tr>
                    <Page
                        key={user.id}
                        id={user.id}
                        username={user.username}
                        email={user.email}
                    />
                    </tbody>
                </table>
            ) : (
                <Loader/>
            )}
            <UserTasks/>
        </aside>
    );
}