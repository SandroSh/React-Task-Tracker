
import Button from "./Button"





function Header({title, onAdd,textContent}) {
  
  return (
    <div className="header">
        <h1>{title}</h1>
        <Button 
          text={textContent ? "Close":'Add' } 
          color={textContent ? '#24465f': '#5bc448'}  
          onClick={onAdd}  
        />
    </div>
  );
}

export default Header
