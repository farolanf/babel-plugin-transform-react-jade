# babel-plugin-transform-react-jade
Use Jade in place of JSX.

## Installation

```bash
npm i -D babel-plugin-transform-react-jade
```

## Configuration

### webpack.config.js

Add to babel-loader plugins:

#### As array element

```js
module.exports = {
  ...
  module: {
    loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['env', 'react'],
                plugins: [
                    'babel-plugin-transform-react-jade',
                ],
            },
        },
    ],
  },
  ...
}
```

#### As query string

```js
module.exports = {
  ...
  module: {
    loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: [
                'react-hot',
                'babel?presets[]=env&presets[]=react&plugins[]=babel-plugin-transform-react-jade',
            ],
        },
    ],
  },
  ...
}
```

## Usage

```js
class Greeting extends React.Component {

  render() {
    let { name } = this.props;    

    return jade`
      div
        h1= 'Hello ' + name '!'
    `;            
  }
} 
```

## License
MIT
