import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import DecisionForm from '../components/DecisionForm';

import {submitDecision} from '../actions/Actions';

function mapStateToProps(state, ownProps) {
  const initialValues = {
    'operand': 0
  };
  return {
    runuser: state.simpl.current_runuser,
    initialValues
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    submitDecision(values) {
      // submit player's decision
      const operand = values.operand;
      dispatch(submitDecision(ownProps.currentPeriod, operand))
        .then((result) => {
          const status = result.payload;
          if (status !== 'ok') {
            console.log("DecisionFormContainer.submitDecision failed due to: ", status);
          } else {
            console.log("DecisionFormContainer.submitDecision succeeded");
          }
        });
    }
  };
}

const DecisionFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DecisionForm);

export default withRouter(DecisionFormContainer);
