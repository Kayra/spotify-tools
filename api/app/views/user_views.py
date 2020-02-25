from datetime import datetime

from fastapi import APIRouter, HTTPException

from models import User


router = APIRouter()


@router.post('/users')
async def add_user(user: User):
    from main import db, spotify

    if db.users.find({'username': user.username}).count():
        raise HTTPException(status_code=409, detail=f'User {user.username} already exists.')

    user.playlist_track_mapping = spotify.build_playlist_track_mapping(user.username)
    user.last_updated = datetime.now()

    db.users._insert(user.dict(), check_keys=False)

    added_user = db.users.find({'username': user.username})
    if added_user.count() > 0:
        return {'user': user}
    else:
        raise HTTPException(status_code=500, detail=f'Unable to add User {user.username}.')


@router.get('/users')
async def find_users():
    from main import db

    users = []
    for user in db.users.find():
        users.append(User(**user))

    return {'users': users}


@router.get('/users/{username}')
async def find_user(username: str):
    from main import db

    user = db.users.find_one({'username': username})

    if user:
        del user['_id']
        return {'user': user}
    else:
        raise HTTPException(status_code=404, detail=f'User {username} does not exist.')
