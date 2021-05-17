import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';

import {isNil} from 'lodash';

import {SimplActions} from "simpl-react/lib/actions";

import PlayerResultRowContainer from '../containers/PlayerResultRowContainer';


class LeaderRun extends React.Component {

  componentDidMount() {
    // load run's players if not already loaded
    const {run, loadedRunId, loadRunDataAction} = this.props;
    // console.log("componentDidMount: loadedRunId:", loadedRunId);
    loadRunDataAction(run, loadedRunId);
  }

  render() {
    const playerRows = this.props.players.map(
      (p) => <PlayerResultRowContainer key={p.id} runuser={p}/>
    );
    return (
      <div>
        <div>
          <h1>Player Dashboard</h1>
        </div>
        <div>
          <table>
            <thead>
            <tr>
              <th width="30%"> Player</th>
              <th width="30%"> Periods Played</th>
              <th width="30%"> Total</th>
            </tr>
            </thead>
            <tbody>
            {playerRows}
            </tbody>
          </table>
        </div>
        <br/>
        <Link to='/' id={`home`}>Return to Run Dashboard</Link>
        <br/>
        <a href="/logout/" className="btn btn-success btn-lg">Logout</a>
      </div>
    );
  }
}

LeaderRun.propTypes = {
  run: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  loadedRunId: PropTypes.number,

  loadRunDataAction: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const run = state.simpl.run.find(
    (r) => r.id == ownProps.params['id']
  );

  const unsortedPlayers = state.simpl.runuser.filter(
    (ru) => ru.run === run.id && ru.leader === false
  );
  const players = _.sortBy(unsortedPlayers, (p) => p.email);

  return {
    run,
    players,
    loadedRunId: state.simpl.loaded_run
  };
}

const mapDispatchToProps = dispatch => {
  return {
    loadRunDataAction(run, loadedRunId) {
      // console.log(`mapDispatchToProps.loadRunData:`);
      if (!isNil(run)) {
        if (run.id !== loadedRunId) {
          dispatch(SimplActions.loadRunData(run.id, true)); // load player scenarios
        }
      }
    },
  };
};

const module = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaderRun);

export default withRouter(module);
