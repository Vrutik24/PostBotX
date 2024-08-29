type FieldDefinition = {
  type: string;
  fixedOrRandom: string;
  exampleValue: any;
  validation: string;
};

type JsonObject = Record<string, any>;
//@ts-ignore
type OutputJsonObject = Record<
  string,
  FieldDefinition | OutputJsonObject | OutputJsonObject[]
>;

const determineType = (value: any): string => {
  if (Array.isArray(value)) return "array";
  if (typeof value === "object" && value !== null) return "object";
  if (typeof value === "number") return "number";
  if (typeof value === "string" && !isNaN(Date.parse(value))) return "date";
  return typeof value;
};

export const mapJsonToOutput = (jsonObject: JsonObject): OutputJsonObject => {
  const output: OutputJsonObject = {};

  for (const key in jsonObject) {
    const value = jsonObject[key];
    const valueType = determineType(value);

    if (valueType === "object") {
      output[key] = mapJsonToOutput(value as JsonObject);
    } else if (valueType === "array") {
      output[key] = (value as JsonObject[]).map((item) =>
        mapJsonToOutput(item)
      );
    } else {
      output[key] = `${valueType}, ${
        valueType === "object" || valueType === "array" ? "random" : "fix"
      }, ${value}, `;
    }
  }
  return output;
};
