import { Fragment, useContext, useState } from 'react';
import AuthContext from '../../store/context';
import classes from './AuthModal.module.css';

const dbUrl = `https://adjaranet-68699-default-rtdb.europe-west1.firebasedatabase.app/users.json`;

const AuthModal = () => {
  const context = useContext(AuthContext);
  const [signUpMode, setSignUpMode] = useState(false);
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [wrongRegUsername, setWrongRegUsername] = useState(false);
  const [wrongRegEmail, setWrongRegEmail] = useState(false);
  const [wrongRegPass, setWrongRegPass] = useState(false);
  const [isLoading, setIsLoading] = useState();

  const submitHandler = () => {
    // Check username
    if (signUpMode && enteredUsername === '') {
      setWrongRegUsername(true);
      return;
    } else {
      setWrongRegUsername(false);
    }

    // Check email
    if (!enteredEmail?.includes('@') || enteredEmail === '') {
      setWrongRegEmail(true);
      return;
    } else {
      setWrongRegEmail(false);
    }

    // Check password
    if (enteredPassword?.search(/[0-9]/) < 0 || enteredPassword.length < 6) {
      setWrongRegPass(true);
      return;
    } else {
      setWrongRegPass(false);
    }

    setIsLoading(true);
    let url;
    if (signUpMode) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbc_IVzg0M3ZI0HQv4wXkXa26hnGxCvEc';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbc_IVzg0M3ZI0HQv4wXkXa26hnGxCvEc';
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(data => {
            let errorMessage = 'Authentication failed!';
            if (data?.error?.message) errorMessage = data.error.message;

            throw new Error(errorMessage);
          });
        }
      })
      .then(data => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        context.toggleAuthVis();

        if (!signUpMode) {
          context.login(data.idToken, expirationTime);

          fetch(dbUrl)
            .then(res => res.json())
            .then(usersData => {
              for (const key in usersData) {
                if (usersData[key].id === data.localId) {
                  context.usernameSetter(usersData[key].username);
                  context.userKeySetter(key);
                }
              }
            });
        }

        if (signUpMode) {
          fetch(dbUrl, {
            method: 'POST',
            body: JSON.stringify({
              id: data.localId,
              username: enteredUsername,
              favouriteFilms: [],
            }),
            headers: { 'Content-Type': 'application/json' },
          });
        }
      })
      .catch(err => alert(err.message));
  };

  return (
    <Fragment>
      <div className={classes.authContainer}>
        <div className={classes.topContainer}>
          <svg
            width="16"
            height="16"
            fill="none"
            className="fade-ready svg-icon svg-icon--close-thin"
            onClick={context.toggleAuthVis}
          >
            <path
              fill="#444"
              d="M.762 16.916L0 16.156 15.238.948l.762.76L.762 16.917z"
            ></path>
            <path
              fill="#444"
              d="M15.238 16.916L0 1.71l.762-.76L16 16.155l-.762.76z "
            ></path>
          </svg>
          <h1>{signUpMode ? 'Register' : 'Log in'}</h1>
          <label />
          {signUpMode && (
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username..."
              className={classes.username}
              onChange={e => setEnteredUsername(e.target.value)}
              style={{
                borderColor: `${wrongRegUsername ? '#ed001d' : ''}`,
              }}
              autoComplete="off"
            />
          )}
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email..."
            onChange={e => setEnteredEmail(e.target.value)}
            style={{
              borderColor: `${wrongRegEmail ? '#ed001d' : ''}`,
            }}
            autoComplete="off"
          />
          <label htmlFor="email" />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password..."
            onChange={e => setEnteredPassword(e.target.value)}
            style={{
              borderColor: `${wrongRegPass ? '#ed001d' : ''}`,
            }}
            autoComplete="off"
          />
          <label htmlFor="password" />
          {signUpMode && !isLoading && (
            <button onClick={submitHandler}>რეგისტრაცია</button>
          )}
          {!signUpMode && !isLoading && (
            <button onClick={submitHandler}>შესვლა</button>
          )}
          {isLoading && <p>მოთხოვნა გაგზავნილია</p>}
        </div>

        <div className={classes.warning}>
          {wrongRegEmail && <p>გამოიყენეთ სწორი მეილი.</p>}
          {wrongRegPass && <p>პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს.</p>}
          {wrongRegPass && <p>პაროლი უნდა შეიცავდეს მინიმუმ ერთ ციფრს.</p>}
        </div>

        <div
          className={classes.bottomContainer}
          onClick={() => setSignUpMode(!signUpMode)}
        >
          <p>{signUpMode ? 'შესვლა' : 'რეგისტრაცია'}</p>
        </div>
      </div>

      <div className={classes.shadow} onClick={context.toggleAuthVis} />
    </Fragment>
  );
};

export default AuthModal;
