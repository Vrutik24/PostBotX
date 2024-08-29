export const prettifyJSON = (jsonString: string): string => {
    try {
      const jsonObject = JSON.parse(jsonString);
      return JSON.stringify(jsonObject, null, 2);
    } catch (error) {
      console.error("Invalid JSON string", error);
      return jsonString;
    }
  };