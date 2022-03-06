// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** ThemeConfig Import
import themeConfig from '@configs/themeConfig'

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    skin: themeConfig.layout.skin,
    isRTL: themeConfig.layout.isRTL,
    layout: themeConfig.layout.type,
    lastLayout: themeConfig.layout.type,
    footerType: themeConfig.layout.footer.type,
    navbarType: themeConfig.layout.navbar.type,
    menuHidden: themeConfig.layout.menu.isHidden,
    contentWidth: themeConfig.layout.contentWidth,
    menuCollapsed: themeConfig.layout.menu.isCollapsed,
    routerTransition: themeConfig.layout.routerTransition,
    navbarColor: themeConfig.layout.navbar.backgroundColor
  },
  reducers: {
    handleRTL: (state, action) => {
      state.isRTL = action.payload
      window.localStorage.setItem('direction', JSON.stringify(action.payload))
    },
    handleSkin: (state, action) => {
      state.skin = action.payload
      window.localStorage.setItem('skin', JSON.stringify(action.payload))
    },
    handleLayout: (state, action) => {
      state.layout = action.payload
    },
    handleFooterType: (state, action) => {
      state.footerType = action.payload
    },
    handleNavbarType: (state, action) => {
      state.navbarType = action.payload
    },
    handleMenuHidden: (state, action) => {
      state.menuHidden = action.payload
    },
    handleLastLayout: (state, action) => {
      state.lastLayout = action.payload
    },
    handleNavbarColor: (state, action) => {
      state.navbarColor = action.payload
    },
    handleContentWidth: (state, action) => {
      state.contentWidth = action.payload
    },
    handleMenuCollapsed: (state, action) => {
      state.menuCollapsed = action.payload
      window.localStorage.setItem('menuCollapsed', JSON.stringify(action.payload))
    },
    handleRouterTransition: (state, action) => {
      state.routerTransition = action.payload
    }
  }
})

export const {
  handleRTL,
  handleSkin,
  handleLayout,
  handleLastLayout,
  handleMenuHidden,
  handleNavbarType,
  handleFooterType,
  handleNavbarColor,
  handleContentWidth,
  handleMenuCollapsed,
  handleRouterTransition
} = layoutSlice.actions

export default layoutSlice.reducer
