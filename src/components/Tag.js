import React from 'react';
import '../styles/Tag.css';
import CloseIcon from '../assets/times-solid.svg';
import {selectedItems} from '../data/SelectedItems';

function Tag(props) {

    const removeTag = (e) => {
                  
           
        if(selectedItems.has(props.name)) {
            selectedItems.delete(props.name);
          } else {
            console.log('');
          }
          props.onDeleteTag()
           
    }

    return (
        <div className='tag' id={props.name}>
            {props.name}
            <img src={CloseIcon} alt="x" className="close-btn" onClick={removeTag} />
        </div>
    )
}

export default Tag;
