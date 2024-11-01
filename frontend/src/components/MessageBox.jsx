import Alert from 'react-bootstrap/Alert';

export const MessageBox = (props) => {
  const { variant = 'info', children } = props;
  
  return <Alert variant={variant}>{children}</Alert>;
}
