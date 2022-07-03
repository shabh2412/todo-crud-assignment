const Input = ({name, handleChange, type="text", placeholder="Write Something...", value="", autoFocus= true}) => {
  return (
    <div className="form-floating w-75">
      <input autoFocus={autoFocus} className="form-control rounded-0 rounded-start" type={type} placeholder={placeholder} onChange={handleChange} value={value} />
      <label htmlFor={name}>{placeholder}</label>
    </div>
  );
}

export default Input;