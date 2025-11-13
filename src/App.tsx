// ...existing code...
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { sidebarMenu } from './constants/SidebarMenu';

// ...existing code...
function App() {

  return (
      <Router>
        <Routes>
          {/* root => redirect to dashboard */}
          <Route path='/' element={<Navigate to="/dashboard" replace />} />

          {/* auto-generate routes from sidebarMenu */}
          {sidebarMenu.map((item) => {
            const Component = item.component;
            return (
              <Route
                key={item.path}
                path={item.path}
                element={<Layout><Component /></Layout>}
              />
            );
          })}

        </Routes>
      </Router>
  )
}

export default App;
// ...existing code...