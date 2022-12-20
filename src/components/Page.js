export function Page(props) {
    const {id, username, email} = props;

    return (
        <tr>
            <td>{id}</td>
            <td>{username}</td>
            <td>{email}</td>
        </tr>
    );


}