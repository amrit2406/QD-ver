// src/context/QuoteContext.jsx

import { createContext, useContext, useReducer } from 'react';
import { calculateTotals } from '../utils/calculateTotals';

const QuoteContext = createContext();

const initialState = {
  services: [],
  addons: {},
  customer: null,
  confirmed: false,
  pricing: {
    gst: 0,
    discount: 0,
    discountType: 'PERCENT',
    subtotal: 0,
    gstAmount: 0,
    discountAmount: 0,
    total: 0
  }
};

function quoteReducer(state, action) {
  switch (action.type) {
    case 'ADD_SERVICE':
      if (state.services.some(s => s.id === action.payload.id)) return state;
      return { ...state, services: [...state.services, action.payload] };

    case 'ADD_ADDON': {
      const { serviceId, addon } = action.payload;
      const current = state.addons[serviceId] || [];
      return {
        ...state,
        addons: { ...state.addons, [serviceId]: [...current, addon] }
      };
    }

    case 'REMOVE_ADDON': {
      const { serviceId, addonId } = action.payload;
      const current = state.addons[serviceId] || [];
      return {
        ...state,
        addons: { ...state.addons, [serviceId]: current.filter(a => a.id !== addonId) }
      };
    }

    case 'SET_CUSTOMER':
      return { ...state, customer: action.payload };

    case 'UPDATE_PRICING': {
      const { gst, discount, discountType } = action.payload;
      const totals = calculateTotals(state.services, state.addons, gst, discount, discountType);
      return { ...state, pricing: { ...totals, gst, discount, discountType } };
    }

    case 'CONFIRM_QUOTATION':
      return { ...state, confirmed: true };

    default:
      return state;
  }
}

export function QuoteProvider({ children }) {
  const [state, dispatch] = useReducer(quoteReducer, initialState);
  return (
    <QuoteContext.Provider value={{ state, dispatch }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  return useContext(QuoteContext);
}
