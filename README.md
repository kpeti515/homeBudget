# Goal of this project:
This project is used by me and my wife to track our "own" money separately. 

We have a common budget, but we agreed to have a small amount which can be spend to anything without the other's acceptance.

# Features: 
Current product state:
![Overview](https://raw.githubusercontent.com/kpeti515/homeBudget/main/img/overview.PNG)

## Responsive design
Tablet and desktop view:

![Tablet view](https://raw.githubusercontent.com/kpeti515/homeBudget/main/img/tablet_view.PNG)

Mobile view:

![Mobile view](https://raw.githubusercontent.com/kpeti515/homeBudget/main/img/mobile_view.PNG)
## Dark mode
Two different style, one dark mode and one light mode:

![Dark mode](https://raw.githubusercontent.com/kpeti515/homeBudget/main/img/dark_mode.PNG)
![Light mode](https://raw.githubusercontent.com/kpeti515/homeBudget/main/img/light_mode.PNG)
## Filters
You can filter out expenses:

![Filter out expenses](https://raw.githubusercontent.com/kpeti515/homeBudget/main/img/filter1.PNG)

Or incomes:

![Filter out incomes](https://raw.githubusercontent.com/kpeti515/homeBudget/main/img/filter2.PNG)
## Sorting options
You can sort based on date or amount:

![Sorting options](https://raw.githubusercontent.com/kpeti515/homeBudget/main/img/sort_options.png)
## Toasts
After any modification you will receive a toast if it is done:

![Toast1](https://raw.githubusercontent.com/kpeti515/homeBudget/main/img/toast1.PNG)

![Toast2](https://raw.githubusercontent.com/kpeti515/homeBudget/main/img/toast2.PNG)

## Modals
If you want to add an expense or income, you will get a modal window:

![Add an expense or income img](https://raw.githubusercontent.com/kpeti515/homeBudget/main/img/modal_new_item.PNG)

If you want to modify an expense or income, similar window will appear:

![Modify item img](https://raw.githubusercontent.com/kpeti515/homeBudget/main/img/modal_modify_item.PNG)
## Confirmation modals
If you press the delete button, a confirmation modal will appear - just to prevent accidental clicks:

![Confirmation modal](https://raw.githubusercontent.com/kpeti515/homeBudget/main/img/confirmation_window.PNG)
## Hidden feature
My wife figured out, that I also need to separate money for clothes ( because I don't really spend money for clothes :) ) and she will buy some clothes for me from that money.<br/>
This extra feature only appears at my profile. 

![Extra feature](https://raw.githubusercontent.com/kpeti515/homeBudget/main/img/hidden_feature.PNG)

## Firebase as database
This project use an external database to store the records, it is called [Firebase](https://firebase.google.com/)- which is a Google product and has a free version in it for small projects / data.

![Firebase](https://raw.githubusercontent.com/kpeti515/homeBudget/main/img/firebase.PNG)
# Planned updates and reasons for them
 - Login window - make it secure and don't be afraid to share the link with others :)
 - Decrease dependency quantities - I learned a lot due to a training (thanks EPAM!) and I want to implement that knowledge into this project too.
 - Make code much cleaner - try to be more professional
 - Maybe host it on my own server ?!
 - Change database (after learned SQL or similar db) ->if I have a server with "unlimited" storage (4TB HDD, so not unlimited ;) ) why use external supplier?


 Made with [React](https://reactjs.org/)

 Currently hosted on [Heroku](https://www.heroku.com)