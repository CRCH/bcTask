import React from 'react';
import PropTypes from 'prop-types';
import Block from './Block';
import styles from './Table.module.css';

const Row = props => (

  <div className={styles.row}>{
        props.data.map(x => (<Block key={x.id} />
          ))}
  </div>);

export default Row;
Row.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
};
