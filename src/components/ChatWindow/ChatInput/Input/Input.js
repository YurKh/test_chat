import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import styles from "./Input.module.scss";

const Input = ({ value, onChange }) => {
  const [rows, setRows] = useState(1);

  useEffect(() => {
    setRows(value ? value.split("\n").length : 1);
  }, [value]);

  return (
    <textarea
      className={styles.inputElement}
      value={value}
      rows={rows}
      onChange={onChange}
      autoFocus
    />
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Input;
