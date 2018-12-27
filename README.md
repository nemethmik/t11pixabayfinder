# This withredux branch is just a placeholder; I wanted to implement a Readux version of it, but all my heart was protesting against butchgering this clean application with the mess and the complexity Readux introduces. 
When architecting an application remember to add: 
- Internationalization,
- Theming,
- Customizability,
- Settings/Configurations

along with the specific data structures that the application controller passes down to the screen/page components.

# t11pixabayfinder
A remake of the Pixabay Finder demo application using TypeScript and [Thinking-in-React](https://reactjs.org/docs/thinking-in-react.html) Architecture.
The project was initialized with [create-react-app, which supports TypeScript out of the box](https://reactjs.org/docs/static-type-checking.html#using-typescript-with-create-react-app).

The accompanying video series giving detaied typeüalong explanation is [Design1st Business Applications with TypeScript, React, Material UI](https://www.youtube.com/watch?v=XofRkrEfoy0&list=PLeLsYxj1gjvHO2cU1IOX8a4iri8b9HPOd)
In the video I created a pixabayfinder repository dedicated only for that video series. This t11pixabayfinder is the primary, maintained repository. Maybe the other will be deleted when not needed any more.

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

## Installing TSLint
The project created with npx create-react-app --typescript doesn't automatically install and configure [TSLint](https://palantir.github.io/tslint/usage/cli/), it should be done by hand.
[Configure TypeScript, TSLint, and Prettier in VS Code for React Native Development](https://medium.com/@sgroff04/configure-typescript-tslint-and-prettier-in-vs-code-for-react-native-development-7f31f0068d2) is useful.
[egamma's vscode-tslint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint) VS extension module is deprecated (11M download); instead, it recommends to use [vscode-typescript-tslint-plugin (only 26K download)](https://github.com/Microsoft/vscode-typescript-tslint-plugin), which gives TS linting to VS Code via the [TypeScript TSLint Language Service Plugin](https://github.com/Microsoft/typescript-tslint-plugin), which supports [TS Sematic Rules](https://palantir.github.io/tslint/usage/type-checking/), and is to be installed with the sequence of: (1) Install TSLint 5+ in your workspace or globally, (2) Install the plugin with **npm install -g typescript-tslint-plugin**, (3) Enable the plugin in your tsconfig.json file:
```
{
  "compilerOptions": {
    "plugins": [
      { "name": "typescript-tslint-plugin" }
    ]
  }
}
```
The [TSLint GitHub documentation](https://github.com/palantir/tslint) mentions the existence of [TSLint Rules for React & JSX](https://github.com/palantir/tslint-react), which has a sample for tslint.json configuration:
```
{ 
  "extends": ["tslint:latest", "tslint-react"],
  "rules": {
    // override tslint-react rules here
    "jsx-wrap-multiline": false
  }
}
```

So after all this information the sequence is as follows:
- Global installation of TSLint: **npm install -g tslint typescript** I installed it globally, it is also possible to install within the project without global installation.
- **tslint --init** create a tslint.json, which I will extend to this 
```
{
    "defaultSeverity": "error",
    "extends": [
        "tslint:recommended", "tslint-config-standard", "tslint-react", "tslint-config-prettier",
    ],
    "jsRules": {},
    "rules": {
      "ordered-imports": false,
      "object-literal-sort-keys": false,
      "member-ordering": false,
      "jsx-no-lambda": false,
      "jsx-boolean-value": false,
    },
    "rulesDirectory": []
}
```
This is the tslint configuration from my t11mobiwa project, which used the other, deprecated React/TS project creation template, which has an additional linterOptions section, too:
```
{
  "extends": ["tslint:recommended", "tslint-react", "tslint-config-prettier"],
  "linterOptions": {
    "exclude": [
      "config/**/*.js",
      "node_modules/**/*.ts",
      "coverage/lcov-report/*.js"
    ]
  }
}
```
- After having TSLint installed globally, install the TypeScript TSLint Plugin globally, too: **npm install -g typescript-tslint-plugin**
- Install [TypeScript TSLint Plugin ms-vscode.vscode-typescript-tslint-plugin Preview (26K download)](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin) extension module in VS Code.

- Install tslint-react **npm install --save-dev tslint-react tslint-config-prettier tslint-config-standard**

After I have installed and configured TSLint, I received a TSLint error [This syntax requires an imported helper but module 'tslib' cannot be found.ts(2354)](https://stackoverflow.com/questions/52801814/this-syntax-requires-an-imported-helper-but-module-tslib-cannot-be-found-wit) on async componentDidMount; so, the solution was that I changed the module setting in tsconfig from esnext to es2015.

Then I tested if TSLint is capable of detecting the erroneous situation, when I define the type of the React component state type nicely, but forget to define a member variable. TSLint doesn't detect it either, and I receive a runtime error. So, I don't think this TSLint gives any additional help other than annoying rules. I believe the guys who made typescript for create-react-app was quite right not including TSLint by default in the creation process. I've spent more than an hour to read how to install all this TSLint, but it really isn't wort the trouble.

## Redux and Redux-Thunk added for State Management

If you know what you are doing you have the option to add Redux and Redux Thunk for state management, which definitely will make your project a lot more complicated while decouping the UI containement structure from the hierarchy of the regular top-down data distribution. With Redux you have a data store separate from the top level component and any component at any level can be connected to that store and any data can be retrieved from the store into the properties of the UI components. This might be a big advantage of some messy badly architected complex applications, where the developers failed to make a clean design upfront.
Here are a couple of excellent sources of using Redux in TypeScript projects:
- My favorite is [Microsoft's TypeScript React Starter](https://github.com/Microsoft/TypeScript-React-Starter), which has an excellently practical tutorial section on using Redux with TypeScript
- [mapStateToProps, and why you may not need mapDispatchToProps when you start Redux by Antoine Sauvage](https://medium.com/ovrsea/mapstatetoprops-and-why-you-may-not-need-mapdispatchtoprops-as-a-beginner-dd012a3da5e6) is not TypeScript, but gives quite decent explanation of what Redux actually does.
- [React Higher-Order Components in TypeScript](https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb) is not an easy-reader, but nicely explains the fundamentals of HOCs.
- [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/generics.html) is not for the faint-hearted, sure. I guess 99% of JavaScript programmers will not understand it.
- [Using TypeScript with Redux](https://dev.to/brightdevs/using-typescript-with-redux-ic) is another top find on the topic
- [Improved Redux type safety with TypeScript 2.8](https://medium.com/@martin_hotell/improved-redux-type-safety-with-typescript-2-8-2c11a8062575) is quite advanced reading, too.
- [Writing Better Redux’s Code with TypeScript](https://hackernoon.com/writing-better-reduxs-code-with-typescript-b7a3c1209bca) might be worth reading, too.

### Adding Redux, React-Redux and Redux-Thunk
- **npm install redux react-redux @types/react-redux redux-thunk**
```
+ redux-thunk@2.3.0
+ redux@4.0.1
+ react-redux@6.0.0
+ @types/react-redux@6.0.11
```

### Using Redux Thunk with TypeScript
It was quite challengind to properly typing Redux Thunk with Flow in the meteorb1/marioplan project. Even then I found that all this Redux especially with Redux Thunk overcompucates the application, it has a steep, easy-to-forget-and-mistake learning curve, and it actually it makes the application really cumbersome. I am pretty sure, you should use only one hierarchy in a cleanly designed application. Redux is something that jumps from the side; it doesn't reduce the complexity at all, the only thing is it reduces the clean architecture of an application. The recent React Context is a similar beast, this is (an excellent butcher tool) for projects to workaround the poor or totally missing initial architecture design of the application.
Here is a list of documents, that may be worth reading before giving a try to start working on Redux Thunk.
- [Correct TypeScript typing example for Redux Thunk actions](https://gist.github.com/milankorsos/ffb9d32755db0304545f92b11f0e4beb) This may be outdated as for Redux 4. 
- [Asynchronous Redux Actions Using Redux Thunk](https://alligator.io/redux/redux-thunk/) has nothing to do with TypeScript
- [Typescript with Redux, & Redux-Thunk Recipe](https://medium.com/@peatiscoding/typescripts-with-redux-redux-thunk-recipe-fcce4ffca405) is full of errors and doesn't even compile.
- [A Pattern for Redux Thunk Async Actions](https://spin.atomicobject.com/2018/11/19/redux-thunk-async-actions/) is about a solution for state management for an async call. Don't expect to much from this write-up.
- [Connect: Dispatching Actions with mapDispatchToProps](https://react-redux.js.org/using-react-redux/connect-mapdispatch) is an official document from React-Redux and is really important to read if you really want to go the Redux way.

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
