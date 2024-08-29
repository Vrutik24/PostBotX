import { useNavigate } from "react-router-dom";
import {
  AddCollectionButton,
  CollectionBoxContainer,
  CollectionNavbarBox,
  CollectionNavbarContainer,
  CollectionNavbarTitle,
} from "./CollectionNavbarStyle";
import { useState, useEffect, MouseEvent } from "react";
import CollectionBox from "./CollectionBox";
import CollectionModal from "../../modals/CollectionModal/CollectionModal";
import { useCollection } from "../../contexts/CollectionContext";
import { Collection } from "../../types";
import { Divider, Menu, MenuItem } from "@mui/material";

const CollectionNavbar = () => {
  const navigateTo = useNavigate();
  const {
    createCollection,
    renameCollection,
    deleteCollection,
    getCollections,
  } = useCollection();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<Collection>();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const collectionList = await getCollections();
      if (collectionList) {
        setCollections(collectionList);
        console.log(collections);
      }
    } catch (error) {
      console.error("Failed to fetch collections:", error);
    }
  };

  const handleModalOpen = (collection?: Collection) => {
    setSelectedCollection(collection);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
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
    collection?: Collection
  ) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedCollection(collection);
  };

  const handleMenuAction = (action: "rename" | "delete") => {
    setAnchorEl(undefined);
    if (selectedCollection) {
      action === "rename"
        ? handleModalOpen(selectedCollection)
        : deleteCollection(selectedCollection.collectionId);
    }
  };

  const handleMenuClose = () => setAnchorEl(undefined);

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
              anchorEl={anchorEl}
              onMenuOpen={(e) => handleMenuOpen(e, collection)}
            />
          ))}
        </CollectionBoxContainer>
      </CollectionNavbarContainer>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
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
            width: "150px",
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
          {/* <ListItemIcon sx={{ color: "white" }}>
            <AddIcon sx={{ fontSize: "20px" }} />
          </ListItemIcon> */}
          Add Header
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
          Delete
        </MenuItem>
      </Menu>
      <CollectionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleAction}
        collection={selectedCollection}
      />
    </CollectionNavbarBox>
  );
};

export default CollectionNavbar;
