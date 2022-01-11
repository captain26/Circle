from .models import Comment, Post, Ticker
from django import forms
from django.views.generic.edit import ModelFormMixin
import datetime
from django.views.generic.edit import CreateView
from django.forms import widgets

class CommentForm(forms.Form):
    comment = forms.CharField(
        required = True,
        label = 'Comment',
        max_length = 500,
        widget = forms.Textarea(attrs={'cols': 80, 'rows': 2})
    )


class UserRegistrationForm(forms.Form):
    username = forms.CharField(
        required = True,
        label = 'Username',
        max_length = 32
    )
    email = forms.CharField(
        required = True,
        label = 'Email',
        max_length = 32,
    )
    password = forms.CharField(
        required = True,
        label = 'Password',
        max_length = 32,
        widget = forms.PasswordInput()
    )

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ('title', 'content', 'tag', 'sentiment')

CHOICES = [
    ('2', 'Very Bullish'),
    ('1', 'Bullish'),
    ('0', 'Neutral'),
    ('-1', 'Bearish'),
    ('-2', 'Very Bearish')
]


class PostForm_new(forms.Form):
    title = forms.CharField(
        required = True,
        label = 'Title',
        max_length = 50
    )
    content = forms.CharField(
        required=True,
        label='Content',
        max_length=50,
        widget = forms.Textarea
    )
    tag = forms.ModelMultipleChoiceField(queryset=Ticker.objects.all())

    sentiment = forms.ChoiceField(
        widget=forms.RadioSelect,
        choices=CHOICES,
        required=True,
        label='Sentiment',
    )
