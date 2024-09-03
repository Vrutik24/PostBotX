import React, { MouseEvent } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ArrowRight, MoreHorizRounded } from "@mui/icons-material";
import { Collection } from "../../types";

interface CollectionBoxProps {
  collection: Collection;
  onMenuOpen: (event: MouseEvent<HTMLElement>, collection: Collection) => void;
  createAPIRequest: (collectionId: string, id: string | undefined) => void;
  selectedCollection?: Collection;
}

const CollectionBox: React.FC<CollectionBoxProps> = ({
  collection,
  onMenuOpen,
  selectedCollection,
  createAPIRequest,
}) => {
  const isOpen = selectedCollection?.collectionId === collection.collectionId;

  return (
    <Box
      display="flex"
      alignItems="center"
      p="6px"
      my={1}
      borderRadius="4px"
      position="relative"
      onContextMenu={(e) => onMenuOpen(e, collection)}
      tabIndex={0}
      data-context-open={isOpen}
      data-collection-id={collection.collectionId}
      sx={{
        backgroundColor: isOpen ? "rgb(29 28 28)" : "transparent", // Apply background color if context menu is open
        cursor: "pointer",
        "&:hover, &[data-context-open='true']": {
          backgroundColor: "rgb(29 28 28)", // Background color when hovered or context menu is open
        },
        "&:hover .collection-actions, &[data-context-open='true'] .collection-actions":
          { display: "flex" },
        color: "#fff",
        gap: 2,
      }}
    >
      <IconButton
        size="small"
        sx={{
          color: "rgba(255, 255, 255, 0.5)",
          "&:hover, &[data-context-open='true']": {
            backgroundColor: "rgb(29 28 28)",
            borderRadius: "8px",
          },
          padding: 0,
        }}
      >
        <ArrowRight sx={{ fontSize: "25px" }} />
      </IconButton>
      <Typography>{collection.name}</Typography>
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
            "&:hover, &[data-context-open='true']": {
              backgroundColor: "rgb(29 28 28)",
              borderRadius: "8px",
            },
            "&[data-context-open='true']": { color: "white" },
          }}
          onClick={() =>
            createAPIRequest(collection.collectionId, collection.id)
          }
        >
          <AddIcon sx={{ fontSize: "20px" }} />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            color: "rgba(255, 255, 255, 0.5)",
            "&:hover, &[data-context-open='true']": {
              backgroundColor: "rgb(29 28 28)",
              borderRadius: "8px",
            },
            "&[data-context-open='true']": { color: "white" },
          }}
          onClick={(e) => onMenuOpen(e, collection)}
        >
          <MoreHorizRounded sx={{ fontSize: "20px" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CollectionBox;
