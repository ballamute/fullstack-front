import {Link} from "react-router-dom";

export function TaskItem(props) {
    const {
        id,
        order_no,
        client_name,
        service_name,
        user_name,
        user,
        assigned_flg,
        accepted_flg,
        accepted_dttm,
        creation_dttm,
        description,
        status,
        update_dttm,
        done_flg
    } = props;

    return (
        <tr>
            <td><Link to={'/task/' + id}>{order_no}</Link></td>
            <td>{client_name}</td>
            <td>{service_name}</td>
            <td><Link to={'/userpage/' + user}>{user_name}</Link></td>
            <td>{assigned_flg}</td>
            <td>{accepted_flg}</td>
            <td>{accepted_dttm}</td>
            <td>{creation_dttm}</td>
            <td>{description}</td>
            <td>{status}</td>
            <td>{update_dttm}</td>
            <td>{done_flg}</td>
        </tr>
    );
}
