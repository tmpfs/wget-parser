## Output

Example output from the parser:

```json
{
  "links": [
    {
      "url": {
        "protocol": "http:",
        "slashes": true,
        "auth": null,
        "host": "google.com",
        "port": null,
        "hostname": "google.com",
        "hash": null,
        "search": null,
        "query": null,
        "pathname": "/",
        "path": "/",
        "href": "http://google.com/"
      },
      "link": "http://google.com/",
      "line": "--2016-02-10 16:11:57--  http://google.com/"
    },
    {
      "url": {
        "protocol": "http:",
        "slashes": true,
        "auth": null,
        "host": "www.google.co.id",
        "port": null,
        "hostname": "www.google.co.id",
        "hash": null,
        "search": "?gws_rd=cr&ei=zfC6Vv6KKYexuATc3pu4DQ",
        "query": "gws_rd=cr&ei=zfC6Vv6KKYexuATc3pu4DQ",
        "pathname": "/",
        "path": "/?gws_rd=cr&ei=zfC6Vv6KKYexuATc3pu4DQ",
        "href": "http://www.google.co.id/?gws_rd=cr&ei=zfC6Vv6KKYexuATc3pu4DQ"
      },
      "link": "http://www.google.co.id/?gws_rd=cr&ei=zfC6Vv6KKYexuATc3pu4DQ",
      "line": "--2016-02-10 16:11:57--  http://www.google.co.id/?gws_rd=cr&ei=zfC6Vv6KKYexuATc3pu4DQ"
    }
  ],
  "broken": []
}
```
