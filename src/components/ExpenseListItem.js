import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({
  id, name, amount, createdAt,
}) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{name}</h3>
      <span className="list-item__sub-title">{ moment(createdAt).format('Do MMMM YYYY')}</span>
    </div>
    <h3 className="list-item__data">{numeral(amount).format('$0,0.00')}</h3>
  </Link>
);

ExpenseListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
};

export default ExpenseListItem;
