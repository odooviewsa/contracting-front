import { Outlet, useLocation } from "react-router-dom";
import Button from "../../componant/Button";
import Header from "../../componant/layout/Header";

const MaterialRequestLayout = () => {
  const { pathname, state } = useLocation();

  return (
    <div>
      <div className="flex items-center justify-between">
        <Header first="Home" second="materials" />
        {!pathname.includes("create") ? (
          <Button href="create" state={{ path: pathname }}>
            Add Material
          </Button>
        ) : (
          <Button href={state.path}>Back</Button>
        )}
      </div>
      <div className="py-8">
        <Outlet />
      </div>
    </div>
  );
};
export default MaterialRequestLayout;
