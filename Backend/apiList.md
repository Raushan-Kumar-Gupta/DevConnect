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

    {-POST /request/review/:status/:requestId}

## userRouter
    -GET  /user/requests/received
    -GET  /user/connections
    -GET  /user/feed