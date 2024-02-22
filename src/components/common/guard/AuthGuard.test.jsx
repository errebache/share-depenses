import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AuthGuard from './AuthGuard'; // Adjust the import path as necessary
import { AuthContext } from '../../../context'; // Adjust the import path as necessary

// Mock child component
const ChildComponent = () => <div>Protected Content</div>;

describe('AuthGuard Component', () => {
  it('should render child component when user is authenticated', () => {
    // Provide mock context value
    const authContextValue = { user: { name: 'Test User' } };

    render(
      <AuthContext.Provider value={authContextValue}>
        <MemoryRouter>
          <AuthGuard>
            <ChildComponent />
          </AuthGuard>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should redirect to login when user is not authenticated', () => {
    // Provide mock context value
    const authContextValue = { user: null };

    render(
      <AuthContext.Provider value={authContextValue}>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route path="/protected" element={<AuthGuard><ChildComponent /></AuthGuard>} />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
