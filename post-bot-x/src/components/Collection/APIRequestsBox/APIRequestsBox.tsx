import { MouseEvent } from "react";
import { MoreHorizRounded } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { API } from "../../../types";
import getAPIColor from "../../../utils/GetAPIColor";
import { useAPITestFormikContext } from "../../../contexts/APITestFormikContext";

interface APIRequestsBoxProps {
  apiRequest: API;
  onMenuOpen: (event: MouseEvent<HTMLElement>) => void;
  colId?: string;
  anchorEl?: HTMLElement;
}

const APIRequestsBox = ({
  apiRequest,
  onMenuOpen,
  colId,
  anchorEl,
}: APIRequestsBoxProps) => {
  const {
    formik,
    setSelectedAPIId,
    selectedAPIId,
    setCurrentCollectionId,
    apiName,
  } = useAPITestFormikContext();
  const apiTypeColor = getAPIColor(apiRequest.apiType);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={"space-between"}
      p={1}
      pl={4}
      mb={1}
      key={apiRequest.id}
      borderRadius="4px"
      position="relative"
      onContextMenu={onMenuOpen}
      tabIndex={0}
      onClick={() => {
        setSelectedAPIId(apiRequest.id);
        setCurrentCollectionId(colId ? colId : "");
      }}
      sx={{
        backgroundColor:
          anchorEl || apiRequest.id == selectedAPIId
            ? "rgba(255, 255, 255, 0.1)"
            : "transparent", // Apply hover background if context menu is open
        cursor: "pointer",
        "&:hover, &[data-context-open='true']": {
          backgroundColor: "rgba(255, 255, 255, 0.1)", // Lighter background color on hover
        },
        "&:hover .collection-actions, &[data-context-open='true'] .collection-actions":
          {
            display: "flex",
          },
        color: "#fff",
        gap: 2,
        fontSize: "8px",
      }}
      data-context-open={Boolean(anchorEl)}
    >
      <Box display={"flex"} alignItems={"center"} gap={"10px"}>
        <Typography color={apiTypeColor} fontSize={"14px"}>
          {apiRequest.apiType}
        </Typography>
        <Typography fontSize={"16px"}>
          {selectedAPIId == apiRequest.id
            ? apiName
              ? apiName
              : "untitled"
            : apiRequest.name
            ? apiRequest.name
            : "untitled"}
        </Typography>
      </Box>

      <Box
        className="collection-actions"
        display="none"
        position="absolute"
        right={0}
        top={0}
        bottom={0}
        alignItems="center"
        pr={1}
        gap={1}
      >
        <IconButton
          size="small"
          sx={{
            color: "rgba(255, 255, 255, 0.5)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
            },
            "&[data-context-open='true']": { color: "white" },
          }}
          onClick={onMenuOpen}
        >
          <MoreHorizRounded sx={{ fontSize: "20px" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default APIRequestsBox;
