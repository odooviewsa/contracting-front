import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function Test() {
  const options = [
    { label: "n", value: "n" },
    { label: "g", value: "g" },
    { label: "g", value: "g" }
  ];

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
    />
  );
}
