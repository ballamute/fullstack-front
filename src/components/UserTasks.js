import {useEffect, useState} from "react";
import {ajaxService} from "../services/ajaxService";
import {useParams} from "react-router-dom";
import {TaskItem} from "./TaskItem";

export function UserTasks() {
    const [tasks, setTasks] = useState(null);
    const params = useParams();
    useEffect(() => {
        ajaxService('autoservice/api/v1/orderslist?user=' + params.id).then((data) => {
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
    }, [params.id]);

    if (tasks === null) {
        return
    }

    return (
        <table className="table">
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
        </table>
    )
}