import { useState } from "react";

const useForm = ({ onSubmit }) => {
  const [values, setValues] = useState({});

  const handleChange = (evt) => {
    const input = evt.target;
    const value = input.value;
    const name = input.name;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
};

export default useForm;
