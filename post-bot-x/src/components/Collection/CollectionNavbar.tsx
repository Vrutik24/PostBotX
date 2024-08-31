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
import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
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
  const { createAPI, getApisByCollectionId, deleteApiById, updateAPIName } = useAPI();
  const { formik } = useAPITestFormikContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setShareIsModalOpen] = useState(false);
  const [isAPIModalOpen, setIsAPIModalOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<Collection>();
  const [selectedAPI, setSelectedAPI] = useState<API>();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [collectionsWithRequests, setCollectionsWithRequests] = useState<
    CollectionWithAPIRequests[]
  >([]);
  // const [collectionAPIS, setCollectionAPIS] = useState<API[] | null>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const [action, setAction] = useState("");
  const [apiAnchorEl, setAPIAnchorEl] = useState<HTMLElement>();

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const collectionList = await getCollections();
      console.log("CollectionList >>>> " + collectionList);
      if (collectionList) {
        setCollections(collectionList);
      }
    } catch (error) {
      console.error("Failed to fetch collections:", error);
    }
  };

  const getAPISByCollectionIdRequest = async (collectionId: string) => {
    try {
      console.log(collectionId);
      const collectionAPIs = await getApisByCollectionId(collectionId);
      console.log("collectionAPIs", collectionAPIs);
      // setCollectionAPIS(collectionAPIs);
      return collectionAPIs;
    } catch (error) {
      console.error("Failed to get APIs of this collection", error);
    }
  };

  const fetchRequestsForCollections = async () => {
    const updatedCollections = await Promise.all(
      collections.map(async (collection: Collection) => {
        const apiRequests = await getAPISByCollectionIdRequest(
          collection.collectionId
        );
        return { ...collection, apiRequests };
      })
    );
    setCollectionsWithRequests(updatedCollections);
  };

  const createAPIRequest = async (collectionId: string) => {
    const createAPIPayload: CreateAPIDetail = {
      apiType: formik.values.apiType || "",
      isAutomated: true,
      url: formik.values.url,
      configuredPayload: formik.values.payload ? formik.values.payload[0] : '',
      headers: formik.values.headers,
      queryParameters: formik.values.queryParameters,
    };
    try {
      const data = await createAPI(createAPIPayload, collectionId);
      fetchRequestsForCollections();
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
      await fetchCollections();
      await fetchRequestsForCollections();
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
              <>
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
              </>
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
