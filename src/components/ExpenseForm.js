/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import '../styles/form.css';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      amount: '',
      createdAt: moment(),
      calendarFocus: false,
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.selectForm = React.createRef();
  }

  onNameChange(e) {
    const name = e.target.value;
    this.setState(() => ({ name }));
  }

  onAmountChange(e) {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  }

  onDateChange(createdAt) {
    if (createdAt) this.setState(() => ({ createdAt }));
  }

  onFocusChange({ focused }) {
    this.setState(() => ({ calendarFocus: focused }));
  }

  render() {
    const {
      name, amount, createdAt, calendarFocus,
    } = this.state;
    return (
      <form className="form" ref={this.selectForm}>
        <input
          name="name"
          type="text"
          className="text-input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={this.onNameChange}
        />
        <input
          name="amount"
          type="number"
          className="text-input"
          placeholder="Amount"
          id="amount"
          value={amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={createdAt}
          onDateChange={this.onDateChange}
          focused={calendarFocus}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <div>
          <button className="button" type="submit">Save expense</button>
        </div>
      </form>
    );
  }
}

export default ExpenseForm;
