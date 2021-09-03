### Assigned Task
- [x] User can register as a trainer or a seeker.
- [x] Seekers can see total number of available trainers on the app.
- [x] If total available trainers > 0, seekers can request for meditation.
- [x] The request is sent to any 1 of the available trainers on the app, and it is auto accepted.
- [x] The Meditation session starts with a timer, that is shown to both of them.
- [ ] Session can be terminated by the trainer anytime after the session starts.
    (Need to resolve logical error)
- [x] Once the session is over, timer stops and meditation is over.

### DB Schema
```
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
```

- seconds - duration fo the timer
- startAt - server timestamp
- occupied - status of user/trainer if busy with some session
- status - indicate if user is online/offline
- type - if person is user or trainer 
- uid - login user id for validation login
- pair - store the paired user/trainer id

### Project link
[Meditation session](https://zen-edison-a38f20.netlify.app/)

```
Email & Pass (Customer) - customer.demo.com / demo123
Email & Pass (Trainer) - trainer.demo.com / demo123

```
