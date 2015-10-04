angular-fn
================

# Directives
## Block UI


```html
<div fn-block-ui="myBlockId">Content</div>
```

```javascript
angular.module('mymodule', ['angular-fn']).controller('MyCtrl', ['fnBlockUi', function (fnBlockUi) {

    // Activate the fn-block-ui directive with 'myBlockId' id
    var unblock = fnBlockUi('myBlockId');
    
    // Do whatever you need when the UI is blocked.
    // ...
    
    // Deactivate (hide) block.
    unblock();
}]);
```