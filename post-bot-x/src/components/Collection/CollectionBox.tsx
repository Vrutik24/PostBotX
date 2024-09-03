import React, { useState, MouseEvent } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AddToPhotosRounded, MoreHorizRounded } from "@mui/icons-material";
import { Collection } from "../../types";

interface CollectionBoxProps {
  collection: Collection;
  onMenuOpen: (event: MouseEvent<HTMLElement>) => void;
  anchorEl?: HTMLElement;
  createAPIRequest: (collectionId: string, id: string | undefined) => void
}

const CollectionBox: React.FC<CollectionBoxProps> = ({
  collection,
  onMenuOpen,
  anchorEl,
  createAPIRequest
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      p={1}
      mb={1}
      borderRadius="4px"
      position="relative"
      onContextMenu={onMenuOpen}
      tabIndex={0}
      sx={{
        backgroundColor: anchorEl ? "rgba(255, 255, 255, 0.1)" : "transparent", // Apply hover background if context menu is open
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
      }}
      data-context-open={Boolean(anchorEl)}
    >
      <IconButton size="small" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
        <AddToPhotosRounded sx={{ fontSize: "20px" }} />
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
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
            },
            "&[data-context-open='true']": { color: "white" },
          }}
          onClick={() => createAPIRequest(collection.collectionId, collection.id)}
        >
          <AddIcon sx={{ fontSize: "20px" }} />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            color: "rgba(255, 255, 255, 0.5)",
            "&:hover, &[data-context-open='true']": {
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

export default CollectionBox;
