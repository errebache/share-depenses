import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Alert } from './Alert';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { alertActions } from '../../../_store';
import configureMockStore from 'redux-mock-store';

const middlewares = [];
const mockStore = configureMockStore(middlewares);

describe('Alert', () => {
    it('should display the alert message', () => {
        const initialState = { 
            alert: {
                value: { type: 'alert-success', message: 'Success message' }
            }
        };
        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Alert />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/Success message/i)).toBeInTheDocument();
    });

    it('should clear the alert on location change', () => {
        const initialState = { 
            alert: {
                value: { type: 'alert-success', message: 'Success message' }
            }
        };
        const store = mockStore(initialState);

        const { rerender } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <Alert />
                </MemoryRouter>
            </Provider>
        );

        // Simulate location change
        rerender(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/another-route']}>
                    <Alert />
                </MemoryRouter>
            </Provider>
        );

        // Dispatch is called to clear the alert
        const actions = store.getActions();
        expect(actions.some(action => action.type === alertActions.clear.type)).toBeTruthy();
    });

    it('should clear the alert when the close button is clicked', () => {
        const initialState = { 
            alert: {
                value: { type: 'alert-success', message: 'Success message' }
            }
        };
        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Alert />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(screen.getByRole('button'));

        // Dispatch is called to clear the alert
        const actions = store.getActions();
        expect(actions.some(action => action.type === alertActions.clear.type)).toBeTruthy();
    });
});
