
import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Navbar from './components/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      {/* Login 상태 시 useAuthContext 실행이 완료되어야 밑에 부분 실행 */}
      <QueryClientProvider client={queryClient} >
        <AuthContextProvider>
          <Navbar />
          <Outlet />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  )
}
export default App;
