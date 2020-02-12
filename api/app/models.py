from pydantic import BaseModel, Field
from pymongo import MongoClient

from bson import ObjectId
from typing import Optional


client = MongoClient()
db = client.test


class PyObjectId(ObjectId):

    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, object_id_value):

        if not ObjectId.is_valid(object_id_value):
            raise ValueError('Invalid ObjectId value')

        return object_id_value

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type='string')


class User(BaseModel):

    id: Optional[PyObjectId] = Field(alias='_id')
    name: str
    username: str
    email: str

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }
