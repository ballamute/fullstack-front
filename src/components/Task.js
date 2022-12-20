import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {ajaxService} from '../services/ajaxService';
import {TaskItem} from './TaskItem';
import {Loader} from './Loader';

export function Task() {
    const params = useParams();
    const [task, setTask] = useState(null);

    useEffect(() => {
        ajaxService(`autoservice/api/v1/orderupdate/${params.id}`).then((data) => {
            setTask(data);
        });
    }, [params.id]);

    return (
        <aside className='main-aside'>
            {task ? (
                <table className="table">
                    <tbody>
                    <tr>
                        <th>Номер заказа</th>
                        <th>Клиент</th>
                        <th>Услуга</th>
                        <th>Сотрудник</th>
                        <th>Назначено</th>
                        <th>Принято</th>
                        <th>Дата принятия</th>
                        <th>Дата создания</th>
                        <th>Описание</th>
                        <th>Статус</th>
                        <th>Дата обновления</th>
                        <th>Готово</th>
                    </tr>
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
                    </tbody>
                </table>
            ) : (
                <Loader/>
            )}
        </aside>
    );
}