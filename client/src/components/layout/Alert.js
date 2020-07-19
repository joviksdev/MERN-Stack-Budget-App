import React, { useContext, Fragment } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
  const alertContext = useContext(AlertContext);

  const { alerts } = alertContext;

  return (
    alerts !== null && (
      <Fragment>
        {alerts.map((alert, i) => (
          <div key={i} className={`alert-container alert-${alert.type}`}>
            <p className={`container`}>{alert.msg}</p>
          </div>
        ))}
      </Fragment>
    )
  );
};

export default Alert;
