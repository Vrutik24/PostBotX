import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useAPITestFormikContext } from "../../contexts/APITestFormikContext";
import { TestingTypeList } from "../../dropdown-list/testing-type-list";

const SelectTestingMethodButton = () => {
  const { testingMethod, setTestingMethod } = useAPITestFormikContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value: "Automated" | "Manual") => {
    setAnchorEl(null);
    if (value) {
      setTestingMethod(value);
    }
  };

  return (
    <>
      <Button
        sx={{
          width: "150px",
          color: "white",
          border: "1px solid gray",
          height: "50px",
          backgroundColor: "#2E7D32",
          borderRadius: "4px",
          textTransform: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          "&:hover": {
            backgroundColor: "darkGreen",
          },
        }}
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
      >
        {testingMethod || "Select Type"}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose(testingMethod)}
        PaperProps={{
          style: {
            width: "150px",
            backgroundColor: "#2e2b2b",
            color: "white",
            borderRadius: "4px",
            border: "1px solid gray",
          },
        }}
      >
        {TestingTypeList.map((testingType: "Automated" | "Manual") => (
          <MenuItem key={testingType} onClick={() => handleClose(testingType)}>
            {testingType}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SelectTestingMethodButton;
