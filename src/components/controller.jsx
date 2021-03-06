import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';

/* @prop: {
    + filters: {
      + searchTxt: (String),
      + showByStatus: (Number),
      + sortOrder: (Boolean)
    },
    + onOpenTaskForm: (f),
    + onResetFilters: (f)
    + onSearchTasks: (f),
    + onShowTasksByStatus: (f),
    + onSortTasks: (f)
  }
*/

class Controller extends Component {
  constructor() {
    super();
    this.refTaskSearch = React.createRef();
  }

  componentDidMount() {
    this.refTaskSearch.focus();
  }

  componentDidUpdate() {
    this.refTaskSearch.value = this.props.filters.searchTxt;
  }

  onOpenTaskForm = () => {
    this.props.onOpenTaskForm();
  };

  onResetFilters = () => {
    this.props.onResetFilters();
  };

  onSearchTasks = e => {
    e.preventDefault();
    const searchTxt = this.refTaskSearch.value.trim().toLowerCase();
    searchTxt.length > 0 && this.props.onSearchTasks(searchTxt);
  };

  onShowTasksByStatus = showByStatus => {
    this.props.onShowTasksByStatus(showByStatus);
  };

  onSortTasks = sortOrder => {
    this.props.onSortTasks(sortOrder);
  };

  render() {
    const { showByStatus, sortOrder } = this.props.filters;

    return (
      <div className="tasks-filter-controller">
        <div className="row col-md-4 col-lg-4">
          {/* New Task button */}
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 pl-0">
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={this.onOpenTaskForm}
            >
              <span className="glyphicon glyphicon-plus" aria-hidden="true" />
              &nbsp;New
            </button>
          </div>

          {/* Sort button */}
          <div className="btn-group col-xs-6 col-sm-6 col-md-6 col-lg-6 pl-0">
            <button
              type="button"
              className="btn btn-active dropdown-toggle btn-filter"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="glyphicon glyphicon-sort" aria-hidden="true" />
              &nbsp;Sort&nbsp;
              <span className="caret" />
            </button>

            {/* Reset button */}
            <button
              type="button"
              className="btn btn-active btn-addon-right"
              onClick={this.onResetFilters}
            >
              <span
                className="glyphicon glyphicon-retweet"
                aria-hidden="true"
              />
            </button>

            <ul className="dropdown-menu p-10">
              <li>
                <button
                  className="btn-zero"
                  onClick={() => this.onSortTasks(true)}
                >
                  <span
                    className="glyphicon glyphicon-sort-by-alphabet"
                    aria-hidden="true"
                  />
                  A&nbsp;
                  <span
                    className="glyphicon glyphicon-arrow-right"
                    aria-hidden="true"
                  />
                  &nbsp;Z&nbsp;
                  <span
                    className={
                      sortOrder === true ? 'glyphicon glyphicon-ok' : 'hidden'
                    }
                    aria-hidden="true"
                  />
                </button>
              </li>
              <li>
                <button
                  className="btn-zero"
                  onClick={() => this.onSortTasks(false)}
                >
                  <span
                    className="glyphicon glyphicon-sort-by-alphabet-alt"
                    aria-hidden="true"
                  />
                  Z&nbsp;
                  <span
                    className="glyphicon glyphicon-arrow-right"
                    aria-hidden="true"
                  />
                  &nbsp;A&nbsp;
                  <span
                    className={
                      sortOrder === false ? 'glyphicon glyphicon-ok' : 'hidden'
                    }
                    aria-hidden="true"
                  />
                </button>
              </li>
              <li className="divider" />
              <li>
                <button
                  className="btn-zero"
                  onClick={() => this.onShowTasksByStatus(-1)}
                >
                  <span className="label label-primary">ALL</span>
                  &nbsp;&nbsp;
                  <span
                    className={
                      +showByStatus === -1 ? 'glyphicon glyphicon-ok' : 'hidden'
                    }
                    aria-hidden="true"
                  />
                </button>
              </li>
              <li>
                <button
                  className="btn-zero"
                  onClick={() => this.onShowTasksByStatus(1)}
                >
                  <span className="label label-success">ACTIVE</span>
                  &nbsp;&nbsp;
                  <span
                    className={
                      +showByStatus === 1 ? 'glyphicon glyphicon-ok' : 'hidden'
                    }
                    aria-hidden="true"
                  />
                </button>
              </li>
              <li>
                <button
                  className="btn-zero"
                  onClick={() => this.onShowTasksByStatus(0)}
                >
                  <span className="label label-default">INACTIVE</span>
                  &nbsp;&nbsp;
                  <span
                    className={
                      +showByStatus === 0 ? 'glyphicon glyphicon-ok' : 'hidden'
                    }
                    aria-hidden="true"
                  />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Search field */}

        <form
          className="tasks-search-form col-md-8 col-lg-8"
          onSubmit={this.onSearchTasks}
        >
          <div className="form-group">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type in task name..."
                ref={input => {
                  this.refTaskSearch = input;
                }}
              />

              <span className="input-group-btn">
                <button type="submit" className="btn btn-default">
                  <span
                    className="glyphicon glyphicon-search"
                    aria-hidden="true"
                  />
                  &nbsp;Search
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

const mapDispatchToProps = dispatch => ({
  onOpenTaskForm: () => {
    dispatch(actions.openTaskForm());
  },
  onResetFilters: () => {
    dispatch(actions.resetFilters());
  },
  onSearchTasks: searchTxt => {
    dispatch(actions.searchTasks(searchTxt));
  },
  onShowTasksByStatus: showByStatus => {
    dispatch(actions.showTaskByStaus(showByStatus));
  },
  onSortTasks: sortOrder => {
    dispatch(actions.sortTask(sortOrder));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controller);
