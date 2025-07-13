## authRouter
    -POST  /signup
    -POST  /login
    -POST  /logOut

## ProfileRouter
    -GET    /profile/view
    -PATCH  /profile/edit
    -PATCH  /profile/password

## connectionRequestRouter
    -POST  /request/send/interested/:userId
    -POST  /request/send/ignored/:userId
    {-POST /request/send/:status/:userId}
    
    -POST  /request/review/accepted/:requestId
    -Post  /request/review/rejected/:resquestId

## userRouter
    -GET  /user/connections
    -GET  /user/requests
    -GET  /user/feed