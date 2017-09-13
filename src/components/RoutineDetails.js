import React from 'react';
import PropTypes from 'prop-types';

import { Segment, Icon } from 'semantic-ui-react';

const RoutineDetails = ({routine}) => {
  const { description, link } = routine;

  const privacy = (
        <p>
          Privacy Setting: { routine.public ? "Public" : "Private" }
        </p>
  );

  if(description || link) {
    return(
      <Segment attached>
        { privacy }
        { description &&
          <p>{description}</p>
        }
        { link &&
          <p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer">
              More Information <Icon name='external' />
            </a>
          </p>
        }
      </Segment>
    );
  }

  return (
    <Segment attached>
      { privacy }
    </Segment>
  )
}

RoutineDetails.propTypes = {
  routine: PropTypes.object.isRequired,
}

export default RoutineDetails;
