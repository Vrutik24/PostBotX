import { useAPITestFormikContext } from "../../contexts/APITestFormikContext";
import DynamicParamsTable from "../../shared/components/DynamicParamsTable";

const ManualParamsComponent = () => {
  const { formik } = useAPITestFormikContext();

  const handleValueChange = (index: number, field: string, value: string) => {
    formik.setFieldValue(`manualQueryParameters.${index}.${field}`, value);
  };

  const handleDelete = (index: number) => {
    if (formik.values.manualQueryParameters.length === 1) {
      formik.setFieldValue(
        "manualQueryParameters",
        formik.initialValues.manualQueryParameters
      );
    } else {
      const newQueryParameters = formik.values.manualQueryParameters.filter(
        (_, i) => i !== index
      );
      formik.setFieldValue("manualQueryParameters", newQueryParameters);
    }
  };

  const handleAddNewItem = () => {
    formik.setFieldValue("manualQueryParameters", [
      ...formik.values.manualQueryParameters,
      { key: "", value: [""] },
    ]);
  };

  return (
    <DynamicParamsTable
      items={formik.values.manualQueryParameters}
      onValueChange={handleValueChange}
      onDelete={handleDelete}
      addNewItem={handleAddNewItem}
      showAddButton={true}
      showDeleteButton={true}
      placeholder={{ key: "Key", value: "Value" }}
      valueType="multiple"
    />
  );
};

export default ManualParamsComponent;
