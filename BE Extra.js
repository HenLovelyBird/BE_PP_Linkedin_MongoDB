/*

    LinkedIn Backend - Extras

    This routes are NOT mandatory. Please consider finishing both backend and frontend before moving to this tasks.
    Frontend-wise, try to create a great user experience, as close as possible at the LinkedIn original one.

    ---------------------------------------------------------------------------
    # COMMENTS #
    ---------------------------------------------------------------------------

    COMMENT Model:
    {
        "_id": "5d84937322b7b54d848eb41b", //server generated
        //user who posted it (as reference? nested? Your choice!)
        "comment": "I totally agree with you! Great post!",
        //post (as reference? nested? your choice)
        "createdAt": "2019-09-20T08:53:07.094Z", //server generated
        "updatedAt": "2019-09-20T09:00:46.977Z", //server generated
    }

    ---------------------------------------------------------------------------

    LIKE Model:
    {
        "_id": "5d925e677360c41e0046d1f5",  //server generated
        //user who liked it (as reference? nested? Your choice!)
        //post liked (as reference? nested? Your choice!)
        "createdAt": "2019-09-30T19:58:31.019Z",  //server generated
        "updatedAt": "2019-09-30T19:58:31.019Z",  //server generated
    }   

    ---------------------------------------------------------------------------
    # API #
    ---------------------------------------------------------------------------

    POSTS:

    - POST https://striveschool.herokuapp.com/api/posts/{id}/like
    Like the post for current user (each user can like only once per post)
    - DELETE https://striveschool.herokuapp.com/api/posts/{id}/like
    Remove the like for current user
    - GET https://striveschool.herokuapp.com/api/posts/{id}/comment
    Retrieve the list of comments for a given post
    - POST https://striveschool.herokuapp.com/api/posts/{id}/comment
    Create the a new comment for a given post
    - DELETE https://striveschool.herokuapp.com/api/posts/{id}/comment/{commentId}
    Deletes a given comment
    - PUT https://striveschool.herokuapp.com/api/posts/{id}/comment/{commentId}
    Edit a given comment
   
    Note:
    You can also return the comments with a given POST if you like, without implementing a specific route
    Remember that you should return the number of like for each post.
    Would be nice to know also if the current user already like-d the current post in order to show it correctly on the frontend side

    ---------------------------------------------------------------------------
    # FRONTEND #
    ---------------------------------------------------------------------------

    Here lies a lot of work! You should update your frontend in order to make this new features available.
    So:
    - like (add and remove) from posts
    - comments on the posts itself

    ---------------------------------------------------------------------------
    # DEPLOYMENT #
    ---------------------------------------------------------------------------
   
    Both frontend and backend should be deployed on Heroku and made them available for the general public.
 
*/