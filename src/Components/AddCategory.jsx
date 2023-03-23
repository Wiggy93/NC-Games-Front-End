import { useContext, useState } from "react";
import { UserContext } from "../Contexts/userContext";

export const AddCategory = () => {
  const currentUser = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <section>
      <p>Test New category</p>
    </section>
  );
};
