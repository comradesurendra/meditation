## Assigned Task
✔️ User can register as a trainer or a seeker.
✔️ Seekers can see total number of available trainers on the app.
✔️ If total available trainers > 0, seekers can request for meditation.
✔️ The request is sent to any 1 of the available trainers on the app, and it is auto accepted.
✔️ The Meditation session starts with a timer, that is shown to both of them.
❌ Session can be terminated by the trainer anytime after the session starts.
    (Need to resolve logical error)
✔️ Once the session is over, timer stops and meditation is over.

### Bonus Points
❌ When a seeker requests for meditation, the request is broadcasted to every available trainer, if any one of the trainers accept the request, the meditation starts.
❌ Trainers can switch off getting requests with a button.
❌ Setup meditation Reminders

### DB Schema
"user_data" : {
    "-MiGRdLpUoeTYHkDVjcb" : {
        "countdown" : {
            "seconds" : 60,
            "startAt" : 1630275063873
        },
        "name" : "Test trainer",
        "occupied" : "false",
        "status" : "offline",
        "type" : "trainer",
        "uid" : "BkUYNDvyQyMCBF3YMdFB8d25XxS2",
        "pair":""
        },
}

- seconds - duration fo the timer
- startAt - server timestamp
- occupied - status of user/trainer if busy with some session
- status - indicate if user is online/offline
- type - if person is user or trainer 
- uid - login user id for validation Login
- pair - store the paired user/trainer
