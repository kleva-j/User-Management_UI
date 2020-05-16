import React from 'react';
import { FaMale, FaFemale, FaUsers } from "react-icons/fa";
import { IconContext } from 'react-icons';

const style = {
  fontSize: '50px',
  color: 'white'
};

export const ButtonItem = (props) => {
  const { name, classlist, setCategory, item, setUsers } = props;
  return (
    <div
      className={classlist}
      onClick={() => {
        setCategory(item);
        setUsers(name);
      }}
      key={item}
    >
      <div>
        <IconContext.Provider value={{ style }}>
          {name === 'male'   && <FaMale   title={name} />}
          {name === 'female' && <FaFemale title={name} />}
          {name === 'all'    && <FaUsers  title={name} />}
        </IconContext.Provider>
      </div>
      <small>{item}</small>
    </div>
  );
};
