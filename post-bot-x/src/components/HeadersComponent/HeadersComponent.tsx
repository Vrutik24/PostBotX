import { useAPITestFormikContext } from "../../contexts/APITestFormikContext";
import DynamicParamsTable from "../../shared/components/DynamicParamsTable";

const HeadersComponent = () => {
  const { formik } = useAPITestFormikContext();

  const handleValueChange = (index: number, field: string, value: string) => {
    formik.setFieldValue(`headers.${index}.${field}`, value);
  };

  const handleDelete = (index: number) => {
    if (formik.values.headers.length === 1) {
      formik.setFieldValue("headers", formik.initialValues.headers);
    } else {
      const newHeaders = formik.values.headers.filter((_, i) => i !== index);
      formik.setFieldValue("headers", newHeaders);
    }
  };

  const handleAddNewItem = () => {
    formik.setFieldValue("headers", [
      ...formik.values.headers,
      { key: "", value: "" },
    ]);
  };

  return (
    <DynamicParamsTable
      items={formik.values.headers}
      onValueChange={handleValueChange}
      onDelete={handleDelete}
      addNewItem={handleAddNewItem}
      showAddButton={false}
      showDeleteButton={true}
      placeholder={{ key: "Header", value: "Value" }}
      valueType="single"
    />
  );
};

export default HeadersComponent;
