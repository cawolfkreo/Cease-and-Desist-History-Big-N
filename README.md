# History of big N sins

## Table of Contents
<details><summary>Expand to see contents</summary>
  <p>

* **[Description](#Description)**<br />
* **[Getting Started](#getting-started)**<br />
* **[Deployment](#deployment)**<br />
* **[Contributing](#contributing)**<br />
* **[Authors](#authors)**<br />
* **[License](#license)**<br />

</p>
</details>

## Description
This project originated after a few years of looking at a certain videogame company and his response to fan projects, since it was less than ideal and specially after never improving despite fan outcry. After being influenced by [killed by Google](https://killedbygoogle.com/) and a few videos about the subject that **I highly recommend watching** since they illustrate the issue with the company pretty well, I decided to make a compilation of news and events this videogame company has caused over the years to make sure we don't forget the story we lived in hopes that one day, we won't repeat it. The list of videos I mentioned can be found here:
* **[Sacrifices to the Church of the big N](https://youtu.be/xgKY9hmbfgo)**
* **[How the big N disrespects its most passionate fans.](https://youtu.be/UKD_wnB9AMU)**
* **[The Game the big N Wishes It Never Made](https://youtu.be/N8imMRbi2qc)**

## Getting Started
If you'd like to edit or host this website on your own, I highly recommend using a webserver on the machine you are going to use for this. The first thing you want to do is downloading the repository, to do this you can use git (if you already know how to use it) or download the files as a zip (the green button above the contents of the repository gives you the option).

### Download the Web Server
You can use your web browser (chrome, firefox, brave, opera, edge, etc.) to open the website by dragging the `index.html` into a new tab. But if you do it that way, any changes to the `.css`, `.json` and even `.html` files might not be reflected since the browser opens a cache of the file and not the current version. For this reason it is highly recommended to use a webserver (you can find more about this [here](https://letmegooglethat.com/?q=static+web+server)). I use webservers made on node since it makes things easy for me, so if you want to use them you can download node here: https://nodejs.org/en/. If you don't want to use node or use some other webserver, you can do so but it's up to you to set it up.

## Deployment
Now you can deploy the website and open it on your browser. If you used your own webserver or you downloaded some other program then you need to follow the instructions for sair webserver. If you downloaded node or you want to use node then there are two main webserver you can use:

### http-server
This is a simple webserver, to run it simply [open a console](https://letmegooglethat.com/?q=how+to+open+a+console) on the folder where you downloaded the repository and type:
```zsh
npx http-server
```
Node will automatically download the server and run it for you, after a few seconds a message will appear prompting you to open `http://localhost:8080` on your browser, if you do it the website will appear there and you can edit files freely, reload the page and see the changes.

### reload
This webserver automatically reloads the website when it detects changes to the files, to run it simply [open a console](https://letmegooglethat.com/?q=how+to+open+a+console) on the folder where you downloaded the repository and type:
```zsh
npx reload
```
Node will automatically download the server and run it for you, after a few seconds a message will appear prompting you to open `http://localhost:8080` on your browser, if you do it the website will appear there and you can edit files freely, the server it will reload the page and you can see the changes.

## Contributing
If you would like to help with the project (suggest changes, articles, etc), please [read this information](https://github.com/cawolfkreo/Cease-and-Desist-History-Big-N/blob/master/data/README.md).

## Authors
* [__Camilo Zambrano Votto__](https://github.com/cawolfkreo)

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This repository has the standard MIT license. You can find it [here.](https://github.com/cawolfkreo/Cease-and-Desist-History-Big-N/blob/master/LICENSE)
