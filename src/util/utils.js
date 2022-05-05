const disableButton = (props) => {
  return props.some(prop => !prop);
}

export { disableButton }