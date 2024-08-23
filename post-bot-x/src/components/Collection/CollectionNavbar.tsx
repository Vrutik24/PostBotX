import { useNavigate } from "react-router-dom";
import {
  AddCollectionButton,
  CollectionNavbarBox,
  CollectionNavbarTitle,
} from "./CollectionNavbarStyle";

const CollectionNavbar = () => {
  const navigateTo = useNavigate();
  return (
    <CollectionNavbarBox>
      <CollectionNavbarTitle onClick={() => navigateTo("/")}>
        PostBotX
      </CollectionNavbarTitle>
      <AddCollectionButton variant="contained">
        Add Collection
      </AddCollectionButton>
    </CollectionNavbarBox>
  );
};

export default CollectionNavbar;
