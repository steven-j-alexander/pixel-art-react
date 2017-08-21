import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Picker from './Picker';
import * as actionCreators from '../store/actions/actionCreators';

const Dimensions = (props) => {
  const changeDimensions = (gridProperty, behaviour, value) => {
    let resizeVal = value - props[gridProperty];
    switch(behaviour) {
    case 'change':
      Number.isInteger(resizeVal) ?
        props.actions.changeDimensions(gridProperty, behaviour, Math.ceil(resizeVal)) :
        null; //make sure the value reverts back to whatever is currently in the store. need to force losefocus?
      break;
    default:
      (props[gridProperty] < 2 && behaviour === ('remove')) ?
        null :
        props.actions.changeDimensions(gridProperty, behaviour, Math.ceil(resizeVal));
      break;
    };
  };

  const { columns, rows } = props;

  return (
    <div className="dimensions">
      <Picker
        type="columns"
        value={columns}
        action={changeDimensions}
      />
      <Picker
        type="rows"
        value={rows}
        action={changeDimensions}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  columns: state.present.get('columns'),
  rows: state.present.get('rows')
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const DimensionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dimensions);
export default DimensionsContainer;
