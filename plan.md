# Implementation Plan: Fix Scrapers and Enhance Search Features

## 1. Scraper Maintenance and Repairs

### 1.1. Diagnostics
- **Goal:** Identify broken scrapers.
- **Action:** Run `pnpm collect`.
- **Note:** This will output errors to the console. Observe which scrapers fail (likely Wellcome Collection and potentially others).

### 1.2. Fix Wellcome Collection Scraper
- **File:** `@package/scrapers/src/sources/wellcome-collection/index.ts`
- **Issue:** The scraper relies on extracting `__NEXT_DATA__` from the DOM, which has likely changed structure or is no longer present.
- **Steps:**
  1. Inspect the current Wellcome Collection Events page structure (requires running the scraper and logging the HTML or fetched data).
  2. If `__NEXT_DATA__` is gone, switch to standard DOM parsing using selectors on the event list.
  3. If `__NEXT_DATA__` exists but structure changed, update the JSON path logic.
  4. Verify the `link` construction and summary fetching logic.

### 1.3. Fix Other Broken Scrapers
- **Goal:** Ensure comprehensive data collection.
- **Steps:**
  1. For each failing scraper identified in 1.1, analyze the error log.
  2. Update selectors or logic to match the current target website structure.
  3. Verify by running `pnpm collect` again until all (or most) succeed.

## 2. Frontend Features: Search and Display

### 2.1. Feature: Location Column
- **Goal:** Display the location of each lecture in the list.
- **File:** `@client/src/components/LectureItem.tsx`
- **Steps:**
  1. Update the grid layout `grid-template-columns` to accommodate a third column (e.g., `[grid-template-columns:3.2rem_2fr_1fr]`).
  2. Insert a new `div` or element in the grid to display `p.lecture.location`.
  3. Handle styling for mobile (potentially hide or stack location on small screens if space is tight).

### 2.2. Feature: Date Header Redesign
- **Goal:** Optimize the date header to work better with the new column layout.
- **File:** `@client/src/components/LectureList.tsx`
- **Steps:**
  1. Locate the date header `div` (sticky header).
  2. Change `justify-between` to `justify-start` or similar.
  3. Group the "Day" and "Date" elements closer together on the left, perhaps separated by a comma or space.
  4. Example format: `Thursday, Jan 11`.

### 2.3. Feature: Location Selector
- **Goal:** Allow users to filter lectures by location.
- **Files:** 
  - `@client/src/components/Header.tsx`
  - `@client/src/index.tsx` (Layout component)
  - `@client/src/router.tsx` (implicitly used)
- **Steps:**
  1. **Header UI:**
     - In `Header.tsx`, access the list of unique locations. This might require passing `data` (store) to the Header or accessing the global store hook.
     - Add a `<select>` dropdown next to the search bar.
     - Bind the select value to a new router query param (e.g., `location`).
  2. **Filtering Logic:**
     - In `@client/src/index.tsx` (Layout component), update the `talks` derived signal.
     - Currently: `search.active() ? search.results().map((x) => x.item) : data.lectures`.
     - New Logic:
       ```typescript
       const talks = () => {
         let list = search.active() ? search.results().map((x) => x.item) : data.lectures;
         const loc = router.query('location')[0]();
         if (loc) {
           list = list.filter(l => l.location === loc);
         }
         return list;
       }
       ```
  3. **Unique Locations:**
     - Extract unique locations from `data.lectures` to populate the dropdown options.

## 3. Verification

- Run `pnpm collect` to generate fresh data.
- Start the development server (check `package.json` for command, likely `pnpm dev` or `astro dev` inside `@client`). *Note: root package.json doesn't have a dev command, might need to run `cd @client && pnpm dev` if available or `npm run build` and serve.*
- Verify the Wellcome Collection events appear in the list.
- Verify the location column appears and looks correct.
- Verify the date header is reformatted.
- Verify the location dropdown populates and filters the list correctly.
