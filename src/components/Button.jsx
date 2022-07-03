const Button = ({className="btn btn-primary", clickHandler, children, disabled=false}) => {
  return (
    <button disabled={disabled} className={className} onClick={clickHandler}>{children}</button>
  )
}

export default Button;