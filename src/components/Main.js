import { useEffect, useState } from 'react';
import { ajaxService } from '../services/ajaxService';
import { MainTaskItem } from "./MainTaskItem";

export function Main() {
    const [tasks, setTasks] = useState(null);

    useEffect(() => {
        ajaxService('autoservice/api/v1/orderslist').then((data) => {
            const tasks = [];

            data.forEach((task) => {
                const taskElement = (
                    <MainTaskItem
                        key={task.id}
                        id={task.id}
                        order_no={task.order_no}
                        client_name={task.client_name}
                        service_name={task.service_name}
                        user_name={task.user_name}
                        user={task.user}
                        creation_dttm={task.creation_dttm}
                        status={task.status}
                    />
                );

                tasks.push(taskElement);
            });

            setTasks(tasks);
        });
    }, []);

    if (tasks === null) {
        return
    }

    return (
        <aside className="main-aside">
            <table className="table">
                <tbody>
                <tr>
                    <th>Номер заказа</th>
                    <th>Клиент</th>
                    <th>Услуга</th>
                    <th>Сотрудник</th>
                    <th>Дата создания</th>
                    <th>Статус</th>
                    <th></th>
                </tr>
                {
                    tasks
                }
                </tbody>
            </table>
        </aside>
    )
}
