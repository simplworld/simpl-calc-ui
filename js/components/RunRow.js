import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router';

class RunRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const linkDestination = `/run/${this.props.run.id}`;

    return (
      <tr>
        <td>
          <Link to={linkDestination} id={`Link_${this.props.run.name}`}>{this.props.run.name}</Link>
        </td>
      </tr>
    );
  }
}

RunRow.propTypes = {
  run: PropTypes.object.isRequired,
};

export default RunRow;
