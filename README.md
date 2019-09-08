# TempShow <a name="start"></a>

React component to temporary show some components/elements.

[![NPM version](https://badge.fury.io/js/tempshow.png)](http://badge.fury.io/js/tempshow)

## Table of contents

* [Installation](#install)
* [Usage](#usage)
* [API](#api)
* [Contributing](#contributing)
* [License](#license)

## Installation <a name="install"></a> [&#x2191;](#start)

    npm install tempshow --save

## Usage <a name="usage"></a> [&#x2191;](#start)

```js
import TempShow from 'tempshow';

// ...

export class Foo extends React.Component {
    constructor(props) {
        super(props);

        this.handleVisibleChange = this.handleVisibleChange.bind(this);
    }

    // ...

    /**
     * Handle component's visibility change.
     *
     * @param {boolean} visible
     *      `true`, when component became visible, `false`, when component became invisible.
     */
    handleVisibleChange(visible) {
        // ...
    }

    render() {
        // ...
        return (
            <TempShow
                className="overlay"
                showClassName="opaque"
                hideClassName="transparent"
                autoHide={10}
                onShow={this.handleVisibleChange}
                onHide={this.handleVisibleChange}
                visible={boolValueToControlVisibility}
                showOnMouseOver={boolValueToControlShowOnMouseOver}
                hideOnMouseLeave={true}
                toggleVisibleOnClick={false}
            >
                <div className="content">
                    Some content here.
                </div>
            </TempShow>
        );
    }
}
```

## API <a name="api"></a> [&#x2191;](#start)

### Props

|  Prop  |  Type  |  Default  |  Description  |
|  ----  |  ----  |  -------  |  -----------  |
|  `autoHide`  |  number  |  `5`  |  Number of seconds after which component should be hidden automatically.  When zero or negative value is specified auto hiding is not applied.  |
|  `children`  |  React node  |    |  Component's children.  |
|  `className`  |  string  |    |  A CSS class that should be set for component's root element.  |
|  `component`  |  React elementType  |  `div`  |  Component's root element type.  |
|  `componentRef`  |  function, object  |    |  An optional ref callback to get reference to the root (top-most) element of the rendered component.  Just like other refs, this will provide `null` when it unmounts.  |
|  `hideClassName`  |  string  |    |  An additional CSS class that should be set for component's root element when component is hidden.  |
|  `hideForClick`  |  function  |  [hideForClick](#hideForClick)  |  Function that will be used to determine whether component should be hidden on a mouse click when value of `hideOnAnyClick` prop is `false`.  The following arguments will be passed into function: event data (`SyntheticEvent`) and component's object.  If function returns `true`, component will be hidden.  |
|  `hideOnAnyClick`  |  boolean  |  `false`  |  Whether component should be hidden on any mouse click.  |
|  `hideOnMouseLeave`  |  boolean  |  `false`  |  Whether component should be hidden when mouse leaves area of component's root DOM element.  |
|  `hideStyle`  |  object  |    |  Styles that should be assigned for hidden component.  |
|  `postponeAutoHide`  |  boolean  |  `true`  |  Whether component's autohiding should be postponed when component props are changed.  |
|  `showClassName`  |  string  |    |  An additional CSS class that should be set for component's root element when component is visible.  |
|  `showOnMouseOver`  |  boolean  |  `true`  |  Should component be shown on mouse over?  |
|  `showStyle`  |  object  |    |  Styles that should be assigned for visible component.  |
|  `toggleVisibleOnClick`  |  boolean  |  `true`  |  Whether component visibility should be toggled on a mouse click.  |
|  `visible`  |  boolean  |  `false`  |  Should component be visible?  Can be used to explicitly control component's visibility.  |
|  `onHide`  |  function  |    |  Function that should be called on component hidding.  |
|  `onShow`  |  function  |    |  Function that should be called on component show.  |


### Methods

#### TempShow.hideForClick(eventData: SyntheticEvent): boolean <a name="hideForClick"></a>

Default function that is used to determine whether component should be hidden on a mouse click.

Return `true` when component's root DOM element is clicked.

## Contributing <a name="contributing"></a> [&#x2191;](#start)
In lieu of a formal styleguide, take care to maintain the existing coding style.

## License <a name="license"></a> [&#x2191;](#start)
Copyright (c) 2019 Denis Sikuler  
Licensed under the MIT license.
