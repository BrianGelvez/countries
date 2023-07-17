import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Landingpage.modules.css';

const LandingPage = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleInputChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoggedIn(true);
    setTimeout(() => {
      setIsLoggedIn(false);
    }, 5 * 60 * 1000); // 5 minutes in milliseconds
  };

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        // Redirect to home page after 5 minutes
        // You can use react-router-dom to redirect the user
        // For example: history.push('/home');
      }, 5 * 60 * 1000); // 5 minutes in milliseconds
    }
  }, [isLoggedIn]);

  return (
    <div className='container'>
      {!isLoggedIn ? (
        <form className='content' onSubmit={handleSubmit}>
          <div className='div1'>
          <h2 className='nombre'>Welcome to the</h2>
          <h1 className='title'>countries app</h1>
          <h2>enter a name and password to enjoy the application for 5 minutes!</h2>
          </div>
          <div className='div2'>
          <input
          className='name'
            type='text'
            name='username'
            placeholder='name'
            value={credentials.username}
            onChange={handleInputChange}
          />
          <input
          className='password'
            type='password'
            name='password'
            placeholder='Password'
            value={credentials.password}
            onChange={handleInputChange}
          />
          <button type='submit' className='btn-third'>
            Log in
          </button>
          </div>
        </form>
      ) : (
        <div className='content'>
          <h2 className='nombre'>Thank you for logging !</h2>
          <h1 className='title'>Enjoy the Countries App</h1>
          <Link to='/home'>
            <button className='btn-third'>View Countries</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
