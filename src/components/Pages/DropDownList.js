import React from 'react';
import { DropdownItem } from 'react-bootstrap';
//This will map out
const DropDownList = props => {
  let CategoryList = [...props.categories];
  let MappedList;
  //add blank search at front
  CategoryList.unshift({ title: '' });

  MappedList = CategoryList.map(category => {
    return (
      <DropdownItem
        key={category.title}
        onClick={() => props.setSelected(category.title)}
        style={{ height: '30px' }}
      >
        {category.title}
      </DropdownItem>
    );
  });

  return <div>{MappedList}</div>;
};
export default DropDownList;
