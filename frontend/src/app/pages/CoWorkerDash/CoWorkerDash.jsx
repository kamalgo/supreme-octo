// import React from 'react'
// import Base from '../../components/Base'

// const CoWorkerDash = () => {
//   return (
//     <Base>
//             <div>Hi Vaishnavi</div>
//             <div>Currently you are on CoWorker Dashboard</div>

//     </Base>
//   )
// }

// export default CoWorkerDash

import React, { useEffect, useState } from 'react';
import Base from '../../components/Base';

const CoWorkerDash = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem('forstu'));

    // Check if the data exists and extract the username
    if (userData && userData.user && userData.user.username) {
      setUsername(userData.user.username); // Set the username to state
    }
  }, []);

  return (
    <Base>
      <div>Hi {username}</div>
      <div>Currently, you are on CoWorker Dashboard</div>
    </Base>
  );
};

export default CoWorkerDash;
