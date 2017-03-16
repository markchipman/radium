/* @flow */

import React, {PureComponent} from 'react';

import StyleKeeper from '../style-keeper';

export default class StyleSheet extends PureComponent {
  static contextTypes = {
    _radiumStyleKeeper: React.PropTypes.instanceOf(StyleKeeper)
  };

  state: {css: string};

  _isMounted: ?boolean;
  _subscription: ?{remove: () => void};

  constructor() {
    super(...arguments);

    this.state = this._getCSSState();
  }

  componentDidMount() {
    this._isMounted = true;
    this._subscription = this.context._radiumStyleKeeper.subscribe(
      this._onChange
    );
    this._onChange();
  }

  componentWillUnmount() {
    this._isMounted = false;
    if (this._subscription) {
      this._subscription.remove();
    }
  }

  _getCSSState(): {css: string} {
    return {css: this.context._radiumStyleKeeper.getCSS()};
  }

  _onChange = () => {
    setTimeout(() => {
      this._isMounted && this.setState(this._getCSSState());
    }, 0);
  };

  render(): React.Element<any> {
    return (
      <style dangerouslySetInnerHTML={{__html: this.state.css}} />
    );
  }
}
