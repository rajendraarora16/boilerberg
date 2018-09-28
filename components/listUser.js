import React from 'react';
import PropTypes from 'prop-types';

function ListUser({ placeholderData }) {
  console.log('ListUser: ', placeholderData)
  return (
    <div>
      <p>Boilerplate</p>
    </div>
  );
}

ListUser.propTypes = {
  placeholderData: PropTypes.array.isRequired,
};

export default ListUser;
