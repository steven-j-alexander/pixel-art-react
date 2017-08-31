import React from 'react';

//const Picker = ({ type, value, action }) => {

class Picker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pickerValue: this.props.value };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ pickerValue: nextProps.value });
	}

  handlePickerChange(ev) {
    this.setState({ pickerValue: ev });  //+event.target.value || 0);
  };

  handleKeyPress(ev) { //not updating on NaN because it's being set back to the same value which takes no action
    if (ev.key === 'Enter') {
      if (+ev.target.value <= 64) {
        this.props.action(this.props.type, ev.target.value)
      } else {
        this.setState({ pickerValue: this.props.value });
      }
    }
  };

  handleBlur(ev) {
    if (+ev.target.value <= 64) {
      this.props.action(this.props.type, ev.target.value)
    } else {
      this.setState({ pickerValue: this.props.value });
    }
  };

  render() {
    return (
    <div className="picker">
      <label
        className={`picker__${this.props.type}`}
        htmlFor={`picker__${this.props.type}`}
      />
      <div
        className="picker__container"
        id={`picker__${this.props.type}`}
      >
        <div className="picker__value">
          <input
            type="number"
            value={this.state.pickerValue}
            onChange={(ev) => { handlePickerChange(ev); }}
            onKeyUp={(ev) => { this.handleKeyPress(ev); }}
            onBlur={(ev) => { this.handleBlur(ev); }}
          />
        </div>
        <div className="picker__buttons">
          <button
            onClick={(ev) => { this.props.action(this.props.type, this.state.pickerValue+1); }}
            className="button-add"
            id={`picker__add-${this.props.type}`}
          >
            +
          </button>
          <button
            onClick={(ev) => { this.props.action(this.props.type, this.state.pickerValue-1); }}
            className="button-remove"
            id={`picker__remove-${this.props.type}`}
          >
            -
          </button>
        </div>
      </div>
    </div>
    );
  }
}

export default Picker;
