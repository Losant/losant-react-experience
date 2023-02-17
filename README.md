# Losant React Experience

The repo demonstrates using a [React.js](https://reactjs.org/) front-end for a [Losant End User Experience](https://docs.losant.com/experiences/overview/).

## Getting Started

Start by cloning this repository to your local environment and entering the created directory:

```bash
git clone https://github.com/Losant/losant-react-experience.git
cd losant-react-experience
```

Next, install the dependencies:

```bash
npm install
```

Now, in the root of the project, create a `.env` file to a new file using the included `.env.example` as a template. The file has the following values in it, which must be modified for your specific Losant application:

- `PUBLIC_URL`: This is the URL for where the built React files will be publicly available. Most users prefer to serve these out of Losant's [Application Files](https://docs.losant.com/applications/files/) with a workflow that downloads and returns the `index.html` contents for any non-API-endpoint request to your [Experience Domain](https://docs.losant.com/experiences/domains/). The Template Library entry that corresponds to this repo takes this same approach. For example, given the placeholder value of `https://files.onlosant.com/<APPLICATION_ID>/react-bundles/<EXPERIENCE_VERSION_NAME>` ...
  - Replace `<APPLICATION_ID>` with the ID of the Losant application backing this interface.
  - Replace `<EXPERIENCE_VERSION_NAME>` with the name of the Experience Version (usually "develop").
- `REACT_APP_API_BASE`: This is the base Experience Domain or Slug that serves all Experience API endpoints requested by the interface. Unless a custom domain or slug has been applied, this is usually "https://`<APPLICATION_ID>`.onlosant.com".
  - Replace `<APPLICATION_ID>` with the ID of the Losant application backing this interface.
- `REACT_APP_AUTH_COOKIE_NAME`: This is the name of the cookie that holds the user's authentication token. This setting is optional; not providing a value defaults to "authToken".

### Included Packages

This demo repo utilizes the following [npm](https://www.npmjs.com/) packages in addition to those included by Create React App:

- [`cookie`](https://www.npmjs.com/package/cookie): Serializes the user's auth token for storage as a browser cookie, and parses that cookie to retrieve the auth token in subsequent sessions.
- [`react-bootstrap`](https://www.npmjs.com/package/react-bootstrap): A set of React components based on the popular [Twitter Bootstrap](https://getbootstrap.com/) UI framework.
- [`bootstrap`](https://www.npmjs.com/package/bootstrap): A peer dependency of `react-bootstrap`; this provides the necessary SASS files that style the components.
- [`react-router-dom`](https://www.npmjs.com/package/react-router-dom): Routes the user through the various pages of the experience, including redirecting signed-out users attempting to view authenticated pages to the login page.

## Developing

To develop the user interface in your local environment, start by creating a `.env.local` in the project root, which will override any values defined in your `.env` file. Included is a `.env.local.example` file; you may simply change the name of this file to `.env.local` to begin development.

At the very least, the file should include this line:

```txt
PUBLIC_URL=''
```

This will cause the user interface to be served from `http://localhost:3000`.

Then, to run the interface locally, execute the following command:

```bash
npm run start
```

This will make the interface available at `http://localhost:3000`. Requests initiated by the interface will go to the `REACT_APP_API_BASE` environment variable defined in either `.env.local` or `.env`.

## Building

Before building the interface, verify that the correct value has been entered for the `PUBLIC_URL` variable in your `.env` file.

Then, run the following command to build the production-ready interface:

```bash
npm run build
```

## Deploying

Once the interface is built, the files output by the build command - including their specific folder structure and file names -  must be uploaded to the publicly available URL defined in the `PUBLIC_URL` environment variable.

If using Losant's [Application Files](https://docs.losant.com/applications/files/) to serve the interface, these files can be uploaded several ways. Two of them are described below ...

### Using the Losant CLI

The easiest method is to use the [Losant CLI](https://docs.losant.com/cli/overview/) to upload the build files. Using the command line, you can navigate to the Losant application's directory, remove any existing bundle, copy the newly built files into the local application directory, and then upload them to your Application Files (replacing the paths and `EXPERIENCE_VERSION_NAME`):

```bash
cd /path/to/losant/application/directory
mkdir -p ./files/react-bundles
rm -rf ./files/react-bundles/EXPERIENCE_VERSION_NAME
cp -R /path/to/losant-react-experience/build ./files/react-bundles/EXPERIENCE_VERSION_NAME
losant files upload
```

### Manually in the Losant Interface

Alternatively, the files can be manually uploaded to Application Files using the Losant interface.

1. In your browser, visit your application's "Files".
2. Create a `/react-bundles` directory if necessary.
3. If a directory matching the name of your Experience Version already exists in the `/react-bundles` directory, delete it.
4. Create a new directory matching your Experience Version name (i.e. `develop`).
5. Drag all of the files in your local `/build` directory EXCEPT the `/css` and `/js` directories.
6. Within your version directory in Application Files, create new directories `css` and `js`.
7. Navigate to the `js` directory, and drag all of the files in your local `/build/js` directory into it.
8. Navigate to the `css` directory, and drag all of the files in your local `/build/css` directory into it.

## Routes

All routes are defined in `App.js`. Routes are nested under a `PrivateRoutes` or `PublicRoutes` container, which determines if the user must be signed in to view that page. Additional routes can be added and nested further down within the application. Check out [React Router's documentation](https://reactrouter.com/) for more info.

- `/`: Redirects signed-in users to `/devices`; this can be replaced with a custom home page if desired.
- `/login`: Displays a form where the user can enter an email address and password to authenticate. If successful, the returned auth token is stored as a browser cookie and the user is redirected to the authenticated experience.
- `/logout`: Removes the browser cookie, unsets the auth token in the API client, and redirects the user to `/login`.
- `/devices`: Displays a bulleted list of the devices associated with the signed-in user. Implementations of this template should replace this with a dashboard or a table of devices.
- `/devices/:deviceId`: Displays the full JSON object for a given device. In most cases, this would be replaced with a form for editing the device properties and/or a dashboard of current state values.
- `/profile`: Displays the signed-in user's profile as a JSON object. Implementations of this template should replace this with a form allowing the user to edit portions of their profile.
- `/*`: A catch-all route for visits to any route not defined above. Displays a simple 404 page.

## Data Management

Since this is a [single-page application](https://developer.mozilla.org/en-US/docs/Glossary/SPA), all requests to authenticate and retrieve application data are made asynchronously by the browser. To demonstrate a standardized approach, and to prevent extraneous, unnecessary HTTP requests, this repo includes a couple opinionated approaches on how to build out your solution.

### API Client

First, the repo includes an example API client that demonstrates how to use JavaScript's [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), session management through cookies, and [async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) to build a robust, authenticated experience. Adding new endpoints to the client is a simple matter of copying an existing endpoint definition once you have defined a new route in your [experience API](https://docs.losant.com/guides/building-an-experience-api/overview/).

### React Context

There are two [context providers](https://reactjs.org/docs/context.html) included in the application: one for the user, and one for devices. Additional contexts can be added, and/or they can be combined into a single context provider.

The context providers expose methods for initiating API calls through the API client; for informing the interface about the current status of in-progress requests; and for holding, normalizing, and exposing the response data from the requests that is then consumed by the interface.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). For additional details on running locally, optimizing, building, and deploying, please visit the [Create React App repo](https://github.com/facebook/create-react-app).

Copyright 2022 Losant IoT. [MIT License](LICENSE.txt).
