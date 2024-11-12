import { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { LoadingBox } from '../components/LoadingBox';
import { useSigninMutation } from '../hooks/userHooks';
import { useSigninEmpMutation } from '../hooks/employeeHooks';
import { Store } from '../Store';
import { getError } from '../../utils';

export default function SigninPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const { mutateAsync: signin, isPending } = useSigninMutation();
  const { mutateAsync: signinEmp } = useSigninEmpMutation();


  // Sign in as User
  const submitHandlerUser = async (e) => {
    e.preventDefault();
    try {
      const data = await signin({ email, password });
      dispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect); // Redirect to HomePage.jsx
    } catch (err) {
      // toast.error(getError(err));
    }
  };

  // Sign in as Employee
  const submitHandlerEmployee = async (e) => {
    e.preventDefault();
    try {
      const data = await signinEmp({ email, password, serviceType });
      dispatch({ type: 'EMPLOYEE_SIGNIN', payload: data });
      localStorage.setItem('empInfo', JSON.stringify(data));
      navigate('/homepage-emp'); // Redirect to HomePageEmp.jsx
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button
            disabled={isPending}
            type="button"
            onClick={submitHandlerUser} // Call user sign-in handler
          >
            Sign In As User
          </Button>
          {isPending && <LoadingBox />}
        </div>
        <div className="mb-3">
          <Button
            disabled={isPending}
            type="button"
            onClick={submitHandlerEmployee} // Call employee sign-in handler
          >
            Sign In As Employee
          </Button>
          {isPending && <LoadingBox />}
        </div>
        <div className="mb-3">
          Signup as User?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
        <div className="mb-3">
          Signup as Employee?{' '}
          <Link to={`/signup-employee?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
}
