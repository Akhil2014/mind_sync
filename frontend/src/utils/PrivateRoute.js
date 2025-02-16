// import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, admin = false }) => {
  const user = useSelector(state => state); 
  console.log(user , 'redux')

  // if (!user) {
  //   return <Navigate to="/login" />;
  // }

  // if (admin && user.role !== 'admin') {
  //   return <Navigate to="/" />;
  // }

  return children;
};


export default PrivateRoute;