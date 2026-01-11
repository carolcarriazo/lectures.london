/// <reference path="../.astro/types.d.ts" />
/// <reference types="urlpattern-polyfill" />
/// <reference types="astro/client" />

import type lecture from '../lectures.json'
import type host from '../host.json'

declare global {
  type Host = {
    id: string
    name: string
    city: string
    website: string
    twitter?: string
  }
  type Lecture = {
    id: string
    title: string
    link: string
    time_start: string
    time_end?: string
    location?: string
    host: Host
    summary?: string
    summary_html?: string
    image?: { src: string }
  }
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
  interface ImportMeta {
    env: { GA_TRACKING_ID: string; URL: string }
  }
}
