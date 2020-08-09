import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';

const EditExpensePage = ({expense}) => (
  <div>
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Edit Expense</h1>
      </div>
    </div>

    <div className="content-container">
      <ExpenseForm
        expense={expense}
      />
      <button
        className="button"
        type="button"
      >
        Remove Expense
      </button>
    </div>
  </div>
);

EditExpensePage.propTypes = {
  expense: PropTypes.arrayOf(String).isRequired,
};

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
});

export default connect(mapStateToProps)(EditExpensePage);
