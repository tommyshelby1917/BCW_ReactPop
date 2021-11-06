import Button from '../Button/Button';
import classNames from 'classnames';
import { Fragment, useEffect, useState } from 'react';

function ConfirmAction({ message, action, hide }) {
  return (
    <div className="confirm-action-container">
      <Fragment>
        <h2>{message}?</h2>
        <div className="confirm-buttons-container">
          <Button onClick={action}>Yes, Im sure!</Button>
          <Button onClick={hide}>No</Button>
        </div>
      </Fragment>
    </div>
  );
}

export default ConfirmAction;
