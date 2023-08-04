import { useForm } from "react-hook-form";
import SelectFilter, { SelectValue } from "../../../components/selectFilter";
import { useEffect } from "react";

const Employee = () => {
  const list: SelectValue[] = [
    {
      name: "First Item",
      value: "f1",
    },
    {
      name: "Second Item",
      value: "f2",
    },
    {
      name: "Third Item",
      value: "f3",
    },
    {
      name: "Fourth Item",
      value: "f4",
    },
    {
      name: "Fifty Item",
      value: "f5",
    },
  ];

  const { control, watch } = useForm({
    defaultValues: {
      test: "f2",
    },
  });

  console.log(watch("test"));
  return (
    <>
      <SelectFilter
        name="test"
        search="test"
        control={control}
        searchPlaceholder="test place"
        values={list}
        emptyPlaceholder="Escolha algo"
      />
    </>
  );
};

export default Employee;
