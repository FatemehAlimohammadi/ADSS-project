export function access(role){
  const role = localStorage.getItem('role');
  if(role.toString().trim()==role.toString().trim()){
    return true;
  }else{
    //redirect user to home page
    window.location.replace("http://localhost:5173/");

  }
}