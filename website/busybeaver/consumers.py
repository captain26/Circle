from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from .models import User, Message
from django.shortcuts import render,get_object_or_404
from channels.exceptions import StopConsumer
import hashlib

class ChatConsumer(WebsocketConsumer):

    def init_chat(self, data):
        username = data['username']
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            # TODO more graceful
            raise StopConsumer
        
        # TODO make less hacky
        if self.room_name.startswith('group'):
            self.room_group_name = self.room_name
        else:
            otherusername = User.objects.get(pk=self.room_name).username
            self.room_group_name = "dm_" + hashlib.sha256(("dm_" + ''.join(sorted([otherusername, user.username]))).encode()).hexdigest()
            print(self.room_group_name)
            
        self.auth = True
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )


    def fetch_messages(self, data):
        messages = Message.last_50_messages(self.room_group_name)
        content = {
            'command': 'messages',
            'messages': self.messages_to_json(messages)
        }
        self.send_message(content)

    def new_message(self, data):
        author = data['from']
        text = data['text']
        author_user = get_object_or_404(User, username=author)
        message = Message.objects.create(author=author_user, content=text, chat_id=self.room_group_name)
        content = {
            'command': 'new_message',
            'message': self.message_to_json(message)
        }
        self.send_chat_message(content)

    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))
        return result

    def message_to_json(self, message):
        return {
            'id': str(message.id),
            'author': message.author.username,
            'content': message.content,
            'created_at': str(message.created_at)
        }

    commands = {
        'init_chat': init_chat,
        'fetch_messages': fetch_messages,
        'new_message': new_message
    }

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.auth = False
        self.accept()

    def disconnect(self, close_code):
        if self.auth:
            # leave group room
            async_to_sync(self.channel_layer.group_discard)(
                self.room_group_name,
                self.channel_name
            )

    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    def send_chat_message(self, message):
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']
        # Send message to WebSocket
        self.send(text_data=json.dumps(message))
