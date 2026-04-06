// shared/NotFound.tsx
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 pb-20">
      <h1>404 — Page Not Found</h1>
      <Link to="/">Go back home</Link>
    </main>
  );
};

export default NotFound;
