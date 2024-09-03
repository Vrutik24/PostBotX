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
import { API, Collection } from "../../types";
import { Box, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import CollectionShareModal from "../../modals/CollectionModal/CollectionShareModal";
import { useAPI } from "../../contexts/APIContext";
import { useAPITestFormikContext } from "../../contexts/APITestFormikContext";
import { CreateAPIDetail } from "../../types";
import { CollectionWithAPIRequests } from "../../types";
import APIRequestsBox from "./APIRequestsBox/APIRequestsBox";
import APIRenameModal from "../../modals/APIRenameModal/APIRenameModal";
import { AddCircle } from "@mui/icons-material";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setShareIsModalOpen] = useState(false);
  const [isAPIModalOpen, setIsAPIModalOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<Collection>();
  const [selectedAPI, setSelectedAPI] = useState<API>();
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
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
  };

  useEffect(() => {
    fetchRequestsForCollections();
  }, [collections]);

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
      fetchCollections();
      // fetchRequestsForCollections();
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
    } catch (error: any) {
      throw new Error(error.message);
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
          onClick={() => handleModalOpen()}
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
                  anchorEl={anchorEl}
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
        onClose={handleShareModalClose}
        onSubmit={handleShareCollection}
        collection={selectedCollection}
      />
      <APIRenameModal
        isOpen={isAPIModalOpen}
        onClose={handleAPIModalClose}
        onSubmit={handleAPIAction}
        api={selectedAPI}
      />
    </CollectionNavbarBox>
  );
};

export default CollectionNavbar;
