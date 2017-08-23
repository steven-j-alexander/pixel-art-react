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

  handleKeyPress(ev) {
    ev.key === 'Enter' ?
      this.props.action(this.props.type, 'change', ev.target.value) : //check diff and set add or remove
      null;
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
            onKeyPress={(ev) => { this.handleKeyPress(ev); }}
            onBlur={this.setState({ pickerValue: '3' })}
          />
        </div>
        <div className="picker__buttons">
          <button
            onClick={(ev) => { this.props.action(this.props.type, 'add', ev.target.value); }}
            className="button-add"
            id={`picker__add-${this.props.type}`}
          >
            +
          </button>
          <button
            onClick={(ev) => { this.props.action(this.props.type, 'remove', ev.target.value); }}
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
