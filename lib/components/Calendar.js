import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import NumPad from './NumPad';
import { Calendar } from '../elements';
import StaticWrapper from './StaticWrapper';
import { display } from '../utils/date';

const CalendarInput = props => {
  const { min, max, dateFormat, inline } = props;

  const validation = (value = '') => value.length === 12;

  const keyValid = value => {
    const validAfter = min ? value.isSameOrAfter(moment(min, dateFormat)) : true;
    const validBefore = max ? value.isSameOrBefore(moment(max, dateFormat)) : true;
    return validAfter && validBefore;
  };

  const displayRule = (value = '') => display(value, dateFormat.replace(/[a-z]/gi, '_'));

  if (inline) {
    return (
      <StaticWrapper {...props}>
        <Calendar
          validation={validation}
          keyValid={keyValid}
          displayRule={displayRule}
          {...props}
        />
      </StaticWrapper>
    );
  }

  return (
    <NumPad {...props} customInput={props.children}>
      <Calendar validation={validation} keyValid={keyValid} displayRule={displayRule} {...props} />
    </NumPad>
  );
};

CalendarInput.propsType = {
  dateFormat: PropTypes.string,
  weekOffset: PropTypes.number,
  min: PropTypes.string,
  max: PropTypes.string,
  markers: PropTypes.arrayOf(PropTypes.string),
  inline: PropTypes.bool,
  validation: PropTypes.func,
  keyValid: PropTypes.func,
  displayRule: PropTypes.func,
};

CalendarInput.defaultProps = {
  weekOffset: 0,
  dateFormat: 'DD.MM.YYYY',
  min: undefined,
  max: undefined,
  markers: [],
  inline: false,
};

export default CalendarInput;