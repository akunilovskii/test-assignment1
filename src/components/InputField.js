function InputField({
  fieldType,
  searchType,
  placeHolder,
  onSearchInputChange,
  onTagInputChange,
  onBlur,
  value,
}) {
  function onChangeInputHandler(e, fieldType) {
    if (fieldType === "tag") onTagInputChange(e.target.value.toLowerCase());
    if (fieldType === "search")
      onSearchInputChange(
        searchType,
        e.target.value.toLowerCase().split(" ").join("")
      );
  }

  return (
    <input
      type="text"
      className={`input-field ${fieldType}`}
      placeholder={placeHolder}
      onChange={(e) => onChangeInputHandler(e, fieldType, searchType)}
      value={value}
      onBlur={onBlur}
    />
  );
}

export default InputField;
