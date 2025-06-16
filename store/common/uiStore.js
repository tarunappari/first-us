// store/common/uiStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUIStore = create(
  persist(
    (set, get) => ({
      // State
      sidebarOpen: true,
      modals: {
        addTask: false,
        editTask: false,
        deleteConfirm: false,
        userProfile: false,
      },
      loading: {
        global: false,
        page: false,
      },
      breadcrumbs: [],
      searchQuery: '',
      selectedItems: [],

      // Sidebar actions
      toggleSidebar: () => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },

      setSidebarOpen: (open) => {
        set({ sidebarOpen: open });
      },

      // Modal actions
      openModal: (modalName, data = true) => {
        set((state) => ({
          modals: {
            ...state.modals,
            [modalName]: data,
          },
        }));
      },

      closeModal: (modalName) => {
        set((state) => ({
          modals: {
            ...state.modals,
            [modalName]: false,
          },
        }));
      },

      closeAllModals: () => {
        set((state) => ({
          modals: Object.keys(state.modals).reduce((acc, key) => {
            acc[key] = false;
            return acc;
          }, {}),
        }));
      },
    }),
    {
      name: 'ui-store',
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
        theme: state.theme,
      }),
    }
  )
);

export default useUIStore;
