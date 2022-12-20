import {cookies} from './Login'
import {ajaxService} from "../services/ajaxService";
import {useEffect, useState} from "react";
import {Page} from "./Page";
import {Loader} from "./Loader";
import {TaskItem} from "./TaskItem";

export function MyPage() {

    const [user_id, setUserId] = useState(null);

    function Logout(event) {
        event.preventDefault();
        console.log(cookies.get('user_token'))

        fetch('http://127.0.0.1:8000/auth/token/logout', {
            method: 'POST',
            headers: {'Authorization': 'Token ' + cookies.get('user_token')},
        })
            .then((response) => {
                console.log('Token ' + cookies.get('user_token'))
                if (!response.ok || !cookies.get('user_token')) {
                    throw new Error('Failed to logout');
                }
                cookies.set('user_token', '');
                window.location.href = '/login';
            });
    }

    function PageInfo(props) {


        const [user, setUser] = useState(null);
        const {setUserId} = props;

        useEffect(() => {
            ajaxService(`/api/v1/auth/users/me`).then((data) => {
                setUser(data);
            });
        }, []);

        useEffect(() => {
            if (user && !user_id) {
                setUserId(user.id)
            }
        }, [setUserId, user]);

        return (
            user ? (
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
            )
        );
    }

    function MyTasks(props) {
        const {user_id} = props;
        const [tasks, setTasks] = useState(null);
        useEffect(() => {
            ajaxService('autoservice/api/v1/orderslist?user=' + user_id).then((data) => {
                const tasks = [];

                data.forEach((task) => {
                    const taskElement = (
                        <TaskItem
                            key={task.id}
                            id={task.id}
                            order_no={task.order_no}
                            client_name={task.client_name}
                            service_name={task.service_name}
                            user_name={task.user_name}
                            user={task.user}
                            assigned_flg={task.assigned_flg}
                            accepted_flg={task.accepted_flg}
                            accepted_dttm={task.accepted_dttm}
                            creation_dttm={task.creation_dttm}
                            description={task.description}
                            status={task.status}
                            update_dttm={task.update_dttm}
                            done_flg={task.done_flg}
                        />
                    );

                    tasks.push(taskElement);
                });

                setTasks(tasks);
            });
        }, [user_id]);

        if (tasks === null) {
            return
        }

        return (
            tasks ?
                (<table className="table">
                    <tbody>
                    <tr>
                        <th>Номер заказа</th>
                        <th>Клиент</th>
                        <th>Услуга</th>
                        <th>Сотрудник</th>
                        <th>Назначено</th>
                        <th>Принято</th>
                        <th>Время принятия</th>
                        <th>Время создания</th>
                        <th>Описание</th>
                        <th>Статус</th>
                        <th>Время обновления</th>
                        <th>Готово</th>
                    </tr>
                    {
                        tasks
                    }
                    </tbody>
                </table>) : (<Loader/>)
        )
    }


    return <aside className='main-aside'>
        <h1> Моя страница </h1>
        <PageInfo
            setUserId={setUserId}
        />
        <h2> Мои задачи </h2>
        {user_id ?
            <MyTasks
                user_id={user_id}
            /> : <Loader/>}
        <button onClick={Logout}>
            Выйти из аккаунта
        </button>

    </aside>
}