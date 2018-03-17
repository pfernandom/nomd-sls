# nomd-sls
Serverless back-end for the nomd project

## Queries
```
query all{
  articles{
    id
    title
    locale
  }
}

mutation createArticle{
  createArticle(article:{
    title:"Test article"
    locale:"en_US",
    content:"This is my article"
  }){
    article{
      id
    }
  }
}

```
