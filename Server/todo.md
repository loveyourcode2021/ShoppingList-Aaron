1. Updating firebase to latest DONE
2. refactor from require => import ES6 DONE
   1. strip out all firebase-admin references => firebase.js
3. ref the firebase docs and set up basics
   1. initialize app DONE
   2. database DONE
   3. auth
      1. signup DONE
      2. signin DONE
4. add a product 
5. delete a product



User Story
Objective: User wants to purchase a product
1. User sign in 
2. User would navigate to a product, and add to their cart 
   1. users cart would be stored in react state
         - product_id
         - color_id
         - size_id
         - quantity
         - price
3. User will checkout
   1. create an order
      - user_id

Aug 27th TODO / Notes
- Drag and Drop w/ any file, filter out for only image/video
  - upload image to firebase store
    - how to link image data together with the product table? 
  - display related images? 
- Product page not displaying properly 
- edit page & delete, route not working
- ecommerce first plan, now analyzing product, make up video/photo, order from amazon, make analysis, and leave comment based on analysis 
- add admin panel, user panel to see item selected