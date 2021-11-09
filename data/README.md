# How to suggest changes to the information
I would love to say that the information collected here is perfect and there is every single incident regarding this videogame company listed here. But the truth is that there are probably mistakes and gaps of incidents or data, or even better sources for every items listed here. If you would like to suggest any changes, there are different ways to do this, if you don't want to deal with github [click here (easiest for you)](#without-making-or-using-a-github-account), and if you are ok dealing with Github [click here (easiest for me)](#making-or-using-a-github-account).


## Without making or using a Github account
The simplest way (for you) to propose a change is to tweet me or send me a dm on [my twitter](https://twitter.com/Camilozvi). I might not be able to reply to you right away but once I'm free nad I've seen your message, I'll probably include the changed you proposed or reply to you if I need some clarification or something.

## Making or Using a Github account
To make things easy for me you can either make an issue or submit a pull request. But before you jump into any of those, please try to follow these guidelines:

### Making issues
If you want to make an issue to add an item to the list or modify the source for an item, please **include the URL or reference of your source** This means news articles, public posts made by one of the parties involved, etc. If there is a typo or other type of mistake with the contents of the data, please provide the title of the item that has the issue and what the error is (i.e. The item for Evo 2013 has a typo on the description, it should say "X" instead of "Y").

### Making pull requests
When making a pull request I expect you to create your own branch based of the main one on this repository, make yourself changes to the `data.json` file on this folder and then making a PR with your changes. Keep in mind the format for the list of items, any item on the list should follow this format:
```JSON
[
    // ...
    {
        "url": "<The URL of the article, post, wayback machine, etc. of the event.>",
        "icon":"<This depends on what the type of incident was, either: 'block.svg' for anything blocked by the big N , 'law.svg' for any legal letters from the big N or 'balance.svg' for any monetary compensation obtained by the big N>",
        "alt": "<This one is tied to the previous one and you can find it on other items on the list, you can leave it blank if you are not sure what the message should be>",
        "date":"<When the incident happened, this can be either the date when an article was post or when a publication or statement by any party involved was made about the incident. This should be formated as: 'yyyy-mm-dd'>",
        "name":"<The name of the incident or the 'title' that will be displayed on the website>",
        "desciption": "<A short summary of what happened on the event>"
    },
    // ... 
]
```
Once you made your changes to the file you can push your branch into the repository and github will allow you to create a pull request if there are no conflicts between the main branch and your branch. Once I'm free to check your changes I'll approve and merge them if there is no issue with them. If there is need for clarification or new changes, I'll comment on your PR and approve it once you update it by pushing new changes to your branch.
