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
import {
  Box,
  Divider,
  ListItemIcon,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import CollectionShareModal from "../../modals/CollectionModal/CollectionShareModal";
import { useAPI } from "../../contexts/APIContext";
import { useAPITestFormikContext } from "../../contexts/APITestFormikContext";
import { CreateAPIDetail } from "../../types";
import { CollectionWithAPIRequests } from "../../types";
import APIRequestsBox from "./APIRequestsBox/APIRequestsBox";
import APIRenameModal from "../../modals/APIRenameModal/APIRenameModal";
import {
  AddCircle,
  AddBoxOutlined,
  DeleteOutlineRounded,
  EditOutlined,
  LibraryAddOutlined,
  ShareRounded,
  ContentCopyOutlined,
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
    setCurrentCollectionId,
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
  const [collapsedCollections, setCollapsedCollections] = useState<
    Record<string, boolean>
  >({});

  const [apiActionLoading, setAPIActionLoading] = useState(false);
  const [isFetchingCollection, setIsFetchingCollection] = useState(true);
  useEffect(() => {
    const fetchCollectionAsync = async () => {
     await fetchCollections();
     setIsFetchingCollection(false);
    }
    fetchCollectionAsync();
  }, []);

  useEffect(() => {
    const createDraftCollection = async () => {
      if (!isFetchingCollection && (collections === null || collections.length === 0)) {
        try{
          const newCollection = await createCollection("Draft");
          const createAPIPayload: CreateAPIDetail = {
            apiType: "Get",
            isAutomated: false,
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
          const data = await createAPI(createAPIPayload, newCollection.collectionId);
          await fetchCollections();
          setSelectedAPIId(data);
          newCollection.id && setCurrentCollectionId(newCollection.id);
        }
        catch(error : any){
          console.log(error.message);
        }
        
      }
    } 
    createDraftCollection();
  }, [collectionsWithRequests,collections,fetchCollections,createAPI,createCollection,isFetchingCollection,setCurrentCollectionId,setSelectedAPIId]);

  const createAPIRequest = async (collectionId: string, id?: string) => {
    setAPIActionLoading(true);
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
      await fetchRequestsForCollections();
      setSelectedAPIId(data);
      id && setCurrentCollectionId(id);
    } catch (error) {
      console.error("Failed to create API request", error);
    }
    finally{
      setAPIActionLoading(false);
    }
  };

  const createDuplicateAPIRequest = async (selectedAPI: API | undefined) => {
    handleAPIMenuClose();
    setAPIActionLoading(true);
    const createAPIPayload: CreateAPIDetail = {
      apiType: selectedAPI?.apiType || "Get",
      isAutomated: selectedAPI?.isAutomated || true,
      url: selectedAPI?.url || "",
      configuredPayload: selectedAPI?.configuredPayload || "",
      payload: selectedAPI?.payload || [""],
      headers: selectedAPI?.headers || [
        {
          key: "",
          value: "",
        },
      ],
      queryParameters: selectedAPI?.queryParameters || [
        {
          key: "",
          value: [""],
        },
      ],
    };
    try {
      if (selectedAPI) {
        const data = await createAPI(
          createAPIPayload,
          selectedAPI.collectionId
        );
        await fetchRequestsForCollections();
        setSelectedAPIId(data);
      }
    } catch (error) {
      console.error("Failed to create API request", error);
    }
    finally{
      setAPIActionLoading(false);
    }
  };

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
      setAPIActionLoading(true);
      if (id && name) {
        await updateAPIName(id, name);
      } else if (id) {
        await deleteApiById(id);
      }
      await fetchCollections();
      handleAPIModalClose();
    } catch (error) {
      console.error("Failed to process api action:", error);
    } finally {
      setAPIActionLoading(false);
      fetchRequestsForCollections();
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

  // Made Collections collapsible

  const handleCollapseToggle = (collectionId: string) => {
    setCollapsedCollections((prevState) => ({
      ...prevState,
      [collectionId]: !prevState[collectionId],
    }));
  };

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
                  isCollapsed={
                    collapsedCollections[collection.collectionId] || false
                  }
                  onCollapseToggle={() =>
                    handleCollapseToggle(collection.collectionId)
                  }
                  apiActionLoading = {apiActionLoading}
                />
                {!collapsedCollections[collection.collectionId] &&
                  collection.apiRequests?.map((request: API) => (
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
            backgroundColor: "rgb(29 28 28)",
            boxShadow: "0px 2px 4px #2e2b2b",
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
          onClick={() => handleAPIMenuAction("rename")}
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
          onClick={() => createDuplicateAPIRequest(selectedAPI)}
        >
          <ListItemIcon sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
            <ContentCopyOutlined sx={{ fontSize: "20px" }} />
          </ListItemIcon>
          Duplicate
        </MenuItem>
        <Divider sx={{ backgroundColor: "#2e2b2b" }} />
        <MenuItem
          sx={{
            color: "white",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#252525",
            },
          }}
          onClick={() => handleAPIMenuAction("delete")}
        >
          <ListItemIcon sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
            <DeleteOutlineRounded sx={{ fontSize: "20px" }} />
          </ListItemIcon>
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
          onClick={() => {
            if (selectedCollection?.collectionId) {
              createAPIRequest(
                selectedCollection?.collectionId,
                selectedCollection?.id
              );
              handleMenuClose();
            }
          }}
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
