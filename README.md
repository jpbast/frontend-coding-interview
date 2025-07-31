<img width="2516" height="1101" alt="image" src="https://github.com/user-attachments/assets/7b1b546f-2a1a-47b7-a732-714809b85745" />

# Clever's Frontend Coding Interview

An application built on top of React, Next.js and Tailwind CSS featuring a photo gallery with authentication. Users can sign in to view a curated collection of nature photos from the Pexels API.

You can access the production app [here](https://frontend-coding-interview-one.vercel.app/). 
The production credentials are:
```
username = test@user
password = T3st!@P@ssw0rd9
```

## Getting Started

To get started with the project, follow these steps:

1.  **Clone the repository**

2.  **Environment Setup**:
    Create a `.env.development.local` file in the root directory with the following environment variables:

    ```
    # Pexels API endpoint
    API_URL=https://api.pexels.com/v1

    # Pexels API key
    API_KEY=

    # Add your username here. It'll be used to validate your credentials on the Sign In page. It should match exactly the same username you type in the input field
    AUTH_USERNAME=

    # Add your password here. It'll be used to validate your credentials on the Sign In page. It should match exactly the same password you type in the input field
    AUTH_PASSWORD=
    ```

3.  **Install the dependencies**:
    ```bash
    npm install
    ```
4.  **Run the development server**:
    ```bash
    npm run dev
    ```
5.  **Open the application**:
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- **`/app`**: Next.js router and API endpoints.
- **`/assets`**: SVG icons.
- **`/components`**: Generic and reusable components, such as Button and Skeleton.
- **`/lib`**: Core functionalities, including API communication and other utilities.
- **`/types`**: General types.
- **`/views`**: A directory for larger, view-level components that compose pages.

## Technical Decisions

### Why Next.js?

Using Next.js we can take advantage of Server Components, improving performance, user experience, and leveraging its built-in Node environment for backend purposes. Since the entire page doesn't need access to all the data, we can just request the data exactly where we need it. This approach leads to improved loading times and user experience, because Server Components don't need any additional JavaScript on the client side - they're purely HTML and CSS - which reduces the JS bundle sent to the user.

### Why cookies?

Since we're using Next.js for this project, we can leverage the Node environment. Storing the user credentials in Cookies, we're able to retrieve this information on the server, and then we can decide whether the user is allowed to visit the page or not. Considering user experience, it's a really good approach because we have no flickering or layout shift issues. When the page is delivered to the client, it's already delivered in the "right state" or "right page". Also, since we don't need any JavaScript on the client side to handle this auth validation, we can decrease the JS bundle sent to the client, improving loading times and bandwidth consumption.

### Authentication

The authentication is handled by the `api/sign-in` endpoint. The user's credentials must be set in the `.env.development.local` file, and this is exactly what the endpoint checks. If there is a match, it stores the user credentials in the Cookies for later validation, and `success` is returned. Otherwise, it returns an `errorMessage` as feedback for the user.

### Validate authentication

The home page which includes a list of photos, is a private route. This means that it requires an authenticated user to be visited. The authentication is validated through a server function called `isAuthenticated` which gets the user credentials from the cookies and compares them with the credentials set in the `.env.development.local` file.

If they match, the user is able to visit the page. If not, they're redirected to the Sign In page.

### Error handling

The API calls are wrapped by a `try catch` block. If anything unexpected goes wrong, an Error will be thrown and will be caught by the Next.js built-in Error Boundaries, displaying the `error.tsx` component.
<img width="1454" height="737" alt="Global error component" src="https://github.com/user-attachments/assets/a1d97912-1934-47e7-8510-5c88a43ed9b6" />

### Theme

You can check the app's theme in the `globals.css` file under the `app` folder. All color and semantic tokens were defined based on the Figma design.

## App functionalities

The app is pretty simple and should be straightforward to use. On your first attempt to access the Photos page, you'll be redirected to the Sign In page. The credentials asked should match exactly the ones you set in the `.env.development.local` file. If so, you'll be redirected to the photos page. If not, an `Invalid credentials` message will be displayed.

The `Forgot password?` button displays a modal with instructions explaining how to set your password.

On the Photos page, the photos are retrieved by the `PhotosList` server component. During the request, a Skeleton list is displayed as a fallback.

If you decide to change the credentials you set in the `.env.development.local` file, your session will no longer be available and you'll be sent back to the Sign In page.

## Things to improve

The app is working well, but there are several areas for improvement:

### Authentication

The current authentication system shouldn't rely on environment variables for production use. A more secure approach would be to:

- Implement a proper JWT-based authentication system
- Store user credentials in a secure database
- Use the existing `/api/sign-in` endpoint to validate credentials against the database
- Store JWT tokens in cookies for session management
- Handle all authentication validation through JWT tokens

### Password Recovery

The `Forgot password?` functionality could be enhanced by:

- Creating a dedicated password reset endpoint
- Implementing email-based password recovery
- Building a frontend page for password reset
- Storing new passwords securely in the database

### UI Improvements

The photo description in `PhotoItem` components shrinks on smaller screen sizes. Consider:

- Adding a line clamp (e.g., 3 lines) for better text truncation
- Implementing a `See more` button to expand the description
- Ensuring users can read the complete description when needed

### Error Handling

We could add more specific error boundaries to the most critical features (e.g., `PhotoList` component). Instead of replacing the entire page with a generic error page, we could display a different interface for the specific area where it failed, keeping the rest of the rendered content intact.
