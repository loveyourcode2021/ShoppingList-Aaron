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