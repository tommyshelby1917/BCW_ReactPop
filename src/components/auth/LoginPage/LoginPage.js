import T from 'prop-types';
import { useState, useMemo } from 'react';
import FormField from '../../common/FormField/FormField';
import Button from '../../common/Button/Button';

import { login } from '../service';
import { AuthContextConsumer } from '../context';

import './LoginPage.css';

function LoginPage({ onLogin, history, location }) {
  const [value, setValue] = useState({
    email: '',
    password: '',
    remember: '',
  });
  const [error, setError] = useState(null);

  const deleteError = () => setError(null);

  const handleChange = (event) => {
    setValue((prevState) => ({
      ...prevState,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    deleteError();
    try {
      console.log(value);
      await login(value);
      onLogin();
      const { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Log in to ReactPop!</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="email"
          label="email"
          className="loginForm-field"
          value={value.email}
          onChange={handleChange}
          autofocus
        ></FormField>
        <FormField
          type="password"
          name="password"
          label="password"
          className="loginForm-field"
          value={value.password}
          onChange={handleChange}
        ></FormField>
        <FormField
          type="checkbox"
          name="remember"
          label="Remember me"
          className="loginForm-field"
          value={value.remember}
          onChange={handleChange}
        ></FormField>
        <Button className="loginForm-submit" type="submit">
          Log in!
        </Button>
      </form>
      {error && (
        <div onClick={deleteError} className="loginPage-error">
          {error.message}
        </div>
      )}
    </div>
  );
}

LoginPage.propTypes = {
  onLogin: T.func.isRequired,
};

const ConnectedLoginPage = (props) => (
  <AuthContextConsumer>
    {(auth) => <LoginPage onLogin={auth.handleLogin} {...props} />}
  </AuthContextConsumer>
);

export default ConnectedLoginPage;
