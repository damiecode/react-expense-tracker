import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import '../styles/summary.css';

const AddExpensePage = () => (
  <div>
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Add Expense</h1>
      </div>
    </div>

    <div className="content-container">
      <ExpenseForm />
    </div>
  </div>
);

export default connect()(AddExpensePage);
