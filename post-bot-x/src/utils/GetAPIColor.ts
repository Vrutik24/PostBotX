const getAPIColor = (apiType: string) => {
  let color = "white";
  switch (apiType) {
    case "Get":
      color = "#73DC8C";
      break;
    case "Post":
      color = "#DBDE52";
      break;
    case "Put":
      color = "#FFA24E";
      break;
    case "Patch":
      color = "#FFA24E";
      break;
    case "Delete":
      color = "#FF665B";
      break;
    default:
        color = "white";
        break;
  }
  return color
};

export default getAPIColor
