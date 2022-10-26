import { useGetUsersQuery } from './usersApiSlice';

import User from './user.comp';

export default function UsersList() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery();

  console.log(useGetUsersQuery());

  let content = null;

  if (isSuccess) {
    const { ids } = users;
    // console.log(users);

    const tableContent = ids?.length
      ? ids.map(userId => <User key={userId} userId={userId} />)
      : null;

    content = (
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              Username
            </th>
            <th scope="col" className="table__th user__roles">
              Roles
            </th>
            <th scope="col" className="table__th user__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return (
    <>
      <h1>UsersList</h1>
      {isLoading && <p>Loading..</p>}
      {isError && (
        <p className={isError ? 'errmsg' : 'offscreen'}>
          {error?.data?.message}
        </p>
      )}
      {isSuccess && content}
    </>
  );
}
