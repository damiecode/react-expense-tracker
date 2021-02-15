/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import viewExpenses from '../selectors/chartExpenses';
import '../styles/index.css';

const ChartPage = props => (
  <div>
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">View Stats</h1>
      </div>
    </div>
    <div className="chart-container">
      <div className="content-container">
        <Bar
          width={100}
          height={400}
          // eslint-disable-next-line react/prop-types
          data={props.dataset}
          options={
                                {
                                  title: {
                                    display: props.isTitle,
                                    text: props.titleText,
                                    fontSize: 15,
                                  },
                                  legend: {
                                    display: props.isLegend,
                                    position: props.legendPosition,
                                  },
                                  maintainAspectRatio: false,
                                  scales: {
                                    yAxes: [{
                                      display: true,
                                      ticks: {
                                        beginAtZero: true,
                                      },
                                    }],
                                  },
                                }
                            }
        />
      </div>
    </div>
  </div>
);

const mapStateToProps = ({ expenses }) => ({
  dataset: viewExpenses(expenses),
});

ChartPage.defaultProps = {
  isTitle: true,
  isLegend: true,
  legendPosition: 'bottom',
  titleText: 'Monthly Expenses',
};

ChartPage.propTypes = {
  isLegend: PropTypes.bool,
  isTitle: PropTypes.bool,
  legendPosition: PropTypes.string,
  titleText: PropTypes.string,
};

export default connect(mapStateToProps)(ChartPage);
