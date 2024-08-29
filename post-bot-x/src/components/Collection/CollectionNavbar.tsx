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
import CollectionShareModal from "../../modals/CollectionModal/CollectionShareModal";

const CollectionNavbar = () => {
  const navigateTo = useNavigate();
  const {
    createCollection,
    renameCollection,
    deleteCollection,
    getCollections,
    shareCollection,
  } = useCollection();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setShareIsModalOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<Collection>();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const [action, setAction] = useState("");

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const collectionList = await getCollections();
      console.log("CollectionList >>>> " + collectionList);
      if (collectionList) {
        setCollections(collectionList);
        collectionList?.forEach(element => {
          console.log(element);
        });
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
  const handleShareModalOpen = (collection?: Collection) => {
    setSelectedCollection(collection);
    setShareIsModalOpen(true);
  };

  const handleShareModalClose = () => {
    setShareIsModalOpen(false);
    setSelectedCollection(undefined);
  };

  const handleAction = async (
    name?: string,
    id?: string,
    receiverEmail?: string
  ) => {
    try {
      if (id && name) {
        await renameCollection(id, name);
      } else if (id) {
        await deleteCollection(id);
      } else if (name) {
        console.log(name);
        await createCollection(name);
      }
      await fetchCollections();
      handleModalClose();
    } catch (error) {
      console.error("Failed to process collection action:", error);
    }
  };

  const handleShareCollection = async (
    receiverEmail: string,
    collectionId: string,
    collectionName: string
  ) => {
    try {
      await shareCollection(receiverEmail, collectionId, collectionName);
      handleModalClose();
    } catch (error) {
      console.error("Failed to share collection action:", error);
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

  const handleMenuAction = (action: "rename" | "delete" | "share") => {
    setAnchorEl(undefined);

    if (selectedCollection) {
      if (action === "rename") {
        setAction("Rename");
        handleModalOpen(selectedCollection);
      } else if (action === "share") {
        setAction("Share");
        handleShareModalOpen(selectedCollection);
      } else if (action === "delete") {
        handleAction(undefined, selectedCollection.collectionId);
      }
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
          onClick={() => handleMenuAction("share")}
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
        action={action}
        onClose={handleModalClose}
        onSubmit={handleAction}
        collection={selectedCollection}
      />
      <CollectionShareModal
        isOpen={isShareModalOpen}
        action={action}
        onClose={handleShareModalClose}
        onSubmit={handleShareCollection}
        collection={selectedCollection}
      />
    </CollectionNavbarBox>
  );
};

export default CollectionNavbar;
