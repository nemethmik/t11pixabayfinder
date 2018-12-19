# t11pixabayfinder
A remake of the Pixabay Finder demo application using TypeScript and Thinking-in-React Architecture
## Installation of Material UI
- **npm install @material-ui/core @material-ui/icons prop-types @types/prop-types**
- Change the **target** compiler option to **es2015** in **tsconfig.json**, and VERY IMPORTANT, **kill npm start** and execute again. A running npm start doesn't reread tsconfig. This is important to avoid the error node_modules/@material-ui/core/styles/MuiThemeProvider.d.ts 
Type error: **Cannot find name Map**. Do you need to change your target library? Try changing the lib compiler option to es2015 or later. TS2583

To test if MUI works fine:
- import Button from "@material-ui/core/Button"
- Then, I deleted the App.tsx render content and added an MUI button with the React logo.
```
<Button variant="contained" color="secondary">Pixabay Image Finder
  <img src={logo} className="App-logo" alt="logo" width="30px" />
</Button>
```
<img src="public\materialuibuttonwithreactlogo.png" width="300px"/>

## Available Scripts
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using **npx create-react-app t11pixabayfinder --typescript**
```
npx: installed 63 in 4.56s
Creating a new React app in c:\Users\nemet\tiva11\t11pixabayfinder.
Installing packages. This might take a couple of minutes.
Installing react, react-dom, and react-scripts...
+ @types/jest@23.3.10
+ @types/react-dom@16.0.11
+ react-dom@16.6.3
+ react@16.6.3
+ @types/react@16.7.17
+ react-scripts@2.1.1
+ @types/node@10.12.17
+ typescript@3.2.2
added 1715 packages from 734 contributors and audited 35665 packages in 75.726s
found 0 vulnerabilities
We detected TypeScript in your project (src\App.test.tsx) and created a tsconfig.json file for you.
Your tsconfig.json has been populated with default values.
'''
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
