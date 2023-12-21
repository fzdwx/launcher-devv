import { LauncherApi } from 'launcher-api'
/// <reference types="vite/client" />
declare global {
  interface Window {
    launcher: LauncherApi
  }
}
