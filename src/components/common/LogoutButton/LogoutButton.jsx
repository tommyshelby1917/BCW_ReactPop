import './LogoutButton.css';
import AuthContext from '../../auth/context';
import { useContext, useState } from 'react';

import Button from '../Button/Button';
import ConfirmAction from '../ConfirmAction/ConfirmAction';

function LogoutButton() {
  const { handleLogout } = useContext(AuthContext);

  const [displayConfirmation, setDisplayConfirmation] = useState(null);
  const [message, setMessage] = useState(null);

  const showDisplayConfirmation = () => {
    setMessage('Are you sure do you want to logout?');
    setDisplayConfirmation(true);
  };

  const hideConfirmationModal = () => {
    setDisplayConfirmation(false);
  };

  return (
    <div className="logout-button-container">
      <Button className="logout-button" onClick={showDisplayConfirmation}>
        Logout
      </Button>
      {displayConfirmation && (
        <ConfirmAction
          message={message}
          action={handleLogout}
          hide={hideConfirmationModal}
        />
      )}
    </div>
  );
}

export default LogoutButton;
