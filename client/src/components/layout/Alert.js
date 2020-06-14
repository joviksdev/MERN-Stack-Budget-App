import React, { useContext, Fragment } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
  const alertContext = useContext(AlertContext);

  const { alerts } = alertContext;
  const alertMessage = alerts.map(alert => (
    <div key={alert.type} className={`alert-container alert-${alert.color}`}>
      <p className={`container`}>{alert.msg}</p>
    </div>
  ));

  return alerts.length !== 0 && <Fragment>{alertMessage}</Fragment>;
};

export default Alert;
