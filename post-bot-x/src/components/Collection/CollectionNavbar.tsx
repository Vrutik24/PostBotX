import { useNavigate } from "react-router-dom";
import {
  AddCollectionButton,
  CollectionNavbarBox,
  CollectionNavbarContainer,
  CollectionNavbarTitle,
} from "./CollectionNavbarStyle";

const CollectionNavbar = () => {
  const navigateTo = useNavigate();
  return (
    <CollectionNavbarBox>
      <CollectionNavbarContainer>
        <CollectionNavbarTitle onClick={() => navigateTo("/")}>
          PostBotX
        </CollectionNavbarTitle>
        <AddCollectionButton variant="contained">
          Add Collection
        </AddCollectionButton>
      </CollectionNavbarContainer>
    </CollectionNavbarBox>
  );
};

export default CollectionNavbar;
