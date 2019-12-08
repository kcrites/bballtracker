
    import React from 'react';

 
 const Checkbox = (props) => {
  
const {handleCheckbox} = props;
//console.log('call to checkbox');

    return (
         <div><input type="checkbox" name="Started" onChange={handleCheckbox} checked={props.isSelected} value='Yes'/></div>
    
    );
 }


 export default Checkbox;