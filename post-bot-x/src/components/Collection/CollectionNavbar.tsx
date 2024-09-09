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
  Tooltip,
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
  Menu as MenuIcon,
} from "@mui/icons-material";
import ConfirmationModal from "../../modals/CollectionModal/ConfirmationModal";
import HeadersModal from "../../modals/CollectionModal/HeadersModal";
import Notification from "../Notification/Notification";
import { useAuth } from "../../contexts/AuthContext";
import User from "../User/User";

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
    setAPIName,
    currentCollection,
  } = useAPITestFormikContext();
  const [isAPIModalOpen, setIsAPIModalOpen] = useState(false);
  const [selectedAPI, setSelectedAPI] = useState<API>();
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isShareModalOpen, setShareIsModalOpen] = useState(false);
  const [isHeadersModalOpen, setIsHeadersModalOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<Collection>();
  const [collectionToDelete, setCollectionToDelete] = useState<Collection>();
  const [action, setAction] = useState("");
  const [apiAnchorEl, setAPIAnchorEl] = useState<HTMLElement>();
  const [collapsedCollections, setCollapsedCollections] = useState<
    Record<string, boolean>
  >({});
  const [apiActionLoading, setAPIActionLoading] = useState(false);
  const [isFetchingCollection, setIsFetchingCollection] = useState(true);
  const [isDraftCollectionCreated, setIsDraftCollectionCreated] =
    useState(false);
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);
  const { currentUser } = useAuth();

  const handleNavbarCollapseToggle = () => {
    setIsNavbarCollapsed((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchCollectionAsync = async () => {
      await fetchCollections();
      setIsFetchingCollection(false);
    };
    fetchCollectionAsync();
  }, []);

  const createDraftCollection = useCallback(async () => {
    if (
      !isFetchingCollection &&
      !isDraftCollectionCreated &&
      (collections === null || collections.length === 0)
    ) {
      try {
        setIsDraftCollectionCreated(true);
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
              isChecked: false,
            },
          ],
          queryParameters: [
            {
              key: "",
              value: [""],
              isChecked: false,
            },
          ],
        };
        const data = await createAPI(
          createAPIPayload,
          newCollection.collectionId
        );
        await fetchCollections();
        setSelectedAPIId(data);
        newCollection.id && setCurrentCollectionId(newCollection.id);
      } catch (error: any) {
        console.log(error.message);
      }
    }
  }, [
    isFetchingCollection,
    isDraftCollectionCreated,
    collections,
    createCollection,
    createAPI,
    fetchCollections,
    setSelectedAPIId,
    setCurrentCollectionId,
  ]);

  const createAPIRequest = async (collectionId: string, id?: string) => {
    setAPIActionLoading(true);
    const createAPIPayload: CreateAPIDetail = {
      apiType: "Get",
      isAutomated: false,
      url: "",
      configuredPayload: "",
      headers: [
        {
          key: "",
          value: "",
          isChecked: false,
        },
      ],
      queryParameters: [
        {
          key: "",
          value: [""],
          isChecked: false,
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
    } finally {
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
          isChecked: false,
        },
      ],
      queryParameters: selectedAPI?.queryParameters || [
        {
          key: "",
          value: [""],
          isChecked: false,
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
    } finally {
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
      handleCollectionModalClose();
    } catch (error) {
      console.error("Failed to process collection action:", error);
    } finally {
      fetchCollections();
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
        setAPIName(name);
      } else if (id) {
        await deleteApiById(id);
      }
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

  useEffect(() => {
    if (!isFetchingCollection) {
      if (
        collectionsWithRequests === null ||
        collectionsWithRequests.length === 0
      ) {
        fetchCollections();
      } else if (collections !== null && collections.length === 0) {
        createDraftCollection();
      }
    }
  }, [
    isFetchingCollection,
    collectionsWithRequests,
    collections,
    fetchCollections,
    createDraftCollection,
  ]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#151414",
          width: "50px",
          borderRight: "1px solid #1d1c1c",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          //height: "100vh",
          padding: "15px 10px",
        }}
      >
        <Box>
          <Tooltip
            title={
              isNavbarCollapsed
                ? "Expand Collection Menu"
                : "Collapse Collection Menu"
            }
            enterDelay={800}
            enterNextDelay={800}
          >
            <IconButton
              onClick={handleNavbarCollapseToggle}
              sx={{ color: "gray", width: "100%" }}
              size="small"
            >
              <MenuIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1, // Add gap between children
          }}
        >
          {currentUser && <Notification></Notification>}
          <User isAnonymousUser={!currentUser} />
        </Box>
      </Box>

      {!isNavbarCollapsed && (
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
                  <Box key={`Collection ${collection.id}`}>
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
                      apiActionLoading={apiActionLoading}
                    />
                    {!collapsedCollections[collection.collectionId] &&
                      collection.apiRequests?.map((request: API) => (
                        <APIRequestsBox
                          key={request.id + collection.id}
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
                border: "1px solid rgb(29 28 28)",
                px: 1,
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
            <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
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
              Manage Headers
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
      )}
    </>
  );
};

export default CollectionNavbar;
