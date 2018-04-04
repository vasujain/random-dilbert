# Today Dilbert

This module gets today's Dilbert comic from [dilbert.com](http://www.dilbert.com)

Beware: This function fetches and parses html. It is *slow*.

## Example

```js
dilbert(function(err, data) {
  data == {
    url: 'http://assets.amuniversal.com/321a39e06d6401301d80001dd8b71c47'
    date: '2001-10-25'
  }
})
```

dilbert.com doesn't have an api so there's some dom magic going on in the backend to be able to get the comic.

Credit for the original idea of getting a random dilbert comic package goes to [gavindinubilo](https://github.com/ChemicalRocketeer) (thanks).
