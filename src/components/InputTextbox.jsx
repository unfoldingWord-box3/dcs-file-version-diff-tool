export default function InputTextbox({
  name,
  value,
  callback,
}) {
  // use DCS React Hooks useAllOrgs
  const handler = (event) => {
    const { value } = event.target;
    callback(value);
  };

  return (
    <label
    <input type="text" name={name} onBlur={handler} defaultValue={value} />
  );
};