import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../../context';
import RedirectIfAuthenticated from './RedirectIfAuthenticated';

const ChildComponent = () => <div>Child Component</div>;

describe('RedirectIfAuthenticated', () => {
  it('redirects to the profile page if the user is authenticated', () => {
    const user = { name: 'Test User' }; 

    const { getByText } = render(
      <AuthContext.Provider value={{ user }}>
        <MemoryRouter initialEntries={['/profil']}>
          <Routes>
            <Route path="/somepath" element={<RedirectIfAuthenticated><ChildComponent /></RedirectIfAuthenticated>} />
            <Route path="/profil" element={<div>Profile Page</div>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(getByText('Profile Page')).toBeInTheDocument();
  });

  it('renders children if the user is not authenticated', () => {
    const { getByText } = render(
      <AuthContext.Provider value={{ user: null }}>
        <MemoryRouter>
          <RedirectIfAuthenticated>
            <ChildComponent />
          </RedirectIfAuthenticated>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(getByText('Child Component')).toBeInTheDocument();
  });
});
