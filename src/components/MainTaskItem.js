import {Link} from "react-router-dom";
import {ajaxService} from "../services/ajaxService";
import {cookies} from "./Login";

export function MainTaskItem(props) {
    const {id, order_no, client_name, service_name, user_name, user, creation_dttm, status} = props;

    const TakeTask = e => {
        ajaxService(`/api/v1/auth/users/me`).then((data) => {
            if (data.id) {
                const obj = {"user": data.id}
                fetch('http://127.0.0.1:8000/autoservice/api/v1/orderupdate/' + id +'/', {
                    method: 'PATCH',
                    body: JSON.stringify(obj), // Тело
                    headers: {
                        "Authorization": "Token " + cookies.get('user_token'),
                        'Content-Type': 'application/json'
                    },
                })
            }
        })
        ;
    }

    return (
        <tr>
            <td><Link to={'/task/' + id}>{order_no}</Link></td>
            <td>{client_name}</td>
            <td>{service_name}</td>
            <td><Link to={'/userpage/' + user}>{user_name}</Link></td>
            <td>{creation_dttm}</td>
            <td>{status}</td>
            <td>{status === 'NOT_ASSIGNED' && <button onClick={TakeTask}> Взять задачу </button>}
            </td>
        </tr>
    );
}


