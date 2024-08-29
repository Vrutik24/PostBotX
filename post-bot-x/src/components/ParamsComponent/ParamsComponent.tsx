import { useAPITestFormikContext } from "../../contexts/APITestFormikContext";
import DynamicParamsTable from "../../shared/components/DynamicParamsTable";
import { QueryParameter } from "../../types/QueryParameter";

const ParamsComponent = () => {
  const { formik } = useAPITestFormikContext();

  const handleValueChange = (index: number, field: string, value: string) => {
    formik.setFieldValue(`queryParameters.${index}.${field}`, value);
  };

  const handleDelete = (index: number) => {
    if (formik.values.queryParameters.length === 1) {
      formik.setFieldValue(
        "queryParameters",
        formik.initialValues.queryParameters
      );
    } else {
      const newQueryParameters = formik.values.queryParameters.filter(
        (_, i) => i !== index
      );
      formik.setFieldValue("queryParameters", newQueryParameters);
    }
  };

  const handleAddNewItem = () => {
    formik.setFieldValue("queryParameters", [
      ...formik.values.queryParameters,
      { key: "", value: [""] },
    ]);
  };

  return (
    <DynamicParamsTable
      items={formik.values.queryParameters}
      onValueChange={handleValueChange}
      onDelete={handleDelete}
      addNewItem={handleAddNewItem}
      showAddButton={false}
      showDeleteButton={true}
      placeholder={{ key: "Key", value: "Value" }}
      valueType="multiple"
    />
  );
};

export default ParamsComponent;
