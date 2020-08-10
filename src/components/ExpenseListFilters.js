import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import {
  setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate,
} from '../actions/filters';
import '../styles/filters.css';
import '../styles/inputs.css';

class ExpenseListFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarFocused: null,
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDatesChange() {
    const { startDate, endDate } = this.state;
    setStartDate(startDate);
    setEndDate(endDate);
  }

  onFocusChange(calendarFocused) {
    this.setState(() => ({ calendarFocused }));
  }

  render() {
    const { calendarFocused } = this.state;
    const { filters } = this.props;

    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              className="text-input"
              value={filters.text}
              placeholder="Search expenses"
              onChange={e => {
                setTextFilter(e.target.value);
              }}
            />
          </div>
          <div className="input-group__item">
            <select
              className="select"
              value={filters.sortBy}
              onChange={e => {
                if (e.target.value === 'date') {
                  sortByDate();
                } else if (e.target.value === 'amount') {
                  sortByAmount();
                }
              }}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDate={filters.startDate}
              endDate={filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
        </div>
      </div>
    );
  }
}

ExpenseListFilters.propTypes = {
  filters: PropTypes.instanceOf(Object).isRequired,
};

const mapDispatchToProps = dispatch => ({
  setStartDate: startDate => {
    dispatch(setStartDate(startDate));
  },
  setEndDate: endDate => {
    dispatch(setEndDate(endDate));
  },
  sortByDate: () => {
    dispatch(sortByDate());
  },
  sortByAmount: () => {
    dispatch(sortByAmount());
  },
  setTextFilter: value => {
    dispatch(setTextFilter(value));
  },
});

const mapStateToProps = state => ({
  filters: state.filters,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
