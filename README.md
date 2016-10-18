# Random Dilbert

This module gets a random Dilbert comic from [dilbert.com](http://www.dilbert.com)

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

All the Dilbert comics have their own page, the url to this page is the date that it was posted. The first Dilbert comic was posted April 16, 1989.
By getting a random date between the first Dilbert comic and today, we can achieve the noble goal of Random Dilbert.

Credit for the original idea of getting a random date and parsing the html goes to [gavindinubilo](https://github.com/gavindinubilo/random-dilbert) (many thanks).
