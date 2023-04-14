# SociallyMinded-Frontend-Customer

<img width="1251" alt="Screenshot 2023-04-14 at 3 50 50 PM" src="https://user-images.githubusercontent.com/97529863/231980073-475a544d-7924-407c-a6c5-acc4ed86fbaf.png">

## Demo Video
[insert demo video]

## Installation guide

1. Clone this repo

2. Navigate to the root directory and run `npm i`

3. After running `npm i`, run npm start 

## Frontend Tech Stack
<img width="616" alt="Screenshot 2023-04-14 at 2 47 02 PM" src="https://user-images.githubusercontent.com/97529863/231965201-9746f258-17b1-4e63-b5fa-b8f3511dfc97.png">

## Frontend Architecture
Component based architecture
- Common components (under common folder) : components that can be shared across different pages (ie Button, Headers)
- Page components (under respective page folder) : components that leverages on smaller sub-components to render a page (ie ShopPage)

Modularity 
- As far as possible, page components are split into smaller components so that the code is more modular and reusable (ie ShopPage is comprised of a SearchInput component, a PromptResults component, as well as a DataDisplay component)

Separation of Controller and View functions
- Controller : files (.js) containing hooks (useState, useEffect) to help perform data fetching (via axios), and CRUD operations
- View : files (.jsx) containing modular components that uses methods from controller (hooks) to determine data rendering logic 

React Hooks used
- useState : allow components to store state 
- useEffect : perform operations with side effects (ie data fetching)
- useMemo : cache the result of a expensive calculations between re-renders (ie sorting of data)

Other React packages used 
- React Router : handle client and server-side routing in React applications

## Key features
Authentication 
- Sign up for a new account
- Log in to account
- Log in / sign up via an existing gmail account
- Log out from account
- Reset password

Shops
- View all products sold by social enterprises
- Search for product by name
- Filter products by category (ie crafts, clothing)

Listing
- View product listing details (ie price, description)
- Purchase and place an order for a product (by providing address, credit card details etc)

Profile
- View and manage order records via a data table
- Search for order record by order record title
- Filter order table by order status
- Sort order table by various criteria (ie order title, id) 
- Update orders that are in 'pending approval'
- Cancel orders that are in 'pending approval'
- Export data records as a CSV file 

Review 
- Leave a review and rating once an order is received 
- View reviews and ratings for all products
- Filter reviews by number of stars given 
- Sort reviews by date of creation 
