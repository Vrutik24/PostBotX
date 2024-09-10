import { MouseEvent, useMemo } from "react";
import { MoreHorizRounded } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { API } from "../../../types";
import getAPIColor from "../../../utils/GetAPIColor";
import { useAPITestFormikContext } from "../../../contexts/APITestFormikContext";

interface APIRequestsBoxProps {
  apiRequest: API;
  onMenuOpen: (event: MouseEvent<HTMLElement>) => void;
  colId?: string;
  anchorEl?: HTMLElement;
  setIsResponseVisible: (isVisible: boolean) => void;
}

const APIRequestsBox = ({
  apiRequest,
  onMenuOpen,
  colId,
  anchorEl,
  setIsResponseVisible,
}: APIRequestsBoxProps) => {
  const {
    formik,
    setSelectedAPIId,
    selectedAPIId,
    setCurrentCollectionId,
    apiName,
    loadingAPIData,
  } = useAPITestFormikContext();
  const apiTypeColor = getAPIColor(apiRequest.apiType);

  const displayedName = useMemo(() => {
    if (selectedAPIId === apiRequest.id) {
      const name = loadingAPIData
        ? apiRequest.name || "untitled"
        : apiName || "untitled";
      return name;
    } else {
      return apiRequest.name || "untitled";
    }
  }, [loadingAPIData, selectedAPIId, apiRequest.id, apiName, apiRequest.name]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={"space-between"}
      p="6px"
      pl="46px"
      my={1}
      key={apiRequest.id + colId}
      borderRadius="4px"
      position="relative"
      onContextMenu={onMenuOpen}
      tabIndex={0}
      onClick={() => {
        setSelectedAPIId(apiRequest.id);
        setCurrentCollectionId(colId ? colId : "");
        setIsResponseVisible(false);
      }}
      data-api-open={apiRequest.id == selectedAPIId}
      data-api-id={apiRequest.id}
      sx={{
        backgroundColor:
          apiRequest.id == selectedAPIId
            ? "rgba(255, 255, 255, 0.1)"
            : apiRequest.id === selectedAPIId && anchorEl
            ? "rgb(29 28 28)"
            : "transparent",
        cursor: "pointer",
        "&:hover, &[data-api-open='true']": {
          backgroundColor: "rgb(29 28 28)",
        },
        "&:hover .collection-actions, &[data-api-open='true'] .collection-actions":
          {
            display: "flex",
          },
        color: "#fff",
        gap: 2,
        fontSize: "8px",
      }}
    >
      <Box display={"flex"} alignItems={"center"} gap={"10px"}>
        <Typography
          color={apiTypeColor}
          fontSize={"14px"}
          sx={{ textTransform: "uppercase", pr: 1 }}
        >
          {apiRequest.apiType}
        </Typography>
        {displayedName?.length > 18 ? (
          <Tooltip title={displayedName}>
            <Typography fontSize={"16px"}>
              {displayedName.substring(0, 18) + "..."}
            </Typography>
          </Tooltip>
        ) : (
          <Typography fontSize={"16px"}>{displayedName}</Typography>
        )}
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
        <Tooltip title="Request options" enterDelay={800} enterNextDelay={800}>
          <IconButton
            size="small"
            sx={{
              color: "rgba(255, 255, 255, 0.5)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
              },
              "&[data-api-open='true']": { color: "white" },
            }}
            onClick={onMenuOpen}
          >
            <MoreHorizRounded sx={{ fontSize: "20px" }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default APIRequestsBox;
