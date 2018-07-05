import React, {Component} from 'react';

export default class ArticleProvider{

static getThreads = async () => {

  try {
    const res = await fetch('https://www.reddit.com/r/newsokur/hot.json')
    const json = await res.json()
    const threads = json.data.children.map(i => {
      i.key = i.data.url
      return i
    })
    return threads
  } catch (e) {
    console.error(e);
    return null
  }

}

}
