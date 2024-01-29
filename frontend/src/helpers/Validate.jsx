import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
    const navigate = useNavigate();

  const redirectToOtherRoute = () => {
    // Use React Router to navigate to another route
    navigate('/account');
  };

  function validation(){
    try {
        const token = localStorage.getItem('token');
        if(!token && token.toString().length==0){
            return false;
        }

        return true;
    } catch (error) {
        return false
    }
  }

  function handleValidation(){
    if(validation()==false){
        redirectToOtherRoute();
    }
  }
  handleValidation()

  return (
    <></>
  );
};

export default MyComponent;


export function validation(){
    try {
        const token = localStorage.getItem('token');
        if(!token && token.toString().length==0){
            return false;
        }

        return true;
    } catch (error) {
        return false
    }
  }