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
import { API, Collection } from "../../types";
import { Box, Divider, ListItemIcon, IconButton, Menu, MenuItem } from "@mui/material";
import CollectionShareModal from "../../modals/CollectionModal/CollectionShareModal";
import { useAPI } from "../../contexts/APIContext";
import { useAPITestFormikContext } from "../../contexts/APITestFormikContext";
import { CreateAPIDetail } from "../../types";
import { CollectionWithAPIRequests } from "../../types";
import APIRequestsBox from "./APIRequestsBox/APIRequestsBox";
import APIRenameModal from "../../modals/APIRenameModal/APIRenameModal";
import { AddCircle, AddBoxOutlined,
  DeleteOutlineRounded,
  EditOutlined,
  LibraryAddOutlined,
  ShareRounded } from "@mui/icons-material";
import ConfirmationModal from "../../modals/CollectionModal/ConfirmationModal";
import HeadersModal from "../../modals/CollectionModal/HeadersModal";

const CollectionNavbar = () => {
  const navigateTo = useNavigate();

  const {
    createCollection,
    renameCollection,
    deleteCollection,
    getCollections,
    shareCollection,
  } = useCollection();
  const { createAPI, getApisByCollectionId, deleteApiById, updateAPIName } =
    useAPI();
  const {
    formik,
    fetchCollections,
    fetchRequestsForCollections,
    collections,
    collectionsWithRequests,
    setSelectedAPIId,
    setCurrentCollectionId
  } = useAPITestFormikContext();
  const [isAPIModalOpen, setIsAPIModalOpen] = useState(false);
  const [selectedAPI, setSelectedAPI] = useState<API>();
  
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isShareModalOpen, setShareIsModalOpen] = useState(false);
  const [isHeadersModalOpen, setIsHeadersModalOpen] = useState(false);
  // const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<Collection>();
  const [collectionToDelete, setCollectionToDelete] = useState<Collection>();
  const [action, setAction] = useState("");
  const [apiAnchorEl, setAPIAnchorEl] = useState<HTMLElement>();

  useEffect(() => {
    fetchCollections();
  }, []);


  const createAPIRequest = async (collectionId: string, id?: string) => {
    const createAPIPayload: CreateAPIDetail = {
      apiType: "Get",
      isAutomated: true,
      url: "",
      configuredPayload: "",
      headers: [
        {
          key: "",
          value: "",
        },
      ],
      queryParameters: [
        {
          key: "",
          value: [""],
        },
      ],
    };
    try {
      const data = await createAPI(createAPIPayload, collectionId);
      console.log("data", data)
      await fetchRequestsForCollections();
      setSelectedAPIId(data);
      id && setCurrentCollectionId(id)
    } catch (error) {
      console.error("Failed to create API request", error);
    }
  }

  // useEffect(() => {
  //   fetchCollections();
  // }, [fetchCollections]);

  const handleCollectionModalOpen = (collection?: Collection) => {
    setSelectedCollection(collection);
    setIsCollectionModalOpen(true);
  };

  useEffect(() => {
    fetchRequestsForCollections();
  }, [collections]);

  const handleCollectionModalClose = () => {
    setIsCollectionModalOpen(false);
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
        await createCollection(name);
      }
      await fetchCollections();
      handleCollectionModalClose();
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
      handleCollectionModalClose();
    } catch (error: any) {
      throw new Error(error.message);
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

  const handleMenuAction = (action: "rename" | "delete" | "share") => {
    if (selectedCollection) {
      if (action === "rename") {
        setAction("Rename");
        handleCollectionModalOpen(selectedCollection);
      } else if (action === "share") {
        setAction("Share");
        handleShareModalOpen(selectedCollection);
      } else if (action === "delete") {
        setCollectionToDelete(selectedCollection);
        setIsConfirmationModalOpen(true);
      }
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

  const handleOpenHeadersModal = async () => {
    setIsHeadersModalOpen(true);
  };

  const handleCloseHeadersModal = () => {
    setIsHeadersModalOpen(false);
    setSelectedCollection(undefined);
  };


  // API Menu changes

  const handleAPIModalClose = () => {
    setIsAPIModalOpen(false);
    setSelectedAPI(undefined);
  };

  const handleAPIModalOpen = (api?: API) => {
    setSelectedAPI(api);
    setIsAPIModalOpen(true);
  };

  // Need to do changes for this

  const handleAPIAction = async (name?: string, id?: string) => {
    try {
      if (id && name) {
        await updateAPIName(id, name);
      } else if (id) {
        await deleteApiById(id);
      }
      await fetchRequestsForCollections();
      handleAPIModalClose();
    } catch (error) {
      console.error("Failed to process api action:", error);
    }
  };

  const handleAPIMenuOpen = (
    event: MouseEvent<HTMLElement>,
    apiRequest?: API
  ) => {
    event.preventDefault();
    setAPIAnchorEl(event.currentTarget);
    setSelectedAPI(apiRequest);
  };

  const handleAPIMenuAction = (action: "rename" | "delete") => {
    setAPIAnchorEl(undefined);
    if (selectedAPI) {
      action === "rename"
        ? handleAPIModalOpen(selectedAPI)
        : handleAPIAction(undefined, selectedAPI.id);
    }
  };

  const handleAPIMenuClose = () => setAPIAnchorEl(undefined);

  return (
    <CollectionNavbarBox>
      <CollectionNavbarContainer>
        <CollectionNavbarTitle onClick={() => navigateTo("/")}>
          PostBotX
        </CollectionNavbarTitle>
        <AddCollectionButton
          variant="contained"
          onClick={() => handleCollectionModalOpen()}
          endIcon={
            <IconButton sx={{ color: "white" }}>
              <AddCircle fontSize="small" />
            </IconButton>
          }
        >
          Add Collection
        </AddCollectionButton>
        <CollectionBoxContainer>
          {collectionsWithRequests.map(
            (collection: CollectionWithAPIRequests, index) => (
              <Box key={`Collection ${index}`}>
                <CollectionBox
                  key={collection.collectionId}
                  collection={collection}
                  selectedCollection={selectedCollection}
                  // anchorEl={anchorEl}
                  createAPIRequest={createAPIRequest}
                  onMenuOpen={(e) => handleMenuOpen(e, collection)}
                />
                {collection.apiRequests?.map((request: API) => (
                  <APIRequestsBox
                    key={request.id}
                    apiRequest={request}
                    colId={collection.id}
                    anchorEl={apiAnchorEl}
                    onMenuOpen={(e) => handleAPIMenuOpen(e, request)}
                  />
                ))}
              </Box>
            )
          )}
        </CollectionBoxContainer>
      </CollectionNavbarContainer>
      <Menu
        anchorEl={apiAnchorEl}
        open={Boolean(apiAnchorEl)}
        onClose={handleAPIMenuClose}
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
          onClick={() => handleAPIMenuAction("rename")}
        >
          Rename
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
          onClick={() => handleAPIMenuAction("delete")}
        >
          Delete
        </MenuItem>
      </Menu>
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
            backgroundColor: "rgb(29 28 28)",
            border: "1px solid rgb(29 28 28)",
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
              backgroundColor: "#252525",
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
              backgroundColor: "#252525",
            },
          }}
          onClick={handleOpenHeadersModal}
        >
          <ListItemIcon sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
            <LibraryAddOutlined sx={{ fontSize: "20px" }} />
          </ListItemIcon>
          Add Header
        </MenuItem>
        <MenuItem
          sx={{
            color: "white",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#252525",
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
              backgroundColor: "#252525",
            },
          }}
          onClick={() => handleMenuAction("share")}
        >
          <ListItemIcon sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
            <ShareRounded sx={{ fontSize: "20px" }} />
          </ListItemIcon>
          Share
        </MenuItem>
        <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
        <MenuItem
          sx={{
            color: "white",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#252525",
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
        action={action}
        onClose={handleCollectionModalClose}
        onSubmit={handleAction}
        selectedCollection={selectedCollection}
      />
      <CollectionShareModal
        isOpen={isShareModalOpen}
        onClose={handleShareModalClose}
        onSubmit={handleShareCollection}
        selectedCollection={selectedCollection}
      />
      <APIRenameModal
        isOpen={isAPIModalOpen}
        onClose={handleAPIModalClose}
        onSubmit={handleAPIAction}
        api={selectedAPI}
      />
      {collectionToDelete && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          collectionName={collectionToDelete.name}
        />
      )}
      {isHeadersModalOpen && selectedCollection && (
        <HeadersModal
          open={isHeadersModalOpen}
          onClose={handleCloseHeadersModal}
          //onSave={handleSaveHeaders}
          selectedCollection={selectedCollection}
        />
      )}
    </CollectionNavbarBox>
  );
};

export default CollectionNavbar;
