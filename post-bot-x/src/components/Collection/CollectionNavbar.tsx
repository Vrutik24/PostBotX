import { useNavigate } from "react-router-dom";
import {
  AddCollectionButton,
  CollectionBoxContainer,
  CollectionNavbarBox,
  CollectionNavbarContainer,
  CollectionNavbarTitle,
} from "./CollectionNavbarStyle";
import { useState, useEffect, MouseEvent, useCallback } from "react";
import CollectionBox from "./CollectionBox";
import CollectionModal from "../../modals/CollectionModal/CollectionModal";
import { useCollection } from "../../contexts/CollectionContext";
import { Collection } from "../../types";
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import {
  AddBoxOutlined,
  DeleteOutlineRounded,
  EditOutlined,
  LibraryAddOutlined,
  ShareRounded,
} from "@mui/icons-material";
import ConfirmationModal from "../../modals/CollectionModal/ConfirmationModal";
import HeadersModal from "../../modals/CollectionModal/HeadersModal";

const CollectionNavbar = () => {
  const navigateTo = useNavigate();
  const {
    createCollection,
    renameCollection,
    deleteCollection,
    getCollections,
  } = useCollection();

  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<Collection>();
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState<Collection>();
  const [isHeadersModalOpen, setIsHeadersModalOpen] = useState(false);

  const fetchCollections = useCallback(async () => {
    try {
      const collectionList = await getCollections();
      if (collectionList) {
        setCollections(collectionList);
      }
    } catch (error) {
      console.error("Failed to fetch collections:", error);
    }
  }, [getCollections]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const handleModalOpen = (collection?: Collection) => {
    setSelectedCollection(collection);
    setIsCollectionModalOpen(true);
  };

  const handleModalClose = () => {
    setIsCollectionModalOpen(false);
    setSelectedCollection(undefined);
  };

  const handleAction = async (name?: string, id?: string) => {
    try {
      if (id && name) {
        await renameCollection(id, name);
      } else if (id) {
        await deleteCollection(id);
      } else if (name) {
        await createCollection(name);
      }
      await fetchCollections();
      handleModalClose();
    } catch (error) {
      console.error("Failed to process collection action:", error);
    }
  };

  const handleMenuOpen = (
    event: MouseEvent<HTMLElement>,
    collection: Collection
  ) => {
    event.preventDefault();
    setSelectedCollection(collection);
  };

  const handleMenuClose = () => {
    setSelectedCollection(undefined);
  };

  const handleMenuAction = (action: "rename" | "delete") => {
    handleMenuClose();
    if (action === "rename") {
      handleModalOpen(selectedCollection);
    } else if (action === "delete") {
      setCollectionToDelete(selectedCollection);
      setIsConfirmationModalOpen(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (collectionToDelete) {
      await handleAction(undefined, collectionToDelete.collectionId);
      setCollectionToDelete(undefined);
    }
    setIsConfirmationModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setCollectionToDelete(undefined);
    setIsConfirmationModalOpen(false);
  };

  const handleOpenHeadersModal = () => {
    setIsHeadersModalOpen(true);
  };

  const handleCloseHeadersModal = () => {
    setIsHeadersModalOpen(false);
  };

  const handleSaveHeaders = (
    headers: { key: string; value: string[] | string }[]
  ) => {
    // Save headers logic
    console.log("Headers saved:", headers);
    handleCloseHeadersModal();
  };

  return (
    <CollectionNavbarBox>
      <CollectionNavbarContainer>
        <CollectionNavbarTitle onClick={() => navigateTo("/")}>
          PostBotX
        </CollectionNavbarTitle>
        <AddCollectionButton
          variant="contained"
          onClick={() => handleModalOpen()}
        >
          Add Collection
        </AddCollectionButton>
        <CollectionBoxContainer>
          {collections.map((collection, index) => (
            <CollectionBox
              key={collection.collectionId}
              collection={collection}
              selectedCollection={selectedCollection}
              onMenuOpen={(e) => handleMenuOpen(e, collection)}
            />
          ))}
        </CollectionBoxContainer>
      </CollectionNavbarContainer>
      <Menu
        anchorEl={document.querySelector(
          `[data-collection-id='${selectedCollection?.collectionId}']`
        )}
        open={Boolean(selectedCollection?.collectionId)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": {
            my: 1.5,
            backgroundColor: "#1a1a1a",
            border: "1px solid #2e2b2b",
            boxShadow: "0px 2px 4px #2e2b2b",
            px: 1,
            py: 1,
            width: "max-content",
          },
        }}
      >
        <MenuItem
          sx={{
            color: "white",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#333333",
            },
          }}
          onClick={handleMenuClose}
        >
          <ListItemIcon sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
            <AddBoxOutlined sx={{ fontSize: "20px" }} />
          </ListItemIcon>
          Create a Request
        </MenuItem>
        <MenuItem
          sx={{
            color: "white",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#333333",
            },
          }}
          onClick={handleOpenHeadersModal}
        >
          <ListItemIcon sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
            <LibraryAddOutlined sx={{ fontSize: "20px" }} />
          </ListItemIcon>
          Add Headers
        </MenuItem>
        <MenuItem
          sx={{
            color: "white",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#333333",
            },
          }}
          onClick={() => handleMenuAction("rename")}
        >
          <ListItemIcon sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
            <EditOutlined sx={{ fontSize: "20px" }} />
          </ListItemIcon>
          Rename
        </MenuItem>
        <MenuItem
          sx={{
            color: "white",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#333333",
            },
          }}
          onClick={handleMenuClose}
        >
          <ListItemIcon sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
            <ShareRounded sx={{ fontSize: "20px" }} />
          </ListItemIcon>
          Share
        </MenuItem>
        <Divider sx={{ backgroundColor: "#2e2b2b" }} />
        <MenuItem
          sx={{
            color: "white",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#333333",
            },
          }}
          onClick={() => handleMenuAction("delete")}
        >
          <ListItemIcon sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
            <DeleteOutlineRounded sx={{ fontSize: "20px" }} />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      <CollectionModal
        isOpen={isCollectionModalOpen}
        onClose={handleModalClose}
        onSubmit={handleAction}
        selectedCollection={selectedCollection}
      />
      {collectionToDelete && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          collectionName={collectionToDelete.name}
        />
      )}
      {isHeadersModalOpen && (
        <HeadersModal
          open={isHeadersModalOpen}
          onClose={handleCloseHeadersModal}
          onSave={handleSaveHeaders}
        />
      )}
    </CollectionNavbarBox>
  );
};

export default CollectionNavbar;
