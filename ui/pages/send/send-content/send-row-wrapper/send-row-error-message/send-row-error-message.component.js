import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  getValueFromWeiHex,
} from '../../../../../helpers/utils/conversions.util';
import { QTUM } from '../../../../../helpers/constants/common';

export default class SendRowErrorMessage extends Component {
  static propTypes = {
    errors: PropTypes.object,
    errorType: PropTypes.string,
    qtumBalance: PropTypes.string,
  };

  static contextTypes = {
    t: PropTypes.func,
  };

  getDecimalValue(props) {
    const { qtumBalance: hexValue } = props;
    const decimalValueString = getValueFromWeiHex({
      value: hexValue,
      fromCurrency: QTUM,
      toCurrency: QTUM,
      numberOfDecimals: 6,
    });

    return Number(decimalValueString) || 0;
  }

  render() {
    const { errors, inErrorQtum, errorType, qtumBalance } = this.props;

    const errorMessage = errors[errorType];

    return errorMessage ? (
      <div
        className={classnames('send-v2__error', {
          'send-v2__error-amount': errorType === 'amount',
        })}
      >
        {this.context.t(errorMessage)} {qtumBalance !== null && inErrorQtum ? `${this.context.t(errors.qtumBalances)} ${this.getDecimalValue(this.props)} ${QTUM}` : ''}
      </div>
    ) : null;
  }
}
